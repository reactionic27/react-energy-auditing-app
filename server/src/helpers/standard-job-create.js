import _ from 'lodash'
import Promise from 'bluebird'
import UUID from 'node-uuid'
import * as c from '../constants'
import updateJobStageInternal from '../handlers/update-job-stage-internal'

export default async function standardJobCreate(req: Object) {
  const {body} = req
  const knex = req.knex

  const newJob = await req.knex.transaction(async (trx) => {

    req.knex = trx

    const job = {
      ...body,
      version: 5,
      creator_account_id: req.account.id,
      created_by_account_id: body.account_id,
      created_by_company_id: body.company_id,
      created_by_program_id: body.program_id
    }

    const [job_id] = await req.knex.insert(job).into('jobs')

    await updateJobStageInternal(req, req.res, job_id, job.stage_id)

    const [recDefinitions, phoneNumbers] = await Promise.all([
      req.knex.select('*').from('v5_rec_definitions'),
      getPhoneNumbers(req, job_id)
    ])
    // From the "collections" and "rec_definitions",
    // inserts a default for each of the "collections"
    // rather than doing that on the fly on the first load.

    const recommendationInserts = []
    recDefinitions.forEach((definition) => {
      const {id: rec_definition_id, type, title, why_it_matters, order} = definition
      if (type !== 'custom') {
        recommendationInserts.push({
          order,
          title,
          job_id,
          why_it_matters,
          rec_definition_id,
          uuid: UUID.v4(),
          status: type === 'health' ? 4 : 0
        })
      }
    })

    await Promise.all([
      req.knex.insert(recommendationInserts).into('v5_recommendations'),
      req.knex.insert({
        job_id,
        safety_overview,
        concerns_sidebar,
        additional_notes_overview,
        solutions_title: getSolutionsTitle(phoneNumbers),
        page_sort_order: JSON.stringify(c.PAGE_SORT),
        element_sort_order: JSON.stringify(c.ELEMENT_SORT),
      }).into('v5_reports'),

      req.knex.insert({job_id}).into('v5_totals'),
      req.knex.insert({job_id}).into('v5_utilities'),
      req.knex.insert({job_id}).into('v5_health'),
      req.knex.insert({job_id, touched_fields: '{}'}).into('v5_basedata'),

      ...addCollectionTables(trx, job_id)
    ])

    const jobRecs = await req.knex.select('uuid').from('v5_recommendations').where({job_id})

    const captionRowInserts = jobRecs.map(({uuid}) => ({
      order: 0,
      job_id,
      uuid: UUID.v4(),
      recommendation_uuid: uuid
    }))

    await req.knex.insert(captionRowInserts).into('v5_recommendation_caption_rows')

    return await req.knex.first('*').from('jobs').where({id: job_id})
  })

  req.knex = knex

  return newJob
}

const V5_TABLES = [
  'attic',
  'concern',
  'dhw',
  'door',
  'oven',
  'clothes_dryer',
  'range',
  'refrigerator',
  'wall',
  'window',
  'pv'
]

function makeDefaultCollectionInsert(table, job_id) {
  let insertData = {
    job_id,
    uuid: UUID.v4(),
    order: 0
  }
  if (_.includes(c.TOUCHABLE_TABLES, table)) {
    insertData.touched_fields = '{}'
  }
  if ((table === 'refrigerator') || (table === 'caz')) {
    insertData[`${table}_name`] = `${_.capitalize(table)} 1`
  }
  if (table === 'door') {
    insertData = [insertData, {...insertData, order: 1, uuid: UUID.v4()}]
  }
  return insertData
}

function addCollectionTables(knex, job_id) {
  return V5_TABLES.map(table => {
    return knex.insert(makeDefaultCollectionInsert(table, job_id)).into(`v5_${table}`)
  })
}

async function getPhoneNumbers(req: Object, jobId: number) {
  const [phoneNumbers] = await req.knex.select(
    'accounts.phone_number as account_phone',
    'companies.phone as company_phone'
  )
  .from('jobs')
    .leftOuterJoin('accounts', 'accounts.id', 'jobs.account_id')
    .leftOuterJoin('companies', 'companies.id', 'jobs.company_id')
  .limit(1)
  .where('jobs.id', jobId)
  return phoneNumbers || {};
}

function getSolutionsTitle({company_phone, account_phone}) {
  if (company_phone) {
    return `Call us today at ${company_phone} to ask a question or discuss the next step!`
  }
  if (account_phone) {
    return `Call us today at ${account_phone} to ask a question or discuss the next step!`
  }
  return `Call us today to ask a question or discuss the next step!`
}

const concerns_sidebar = "<div> <h3>We listened to you!</h3> <p>As our client, we want to make sure we are addressing all of your concerns for your home. If we have missed any concerns in this report, please let us know right away.</p> </div>"
const safety_overview = "<div><h3>What's This?</h3><p>These tests are recommended by the Building Performance Institute (BPI). They can help identify potential health and safety concerns in your home.</p></div>";
const additional_notes_overview = "Additional notes are miscellaneous items that deserve a mention in your home's report.\n\nThese mentioned items are not included in the cost or savings of your project.";
