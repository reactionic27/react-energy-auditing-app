import Joi from 'joi'
import Boom from 'boom'
import authenticatedValidations from '../validations/authenticated-validations'
import unauthenticatedValidations from '../validations/unauthenticated-validations'
const debug = require('debug')('snugg:validate')
const NOT_PROD = process.env.NODE_ENV !== 'production'

export default function validateBody(validationKey: string, req: ?Object) {

  function _validate(req: Object) {

    const validations = authenticatedValidations[validationKey] || unauthenticatedValidations[validationKey]

    if (!validations) {
      throw Boom.notImplemented(`Validations for ${validationKey}`)
    }

    debug(`Validating: ${validationKey}`)

    // Validate the Joi object, stripping unknown keys
    const {value, error} = Joi.validate(req.body, validations, {stripUnknown: true})

    // Check this on headers to determine whether the
    // incoming request was validated
    if (NOT_PROD) {
      Object.defineProperty(req, '__req_validated__', {
        value: true
      })
    }

    if (error) {
      debug(`Validating Error: ${JSON.stringify(error, null, 2)}`)

      throw error
    }

    req.body = value

    return value
  }

  if (arguments.length === 2) {
    return _validate(req)
  }

  return function validate(req: Object, res: Object, next: Function) {
    _validate(req)
    next()
  }
}
