import _ from 'lodash'
import Promise from 'bluebird'
import type {omContextType} from 'data/optimiser/optimiser-types'
import buildOptimiser from 'data/optimiser/build-optimiser'
import knex from '../init/knex-init'

function parseTouched(row) {
  if (Array.isArray(row)) {
    return row.map(parseTouched)
  }
  if (_.isString(row.touched_fields)) {
    row.touched_fields = JSON.parse(row.touched_fields)
  }
  return row
}

export default async function optimiserDataReader(req: Object, job_id: number): omContextType {

  const job = await knex.from('jobs').where({id: job_id, deleted_at: null}).first()

  const optimiserTables = await Promise.props({
    jobs: job,
    accounts: knex('accounts').where({id: job.account_id}).first(),
    companies: knex('companies').where({id: job.company_id}).first(),

    basedata: knex.select('*').from('v5_basedata').where({job_id}).first().then(parseTouched),

    attic: knex.select('*').from('v5_attic').where({job_id, deleted_at: null}).then(parseTouched),
    caz: knex.select('*').from('v5_caz').where({job_id, deleted_at: null}).then(parseTouched),
    concern: knex.select('*').from('v5_concern').where({job_id, deleted_at: null}).then(parseTouched),
    dhw: knex.select('*').from('v5_dhw').where({job_id, deleted_at: null}).then(parseTouched),
    door: knex.select('*').from('v5_door').where({job_id, deleted_at: null}).then(parseTouched),
    freezer: knex.select('*').from('v5_freezer').where({job_id, deleted_at: null}).then(parseTouched),
    health: knex.select('*').from('v5_health').where({job_id}).first().then(parseTouched),
    hvac: knex.select('*').from('v5_hvac').where({job_id, deleted_at: null}).then(parseTouched),
    refrigerator: knex.select('*').from('v5_refrigerator').where({job_id, deleted_at: null}).then(parseTouched),
    utilities: knex.select('*').from('v5_utilities').where({job_id}).first().then(parseTouched),
    vault: knex.select('*').from('v5_vault').where({job_id, deleted_at: null}).then(parseTouched),
    wall: knex.select('*').from('v5_wall').where({job_id, deleted_at: null}).then(parseTouched),
    window: knex.select('*').from('v5_window').where({job_id, deleted_at: null}).then(parseTouched),

    oven: knex.select('*').from('v5_oven').where({job_id, deleted_at: null}).then(parseTouched),
    range: knex.select('*').from('v5_range').where({job_id, deleted_at: null}).then(parseTouched),
    pv: knex.select('*').from('v5_pv').where({job_id, deleted_at: null}).then(parseTouched),
    clothesDryer: knex.select('*').from('v5_clothes_dryer').where({job_id, deleted_at: null}).then(parseTouched),

    recommendations: knex.select('*').from('v5_recommendations').where({job_id, deleted_at: null}),
  })

  return buildOptimiser(optimiserTables)
}
