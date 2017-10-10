import _ from 'lodash'
import Promise from 'bluebird'
import moment from 'moment'
import Boom from 'boom'
import knex from '../init/knex-init'

// First we're going to get all of the showIf conditions, but since
// those are keyed based on the "field name", we're going to go through
// and re-map them to `${table}.${column}` so we can simplify processing against
// the fetched data for the csv.
import csvDefinitions from './csv-definitions'
import fieldDefinitions from '../../../constants/field-definitions'
import showIfConditions from '../../../constants/show-if-conditions'
import { formattedMetrics } from '../../../modules/data/formatters/totalFormatters'

// Headers are populated in the validation of fields below
const headers = []

// CSV: Edit for number of collection results
const collectionCounts = {
  attic: 2,
  vault: 2,
  caz: 3,
  cazSystem: 6,
  concern: 6,
  dhw: 2,
  door: 4,
  freezer: 3,
  hvac: 6,
  refrigerator: 3,
  wall: 2,
  window: 2,
  oven: 1,
  range: 1,
  clothesDryer: 1,
  customRecommendations: 20,
  pv: 1
}

const csvColumns = Object.keys(csvDefinitions)
const csvCollectionColumns = {}
Object.keys(csvDefinitions).forEach((key) => {
  if (typeof csvDefinitions[key] === 'object') {
    csvCollectionColumns[key] = Object.keys(csvDefinitions[key])
  }
})
const fieldsByName = _.transform(_.keyBy(fieldDefinitions, 'name'), (result, value, k) => {
  result[k] = {
    ...value,
    outputTable: _.camelCase(value.outputTable.replace('v5_', ''))
  }
})

// Validate the current collection
function validateCollection(collectionName, fields) {
  if (collectionCounts[collectionName]) {
    _.times(collectionCounts[collectionName], n => {
      Object.keys(fields).forEach(key => {
        validateDefinition(key, fields[key], n + 1)
      })
    })
    return
  }
  throw new Error(`Collection count for collection ${collectionName} is not defined`)
}

// Ensure each of the key / values defined in csv-definitions are
// valid for the current setup.
function validateDefinition(key, value, idx = null) {

  // If there's an index for the current key, replace $n
  // (or append _$n on the end if $n isn't in the field)
  if (idx) {
    key = key.indexOf('$n') === -1 ? `${key} ${idx}` : key.replace('$n', idx)
  }

  if (typeof value === 'function') {
    headers.push(key)
    return
  }

  if (typeof value === 'object') {
    if (idx) {
      throw new Error('Cannot nest collections more than one level deep.')
    }
    return validateCollection(key, value)
  }

  value = value.replace(/improved/i, '').trim()

  if (fieldsByName[value]) {
    headers.push(key)
    return
  }

  throw new Error(`${value} is not a valid field name for csv column ${key}`)
}

const CUSTOM_REC = 19

csvColumns.forEach(key => validateDefinition(key, csvDefinitions[key]))

// To build the csv we do a few things... first we gather all of the
// jobs according to the provided array of jobIds. We then fetch all of
// the relevant data for these jobs. From there we run each job through
export default async function csvDataReader(jobIds) {

  //const knex = req.knex

  const jobs = await knex.select('*')
    .from('jobs')
    .whereIn('id', jobIds)

  const accountIds = []
  const companyIds = []
  const programIds = []

  jobs.forEach(job => {
    if (!job) {
      return
    }
    if (job.account_id) accountIds.push(job.account_id)
    if (job.company_id) companyIds.push(job.company_id)
    if (job.program_id) programIds.push(job.program_id)
  })

  let csvData = await Promise.props({
    jobs,

    accounts: knex.select('*').from('accounts').whereIn('id', accountIds),
    companies: knex.select('*').from('companies').whereIn('id', companyIds),
    programs: knex.select('*').from('programs').whereIn('id', programIds),

    basedata: knex.select('*').from('v5_basedata').whereIn('job_id', jobIds),

    attic: knex.select('*').from('v5_attic').whereIn('job_id', jobIds).whereNull('deleted_at'),
    caz: knex.select('*').from('v5_caz').whereIn('job_id', jobIds).whereNull('deleted_at'),

    cazSystem: knex.select(
      'v5_caz_system.*',
      'v5_hvac.hvac_system_name'
    )
    .from('v5_caz_system')
    .leftOuterJoin('v5_hvac', 'v5_hvac.uuid', 'v5_caz_system.hvac_uuid')
    .whereIn('v5_caz_system.job_id', jobIds)
    .whereNull('v5_caz_system.deleted_at'),

    concern: knex.select('*').from('v5_concern').whereIn('job_id', jobIds).whereNull('deleted_at'),
    dhw: knex.select('*').from('v5_dhw').whereIn('job_id', jobIds).whereNull('deleted_at'),
    door: knex.select('*').from('v5_door').whereIn('job_id', jobIds).whereNull('deleted_at'),
    freezer: knex.select('*').from('v5_freezer').whereIn('job_id', jobIds).whereNull('deleted_at'),
    health: knex.select('*').from('v5_health').whereIn('job_id', jobIds),
    hvac: knex.select('*').from('v5_hvac').whereIn('job_id', jobIds).whereNull('deleted_at'),
    refrigerator: knex.select('*').from('v5_refrigerator').whereIn('job_id', jobIds).whereNull('deleted_at'),
    utilities: knex.select('*').from('v5_utilities').whereIn('job_id', jobIds),
    vault: knex.select('*').from('v5_vault').whereIn('job_id', jobIds).whereNull('deleted_at'),
    wall: knex.select('*').from('v5_wall').whereIn('job_id', jobIds).whereNull('deleted_at'),
    window: knex.select('*').from('v5_window').whereIn('job_id', jobIds).whereNull('deleted_at'),
    oven: knex.select('*').from('v5_oven').whereIn('job_id', jobIds).whereNull('deleted_at'),
    range: knex.select('*').from('v5_range').whereIn('job_id', jobIds).whereNull('deleted_at'),
    pv: knex.select('*').from('v5_pv').whereIn('job_id', jobIds).whereNull('deleted_at'),
    clothesDryer: knex.select('*').from('v5_clothes_dryer').whereIn('job_id', jobIds).whereNull('deleted_at'),

    totals: knex.select('*').from('v5_totals').whereIn('job_id', jobIds),

    recommendations: knex.select('v5_recommendations.*', 'v5_rec_definitions.type as recType')
      .from('v5_recommendations')
      .innerJoin('v5_rec_definitions', 'v5_rec_definitions.id', 'v5_recommendations.rec_definition_id')
      .whereIn('job_id', jobIds)
      .whereNull('deleted_at'),

    hes_scores: knex.select('*').from('v5_hes_scores').whereIn('job_id', jobIds).whereNull('deleted_at'),
  })

  const csvDataKeys = Object.keys(csvData)
  const byJobId = {}

  jobIds.forEach(jobId => {
    // ----
    // j is the "current job" object in the
    // byJobId[jobId] hash
    // ----
    const j = byJobId[jobId] = {}
    const job = j.job = j.jobs = csvData.jobs.find(v => v.id === jobId)
    csvDataKeys.forEach(k => {
      switch (k) {
        case 'jobs': break;
        case 'accounts':
          j.accounts = csvData.accounts.find(v => v.id === job.account_id)
          j.account = j.accounts
          break;
        case 'programs':
          j.programs = csvData.programs.find(v => v.id === job.program_id)
          j.program = j.programs
          break;
        case 'companies':
          j.companies = csvData.companies.find(v => v.id === job.company_id)
          j.company = j.companies
          break;
        case 'basedata':
        case 'health':
        case 'utilities':
        case 'totals':
          j[k] = csvData[k].find(v => v.job_id === jobId)
          if (k === 'totals') {
            if (j.totals === undefined) {
              j.totals = {}
            }
            j.metrics = formattedMetrics(j.totals)
          }
          break;
        case 'recommendations':
          j.recommendations = csvData.recommendations.filter(v => v.job_id === jobId)
          j.customRecommendations = _.orderBy(j.recommendations.filter(rec => (
            rec.rec_definition_id === CUSTOM_REC && rec.status === 1 || rec.status === 0
          )), 'order')
          j.recs = _.keyBy(j.recommendations, 'recType')
          break;
        case 'hes_scores':
          j.hes_score_initial = hesScoreData('initial', csvData, jobId)
          j.hes_score_alternative = hesScoreData('alternative', csvData, jobId)
          j.hes_score_final = hesScoreData('final', csvData, jobId)
          break;
        default: {
          j[k] = _.orderBy(csvData[k].filter(v => v.job_id === jobId), 'order')
        }
      }
    })
  })

  const rows = await Promise.reduce(jobIds, (csvRows, jobId) => {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        Promise.try(() => {
          resolve(csvRows.concat([processJob(jobId, byJobId[jobId])]))
        }).catch(reject)
      })
    })
  }, [])

  return {
    fields: headers,
    data: rows
  }
}

function hesScoreData(type, csvData, jobId) {
  const filtered = csvData.hes_scores.filter(v => v.job_id === jobId && v.hes_assessment_type_code === type)
  return _.orderBy(filtered, 'created_at', 'desc')[0]
}

function processJob(jobId, context) {

  function columnReducer(result: Array, csvColumn: string) {
    const fieldName = csvDefinitions[csvColumn]

    // If it's a function, invoke with the context
    if (typeof fieldName === 'function') {
      return result.concat(fmt(fieldName(context)))
    }

    function processRow(rowColumn, fieldName, row) {
      let isImproved = false

      // If we have improved in either the rowColumn or the fieldName, we assume
      // we're looking for the improved value. If it's in the fieldName, we need to strip
      // it out so we can look up the proper fieldsByName.
      if (fieldName.search(/improved/i) !== -1) {
        isImproved = true
        fieldName = fieldName.replace(/improved/i, '')
      } else if (fieldName.search(/improved/i) !== -1) {
        isImproved  = true
      }

      fieldName = fieldName.trim()

      const {outputTable, outputColumn, collectionName} = fieldsByName[fieldName]

      if (collectionName && !row) {
        throw new Error(`Missing wrapping collection ${collectionName} for ${rowColumn}`)
      }

      const showIf = showIfConditions[fieldName]
      const column = isImproved ? outputColumn + '_improved' : outputColumn

      if (!row) {
        row = context[outputTable]
      }

      if (showIf && !showIf(row, {jobId, uuid: row.uuid, field: fieldName, improved: isImproved})) {
        return null
      }

      if (!row) {
        console.log(`Missing row for ${rowColumn}.${fieldName} / ${outputTable}.${column}`)
        return null
      }

      return fmt(row[column])
    }

    // If it's an object, we're in a collection
    if (typeof fieldName === 'object') {

      if (!context[csvColumn]) {

        console.log(`Missing collection ${csvColumn}`)

        return result
      }

      const collectionRows = context[csvColumn]
      const collectionColumns = csvCollectionColumns[csvColumn]

      _.times(collectionCounts[csvColumn], (n) => {
        const row = collectionRows[n]
        collectionColumns.forEach((collectionColumn: string) => {

          // If there's no collection row, just add a "null" field here
          if (!row) {
            result.push(null)
            return
          }
          const collectionField = _.get(csvDefinitions, [csvColumn, collectionColumn])

          if (typeof collectionField === 'function') {
            result.push(collectionField(row, context))
            return
          }

          result.push(processRow(collectionColumn, collectionField, row))
        })
      })
      return result
    }

    // Otherwise it's just a normal field, process accordingly
    return result.concat(processRow(csvColumn, fieldName))
  }

  return csvColumns.reduce(columnReducer, [])
}

export async function validateCsvJobIds(req, jobIds) {

  if (req.account.role === 'snuggadmin') {
    return
  }
  const query = req.knex.pluck('jobs.id')
    .distinct()
    .from('jobs')

  if (req.account.role === 'program-admin') {
    query
      .whereIn('jobs.id', jobIds)
      .where('jobs.program_id', req.account.program_id)
  } else {
    query.innerJoin('accounts', (j) => {
      j.on('jobs.account_id', 'accounts.id')
    })
    .innerJoin('accounts_companies', (j) => {
      j.on('accounts_companies.company_id', 'jobs.company_id')
    })
    .whereIn('jobs.id', jobIds)
    .where((q) => {
      q.where('jobs.account_id', req.account.id)
        .orWhereRaw('accounts.program_id = jobs.program_id')
        .orWhere(q => {
          q.where(`accounts_companies.account_id`, req.account.id)
           .whereRaw(`accounts_companies.role = 'admin'`)
        })
    })
  }

  const rows = await query

  const diff = _.difference(jobIds, rows)
  if (diff.length > 0) {
    throw Boom.unauthorized(`Not authorized to access job(s) ${diff.join(', ')}`)
  }
}

function fmt(value) {
  if (_.isDate(value)) {
    return moment(value).format('MM/DD/YYYY')
  }
  return value
}
