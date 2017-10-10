import bole from 'bole'
import {isPlainObject} from 'lodash'
import postAction from '../api/post-action'
import invariant from 'fbjs/lib/invariant'
const IS_DEV = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
const log = bole(__filename)

export default async function api(req: Object, res: Object) {
  log.debug('api middleware: %s', req.body.type)
  try {
    invariant(
      isPlainObject(req.body),
      'Invalid request, must be a plain object, saw: %s.',
      req.body
    )
    let response = await postAction(req, req.body)
    res.json(response)
  } catch (e) {
    log.error(e, 'api middleware caught an error')
    // Sometimes e.code is a MYSQL error message code string like
    // ER_BAD_FIELD_ERROR
    let status = parseInt(e.code, 10) || 500
    res.status(status).json({
      code: status,
      message: e.message,
      stack: IS_DEV ? e.stack : undefined
    })
  }
}
