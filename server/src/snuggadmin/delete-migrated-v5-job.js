import Promise from 'bluebird'
import knex from '../init/knex-init'

const V5_DELETE_TABLES = [
  'v5_attic',
  'v5_basedata',
  'v5_caz',
  'v5_concern',
  'v5_dhw',
  'v5_door',
  'v5_freezer',
  'v5_health',
  'v5_hvac',
  'v5_job_financing',
  'v5_job_stage_history',
  'v5_optimiser_sessions',
  'v5_optimiser_submissions',
  'v5_recommendation_caption_rows',
  'v5_recommendations',
  'v5_refrigerator',
  'v5_utilities',
  'v5_vault',
  'v5_wall',
  'v5_window',
  'v5_oven',
  'v5_pv',
  'v5_clothes_dryer',
  'v5_range',
]

async function _rollbackJob(job_id, trx) {
  await Promise.each(V5_DELETE_TABLES, (table) => {
    return trx(table).where({job_id: job_id}).delete()
  })
  await trx('jobs').update({version: 4}).where({id: job_id})
}

export default async function deleteMigratedV5Job(jobId, trx) {
  const job_id = +jobId
  if (trx) {
    return _rollbackJob(job_id, trx)
  }
  await knex.transaction(async (trx) => _rollbackJob(job_id, trx))
}
