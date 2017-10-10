
function isPromise(value) {
  return value && typeof value.then === 'function'
}

// Modified version of normal redux-thunk, except if the return value
// of the thunk is a promise it gets run back through the middleware
// chain to be processed by the promiseMiddleware
export default function thunkMiddleware({dispatch, getState}) {
  return next => action => {
    if (typeof action === 'function') {
      const result = action(dispatch, getState)
      if (isPromise(result)) {
        return dispatch(result)
      }
      return result
    }
    return next(action)
  }
}
