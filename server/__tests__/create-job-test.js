/* eslint-env mocha */
import expect from 'expect'
import * as mocks from './assets/test-mocks'
import { newSession, registerNewAccount, newJob, observeBroadcast } from './assets/test-helpers'

describe('creating jobs', () => {

  let request, company, account

  const SOCKET_META = {socket: true}

  before(() => {
    const session = newSession()
    request = session
    return registerNewAccount(session).then(async (info) => {
      company = info.company
      account = info.account
    })
  })

  it('should create a valid job', () => {
    const payload = {
      ...mocks.mockCreateJob,
      account_id: account.id,
      company_id: company.id
    }
    return request.post('/api')
      .send(payload)
      .expect(200)
      .then(res => {
        observeBroadcast(
          [
            `job:${res.body.id}`,
            `account:${account.id}`,
            `company:${company.id}`
          ],
          {
            type: 'job/create',
            payload,
            meta: SOCKET_META
          }
        )
        expect(res.body).toEqual(payload)
      })
  })

  it('rejects an incorrect first_name type', () => {
    const body = {
      ...mocks.mockCreateJob,
      account_id: account.id,
      company_id: company.id
    }
    body.first_name = false
    return request.post('/api')
      .send(body)
      .expect(400)
      .then(res => {
        expect(res.body).toEqual({})
      })
  })

  var validServiceTimes = [null, '', new Date().toISOString()]
  validServiceTimes.forEach((time) => {
    it('should allow service_time ' + time, () => {
      const payload = {
        ...mocks.mockCreateJob,
        account_id: account.id,
        company_id: company.id
      }
      payload.service_time = time
      return request
        .post('/api/job')
        .send(payload)
        .expect(200)
        .then(res => {
          expect(res.body).toEqual(payload)
        })
    })
  })

  describe('job from template', () => {

    const required = ['from_template_id', 'account_id', 'program_id', 'company_id']
    required.forEach((field) => {
      it('should reject missing ' + field, () => {
        const form = test.validCreateJobFromTemplate(
          job.id,
          account.id,
          company.id
        )
        delete form.payload[field]
        return request.post('/api/job')
          .send(form)
          .expect(400)
      })
    })

    it('should use null default values (not from template)', () => {
      const payload = {
        first_name: null,
        last_name: null,
        home_phone: null,
        address_1: null,
        address_2: null,
        city: null,
        state: null,
        zip: '11111',
        email: null,
        renter_owner: null,
        service_time: null,
        program_id: 1,
        stage_id: 8,
      }
      return request.post('/api/job')
        .send(body)
        .expect(200)
        .then(res => {
          expect(res.body).toEqual({
            ...payload,
            created_by_account_id: account.id,
            created_by_program_id: 1,
            created_by_company_id: company.id
          })
        })
    })

    it('should use provided values (not from template)', () => {
      let body = test.validCreateJobFromTemplate(job.id, account.id, company.id)
      let payload = body.payload
      return request.post('/api/job')
        .send(body)
        .expect(200)
        .then(res => {
          const template = job
          const newJob = res.body
          expect(newJob.id, 'id').to.be.a.number()
          expect(newJob.id, 'id').not.to.equal(template.id)
          expect(newJob.program_id, 'program_id').to.equal(payload.program_id)
          expect(newJob.created_by_program_id, 'created_by_program_id').to.equal(template.created_by_program_id)
          expect(newJob.account_id, 'account_id').to.equal(payload.account_id)
          expect(newJob.company_id, 'company_id').to.equal(payload.company_id)
          expect(newJob.created_by_company_id, 'created_by_company_id').to.equal(template.created_by_company_id)
          expect(newJob.first_name, 'first_name').to.equal(payload.first_name)
          expect(newJob.last_name, 'last_name').to.equal(payload.last_name)
          expect(newJob.home_phone, 'home_phone').to.equal(payload.home_phone)
          expect(newJob.address_1, 'address_1').to.equal(payload.address_1)
          expect(newJob.address_2, 'address_2').to.equal(payload.address_2)
          expect(newJob.city, 'city').to.equal(payload.city)
          expect(newJob.state, 'state').to.equal(payload.state)
          expect(newJob.zip, 'zip').to.equal(payload.zip)
          expect(newJob.email, 'email').to.equal(payload.email)
          expect(newJob.renter_owner, 'renter_owner').to.equal(payload.renter_owner)
          expect(newJob.service_time, 'service_time').to.be.a.string()
          expect(moment(newJob.service_time).year()).to.equal(2015)
        })
    })
  })

  describe('create template', () => {

    it('should create a company template', () => {
      const createTmpl = test.validCreateTemplateJob(null, company.id)
      const payload = createTmpl.payload
      return request.post('/api')
        .send(createTmpl)
        .expect(200)
        .then(res => {
          const newTmplJob = res.body
          expect(newTmplJob.is_template, 'is_template').to.equal(1)
          expect(newTmplJob.program_id, 'program_id').to.equal(null)
          expect(newTmplJob.company_id, 'company_id').to.equal(company.id)
          expect(newTmplJob.account_id, 'account_id').to.equal(null)
          expect(newTmplJob.created_by_program_id, 'created_by_program_id').to.equal(null)
          expect(newTmplJob.created_by_company_id, 'created_by_company_id').to.equal(payload.company_id)
          expect(newTmplJob.created_by_account_id, 'created_by_account_id').to.equal(null)
          expect(newTmplJob.creator_account_id, 'creator_account_id').to.equal(account.id)
        })
    })

    it('should create an account template', () => {
      const createTmpl = test.validCreateTemplateJob(account.id, null)
      const payload = createTmpl.payload
      return request.post('/api')
        .send(createTmpl)
        .expect(200)
        .then(res => {
          const newTmplJob = res.body
          expect(newTmplJob.id).to.be.a.number()
          expect(newTmplJob.is_template).to.equal(1)
          expect(newTmplJob.program_id).to.equal(null)
          expect(newTmplJob.company_id).to.equal(null)
          expect(newTmplJob.account_id).to.equal(account.id)
          expect(newTmplJob.created_by_program_id, 'created_by_program_id').to.equal(null)
          expect(newTmplJob.created_by_company_id, 'created_by_company_id').to.equal(null)
          expect(newTmplJob.created_by_account_id, 'created_by_account_id').to.equal(payload.account_id)
          expect(newTmplJob.creator_account_id, 'creator_account_id').to.equal(account.id)
        })
    })

  })

})
