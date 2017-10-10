const {NODE_ENV, NODE_HOST, KUE_PORT, WEBPACK_PORT} = process.env;
const app = express()

import Boom from 'boom'
import proxy from 'proxy-middleware'
import url from 'url'
import ejs from 'ejs'
import path from 'path'
import express from 'express'
import gzipStatic from 'connect-gzip-static'
import compression from 'compression'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import serveStatic from 'serve-static'
import serveFavicon from 'serve-favicon'
import morgan from 'morgan'
import validateTables from '../helpers/validate-tables'
import hydrateRequestMiddleware from '../middleware/hydrate-request-middleware'
import httpBroadcastMiddleware from '../middleware/http-broadcast-middleware'

if (NODE_ENV === 'production') {
  app.use('*', function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.hostname}${req.originalUrl}`)
    } else {
      if (req.host.indexOf('v4.') === 0) {
        return res.redirect(`https://app.snuggpro.com${req.url}`)
      }
      return next()
    }
  })
}

const p = (...rest) => path.join(__dirname, '../../..', ...rest)

const viewDir = NODE_ENV === 'development' ? 'views/dev' : 'views/dist'

// Set view config
app.set('views', p(viewDir));
app.engine('html', ejs.renderFile);

// app.set('trust proxy', 1); ?? do we need this, was this for cloudflare?
// Increase the limit b/c we are sending HPXML files in POST and hitting a limit
app.use(serveFavicon(p('src/img/favicon.ico')))
app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({limit: '5mb', extended: false}))
app.use(cookieParser())

if (NODE_ENV === 'production') {
  app.use(gzipStatic(p('dist'), {maxAge: 31536000000}))
  app.use(compression())
  app.use('/img', serveStatic(p('src/img')))
  app.use('/css', serveStatic(p('src/css')))
  app.use('/font', serveStatic(p('src/font')))
} else {
  app.use(morgan('dev'))
  app.use('/img', serveStatic(p('src/img')));
  app.use('/css', serveStatic(p('src/css')))
  app.use('/font', serveStatic(p('src/font')))
  app.use('/src/raven-mock.js', serveStatic(p('src/js/raven-mock.js')))
  app.use('/src/uploadcare.js', serveStatic(p('src/js/uploadcare.js')))

  if (NODE_ENV === 'development') {
    app.use('/src', proxy(
      url.parse(`http://${NODE_HOST}:${WEBPACK_PORT}/src`)
    ))
  } else {
    app.use(serveStatic(p('dist')));
  }
}

const PROXY_ENDPOINT = {
  production: 'https://snugg-kue.herokuapp.com',
  staging: 'https://snugg-dev-kue.herokuapp.com',
  development: 'http://localhost:' + (KUE_PORT || 5000),
  test: 'http://localhost:' + (KUE_PORT || 5000)
}

app.use('/kueadmin', proxy(url.parse(PROXY_ENDPOINT[NODE_ENV])))

// Hydrate the request object with any additional things we need,
// e.g. req.knex, req.model, req.flashError, req.account
app.use(hydrateRequestMiddleware)

app.use(httpBroadcastMiddleware)

// Validate tables middleware, only runs once on server start,
// gives us a printout of any inconsistencies in the data model
// vs. what we think the validation enums look like.
app.use(validateTables)


export default app;
