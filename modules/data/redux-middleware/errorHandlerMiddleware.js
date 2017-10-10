import _ from 'lodash'
import { errorAction } from '../actions/actions'

let handledErrorObj

export default function errorHandlerMiddleware({dispatch, getState}) {
  return next => action => {
    const {error: isError, payload} = action
    if (isError !== true) {
      return next(action)
    }
    let errorInfo
    if (_.isPlainObject(_.get(action, 'payload.json'))) {
      errorInfo = {
        title: _.get(action, 'payload.json.message'),
        message: formatMessage(action.payload.json),
        timeout: 5000
      }
    } else {
      errorInfo = {
        title: payload.online === false ? 'Offline Error' : 'Error',
        message: payload.online === false
          ? 'Cannot perform this action while offline'
          : action.payload.message,
        timeout: 5000
      }
    }
    if (handledErrorObj) {
      return Promise.reject(handledErrorObj.update(errorInfo))
    } else {
      handledErrorObj = dispatch(errorAction({
        ...errorInfo,
        onRemove() {
          handledErrorObj = null
        }
      }))
      return Promise.reject(handledErrorObj)
    }
  }
}

function formatMessage(json) {
  if (json.message === 'Validation Error' || json.message === 'Database Save Error') {
    return _.values(json.data).join(', ')
  } else {
    // debugger
  }
}
