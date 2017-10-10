/**
 * Centralized logic for all network activity
 */
import 'whatwg-fetch'
import _ from 'lodash'
import UUID from 'node-uuid'
import transitReader from './transitReader'
import { successAction, warningAction, errorAction, alertAction, maybeAddCreatedJob, dispatchSave, updateSnugg, dispatchLocal} from '../data/actions/actions'
import bulkUpdate from './bulkUpdate'
import {fromJS, Map as IMap} from 'immutable'
import io from './socketInit'
import {flushOfflineQueue} from '../data/actions/offlineQueue'
import 'offline-js'

export const SOCKET_HEADERS_UUID = UUID.v4()

let IS_ONLINE = true

io.on('connect', () => {
  markOnline()
  io.emit('transition-rooms', {
    toUrl: window.location.pathname
  })
})

// Notify the user by comparing the build ID of the server with the client.
io.on('newBuild', (data) => {
  if (data && data.buildId) {
    if (document.getElementById('buildId') && document.getElementById('buildId').content) {
      if (data.buildId !== document.getElementById('buildId').content) {
        successErrorObj = reduxStore.dispatch(successAction({
          title: "It's time for a refresh.",
          message: "We updated Snugg Pro since you last loaded the app in this browser window. Please refresh the page from a stable internet connection to get the latest changes. You will not lose any data in the process.",
          timeout: null,
          actionLabel: `Refresh page`,
          action: function() {
            location.reload()
          }
        }))
      }
    }} else {
    console.log("Server build ID not available to match against client")
  }
})


io.on('push', (action) => {
  action = transitReader(action).toJS()
  if (action.meta.socket !== SOCKET_HEADERS_UUID) {
    action = _.merge(action, {meta: {
      color: '#FFA500'
    }})
    if (action.type === 'jobs/create') {
      action = maybeAddCreatedJob(action)
    }
    reduxStore.dispatch(action)
  }
})

io.on('om/complete', data => {
  reduxStore.dispatch({type: 'om/complete', payload: transitReader(data.transitData)})
  reduxStore.dispatch(alertAction({
    title: `Modeling complete for ${data.job_id}`,
    message: 'Your job has been updated with any modeled values.',
    timeout: null,
    theme: 'success'
  }))
  reduxStore.dispatch(dispatchSave('jobs', {id: data.job_id, has_unmodeled_changes: 0}))
})

io.on('activity-feed/new', data => {
  reduxStore.dispatch(updateSnugg(snugg => bulkUpdate(snugg, fromJS({
    activityFeed: {[data.uuid]: data}
  }))))
})

io.on('job-stage-history', data => {
  const stateHistory = data.reduce((acc, h) => {
    acc[h.id] = h
    return acc
  }, {})

  reduxStore.dispatch(updateSnugg(snugg => bulkUpdate(snugg, fromJS({
    jobStageHistory: stateHistory
  }))))
})

io.on('activity-feed/unread-flags', data => {
  reduxStore.dispatch(updateSnugg(snugg => {
    const index = snugg.get('activityTracking').findIndex(item => item.get('account_id') === data.account_id &&
                                                           item.get('job_id') === data.job_id)
    if (index !== -1) {
      return snugg.setIn(['activityTracking', index], IMap(data))
    } else {
      return snugg.set('activityTracking', snugg.get('activityTracking').push(IMap(data)))
    }
  }))
})

io.on('account/maybe-logout', async () => {
  try {
    await get(`/api/check-token?ts=${new Date().valueOf()}`, {})
  } catch (e) {
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
})

io.on('csvgenerate/complete', async ({url}) => {
  reduxStore.dispatch({
    type: 'setCsvDownloadUrl',
    payload: {
      url
    }
  })
  reduxStore.dispatch(successAction({
    message: 'Your CSV is ready for download. The link will expire one hour after this message appears.',
    actionLabel: 'Download CSV',
    hideOnNavigate: false,
    timeout: (1000 * 10 * 60 * 60), // closes in 1 hour
    action: function() {
      window.open(url, '_blank')
    }
  }))
})

let reduxStore
let offlineErrorObj
let successErrorObj
let warningNoticeObj

type alertType = {
  message: string
};

// Dispatch or update the existing offline error,
// when we try to perform a forbidden error while offline.
// Cleared once the app comes back online.
export function offlineError(payload: string | alertType) {
  if (_.isString(payload)) {
    payload = {message: payload}
  }
  if (!offlineErrorObj) {
    offlineErrorObj = errorAction({
      title: 'Offline',
      timeout: 8000,
      ...payload,
      onRemove() {
        if (_.isFunction(payload.onRemove)) {
          payload.onRemove()
        }
        offlineErrorObj = null
      },
    })
    reduxStore.dispatch(offlineErrorObj)
    return
  }
  offlineErrorObj.update && offlineErrorObj.update({timeout: 8000, ...payload})
}

// Pass the store in so we can dispatch actions later.
export function initializeHttpStore(store) {
  reduxStore = store
  return store
}

// Old way of detecting online/offline with put/get requests to server
export function isOnline() {
  return IS_ONLINE
}
// Async way of detecting online/offline using Hubspot offline.js
export function asyncIsOnline() {
  return window.Offline.state === 'up'
}

window.Offline.on('up', function() {
  markOnline()
})

// When we navigate, transition the rooms
// we're listening on in socket.io
export function navigate(nextPath: string, fromPath: string) {
  return get(`/api${nextPath}`)
    .then(resp => {
      io.emit('transition-rooms', {
        fromUrl: fromPath,
        toUrl: nextPath
      })
      return resp
    })
}

export function get(endpoint: string) {
  return fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'X-Snugg-UUID': SOCKET_HEADERS_UUID,
      'X-Socket-Id': io.id
    },
    credentials: 'same-origin'
  })
  .catch(catchError)
  .then(parseFetchJSON)
  .catch(catchAndRethrow)
}

export function put(endpoint: string, body: ?Object | ?Array) {
  body = body ? { body: JSON.stringify(body) } : {}
  return fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Snugg-UUID': SOCKET_HEADERS_UUID,
      'X-Socket-Id': io.id
    },
    credentials: 'same-origin',
    ...body
  })
  .catch(catchError)
  .then(parseFetchJSON)
  .catch(catchAndRethrow)
}

export function post(endpoint: string, body: ?Object | ?Array) {
  body = body ? { body: JSON.stringify(body) } : {}
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Snugg-UUID': SOCKET_HEADERS_UUID,
      'X-Socket-Id': io.id
    },
    credentials: 'same-origin',
    ...body
  })
  .catch(catchError)
  .then(parseFetchJSON)
  .catch(catchAndRethrow)
}

export function captureError(err, data) {
  if (!(err instanceof Error)) {
    return Raven.captureMessage(err)
  }
  if (!data) {
    return Raven.captureException(err)
  }
  return Raven.captureException(err, {extra: data})
}

function catchAndRethrow(err) {
  if (err.online === false) {
    markOffline(err)
  } else {
    markOnline()
  }
  throw err
}

function catchError(e) {
  const err = new Error(e.message)
  err.status = 500
  err.online = false
  throw err
}

async function parseFetchJSON(response: Object) {
  if (response.ok) {
    markOnline()
    return response.text().then(text => text ? JSON.parse(text) : {})
  }
  let json
  try {
    json = await response.json()
  } catch (e) {}
  var error = new Error(response.statusText)
  error.response = response
  error.status = response.status
  error.json = json
  if (error.status >= 500) {
    error.online = false
  }
  throw error
}

function markOnline() {
  if (IS_ONLINE === false) {
    IS_ONLINE = true
    showOnlineNotice()
  }
}
function markOffline(err) {
  if (IS_ONLINE === true) {
    IS_ONLINE = false
    showOfflineNotice(err)
  }
}

async function showOnlineNotice() {
  if (warningNoticeObj) warningNoticeObj.remove()
  if (offlineErrorObj) offlineErrorObj.remove()

  await flushOfflineQueue(reduxStore)

  successErrorObj = reduxStore.dispatch(successAction({
    title: 'Application Online',
    message: `<strong>Application Online: </strong>Your data is now in sync with the server`,
    timeout: 8000,
    onRemove() {
      successErrorObj = null
    }
  }))
}

function showOfflineNotice(err) {
  if (successErrorObj) {
    successErrorObj.remove()
  }
  const errTitle = err.status > 500
    ? 'Server'
    : 'Application'
  const addtlInfo = err.status > 500
    ? 'Looks like there is a problem on our end that we need to fix. '
    : ''
  if (!warningNoticeObj) {
    warningNoticeObj = reduxStore.dispatch(warningAction({
      timeout: null,
      title: `${errTitle} Offline`,
      message: `${addtlInfo} You can continue working. Snugg Pro will keep checking for connectivity and sync your local changes.`,
      showCloseButton: false,
      hideOnNavigate: false,
      onRemove() {
        warningNoticeObj = null
      }
    }))
  }
}

// This is so when we edit this file it doesn't break everything
if (module.hot) {
  module.hot.decline()
}
