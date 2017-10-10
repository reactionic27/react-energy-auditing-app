import _ from 'lodash'
import knex from '../init/knex-init'
import {
  getSegment
} from './snugg-server-helpers'
const debug = require('debug')('snugg:socket')

async function getRooms(url: string) {
  let rooms = []

  if (url.startsWith('/joblist')) {
    let companyId = getSegment(url, 2)
    if (isNaN(companyId)) return getRooms
    rooms.push(`company:${companyId}`)
  }

  else if (url.startsWith('/job/')) {
    const jobId = getSegment(url, 2)
    if (isNaN(jobId)) return rooms

    rooms.push(`job:${jobId}`)

    const job = await knex.first(
      'account_id',
      'company_id'
    ).from('jobs').where({id: jobId})

    if (job) {
      if (job.account_id) {
        rooms.push(`account:${job.account_id}`)
      }
      if (job.company_id) {
        rooms.push(`company:${job.company_id}`)
      }
    }
  }
  else if (url.startsWith('/settings/company')) {
    rooms.push(`company:${getSegment(url, 2)}`)
  }

  return rooms
}


export default async function transitionRooms(socket: Object, info: Object) {
  const previousRooms = info.fromUrl ? await getRooms(info.fromUrl) : []
  const nextRooms = await getRooms(info.toUrl)

  const joining = _.without(nextRooms, ...previousRooms)
  // const leaving = _.without(previousRooms, ...nextRooms)

  if (joining.length === 0) {
    return
  }

  debug('socket %s (user %s), \n\tjoining: %s', socket.id, socket.jwt.id, joining)

  _.forEach(joining, (room) => {
    socket.join(room)
  })
  // _.forEach(leaving, (room) => {
  //   socket.leave(room)
  // })
}
