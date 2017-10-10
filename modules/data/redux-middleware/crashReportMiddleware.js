import {errorAction} from '../actions/actions'

export default function crashReportMiddleware() {
  return next => action => {
    try {
      return next(action)
    } catch (err) {
      if (__DEBUG__) {
        console.error(err)
      }
      Raven.captureException(err, {
        extra: {
          action
        }
      })
      next(errorAction({
        title: 'Fatal Error',
        message: 'We encountered an error in the program, please refresh the page ' +
          'and contact support if you continue to encounter this issue'
      }))
    }
  }
}
