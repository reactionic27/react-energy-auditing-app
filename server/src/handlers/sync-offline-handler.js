import _ from 'lodash'
import { router } from '../init/router-init'

export default async function syncOfflineHandler(req: Object, res: Object) {

  const {body: {url: finalUrl, creates, updates}} = req

  // Shorter named tables need to be inserted first, e.g. recommendations
  // before recommendation_caption_rows
  const sortedCreates = _.keys(creates).sort()
  const sortedUpdates = _.keys(updates).sort()

  const responses = {}
  const originalResponder = res.json
  const knex = req.knex

  await req.knex.transaction(async (trx) => {

    for (const key of sortedCreates) {
      for (const ident in creates[key]) {
        const create = creates[key][ident]
        await trx.transaction(async (t) => {
          req.knex = t
          req.body = create
          req.url = `/api/jobs/${create.job_id}/${_.snakeCase(key)}`
          await new Promise((resolve, reject) => {
            res.json = (data) => {
              responses[req.url] = data
              resolve()
            }
            res.render = reject
            router(req, res, reject)
          })
        })
      }
    }

    for (const key of sortedUpdates) {
      for (const ident in updates[key]) {
        const update = updates[key][ident]
        await trx.transaction(async (t) => {
          const suffix = ident === update.uuid
            ? `/${ident}`
            : ''
          req.knex = t
          req.body = update
          req.method = 'PUT'
          req.url = `/api/jobs/${update.job_id}/${_.snakeCase(key)}${suffix}`
          await new Promise((resolve, reject) => {
            res.json = (data) => {
              responses[req.url] = data
              resolve()
            }
            res.render = reject
            router(req, res, reject)
          })
        })
      }
    }

  })
  req.knex = knex
  res.json = originalResponder
  req.url = `/api${finalUrl}`
  req.method = 'GET'

  router(req, res)
}
