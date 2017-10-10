import { isFSA } from 'flux-standard-action';
import { ErrorAlert } from '../actions/actions'
function isPromise(val) {
  return val && typeof val.then === 'function';
}

// Adapted from https://github.com/acdlite/redux-promise,
// but does not automtically dispatch(resp) unless the result
// is a flux standard action (type, [payload], [meta], [error])
// or is a function. Otherwise it just returns the result of
// the response to the caller
export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(resp => {
          return isFSA(resp) || typeof resp === 'function'
            ? dispatch(resp)
            : resp
        })
        .catch(error => {
          // We don't want ErrorAlerts to be re-dispatched
          if (error instanceof ErrorAlert) {
            throw error
          }
          return dispatch({
            type: 'error',
            payload: error,
            error: true,
            meta: {
              source: 'promiseMiddleware'
            }
          })
        })
        : next(action);
    }
    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result })
        ).catch(
          error => {
            error.action = action
            error.dispatched = dispatch({
              type: 'error',
              payload: error,
              error: true,
              meta: {
                source: promiseMiddleware,
                actionType: action.type
              }
            })
            throw error
          }
        )
      : next(action);
  }
}
