const SNUGG_TEST = Symbol.for('SNUGG_TEST')
import bole from 'bole'
import fs from 'fs'
import { emitter } from '../src/lib/socket-emitter'

/* eslint-env mocha */
if (process.env.NODE_ENV !== 'test') {
  throw new Error('Script cannot run without NODE_ENV set to "test"')
}

global.SAMPLE_JOB_IDS = []

bole.output([{
  level: 'debug',
  stream: fs.createWriteStream('snugg-tests.log'),
  // stream: process.stdout
}, {
  level: 'info',
  stream: process.stdout
}, {
  level: 'error',
  stream: fs.createWriteStream('snugg-tests-error.log'),
  // stream: process.stdout
}])


import testDbInit from './assets/test-db-init'

if (!emitter[SNUGG_TEST]) {
  throw new Error('Must be using the stubbed emitter.')
}

describe('snugg-server-tests', function() {

  // this.timeout(0)

  before(function() {
    this.timeout(0)
    if (process.env.CLEAN_TESTS) {
      return testDbInit()
    } else {
      global.SAMPLE_JOB_IDS.push(41731, 41732)
    }
  })

  require('./auth-middleware-test')
  // require('./create-job-test')
  require('./authed-collection-test')
  require('./authed-entities-test')
  require('./authed-post-assorted-test')
  require('./optimiser-server-test')
  require('./emails-test')
  require('./v4-v5-migration-test')

})
