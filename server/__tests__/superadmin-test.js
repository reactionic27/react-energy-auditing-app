/* eslint-env mocha */
import UUID from 'node-uuid'
import expect from 'expect'
import * as mocks from './assets/test-mocks'
import { newSession, registerNewAccount, newJob, observeBroadcast } from './assets/test-helpers'

describe('server action /snuggadmin/create-job-from-job', () => {

  const required = ['from_job_id', 'program_id', 'company_id', 'account_id']

  const validJobFromJob = {
    from_job_id: jobId,
    company_id: company.id,
    account_id: account.id,
    program_id: 1
  }

  let job, jobId, request, company, account

  const SOCKET_META = {socket: true}

  before(() => {
    const session = newSession()
    request = session
    return registerNewAccount(session).then(async (info) => {
      company = info.company
      account = info.account
      job = await newJob(session, {
        account_id: account.id,
        company_id: company.id
      })
      jobId = job.id
    })
  })

  required.forEach((field) => {
    it('should reject missing ' + field, () => {
      const payload = Object.assign({}, required)
      delete payload[field]
      return request
        .post('/snuggadmin/create-job-from-job')
        .send(payload)
        .expect(422)
    })
    it('should reject invalid ' + field, () => {
      const payload = Object.assign({}, required)
      payload[field] = 'not-numeric'
      return request
        .post('/snuggadmin/create-job-from-job')
        .send(payload)
        .expect(422)
    })
  })

  it('should not allow setting a program which the account does not belong to')

})
