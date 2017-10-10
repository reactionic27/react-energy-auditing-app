import {
  copyJobTable,
  copyCollection,
  copyRecs,
  copyCazSystems
} from '../helpers/job-db-utils'
import updateJobStageInternal from '../handlers/update-job-stage-internal'

import bole from 'bole'
const log = bole(__filename)

export default async function jobFromJobOrTemplate(
  source: 'job' | 'template',
  req: Object,
  fromId: number,
  insertBody: Object
) {

  const knex = req.knex

  const job = await req.knex.transaction(async (trx) => {

    req.knex = trx

    const [job_id] = await trx.insert(insertBody).into('jobs')

    await updateJobStageInternal(req, req.res, job_id, insertBody.stage_id)

    log.debug(`created job from ${source}:${fromId}… created job:${job_id}`)

    // This object gets mutated with the values of the
    // {
    //   [oldUuid] : newUuid
    // }
    // So we can properly pair the new recommendations, caz associations, etc.
    const uuidRemap = {}

    await Promise.all([
      copyJobTable(trx, fromId, job_id, 'v5_basedata'),
      copyJobTable(trx, fromId, job_id, 'v5_reports'),
      copyJobTable(trx, fromId, job_id, 'v5_health'),
      copyJobTable(trx, fromId, job_id, 'v5_utilities'),

      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_attic'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_caz'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_concern'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_dhw'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_door'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_freezer'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_hvac'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_refrigerator'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_vault'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_wall'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_window'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_clothes_dryer'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_range'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_oven'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_job_financing'),
      copyCollection(uuidRemap, trx, fromId, job_id, 'v5_pv'),
    ])

    // Totals gets its own new row, since the job isn't calculated yet
    if (source === 'job') {
      await copyJobTable(trx, fromId, job_id, 'v5_totals')
    } else {
      await trx.insert({job_id}).into('v5_totals')
    }

    // Copy all of the recommendation rows and caz systems, pairing the
    // old & new uuids
    await copyRecs(uuidRemap, trx, fromId, job_id)
    await copyCazSystems(uuidRemap, trx, fromId, job_id)

    return await trx.first('*').from('jobs').where({id: job_id})
  })

  req.knex = knex

  return job
}
