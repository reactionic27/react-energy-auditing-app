import _ from 'lodash'
import Boom from 'boom'
import bole from 'bole'
const log = bole(__filename)

export default function errorHandler(error, req, res, next) {

  const IS_JSON = req.headers['content-type'] === 'application/json'

  if (error.message === 'EmptyResponse') {
    error = Boom.notFound('The requested page was not found.')
  }

  if (!IS_JSON && !req.account) {
    req.flash('error', error.message)
    if (req.method === 'POST') {
      res.redirect(req.url)
    } else {
      res.redirect('/')
    }
    return
  }

  if (error.isJoi) {
    const json = {}
    error.details.forEach(err => {
      _.set(json, err.path, err.message)
    })
    error = Boom.badRequest('Validation Error', json)
  }

  // This is a mysql error
  if (error.errno) {
    if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
      error = Boom.badRequest('Database Save Error', {
        field: String(error.message.split('ER_TRUNCATED_WRONG_VALUE_FOR_FIELD')[1]).trim()
      })
    }
  }

  if (!error.isBoom) {
    log.error(error, req.body, 'Unhandled error in server middleware')
    error = Boom.badRequest(error.message, {message: error.message, stack: error.stack})
  }

  if (IS_JSON) {
    return res.status(error.output.statusCode).json({
      ...error.output.payload,
      data: error.data
    })
  }

  if (!req.account) {
    req.flash('error', error.message)
    return res.redirect(req.url)
  }

  if (error.output.statusCode === 404) {
    return res.status(404).render(`404.html`, {error, title: 'Page not found | 404 error | Snugg Pro'})
  }

  return res.status(error.output.statusCode).render(`500.html`, {
    error,
    title: `'Server Error | ${error.output.statusCode} error | Snugg Pro'`
  })
}
