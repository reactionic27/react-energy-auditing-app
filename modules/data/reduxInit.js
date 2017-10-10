import {compose, createStore, applyMiddleware} from 'redux'

import thunkMiddleware from './redux-middleware/thunkMiddleware'
import crashReportMiddleware from './redux-middleware/crashReportMiddleware'
import promiseMiddleware from './redux-middleware/promiseMiddleware'
import errorHandlerMiddleware from './redux-middleware/errorHandlerMiddleware'

import rootReducer from './reducers/rootReducer'
import bulkUpdate from '../util/bulkUpdate'
import transitReader from '../util/transitReader'
import {initializeHttpStore} from '../util/network'
import {updateSnugg} from './actions/actions'
import {initOfflineSupport} from './actions/offlineQueue'
import {persistStore, autoRehydrate} from 'redux-persist'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function reduxInit(bootstrapped, accountId) {

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        crashReportMiddleware,
        thunkMiddleware,
        promiseMiddleware,
        errorHandlerMiddleware,
      ),
      autoRehydrate()
    )
  )

  store.dispatch({
    type: 'local/setCurrentAccountId',
    payload: accountId
  })
  store.dispatch(updateSnugg(snugg => bulkUpdate(snugg, transitReader(bootstrapped))))

  initializeHttpStore(store)

  initOfflineSupport(store)
  // persistStore(store, {whitelist: ['localStorage']})
  return store
}
