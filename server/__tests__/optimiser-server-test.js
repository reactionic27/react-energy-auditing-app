/* eslint-env mocha */
import UUID from 'node-uuid'
import {nock} from './assets/test-helpers'
import expect from 'expect'
import * as mocks from './assets/test-mocks'
import knex from '../src/init/knex-init'
import {
  block, beforeEachFn, newSession, registerNewAccount, newJob, observeBroadcast
} from './assets/test-helpers'

describe('om server test', () => {
  it('valid post /api/om-model')
  // it('valid post /api/om-model', () => {
  //   const payload = {}
  //   return request
  //     .post(`/api/om-model`)
  //     .send(payload)
  //     .expect(200)
  //     .then(res => {
  //     })
  // })

  it('valid post /api/om-cancel')
  // it('valid post /api/om-cancel', () => {
  //   const payload = {}
  //   return request
  //     .post(`/api/om-cancel`)
  //     .send(payload)
  //     .expect(200)
  //     .then(res => {
  //     })
  // })
})
