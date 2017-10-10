const dotenv = require('dotenv')
const url = require('url')
const fs = require('fs')

var Promise = require('bluebird')

if (process.env.NODE_ENV === 'test') {
  dotenv.config({path: '.env.test'})
} else {
  dotenv.load()
}

function afterCreate(connection, cb) {
  Promise.promisifyAll(connection)
  Promise.all([
    connection.queryAsync(`SET sql_mode = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION'`),
    connection.queryAsync(`SET collation_database = 'utf8_general_ci'`),
    connection.queryAsync(`SET character_set_database = 'utf8'`),
  ]).asCallback(cb)
}

const PARSED = url.parse(process.env.RDS_URL)
const [USER, PASSWORD] = PARSED.auth.split(':')

const connection = {
  user: USER,
  password: PASSWORD,
  host: PARSED.host,
  database: PARSED.pathname.slice(1),
  timezone: 'Z'
}

if (/amazonaws/.test(PARSED.host)) {
  connection.ssl = {
    ca: fs.readFileSync('./server/amazon-rds-ca-cert.pem')
  }
}

module.exports = {

  test: {
    client: 'mysql',
    connection,
    debug: false,
    migrations: {
      tableName: 'knex_migrations'
    },
    pool: {
      min: 0,
      max: 5,
      afterCreate: afterCreate
    }
  },

  development: {
    client: 'mysql',
    connection,
    debug: false,
    pool: {
      min: 0,
      max: 5,
      afterCreate: afterCreate
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection,
    pool: {
      min: 2,
      max: 5,
      afterCreate: afterCreate
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection,
    pool: {
      min: 2,
      max: 20,
      afterCreate: afterCreate
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
