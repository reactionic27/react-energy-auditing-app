/* eslint-env mocha */
import UUID from 'node-uuid'
import expect from 'expect'
import * as mocks from './assets/test-mocks'
import knex from '../src/init/knex-init'
import {
  block, beforeEachFn, newSession, registerNewAccount, newJob, observeBroadcast
} from './assets/test-helpers'

describe('/api/jobs/* routes', () => {

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

  block('attic', () => {
    const {uuid} = mocks.mockAtticCreate
    it('should POST: /api/jobs/:jobId/attic to create', () => {
      const payload = {...mocks.mockAtticCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/attic`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'attic/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedAttic
            },
            meta: {
              socket: true
            }
          })
          expect(res.body).toEqual({...mocks.mockInsertedAttic, job_id: jobId})
          const rows = await knex(`v5_attic`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/attic/:uuid to update', () => {
      const payload = {...mocks.mockAtticSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/attic/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'attic/save',
            payload,
            meta: { socket: true }
          })
          const rows = await knex(`v5_attic`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('dhw', () => {
    const {uuid} = mocks.mockDhwCreate
    it('should POST: /api/jobs/:jobId/dhw to create', () => {
      const payload = {...mocks.mockDhwCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/dhw`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'dhw/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedDhw
            },
            meta: SOCKET_META
          })
          const rows = await knex(`v5_dhw`).where({uuid}).select('*')
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedDhw})
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/dhw/:uuid to update', () => {
      const payload = {...mocks.mockDhwSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/dhw/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'dhw/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_dhw`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('door', () => {
    const {uuid} = mocks.mockDoorCreate
    it('should POST: /api/jobs/:jobId/door to create', () => {
      const payload = {...mocks.mockDoorCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/door`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'door/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedDoor
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedDoor})
          const rows = await knex(`v5_door`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/door/:uuid to update', () => {
      const payload = {...mocks.mockDoorSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/door/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'door/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_door`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('freezer', () => {
    const {uuid} = mocks.mockFreezerCreate
    it('should POST: /api/jobs/:jobId/freezer to create', () => {
      const payload = {...mocks.mockFreezerCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/freezer`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'freezer/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedFreezer
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedFreezer})
          const rows = await knex(`v5_freezer`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/freezer/:uuid to update', () => {
      const payload = {...mocks.mockFreezerSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/freezer/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'freezer/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_freezer`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('hvac', () => {
    const {uuid} = mocks.mockHvacCreate
    it('should POST: /api/jobs/:jobId/hvac to create', () => {
      const payload = {...mocks.mockHvacCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/hvac`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'hvac/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedHvac
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedHvac})
          const rows = await knex(`v5_hvac`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/hvac/:uuid to update', () => {
      const payload = {...mocks.mockHvacSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/hvac/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'hvac/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_hvac`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('refrigerator', () => {
    const {uuid} = mocks.mockRefrigeratorCreate
    it('should POST: /api/jobs/:jobId/refrigerator to create', () => {
      const payload = {...mocks.mockRefrigeratorCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/refrigerator`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'refrigerator/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedRefrigerator
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedRefrigerator})
          const rows = await knex(`v5_refrigerator`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/refrigerator/:uuid to update', () => {
      const payload = {...mocks.mockRefrigeratorSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/refrigerator/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'refrigerator/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_refrigerator`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('vault', () => {
    const {uuid} = mocks.mockVaultCreate
    it('should POST: /api/jobs/:jobId/vault to create', () => {
      const payload = {...mocks.mockVaultCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/vault`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'vault/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedVault
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedVault})
          const rows = await knex(`v5_vault`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/vault/:uuid to update', () => {
      const payload = {...mocks.mockVaultSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/vault/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'vault/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_vault`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('wall', () => {
    const {uuid} = mocks.mockWallCreate
    it('should POST: /api/jobs/:jobId/wall to create', () => {
      const payload = {...mocks.mockWallCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/wall`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'wall/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedWall
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedWall})
          const rows = await knex(`v5_wall`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/wall/:uuid to update', () => {
      const payload = {...mocks.mockWallSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/wall/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'wall/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_wall`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('window', () => {
    const {uuid} = mocks.mockWindowCreate
    it('should POST: /api/jobs/:jobId/window to create', () => {
      const payload = {...mocks.mockWindowCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/window`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'window/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedWindow
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedWindow})
          const rows = await knex(`v5_window`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/window/:uuid to update', () => {
      const payload = {...mocks.mockWindowSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/window/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'window/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_window`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('caz', () => {
    const {uuid} = mocks.mockCazCreate
    it('should POST: /api/jobs/:jobId/caz to create', () => {
      const payload = {...mocks.mockCazCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/caz`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'caz/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedCaz
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedCaz})
          const rows = await knex(`v5_caz`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/caz/:uuid to update', () => {
      const payload = {...mocks.mockCazSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/caz/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'caz/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_caz`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('concern', () => {
    const {uuid} = mocks.mockConcernCreate
    it('should POST: /api/jobs/:jobId/concern to create', () => {
      const payload = {...mocks.mockConcernCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/concern`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'concern/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedConcern
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedConcern})
          const rows = await knex(`v5_concern`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/concern/:uuid to update', () => {
      const payload = {...mocks.mockConcernSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/concern/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'concern/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_concern`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('job_financing', () => {
    const {uuid} = mocks.mockJobFinancingCreate
    it('should POST: /api/jobs/:jobId/job_financing to create', () => {
      const payload = {...mocks.mockJobFinancingCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/job_financing`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'job_financing/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedJobFinancing
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedJobFinancing})
          const rows = await knex(`v5_job_financing`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/job_financing/:uuid to update', () => {
      const payload = {...mocks.mockJobFinancingSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/job_financing/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'job_financing/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_job_financing`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })

    const FINANCING_REQUIRED = ['rate', 'term', 'title']
    FINANCING_REQUIRED.forEach((field) => {
      it('/create should reject missing ' + field, () => {
        const uuid = UUID.v4()
        const payload = {...mocks.mockJobFinancingCreate, job_id: jobId, uuid}
        delete payload[field]
        return request.post(`/api/jobs/${jobId}/job_financing`)
          .send(payload)
          .expect(400)
          .then(res => {
            expect(res.body).toEqual({
              data: {
                [field]: `"${field}" is required`
              },
              error: 'Bad Request',
              message: 'Validation Error',
              statusCode: 400
            })
          })
      })
    })

  })

  block('range', () => {
    const {uuid} = mocks.mockRangeCreate
    it('should POST: /api/jobs/:jobId/range to create', () => {
      const payload = {...mocks.mockRangeCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/range`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'range/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedRange
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedRange})
          const rows = await knex(`v5_range`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/range/:uuid to update', () => {
      const payload = {...mocks.mockRangeSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/range/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'range/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_range`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('oven', () => {
    const {uuid} = mocks.mockOvenCreate
    it('should POST: /api/jobs/:jobId/oven to create', () => {
      const payload = {...mocks.mockOvenCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/oven`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'oven/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedOven
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedOven})
          const rows = await knex(`v5_oven`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/oven/:uuid to update', () => {
      const payload = {...mocks.mockOvenSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/oven/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'oven/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_oven`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('clothes_dryer', () => {
    const {uuid} = mocks.mockClothesDryerCreate
    it('should POST: /api/jobs/:jobId/clothes_dryer to create', () => {
      const payload = {...mocks.mockClothesDryerCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/clothes_dryer`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'clothes_dryer/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedClothesDryer
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedClothesDryer})
          const rows = await knex(`v5_clothes_dryer`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/clothes_dryer/:uuid to update', () => {
      const payload = {...mocks.mockClothesDryerSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/clothes_dryer/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'clothes_dryer/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_clothes_dryer`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('caz_system', () => {
    const {uuid} = mocks.mockCazSystemCreate
    it('should POST: /api/jobs/:jobId/caz_system to create', () => {
      const payload = {...mocks.mockCazSystemCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/caz_system`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'caz_system/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedCazSystem
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedCazSystem})
          const rows = await knex(`v5_caz_system`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/caz_system/:uuid to update', () => {
      const payload = {...mocks.mockCazSystemSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/caz_system/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'caz_system/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_caz_system`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
  })

  block('recommendations', () => {
    const {uuid} = mocks.mockRecommendationsCreate
    it('should POST: /api/jobs/:jobId/recommendations to create', () => {
      const payload = {...mocks.mockRecommendationsCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/recommendations`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'recommendations/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedRecommendations
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedRecommendations})
          const rows = await knex(`v5_recommendations`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/recommendations/:uuid to update', () => {
      const payload = {...mocks.mockRecommendationsSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/recommendations/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'recommendations/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_recommendations`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should not be possible to create with a definition other than 19', () => {
      const payload = {...mocks.mockRecommendationsCreate, uuid: UUID.v4(), job_id: jobId, rec_definition_id: 18}
      return request.post(`/api/jobs/${jobId}/recommendations`)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Validation Error',
            data: {
              rec_definition_id: '"rec_definition_id" must be one of [19]'
            }
          })
        })
    })
  })

  block('recommendation_caption_rows', () => {
    const {uuid} = mocks.mockRecommendationCaptionRowsCreate
    it('should POST: /api/jobs/:jobId/recommendation_caption_rows to create', () => {
      const payload = {...mocks.mockRecommendationCaptionRowsCreate, job_id: jobId}
      return request.post(`/api/jobs/${jobId}/recommendation_caption_rows`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'recommendation_caption_rows/create',
            payload: {
              ...payload,
              ...mocks.mockInsertedRecommendationCaptionRows
            },
            meta: SOCKET_META
          })
          expect(res.body).toEqual({...payload, ...mocks.mockInsertedRecommendationCaptionRows})
          const rows = await knex(`v5_recommendation_caption_rows`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })
    it('should PUT: /api/jobs/:jobId/recommendation_caption_rows/:uuid to update', () => {
      const payload = {...mocks.mockRecommendationCaptionRowsSave, job_id: jobId}
      return request.put(`/api/jobs/${jobId}/recommendation_caption_rows/${uuid}`)
        .send(payload)
        .expect(200)
        .then(async (res) => {
          observeBroadcast([`job:${jobId}`], {
            type: 'recommendation_caption_rows/save',
            payload,
            meta: SOCKET_META
          })
          const rows = await knex(`v5_recommendation_caption_rows`).where({uuid}).select('*')
          expect(rows.length).toEqual(1)
          expect(rows[0].job_id).toEqual(jobId)
        })
    })

    const REQUIRED_KEYS = ['job_id', 'recommendation_uuid']

    REQUIRED_KEYS.forEach((key, i) => {
      it(`should reject missing ${key}`, () => {
        const payload = {...mocks.mockRecommendationCaptionRowsCreate, uuid: UUID.v4(), order: i + 1, job_id: jobId}
        delete payload[key]
        return request.post(`/api/jobs/${jobId}/recommendation_caption_rows`)
          .send(payload)
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({
              statusCode: 400,
              error: 'Bad Request',
              message: 'Validation Error',
              data: {
                [`${key}`]: `"${key}" is required`
              }
            })
          })
      })
    })

  })

})
