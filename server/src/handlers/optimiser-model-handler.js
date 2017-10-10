import {queue} from '../init/kue-init'
import _ from 'lodash'
import * as OM_CONSTANTS from '../om/optimiser/optimiser-constants'
import type {omContextType} from 'data/optimiser/optimiser-types'
const {API_KEYS, VARS} = OM_CONSTANTS
import optimiserDataReader from '../readers/optimiserDataReader'

export default async function modelOptimiser(req: Object, res: Object) {

  const {body: {job_id}} = req

  let [{is_calculating}] = await req.knex.select('is_calculating').from('jobs').where({id: job_id})

  if (is_calculating) {
    throw new Error(`Unable to model job ${job_id}, it is already modeling.`)
  }

  const omData: omContextType = await optimiserDataReader(req, job_id)

  const {errors, values, returning, returningInto} = omData

  if (errors.some(err => err.type !== 'warning')) {
    throw new Error('Error Modeling: ' + JSON.stringify(errors))
  }

  const formData = {
    action: 'senddata',
    ...API_KEYS,
    ...values,
    varlist: _(VARS).concat(returning).uniq().filter().join(',')
  }

  res.json(await new Promise((resolve: Function, reject: Function) => {
    let kueJob = queue.create('ping_optimiser', {
      job_id,
      formData,
      returningInto,
    })
    .delay(5000)
    .backoff(function(attempts) {
      if (attempts < 10) {
        return (10 - attempts) * 1000
      }
      return 5000;
    })
    .attempts(Infinity)
    .save(err => {
      if (err) {
        return reject(err)
      }
      // Let other jobs know this job is modeling.
      req.snuggAction = 'om/model'
      req.broadcast(`job:${job_id}`, {job_id, is_calculating: kueJob.id})

      req.knex('jobs').update({is_calculating: kueJob.id})
        .where({id: job_id})
        .then(() => resolve({job_id, is_calculating: kueJob.id}))
    })
  }))
}
