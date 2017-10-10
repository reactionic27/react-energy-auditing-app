import http from 'http'
import onHeaders from 'on-headers'
import app from './init/express-init'
import socketInit from './init/socket-init'
import bookshelf from './init/bookshelf-init'
import {router} from './init/router-init'
import raven from 'raven'

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    onHeaders(res, () => {
      const success = res.statusCode < 300
      if ((req.method === 'POST' || req.method === 'PUT') && success) {
        if (!req.__req_validated__) {
          process.nextTick(() => {
            throw new Error(`Unvalidated ${req.method} request ${req.url}`)
          })
        }
        if (!req.__req_authorized__) {
          process.nextTick(() => {
            throw new Error(`Unauthorized ${req.method} request ${req.url}`)
          })
        }
      }
    })
    next()
  })
}

function onError(error, req, res, next) {
  // Sentry error handler
  res.status(500).render('500.html', {
    error,
    title: 'Server Error | 500 error | Snugg Pro'
  })
}

app.use(raven.middleware.express.requestHandler(process.env.RAVEN_URL))


// Add the initialized router to the "app".
// The router will also be used by the
app.use(router)

app.use(raven.middleware.express.errorHandler(process.env.RAVEN_URL))
app.use(onError)



// Initialize the http server
const server = http.Server(app)

// Initialize socket.io with the server instance
socketInit(server)

// Eventually this should be eliminated,
// once Tim fixes up knex
function destroyKnex() {
  bookshelf.knex.destroy(function () {
    process.exit(0)
  })
}

process
  .on('SIGTERM', destroyKnex)
  .on('SIGINT', destroyKnex)

module.exports = server

exports.router = router
