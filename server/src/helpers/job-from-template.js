import Boom from 'boom'
import jobFromJobOrTemplate from './job-from-job-or-template'

export default async function createJobFromTemplate(req: Object, body: Object) {

  const [template] = await req.knex
    .select('*')
    .from('jobs')
    .where({id: body.from_template_id})

  if (!template) {
    throw Boom.badRequest(`Invalid template id: ${body.from_template_id}`)
  }

  return jobFromJobOrTemplate('template', req, template.id, {
    ...template,
    ...body,
    id: undefined,
    is_template: false,
    from_template_id: template.id,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined
  })
}
