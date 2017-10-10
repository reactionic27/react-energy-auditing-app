import validateBody from '../helpers/validate-body'
import authorize from '../authorizations/authorize'
import updateJobStageInternal from './update-job-stage-internal'

// Handles the saving of things like job, account, financing-template
// when there is no additional logic needed.
export default async function genericSaveTableHandler(req: Object, res: Object) {
  const {params: {0: tableName, 1: id}} = req

  let dbTable = tableName

  const body = await validateBody(`${tableName}/save`, req)

  if (dbTable === 'financing_templates') {
    dbTable = 'v5_financing_templates'
    if (body.company_id) {
      body.account_id = null
    } else if (body.account_id) {
      body.company_id = null
    }
  }

  await authorize('saveGenericTable', req)

  await req.knex(dbTable).update(body).where({id}).whereNull('deleted_at')

  if (tableName === 'jobs') {
    req.snuggAction = 'jobs/save'
    req.broadcast(`job:${body.id}`, body)
  }
  if (tableName === 'companies') {
    req.snuggAction = 'companies/save'
    req.broadcast(`company:${body.id}`, body)
  }
  if (tableName === 'invitations') {
    req.snuggAction = 'invitations/save'
    const {company_id} = await req.knex(tableName).where({id}).first('company_id')
    req.broadcast(`company:${company_id}`, body)
  }
  if (tableName === 'financing_templates') {
    req.snuggAction = 'financingTemplates/save'
    switch (body.type) {
      case 'company': req.broadcast(`company:${body.company_id}`, body); break;
      case 'account': req.broadcast(`account:${body.account_id}`, body); break;
    }
  }

  // #605, Update stage change for job
  if (tableName === 'jobs' && body.stage_id) {
    await updateJobStageInternal(req, res, body.id, body.stage_id)
  }

  res.json({})
}
