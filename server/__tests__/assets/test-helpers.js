import knex from '../../src/init/knex-init'
import {makeSessionServer, validRegistration, mockCreateJob} from './test-mocks'
import {default as nock} from 'nock'
import expect from 'expect'
import { emitter } from '../../src/lib/socket-emitter'
import { resetSentEmails } from '../../src/emails/send-template'

nock.disableNetConnect();
nock.enableNetConnect('127.0.0.1') // So we can hit our own server

export { nock }

// So we can create a quick scope / visually separate tests without a describe block
export function block(ns, fn) {
  fn()
}

export { emitter }

export function beforeEachFn() {
  emitter.resetTest()
  resetSentEmails()
}

export function newSession() {
  return makeSessionServer()
}

export function registerNewAccount(session) {
  const registration = validRegistration()
  return session
    .post('/register')
    .send(registration)
    .then(async (res) => {
      let company = await knex
        .first('*')
        .from('companies')
        .where({name: registration.company_name})
      let account = await knex
        .first('*')
        .from('accounts')
        .where({email: registration.email})
      return {
        company,
        account,
        registration
      }
    })
}

export function newJob(request, payload: ?Object) {
  return request
    .post('/api/jobs')
    .send({
      ...mockCreateJob,
      ...payload
    })
    .expect(200)
    .then(res => {
      return res.body
    })
}

export function observeBroadcast(rooms, ...actions) {
  if (emitter.spy.to.length === 1) {
    expect(emitter.spy.to).toEqual([rooms])
    emitter.spy.emit.forEach((data, idx) => {
      expect(data[1]).toEqual(actions[idx])
    })
  } else {
    expect(emitter.spy.to).toEqual(rooms)
    emitter.spy.emit.forEach((data, idx) => {
      expect(data[1]).toEqual(actions[idx])
    })
  }

}
