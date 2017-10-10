import Promise from 'bluebird'
import _ from 'lodash'
import bookshelf, {knex} from '../../init/bookshelf-init'
import calculateTotals from './calculate-totals'
import calculateRecommendations from './calculate-recommendations'
import fieldDefinitions from '../../../../constants/field-definitions'
import roundValue from 'util/roundValue'
import deepSortObject from 'deep-sort-object'
const IS_DEV = process.env.NODE_ENV === 'development'

const keyedFields = _.mapValues(
  _.groupBy(fieldDefinitions, 'outputTable'),
  (values) => _.keyBy(values, 'outputColumn')
)

export default async function processResponse(kueJob: Object) {

  const {data: {returningInto, formData, rawResponse, optimiserJobId, job_id}} = kueJob

  const recDefs = await bookshelf.model('rec-definition').fetchAll()

  return await knex.transaction(async (trx: Object) => {

    const parsedData = parseResponse(rawResponse)
    const finalParsedData = _.omit(parsedData, 'A1HPXML')

    const client_om_data = JSON.stringify(deepSortObject({
      output: _.omit(formData, 'varlist'),
      returning: Object.keys(returningInto).sort(),
      response: finalParsedData
    }), null, 2)

    await Promise.all([
      saveOutputs(trx, job_id, returningInto, finalParsedData),
      updateTotals(trx, job_id, calculateTotals(parsedData)),
      updateRecs(trx, job_id, calculateRecommendations(recDefs, parsedData)),
      updateOm(trx, job_id, optimiserJobId, parsedData, client_om_data)
    ])

    return null
  })
}

function parseResponse(data) {
  return _.transform(data, function(acc, val, key) {
    _.set(acc, key.replace('ID=', '').split('|'), val)
  });
}

async function updateOm(trx: Object, job_id: number, optimiser_id: number, parsedData: Object, client_om_data: string) {

  const { A1HPXML: hpxml, sessionid: optimiser_session } = parsedData

  let [row] = await knex.select('id').from('v5_optimiser_submissions').where({job_id})

  let upsertData = {
    job_id,
    optimiser_id,
    hpxml,
    parsed_response: JSON.stringify(parsedData),
  }

  var queries = [
    trx.insert({job_id, optimiser_id, optimiser_session, client_om_data}).into('v5_optimiser_sessions'),
    row ?
      trx('v5_optimiser_submissions').where({id: row.id}).update({
        ...upsertData,
        model_count: knex.raw('model_count + 1'),
      }) :
      trx('v5_optimiser_submissions').insert({
        ...upsertData,
        model_count: 1,
      })
  ]

  return Promise.all(queries)
}

type pathArray = [string, string | number, string];

// Saves the outputs for a job, fetching the existing outputs and
// then creating / updating as appropriate.
async function saveOutputs(trx: Object, job_id: number, returningInto: Object, outputs: Object) {

  let writes = {}

  _.forEach(returningInto, (path: pathArray, returnValueKey: string) => {
    const [table, , column] = path
    const isImproved = column.slice(-9) === '_improved'
    const fieldDefColumn = isImproved ? column.slice(0, -9) : column
    const field = keyedFields[table][fieldDefColumn]
    const opts = isImproved && field.improvedOptions ? field.improvedOptions : field.options
    let value = outputs[returnValueKey]
    if (opts) {
      let searching
      _.forEach(opts, o => {
        if (o === value) {
          searching = false
        }
        if (o.omValue === value) {
          value = o.displayValue
          searching = false
        }
        if (o.displayValue === value) {
          searching = false
        }
        return searching
      })
      if (searching !== false) {
        value = undefined
        if (IS_DEV) {
          console.log(`Invalid value ${value} for select ${returnValueKey} : ${table}.${column}`)
        }
      }
    } else {
      const roundedValue = roundValue(value, field.decimals)
      if (_.isNaN(value)) {
        console.log(`Unexpected non-numeric value ${value} for field ${returnValueKey} : ${table}.${column}`)
      }
      value = roundedValue
    }
    _.setWith(writes, path, value, Object)
  })

  const updates = []

  _.forEach(writes, (entries, tbl) => {
    _.forEach(entries, (columns, pk) => {
      let chain = knex(tbl).update(columns).where({job_id})
      if (pk != job_id) { // eslint-disable-line
        chain = chain.where({uuid: pk})
      }
      updates.push(chain)
    })
  })

  return Promise.all(updates)
}

function updateTotals(trx: Object, job_id: number, totals: Object) {
  return trx('v5_totals').where({job_id}).update(totals)
}

// Update all of the recommendations. If the job hasn't been
// calculated yet, also sort them.
async function updateRecs(trx: Object, job_id: number, processedRecs: Object) {

  const recs = await trx.select('*').from('v5_recommendations').where({job_id})

  await Promise.all(
    recs.map(row => {
      var processedRec = processedRecs[row.rec_definition_id]

      if (processedRec) {

        // If it's been sent back as declined
        if (processedRec.status === 'False') {

          // If it's unknown or true, set it to declined.
          if (_.includes([0, 1], row.status)) {
            processedRec.status = 3;
          } else {
            delete processedRec.status;
          }

        } else {
          processedRec.status = 1;
        }

        processedRec.cost = roundValue(processedRec.cost, 2)
        processedRec.sir = roundValue(processedRec.sir, 2)

        return trx.table('v5_recommendations').update(processedRec).where({uuid: row.uuid});
      }
    })
  )

}
