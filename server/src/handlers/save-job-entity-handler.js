import validateBody from '../helpers/validate-body'
import maybeParse from '../helpers/maybe-parse'
import maybeSerialize from '../helpers/maybe-serialize'
import authorize from '../authorizations/authorize'

// Handler used to process basedata, utilities, health, report
export default async function saveJobEntityHandler(req: Object, res: Object) {
  const {params: {0: job_id, 1: tableName}} = req

  // Set for req.broadcast
  req.snuggAction = `${tableName}/save`

  const body = validateBody(`${tableName}/save`, req)

  await authorize('saveJobEntity', req)

  if (tableName === 'reports') {
    maybeSerialize(body, 'page_sort_order')
    maybeSerialize(body, 'element_sort_order')
  }
  maybeSerialize(body, 'touched_fields')

  await req.knex(`v5_${tableName}`).update(body).where({job_id})

  if (tableName === 'reports') {
    maybeParse(body, 'page_sort_order')
    maybeParse(body, 'element_sort_order')
  }
  maybeParse(body, 'touched_fields')

  req.broadcast(`job:${job_id}`, body)

  res.json({})
}
