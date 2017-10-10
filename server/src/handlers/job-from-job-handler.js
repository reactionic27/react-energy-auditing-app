import _ from 'lodash'
import jobFromJobOrTemplate from '../helpers/job-from-job-or-template'

export default async function createJobFromJob(req: Object, res: Object) {
  const {body} = req

  const [srcJob] = await req.knex('jobs').where({id: body.from_job_id})

  const now = new Date()

  if (!body.company_id) {
    const [{id: company_id}] = await req.knex
      .select('id')
      .from('companies')
      .where({name: 'Job Duplicator', demo_company: true, deleted_at: null})
      .limit(1)
    body.company_id = company_id
  }

  if (!body.account_id) {
    const [{id: account_id}] = await req.knex
      .select('id')
      .from('accounts')
      .where({
        last_name: 'Job Duplicator',
        email: 'duplicator@snugghome.com',
        deleted_at: null
      })
      .limit(1)
    body.account_id = account_id
  }

  if (!body.program_id) {
    body.program_id = 1
  }

  const job = await jobFromJobOrTemplate('job', req, parseInt(body.from_job_id, 10), {
    ..._.omit(srcJob, 'id', 'deleted_at', 'deleted_by'),
    ...body,
    last_name: srcJob.last_name + ' - Duplicate of ' + body.from_job_id,
    is_calculating: false,
    sample_job: false,
    created_at: now,
    updated_at: now,
    version: 5,
    creator_account_id: req.account.id,
    created_by_account_id: body.account_id,
    created_by_company_id: body.company_id,
    created_by_program_id: body.program_id,
  })
  res.json(job)
}
