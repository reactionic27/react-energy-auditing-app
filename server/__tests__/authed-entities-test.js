/* eslint-env mocha */
import expect from 'expect'
import * as mocks from './assets/test-mocks'
import { beforeEachFn, newSession, registerNewAccount, newJob, observeBroadcast } from './assets/test-helpers'
import { PAGE_SORT, ELEMENT_SORT } from '../../modules/data/constants/constants'

const ERROR_404 = {
  data: null,
  error: "Not Found",
  message: "Not Found",
  statusCode: 404
}

function block(ns, fn) {
  fn()
}

describe('job API routes - id tables', () => {

  let job, jobId, request, company, account

  const SOCKET_META = {socket: true}

  beforeEach(beforeEachFn)

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

  block('basedata', () => {
    it('should not POST: /api/jobs/*/basedata', () => {
      return request.post(`/api/jobs/${jobId}/basedata`)
        .send({})
        .expect(404)
        .then(res => {
          observeBroadcast([])
          expect(res.body).toEqual(ERROR_404)
        })
    })
    it('should PUT: /api/jobs/*/basedata', () => {
      const body = {...mocks.mockBasedataSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/basedata`)
        .send(body)
        .expect(200)
        .then(res => {
          observeBroadcast([`job:${jobId}`], {
            type: 'basedata/save',
            payload: body,
            meta: SOCKET_META
          })
          expect(res.body).toEqual({})
        })
    })
  })
  block('health', () => {
    it('should not POST: /api/jobs/*/health', () => {
      return request.post(`/api/jobs/${jobId}/health`)
        .send({})
        .expect(404)
        .then(res => {
          observeBroadcast([])
          expect(res.body).toEqual(ERROR_404)
        })
    })
    it('should PUT: /api/jobs/*/health', () => {
      const body = {...mocks.mockHealthSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/health`)
        .send(body)
        .expect(200)
        .then(res => {
          observeBroadcast([`job:${jobId}`], {
            type: 'health/save',
            payload: body,
            meta: SOCKET_META
          })
          expect(res.body).toEqual({})
        })
    })
  })
  block('utilities', () => {
    it('should not POST: /api/jobs/*/utilities', () => {
      return request.post(`/api/jobs/${jobId}/utilities`)
        .send({})
        .expect(404)
        .then(res => {
          observeBroadcast([])
          expect(res.body).toEqual(ERROR_404)
        })
    })
    it('should PUT: /api/jobs/*/utilities', () => {
      const body = {...mocks.mockUtilitiesSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/utilities`)
        .send(body)
        .expect(200)
        .then(res => {
          observeBroadcast([`job:${jobId}`], {
            type: 'utilities/save',
            payload: body,
            meta: SOCKET_META
          })
          expect(res.body).toEqual({})
        })
    })
  })
  block('reports', () => {
    it('should not POST: /api/jobs/*/reports', () => {
      return request.post(`/api/jobs/${jobId}/reports`)
        .send({})
        .expect(404)
        .then(res => {
          observeBroadcast([])
          expect(res.body).toEqual(ERROR_404)
        })
    })
    it('should PUT: /api/jobs/*/reports', () => {
      const body = {...mocks.mockReportsSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/reports`)
        .send(body)
        .expect(200)
        .then(res => {
          observeBroadcast([`job:${jobId}`], {
            type: 'reports/save',
            payload: body,
            meta: SOCKET_META
          })
          expect(res.body).toEqual({})
        })
    })

    it('should reject invalid element_sort_order', () => {
      const payload = {
        job_id: jobId,
        ...mocks.mockReportsSave,
        element_sort_order: ELEMENT_SORT.concat('invalid_item')
      }
      return request
        .put(`/api/jobs/${jobId}/reports`)
        .send(payload)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            data: {
              element_sort_order: '"element_sort_order" must contain 4 items'
            },
            error: "Bad Request",
            message: "Validation Error",
            statusCode: 400
          })
        })
    })

    it('should reject missing element_sort_order items', () => {
      const payload = {
        job_id: jobId,
        ...mocks.mockReportsSave,
        element_sort_order: ELEMENT_SORT.slice(0, 1)
      }
      return request
        .put(`/api/jobs/${jobId}/reports`)
        .send(payload)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            data: {
              element_sort_order: '"element_sort_order" does not contain 3 required value(s)'
            },
            error: "Bad Request",
            message: "Validation Error",
            statusCode: 400
          })
        })
    })

    it('should reject invalid page_sort_order', () => {
      const payload = {
        job_id: jobId,
        ...mocks.mockReportsSave,
        page_sort_order: PAGE_SORT.concat('invalid_item')
      }
      return request
        .put(`/api/jobs/${jobId}/reports`)
        .send(payload)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            data: {
              page_sort_order: `"page_sort_order" must contain ${PAGE_SORT.length} items`
            },
            error: "Bad Request",
            message: "Validation Error",
            statusCode: 400
          })
        })
    })

    it('should reject missing page_sort_order items', () => {
      const payload = {
        job_id: jobId,
        ...mocks.mockReportsSave,
        page_sort_order: PAGE_SORT.slice(0, 3)
      }
      return request
        .put(`/api/jobs/${jobId}/reports`)
        .send(payload)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            data: {
              page_sort_order: `"page_sort_order" does not contain ${PAGE_SORT.length - 3} required value(s)`
            },
            error: "Bad Request",
            message: "Validation Error",
            statusCode: 400
          })
        })
    })

    it('should reply with pre-parsed json values', () => {
      const payload = {
        job_id: jobId,
        ...mocks.mockReportsSave,
        page_sort_order: PAGE_SORT,
        element_sort_order: ELEMENT_SORT
      }
      return request
        .put(`/api/jobs/${jobId}/reports`)
        .send(payload)
        .expect(200)
        .then(() => {
          observeBroadcast([`job:${jobId}`], {
            type: 'reports/save',
            payload: payload,
            meta: SOCKET_META
          })
        })
    })

  })

})
