require('dotenv').load()
require('newrelic')
const bole = require('bole')

bole.output({level: 'debug', stream: process.stdout})
const log = bole(__filename)
const invariant = require('fbjs/lib/invariant')

let REQUIRED_ENV_VARS = [
  'HEROKU',
  'NODE_ENV',
  'MAILGUN_KEY',
  'MAILGUN_PUBLIC_KEY',
  'MAILGUN_SENDER',
  'MAILGUN_DOMAIN',
  'STRIPE_SECRET_KEY',
  'STRIPE_PUBLIC_KEY',
  'REDISCLOUD_URL',
  'RDS_URL',
  'PORT',
  'APP_COOKIE',
  'FLASH_COOKIE'
]

if (process.env.NODE_ENV === 'development') {
  REQUIRED_ENV_VARS = REQUIRED_ENV_VARS.concat('WEBPACK_PORT', 'NODE_HOST')
}

if (process.env.NODE_ENV === 'production') {
  REQUIRED_ENV_VARS = REQUIRED_ENV_VARS.concat('RAVEN_URL')
}

REQUIRED_ENV_VARS.forEach((name) => {
  invariant(process.env[name], `
    Missing required process.env variable ${name},
    if you are in development mode, copy the ./.env.tmpl to
    ./.env (which isn't checked into source control)
  `)
})

process.on('unhandledRejection', (reason, p) => {
  if (process.env.NODE_ENV === 'development') {
    debugger // eslint-disable-line
  }
  log.error(reason, p)
})

require('./server').listen(process.env.PORT, () => {
  log.info(`Express server listening on port ${process.env.PORT}`)
  log.info(`Make sure the KUE app is running as well ("npm run kue" in development)`)
})
