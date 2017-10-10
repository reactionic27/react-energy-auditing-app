import updateJobsStageHandler from './update-jobs-stage-handler'

export default async function updateJobStageInternal(
  req: Object,
  res: Object,
  jobId: number,
  stageId: ?number
) {

  if (!stageId) {
    return
  }

  const {
    company_id,
    stage_id,
    is_template,
    sample_job
  } = await req.knex('jobs').where({id: jobId}).first(
    'company_id',
    'stage_id',
    'is_template',
    'sample_job'
  )

  if (is_template || sample_job) {
    return
  }

  if (stage_id !== stageId) {
    await new Promise((resolve, reject) => {
      updateJobsStageHandler({
        ...req,
        body: {
          stage_id: stageId,
          company_id,
          job_ids: [jobId]
        }
      }, {...res, json: resolve}, reject)
    })
  }

}
