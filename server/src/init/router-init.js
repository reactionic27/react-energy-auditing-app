import Boom from 'boom'
import _ from 'lodash'
import promiseRouter from '../lib/promise-router'
import errorHandlerMiddleware from '../middleware/error-handler-middleware'
import readRootMiddleware from '../middleware/read-root-middleware'

import authenticatedGetRoutes from '../routes/authenticatedGetRoutes'
import authenticatedPostRoutes from '../routes/authenticatedPostRoutes'
import unauthenticatedRoutes from '../routes/unauthenticatedRoutes'
import snuggAdminRoutes from '../routes/snuggAdminRoutes'

// The "promise-router" works by adding .catch(next)
// to every router call, so if an error is caught it doesn't hang
// indefinitely.
export const router = promiseRouter()

// Ensure email is always set to lower case,
// so we don't have any discrepancies when logging in, etc.
router.use((req, res, next) => {
  if (_.isString(_.get(req, 'body.email'))) {
    req.body.email = req.body.email.toLowerCase()
  }
  next()
})

// First add any of the unauthenticated routes (e.g. /login /register)
unauthenticatedRoutes(router)

router.use(readRootMiddleware)

// Next add any of the authenticated routes,
authenticatedPostRoutes(router)
authenticatedGetRoutes(router)

// Finally any of the routes that only work if you're a snugg admin
snuggAdminRoutes(router)

router.use((req, res, next) => {
  next(Boom.notFound('Not Found'))
})

// Add the error handler middleware which will catch & respond
// to all errors in a single location
router.use(errorHandlerMiddleware)
