/* eslint-env mocha */
import _ from 'lodash'
import UUID from 'node-uuid'
import '../src/init/bluebird-init'
import bcrypt from 'bcrypt-nodejs'
import {nock} from './assets/test-helpers'
import expect from 'expect'
import * as mocks from './assets/test-mocks'
import knex from '../src/init/knex-init'
import {
  block, beforeEachFn, emitter, newSession, registerNewAccount, newJob, observeBroadcast
} from './assets/test-helpers'

let fixtures
let stripeToken

describe('assorted post requests', () => {

  let job, jobId, accountId, companyId, request, company, account

  const SOCKET_META = {socket: true}

  beforeEach(beforeEachFn)

  before(() => {
    const session = newSession()
    request = session
    return registerNewAccount(session).then(async (info) => {
      company = info.company
      companyId = company.id
      account = info.account
      accountId = account.id
      job = await newJob(session, {
        account_id: account.id,
        company_id: company.id
      })
      jobId = job.id
    })
  })

  it('valid post /api/companies', () => {
    const payload = {
      name: 'Some New Company'
    }
    return request
      .post(`/api/companies`)
      .send(payload)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          "address_1": null,
          "address_2": null,
          "adgroup": null,
          "cached_stripe_exp": null,
          "cached_stripe_last4": null,
          "card_declined": 0,
          "card_name": null,
          "city": null,
          "company_photo_name": null,
          "company_photo_url": null,
          "company_photo_uuid": null,
          "deleted_at": null,
          "demo_company": 0,
          "disabled": 0,
          "hours_of_operation": null,
          "id": res.body.id,
          "name": "Some New Company",
          "notes": null,
          "offer": null,
          "phone": null,
          "pricing_plan": null,
          "source": null,
          "state": null,
          "stripe_id": null,
          "website": null,
          "zip": null,
        })
      })
  })

  block('invitations', () => {
    let invitation
    const required = ['company_id', 'email']
    required.forEach((field) => {
      const payload = {
        ...mocks.mockCreateInvitation
      }
      it('POST: /api/invitations should reject missing ' + field, () => {
        delete payload[field]
        return request
          .post('/api/invitations')
          .send(payload)
          .expect(400)
          .then(res => {
            expect(res.body).toEqual({
              "data": {
                [field]: `"${field}" is required`
              },
              "error": "Bad Request",
              "message": "Validation Error",
              "statusCode": 400
            })
          })
      })
    })

    function randomEmail() {
      return `${UUID.v4()}@example.com`
    }

    it('/api/invitations rejects existing email', () => {
      const payload = {
        email: account.email,
        company_id: companyId
      }
      return request
        .post(`/api/invitations`)
        .send(payload)
        .expect(400)
    })

    it('valid POST: /api/invitations', () => {
      const email = randomEmail()
      const payload = {
        email,
        company_id: companyId,
        role: 'user'
      }
      return request
        .post(`/api/invitations`)
        .send(payload)
        .expect(200)
        .then(res => {
          invitation = res.body
          observeBroadcast([`company:${companyId}`], {
            type: 'invitations/create',
            payload: res.body,
            meta: SOCKET_META
          })
          expect(res.body).toInclude({
            account_id: null,
            company_id: companyId,
            deleted_at: null,
            email,
            id: res.body.id,
            role: "user",
            status: "sent",
            title: null,
            uuid: res.body.uuid
          })
        })
    })


    it('valid POST: /api/invitations (admin)', () => {
      const email = randomEmail()
      const payload = {
        email,
        company_id: companyId,
        role: 'admin'
      }
      return request
        .post(`/api/invitations`)
        .send(payload)
        .expect(200)
        .then(res => {
          invitation = res.body
          observeBroadcast([`company:${companyId}`], {
            type: 'invitations/create',
            payload: res.body,
            meta: SOCKET_META
          })
          expect(res.body).toInclude({
            account_id: null,
            company_id: companyId,
            deleted_at: null,
            email,
            id: res.body.id,
            role: "admin",
            status: "sent",
            title: null,
            uuid: res.body.uuid
          })
        })
    })

    it('valid PUT: /api/invitations/:inviteId', () => {
      const payload = {
        id: invitation.id
      }
      return request
        .put(`/api/invitations/${payload.id}`)
        .send(payload)
        .expect(200)
        .then(res => {
          observeBroadcast([`company:${companyId}`], {
            type: 'invitations/save',
            payload,
            meta: SOCKET_META
          })
        })
    })
  })

  it('valid post /api/swap-order for recommendations', async () => {
    const [rec_a, rec_b] = await knex.select('*').from('v5_recommendations').where({job_id: job.id})
    const payload = {
      job_id: job.id,
      uuid_a: rec_a.uuid,
      uuid_b: rec_b.uuid,
      table: 'recommendations'
    }
    return request
      .post(`/api/swap-order`)
      .send(payload)
      .expect(200)
      .then(async (res) => {
        const newRows = _.keyBy(await knex.select('uuid', 'order').from('v5_recommendations').whereIn('uuid', [rec_a.uuid, rec_b.uuid]), 'uuid')
        expect(newRows[rec_a.uuid].order).toEqual(rec_b.order)
        expect(newRows[rec_b.uuid].order).toEqual(rec_a.order)
        observeBroadcast([`job:${job.id}`], {
          type: 'swap-order',
          payload,
          meta: SOCKET_META
        })
      })
  })

  it('valid post /api/companies/:companyId/update-jobs-stages', async function() {
    this.timeout(0)
    const [one, two, three] = await Promise.all([
      newJob(request, {account_id: accountId, company_id: companyId, stage_id: 1}),
      newJob(request, {account_id: accountId, company_id: companyId, stage_id: 1}),
      newJob(request, {account_id: accountId, company_id: companyId, stage_id: 1}),
    ])
    emitter.resetTest()
    const payload = {
      stage_id: 3,
      company_id: company.id,
      job_ids: [one.id, two.id, three.id]
    }
    return request
      .post(`/api/companies/${companyId}/update-jobs-stages`)
      .send(payload)
      .expect(200)
      .then(async (res) => {
        observeBroadcast([
          [`job:${one.id}`],
          [`job:${two.id}`],
          [`job:${three.id}`],
          [`company:${companyId}`]],
          {type: "jobs/save", payload: {id: one.id, stage_id: 3}, meta: SOCKET_META},
          {type: "jobs/save", payload: {id: two.id, stage_id: 3}, meta: SOCKET_META},
          {type: "jobs/save", payload: {id: three.id, stage_id: 3}, meta: SOCKET_META},
          {type: "refresh-stages", payload: {company_id: companyId}, meta: SOCKET_META},
        )
        const jobs = await knex.select('*').from('jobs').whereIn('id', [one.id, two.id, three.id])
        _.forEach(jobs, job => {
          expect(job.stage_id).toEqual(3)
        })
      })
  })

  it('valid post /api/accounts/:accountId/update-password', () => {
    const payload = {
      password: 'abc',
      password_confirm: 'abc',
    }
    return request
      .post(`/api/accounts/${accountId}/update-password`)
      .send(payload)
      .expect(200)
      .then(async (res) => {
        const {password: hash} = await knex.first('password').from('accounts').where('id', accountId)
        expect(await bcrypt.compareAsync('abc', hash)).toEqual(true)
      })
  })

  it.skip('valid post /api/companies/:companyId/update-billing', () => {
    const payload = {}
    return request
      .post(`/api/companies/${companyId}/update-billing`)
      .send(payload)
      .expect(200)
      .then(res => {})
  })

  block('POST: /api/financing_templates', () => {

    let accountTemplateRow, companyTemplateRow

    const required = ['rate', 'term', 'title']
    required.forEach((field) => {
      it('should reject missing ' + field, () => {
        const form = {
          ...mocks.mockTemplateFinancingCreate,
          type: 'company',
          company_id: companyId
        }
        delete form[field]
        return request.post('/api/financing_templates')
          .send(form)
          .expect(400)
      })
    })

    it('should create a valid financing template for account', () => {
      const form = {
        ...mocks.mockTemplateFinancingCreate,
        type: 'account',
        account_id: accountId
      }
      return request
        .post('/api/financing_templates')
        .send(form)
        .expect(200)
        .then(res => {
          const expected = {
            ...form,
            company_id: null,
            deleted_at: null,
            id: res.body.id,
            program_id: null,
          }
          accountTemplateRow = res.body
          expect(res.body).toEqual(expected)
          observeBroadcast([`account:${accountId}`], {
            type: 'financingTemplates/create',
            payload: expected,
            meta: SOCKET_META
          })
        })
    })

    it('should create a valid financing template for company', () => {
      const form = {
        ...mocks.mockTemplateFinancingCreate,
        type: 'company',
        company_id: companyId
      }
      return request.post('/api/financing_templates')
        .send(form)
        .expect(200)
        .then(res => {
          const expected = {
            ...form,
            account_id: null,
            deleted_at: null,
            id: res.body.id,
            program_id: null,
          }
          companyTemplateRow = res.body
          expect(res.body).toEqual(expected)
          observeBroadcast([`company:${companyId}`], {
            type: 'financingTemplates/create',
            payload: expected,
            meta: SOCKET_META
          })
        })
    })

    it('should update a valid company financing template', () => {
      const payload = {
        id: companyTemplateRow.id,
        type: 'company',
        company_id: companyId,
        min_cash_down: 42
      }
      return request
        .put(`/api/financing_templates/${companyTemplateRow.id}`)
        .send(payload)
        .expect(200)
        .then(res => {
          observeBroadcast([`company:${companyId}`], {
            type: 'financingTemplates/save',
            payload: {
              ...payload,
              account_id: null
            },
            meta: SOCKET_META
          })
        })
    })

    it('should update a valid account financing template', () => {
      const payload = {
        id: accountTemplateRow.id,
        type: 'account',
        account_id: accountId,
        min_cash_down: 42
      }
      return request
        .put(`/api/financing_templates/${accountTemplateRow.id}`)
        .send(payload)
        .expect(200)
        .then(res => {
          observeBroadcast([`account:${accountId}`], {
            type: 'financingTemplates/save',
            payload: {
              ...payload,
              company_id: null
            },
            meta: SOCKET_META
          })
        })
    })

    it('should fail with both an account/company id', () => {
      return request
        .put(`/api/financing_templates/${companyTemplateRow.id}`)
        .send({
          id: companyTemplateRow.id,
          type: 'account',
          account_id: accountId,
          company_id: companyId,
        })
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            error: 'Bad Request',
            message: 'Validation Error',
            statusCode: 400,
            data: {
              value: "\"value\" contains a conflict between exclusive peers [company_id, account_id]"
            },
          })
        })
    })

    it('should fail with both an account/company id', () => {
      return request
        .put(`/api/financing_templates/${accountTemplateRow.id}`)
        .send({
          id: accountTemplateRow.id,
          type: 'company',
          account_id: accountId,
          company_id: companyId,
        })
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            error: 'Bad Request',
            message: 'Validation Error',
            statusCode: 400,
            data: {
              value: "\"value\" contains a conflict between exclusive peers [company_id, account_id]"
            },
          })
        })
    })

  })

  block('/api/companies/:companyId/update-billing', () => {

    const required = ['company_id', 'token', 'card_name']
    required.forEach((field) => {
      it.skip('should reject missing ' + field, () => {
        const form = {
          ...mocks.mockUpdateBilling,
          company_id: companyId
        }
        delete form.payload[field]
        return fixtures.request.post(`/api/companies/${companyId}/update-billing`)
          .send(form)
          .expect(400)
      })
    })

    it.skip('should create a valid card', () => {
      const stripe = nock('https://api.stripe.com')
        .post('/v1/customers')
        .reply(200, {
          active_card: {
            last4: '1881',
            exp_month: 12,
            exp_year: 2020
          },
          id: 42
        })
      let card = {
        ...mocks.mockUpdateBilling,
        company_id: companyId
      }
      return fixtures.request.post(`/api/companies/${companyId}/update-billing`)
        .send(card)
        .expect(200)
        .then(res => {
          stripe.done() // Ensure nock intercepted the request
          expect(res.body.id).to.be.a.number()
          expect(res.body.cached_stripe_last4).to.equal('1881')
        })
    })

    it.skip('should handle a stripe error, pass status code', () => {
      nock('https://api.stripe.com')
        .post('/v1/customers/42')
        .reply(402, {
          type: 'card_error',
          message: 'your card is expired',
          code: 42
        })
      let card = {
        ...mocks.mockUpdateBilling,
        company_id: companyId
      }
      return fixtures.request.post(`/api/companies/${companyId}/update-billing`)
        .send(card)
        .expect(402)
        .then(res => {
          expect(res.body.message).to.equal('your card is expired')
        })
    })
  })

})
