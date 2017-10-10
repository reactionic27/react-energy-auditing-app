import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router'
import routes from './lib/routes-client';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import SnuggRouterContext from '../snugg/SnuggRouterContext'
import {StyleRoot} from 'radium';
import reduxInit from 'data/reduxInit'
import Snugg from 'snugg/Snugg'
import intercom from 'app/lib/intercom'
import {persistStore} from 'redux-persist'

window.Snugg = Snugg

require('util/globalErrorHandler')
require('util/preventBackspaceNavigate')

var {Provider} = require('react-redux')

function defaultRender(component) {
  return ReactDOM.render(component, document.getElementById('primary-container'))
}

window.snuggApp = function snuggApp(bootstrapped, CURRENT_ACCOUNT_ID, render = defaultRender) {

  const store = reduxInit(bootstrapped, CURRENT_ACCOUNT_ID)

  const history = syncHistoryWithStore(browserHistory, store)

  if (process.env.NODE_ENV === 'development') {
    window.store = store
  }

  window.$$getState = () => {
    return store.getState()
  }

  intercom(store)

  // Render the Root:
  // ----------
  persistStore(store, {whitelist: ['localStorage']}, () => {
    render(
      <StyleRoot>
        <Provider store={store}>
          <div>
            <Router history={history} render={(props) => <SnuggRouterContext {...props} />}>
              {routes}
            </Router>
          </div>
        </Provider>
      </StyleRoot>
    );
  })
}
