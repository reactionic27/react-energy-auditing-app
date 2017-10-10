import _ from 'lodash'
import {
  BASE_TABLES,
  JOB_COLLECTION_TABLES,
  JOB_ENTITY_TABLES
} from '../constants/constants'
import {post, get, captureError} from '../../util/network'
import {updateSnugg} from './actions'
import transitReader from '../../util/transitReader'
import bulkUpdate from '../../util/bulkUpdate'

let creates = {}
let updates = {}
let localstorageNS

export function initOfflineSupport(store) {
  const USER_ID = store.getState().localState.get('loggedInUserId')
  try {
    localstorageNS = `snuggoffline:${USER_ID}`
    const offlineData = window.localStorage.getItem(localstorageNS)
    if (offlineData) {
      flushOfflineQueue(store)
    }
  } catch (e) {}
}

export function offlineQueue(action) {

  const [stateKey, type] = action.type.split('/')

  let ident

  if (_.includes(BASE_TABLES, stateKey)) {
    const e = new Error('Cannot perform this action while offline')
    e.online = false
    throw e
  }
  else if (_.includes(JOB_COLLECTION_TABLES, stateKey)) {
    ident = action.payload.uuid
  }
  else if (_.includes(JOB_ENTITY_TABLES, stateKey)) {
    ident = action.payload.job_id
  }
  else {
    console.error(new Error(`Missing type ${stateKey}`))
    return
  }

  if (type === 'create' || _.get(creates, [stateKey, ident])) {
    _.merge(creates, {[stateKey]: {[ident]: action.payload}})
  } else {
    _.merge(updates, {[stateKey]: {[ident]: action.payload}})
  }

  get(`/ping?ts=${new Date().valueOf()}`)

  try {
    const offlineData = window.localStorage.getItem(localstorageNS)
    if (offlineData) {
      const data = JSON.parse(offlineData)
      creates = _.merge(data.creates, creates)
      updates = _.merge(data.updates, updates)
    }
    window.localStorage.setItem(localstorageNS, JSON.stringify({creates, updates}))
  } catch (e) {}
}

export async function flushOfflineQueue({dispatch, getState}) {
  return dispatch(async () => {
    const offlineData = window.localStorage.getItem(localstorageNS)
    window.localStorage.removeItem(localstorageNS)
    creates = {}
    updates = {}
    if (offlineData) {
      dispatch({type: 'spinner/show'})
      try {
        const {data} = await post('/api/sync-offline', {
          url: window.location.pathname,
          ...JSON.parse(offlineData)
        })
        dispatch(updateSnugg(snugg => bulkUpdate(snugg, transitReader(data))))
      } catch (e) {
        captureError(e)
        throw e
      } finally {
        dispatch({type: 'spinner/hide'})
      }
    } else {
      const {data} = await get(`/api${window.location.pathname}`)
      dispatch(updateSnugg(snugg => bulkUpdate(snugg, transitReader(data))))
    }
  })
}

// This is so when we edit this file it doesn't break everything
if (module.hot) {
  module.hot.decline()
}
