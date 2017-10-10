require('dotenv').load()

var invariant = require('fbjs/lib/invariant')

var REQUIRED_ENV_VARS = [
  'HEROKU',
  'NODE_ENV',

  // So we can send email messages or something if OM fails
  'MAILGUN_KEY',
  'MAILGUN_PUBLIC_KEY',
  'MAILGUN_SENDER',
  'MAILGUN_DOMAIN',
  'REDISCLOUD_URL',
  'RDS_URL',
  'PORT'
]

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
  console.error(reason)
})

require('./consumer')
