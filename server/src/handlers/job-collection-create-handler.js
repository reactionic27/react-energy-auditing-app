import _ from 'lodash'
import validateBody from '../helpers/validate-body'
import maybeParse from '../helpers/maybe-parse'
import maybeSerialize from '../helpers/maybe-serialize'
import authorize from '../authorizations/authorize'
import {TOUCHABLE_TABLES} from '../constants'
import {emitter} from '../lib/socket-emitter'
import uuid from 'node-uuid'

// Handles the generic "create collection" case
// when we don't have any special additional logic.
export default async function createJobCollectionHandler(req: Object, res: Object) {
  const {params: {0: jobId, 1: tableName}} = req



  // Set for req.broadcast
  req.snuggAction = `${tableName}/create`

  const body = await validateBody(req.snuggAction, req)

  if (_.includes(TOUCHABLE_TABLES, tableName)) {
    body.touched_fields = body.touched_fields || {}
  }

  await authorize('saveJobEntity', req)

  // Ensure any touched_fields are stringified before attempting to insert into the db
  maybeSerialize(body, 'touched_fields')

  const row = await req.knex.transaction(async (trx) => {

    if (tableName === 'recommendations') {
      await trx.table('v5_recommendations').increment('order').where({job_id: body.job_id})
    }

    await trx.insert(body).into(`v5_${tableName}`)

    const [insertedRow] = await trx.select('*').from(`v5_${tableName}`).where({uuid: body.uuid})
    //Review: Need to check with Ben why created_at and updated_at are removed from response
    return insertedRow //_.omit(insertedRow, 'created_at', 'updated_at')
  })

  maybeParse(row, 'touched_fields')

  // Ensure any touched_fields go back out to the client
  // in their Object form
  if (_.has(row, 'touched_fields') && row.touched_fields === null) {
    row.touched_fields = {}
  }
  const jobs = await req.knex.select('*').from('jobs').where({id: jobId})
  const job = (jobs && jobs[0]) || {}
  const {account_id, program_id, company_id} = job
  const rooms = [`job:${jobId}`]

  if (tableName === 'activity_feed') {

    const admins = await req.knex
      .select('id')
      .distinct('id')
      .from('accounts')
      .innerJoin('accounts_companies', (qb) => {
        qb.on('accounts_companies.account_id', 'accounts.id')
          .on({
            'accounts_companies.company_id': company_id,
            'accounts_companies.role': req.knex.raw('"admin"')
          }) // company admins
          .orOn({
            'accounts.program_id': program_id,
            'accounts.role': req.knex.raw('"program-admin"')
          }) // program admins
      })

    let users = [account_id]
    users = users.concat(admins.map(admin => admin.id))
    users = _.uniq(users).filter(user => user !== req.account.id)

    const newTrackingRows = users.map(account_id => {
      return {
        account_id,
        job_id: jobId,
        unread_count: 1
      }
    })

    let query = req.knex.insert(newTrackingRows).into('v5_activity_tracking').toString()
    query += ' on duplicate key update unread_count = unread_count + 1'
    await req.knex.raw(query)

    emitter
      .to(`job:${jobId}`)
      .emit('activity-feed/new', row)

    const activityTracking = await req.knex
                            .select('*')
                            .from('v5_activity_tracking')
                            .where('job_id', jobId)
                            .whereIn('account_id', users) || []
    users.forEach(userId => {
      const userActivityTracking = activityTracking.find(item => item.account_id === userId)
      emitter
        .to(`account:${userId}`)
        .emit('activity-feed/unread-flags', {...userActivityTracking, company_id})
    })

  }


  req.broadcast(rooms, row)
  res.json(row)
}
