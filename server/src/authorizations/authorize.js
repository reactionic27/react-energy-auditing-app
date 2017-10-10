import Boom from 'boom'
import authorizations from './authorizations'
const NOT_PROD = process.env.NODE_ENV !== 'production'
const debug = require('debug')('snugg:authorize')

export default function authorize(type: string, maybeRequest: ?Object) {

  async function _authorize(req: Object) {
    if (!authorizations[type]) {
      throw new Error('Missing authorization ' + type)
    }

    try {
      debug(`${type} ${JSON.stringify({params: req.params, body: req.body}, null, 2)}`)
      const result = await authorizations[type](req)
      if (result === false) {
        throw new Error(`Authorization condition: ${type} failed`)
      }
    } catch (e) {
      if (req.account.role !== 'snuggadmin') {
        debug(`Error: ${e.message}`)
        throw Boom.unauthorized(e.message)
      }
      debug(`Snuggadmin: skipping type`)
    } finally {
      if (NOT_PROD) {
        Object.defineProperty(req, '__req_authorized__', {
          value: true
        })
      }
    }
  }

  if (arguments.length > 1) {
    return _authorize(maybeRequest)
  }

  return async function authorizeMiddleware(req, res, next) {
    await _authorize(req)
    next()
  }

}
