const IS_DEV = process.env.NODE_ENV === 'development'

import _ from 'lodash'
import invariant from 'fbjs/lib/invariant'
import {emitter} from '../lib/socket-emitter'

function isValidHttpAction(actionName) {
  return Boolean(actionName)
}

export default function httpBroadcastMiddleware(req: Object, res: Object, next: Function) {

  if (req.method === 'GET' || !req.account) {
    return next()
  }

  if (IS_DEV) {
    req.originalBody = Object.freeze(Object.assign({}, req.body))
  } else {
    req.originalBody = Object.assign({}, req.body)
  }

  const uuid = req.headers['x-snugg-uuid']

  let hasBroadcasted = false

  const json = res.json
  res.json = function(obj) {
    return json.call(this, sanitize(obj))
  }

  req.emitter = emitter

  req.broadcast = function(roomOrRooms: Array | string, payload: Object, action?: string) {

    if (!roomOrRooms) {
      return
    }

    if (!Array.isArray(roomOrRooms)) {
      roomOrRooms = [roomOrRooms]
    }

    if (roomOrRooms.length === 0) {
      return
    }

    let finalAction

    if (_.isString(payload.type) && _.isObject(payload.payload)) {
      finalAction = {...payload, payload: sanitize(payload.payload)}
    } else {
      finalAction = {
        type: action || req.snuggAction,
        payload: sanitize(payload)
      }
    }

    invariant(
      isValidHttpAction(finalAction.type),
      `Third argument to broadcast or req.snuggAction must be set to broadcast, saw: %s`,
      finalAction.type
    )

    roomOrRooms.forEach(r => emitter.to(checkRoom(r)))

    hasBroadcasted = true

    emitter.emit('push', {
      ...finalAction,
      meta: {
        ...finalAction.meta,
        socket: uuid || true
      }
    })
  }

  Object.defineProperty(req, 'hasBroadcasted', {
    get() {
      return hasBroadcasted
    }
  })
  next()
}

function sanitize(obj) {
  if (obj.stripe_id) {
    obj.stripe_id = Boolean(obj.stripe_id)
  }
  if (obj.password) {
    obj.password = undefined
  }
  //Review: Need to check with Ben why created_at and updated_at are removed from response
  return obj // _.omit(obj, 'created_at', 'updated_at')
}

const validRooms = ['job', 'account', 'company']

function checkRoom(val) {
  if (IS_DEV) {
    const room = val.split(':')[0]
    invariant(
      validRooms.indexOf(room) !== -1,
      'Invalid room, expected one of %s, saw %s',
      validRooms,
      room
    )
  }
  return val
}
