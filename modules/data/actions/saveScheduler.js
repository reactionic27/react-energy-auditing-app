import _ from 'lodash'
import { put, post, captureError } from '../../util/network'
import { offlineQueue } from './offlineQueue'

const pendingSave = new Map() // [ident] : Promise
const pendingSaveNext = new Map() // [ident] : { next }

export default async function saveScheduler(method: 'post' | 'put', url, action, ident) {

  const fetchCall = method === 'post' ? post : put

  // If there's a current "pending" save, we need to wait until that comes
  // back before we save more data on the current table.
  if (pendingSave.has(ident)) {
    pendingSaveNext.set(ident, _.merge(pendingSaveNext.get(ident || {}), {url, action}))
    return pendingSave.get(ident)
  }

  let finalResponsePayload
  let currentAction = action

  pendingSave.set(ident, fetchCall(url, currentAction.payload))

  try {

    // Call the pending save as long as there are any queued
    // for the particular resource ident.
    while (pendingSave.has(ident)) {
      const response = await pendingSave.get(ident)

      finalResponsePayload = _.merge(finalResponsePayload || {}, currentAction.payload, response)

      if (pendingSaveNext.has(ident)) {

        const {url: nextUrl, action: nextAction} = pendingSaveNext.get(ident)

        pendingSave.set(ident, put(nextUrl, nextAction.payload))

        pendingSaveNext.delete(ident)

        currentAction = nextAction

        continue;
      }

      pendingSave.delete(ident)
    }

  } catch (e) {
    if (e.online === false) {

      if (pendingSaveNext.has(ident)) {

        const {action: nextAction} = pendingSaveNext.get(ident)

        const finalAction = _.merge(currentAction, nextAction)
        pendingSaveNext.delete(ident)
        return offlineQueue(finalAction)
      }
      pendingSave.delete(ident)
      return offlineQueue(currentAction)
    }

    if (pendingSaveNext.has(ident)) {

      const {url: nextUrl, action: nextAction} = pendingSaveNext.get(ident)

      const finalAction = _.merge(currentAction, nextAction)
      captureError(e, {...finalAction, unsaved: true})
      pendingSave.delete(ident)
      saveScheduler(method, nextUrl, nextAction, ident)
    } else {
      pendingSave.delete(ident)
      captureError(e, {...currentAction, unsaved: true})
    }
    throw e
  }
  return _.merge(action, {
    payload: finalResponsePayload,
    meta: {color: 'green'}
  })

}
