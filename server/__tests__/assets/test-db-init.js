import knex from '../../src/init/knex-init'
import { test as config } from '../../../knexfile'
import { join } from 'path'
import fs from 'fs'
import mysql from 'mysql'
import Promise from 'bluebird'

const dbName = 'snugg_v4_test'
const dbExists = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?"
const schemaSql = `use \`${dbName}\`;` +
  fs.readFileSync(join(__dirname, './test_db_base.sql'), 'utf8') +
  fs.readFileSync(join(__dirname, './test_duplicator.sql'), 'utf8')

const DB_NOT_EXIST = `Snugg Test DB does not exist.
create it with: CREATE DATABASE \`${dbName}\`;`

function err(msg) {
  return function(err) {
    console.log(err.message + '\n' + err.stack)
    process.exit(1)
  }
}

export default function testDbInit() {
  if (process.env.NODE_ENV !== 'test') {
    return Promise.reject(new Error('NODE_ENV is not test. Bailing out to avoid data loss!'))
  }

  if (config.connection.database !== `${dbName}`) {
    return Promise.reject(new Error(`database is not ${dbName}. Bailing out to avoid data loss!`))
  }

  const connection = mysql.createConnection({
    ...config.connection,
    multipleStatements: true
  })

  Promise.promisifyAll(connection)

  console.log(`Preparing ${dbName} database for unit tests`)
  return connection.connectAsync()
    .catch(err('Could not connect to test DB. Check your RDS_URL environment variable'))
    .then(() => connection.queryAsync(dbExists, [dbName]))
    .catch(err('Error checking that test DB exists'))
    .then(rows => {
      if (rows.length < 1) {
        throw new Error(DB_NOT_EXIST)
      }
      console.log('Dropping and re-creating all tables')
      return connection.queryAsync(schemaSql)
    })
    .catch(err('Error dropping and creating tables'))
    .then((result) => {
      console.log('Schema initialized successfully')
      return knex.migrate.latest()
    })
    .then(() => {
      console.log('Knex migrations run successfully')
    })
    .catch(e => {
      return knex.raw('truncate knex_migrations_lock')
        .finally(() => {
          throw e
        })
    })
}
