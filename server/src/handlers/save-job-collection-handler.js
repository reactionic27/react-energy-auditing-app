import validateBody from '../helpers/validate-body'
import authorize from '../authorizations/authorize'
import maybeParse from '../helpers/maybe-parse'
import maybeSerialize from '../helpers/maybe-serialize'

export default async function saveCollection(req: Object, res: Object) {

  const {params: {0: jobId, 1: tableName, 2: uuid}} = req

  // Set for req.broadcast
  req.snuggAction = `${tableName}/save`

  const body = req.body = await validateBody(req.snuggAction, req)

  await authorize('saveJobEntity', req)

  if (tableName === 'recommendations') {
    if (body.hasOwnProperty('cost')) {
      body.touched_cost = body.cost === null ? null : true
    }
  }

  maybeSerialize(body, 'touched_fields')

  await req.knex(`v5_${tableName}`).update(body).where({job_id: jobId, uuid})

  maybeParse(body, 'touched_fields')

  req.broadcast(`job:${jobId}`, body)
  res.json({})
}
