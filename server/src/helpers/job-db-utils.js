import _ from 'lodash'
import Promise from 'bluebird'
import UUID from 'node-uuid'
import type {
  uuidRemapType,
  transactionType,
  simpleCollectionType,
  simpleTableType
} from '../flowtypes/server-types'

export async function copyCollection(
  remap: uuidRemapType,
  knex: transactionType,
  fromJobId: number,
  toJobId: number,
  table: simpleCollectionType,
) {

  let rows = await knex.select('*')
    .from(table)
    .where({job_id: fromJobId})
    .whereNull('deleted_at')

  if (rows.length === 0) return

  rows = rows.map(r => {
    const uuid = remap[r.uuid] = UUID.v4()
    return {...r, uuid, job_id: toJobId}
  })

  return knex.insert(rows).into(table)
}

export async function copyJobTable(
  knex: transactionType,
  fromJobId: number,
  toJobId: number,
  table: simpleTableType
) {
  let [row] = await knex.select('*').from(table).where({job_id: fromJobId})

  if (!row) {
    throw new Error(`Unable to copy job ${fromJobId}, missing required row ${table}`)
  }

  return knex.insert({...row, job_id: toJobId}).into(table)
}

export async function copyCazSystems(
  remap: uuidRemapType,
  knex: transactionType,
  fromJobId: number,
  toJobId: number,
) {
  let rows = await knex.select('*')
    .from('v5_caz_system')
    .where('job_id', fromJobId)
    .whereNull('deleted_at')

  if (rows.length === 0) return

  rows = _.filter(_.map(rows, r => {
    const uuid = UUID.v4()
    // The uuid won't exist in the remap if it was "deleted",
    // so we need to check for both
    if (r.hvac_uuid && remap[r.hvac_uuid]) {
      return {...r, uuid, job_id: toJobId, hvac_uuid: remap[r.hvac_uuid]}
    }
    else if (r.dhw_uuid && remap[r.dhw_uuid]) {
      return {...r, uuid, job_id: toJobId, dhw_uuid: remap[r.dhw_uuid]}
    }
    else if (r.oven_uuid && remap[r.oven_uuid]) {
      return {...r, uuid, job_id: toJobId, oven_uuid: remap[r.oven_uuid]}
    }
    else if (r.range_uuid && remap[r.range_uuid]) {
      return {...r, uuid, job_id: toJobId, range_uuid: remap[r.range_uuid]}
    }
    else if (r.clothes_dryer_uuid && remap[r.clothes_dryer_uuid]) {
      return {...r, uuid, job_id: toJobId, clothes_dryer_uuid: remap[r.clothes_dryer_uuid]}
    }
  }))

  if (rows.length === 0) return

  await knex.insert(rows).into('v5_caz_system')
}

export async function copyRecs(
  remap: uuidRemapType,
  knex: transactionType,
  fromJobId: number,
  toJobId: number
) {

  let [recs, captionRows] = await Promise.all([
    await knex.select('*')
      .from('v5_recommendations')
      .where('job_id', fromJobId)
      .whereNull('deleted_at'),
    await knex.select('*')
      .from('v5_recommendation_caption_rows')
      .where('job_id', fromJobId)
      .whereNull('deleted_at')
  ])

  recs = recs.map(r => {
    const uuid = remap[r.uuid] = UUID.v4()
    return {...r, job_id: toJobId, uuid}
  })

  await knex.insert(recs).into('v5_recommendations')

  if (captionRows.length === 0) return

  captionRows = captionRows.map(cRow => {
    return {
      ...cRow,
      job_id: toJobId,
      recommendation_uuid: remap[cRow.recommendation_uuid],
      uuid: UUID.v4()
    }
  })

  return knex.insert(captionRows).into('v5_recommendation_caption_rows')
}
