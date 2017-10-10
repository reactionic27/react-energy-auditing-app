import bole from 'bole'
const log = bole(__filename)
import _ from 'lodash'
import {emitter} from '../lib/socket-emitter'

export default async function updateJobsStageHandler(req: Object, res: Object) {
  const {body} = req
  const {job_ids, stage_id} = body

  var now = new Date()
  log.debug({now, body}, 'UPDATE_JOBS_STAGE starting')

  // Update the current job stage history to record when it ended
  let jobStageHistory = req.knex('v5_job_stage_history')
    .whereIn('job_id', job_ids)
    .andWhere('end_at', null)

  let jobsUpdate = req.knex('jobs').whereIn('id', job_ids)

  // Some extra authorization constraints for non-snuggadmin users
  if (req.account.role !== 'snuggadmin') {
    jobsUpdate = jobsUpdate.andWhere('company_id', 'in', (qb) => {
      qb.select('id').from('companies').innerJoin(
        'accounts_companies',
        'companies.id',
        'accounts_companies.company_id'
      ).where('accounts_companies.role', 'admin')
    })
  }

  // Update all the corresponding v5_job_stage_history rows
  await jobStageHistory.update({
    end_at: now,
    changed_by: req.account.id
  })
  const oldHistory = await req.knex('v5_job_stage_history')
                      .select('*')
                      .whereIn('job_id', job_ids)
  emitter
    .to(`account:${req.account.id}`)
    .emit('job-stage-history', oldHistory)

  // Insert new job stage history rows
  const inserts = job_ids.map(id => {
    return {
      changed_by: req.account.id,
      job_id: id,
      stage_id: stage_id,
      start_at: now
    }
  })

  await req.knex('v5_job_stage_history').insert(inserts)
  const newRows = await req.knex('v5_job_stage_history')
                            .select('*')
                            .whereIn('job_id', job_ids)
                            .andWhere({
                              changed_by: req.account.id,
                              stage_id: stage_id,
                              end_at: null,
                            })
  emitter
    .to(`account:${req.account.id}`)
    .emit('job-stage-history', newRows)

  // Update all the corresponding jobs rows
  await jobsUpdate.update({
    stage_id: stage_id,
    updated_at: now
  })


  job_ids.forEach(id => {
    req.broadcast(`job:${id}`, {id, stage_id: stage_id}, 'jobs/save')
  })

  const companyIds = _.uniq(await req.knex('jobs')
    .select('company_id')
    .whereIn('id', job_ids)
    .whereNotNull('company_id')
    .whereNull('deleted_at')
    .pluck('company_id')
  )

  // TODO: Replace this with an actual push of stage counts
  for (const company_id of companyIds) {
    req.broadcast(`company:${company_id}`, {company_id}, 'refresh-stages')
  }

  res.json({job_ids, stage_id})
}
