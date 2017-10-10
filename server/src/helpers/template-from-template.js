import Boom from 'boom'
import jobFromJobOrTemplate from './job-from-job-or-template'

export default async function createTemplateFromTemplate(req: Object, body: Object, template: Object) {
  return jobFromJobOrTemplate('template', req, template.id, {
    ...template,
    ...body,
    id: undefined,
    is_template: true,
    from_template_id: template.id,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined
  })
}
