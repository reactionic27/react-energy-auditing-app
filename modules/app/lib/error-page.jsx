import React from 'react'
import _ from 'lodash'

export default class ErrorPage extends React.Component {
  render() {
    const {props: {currentError}} = this
    if (currentError.status === 404) {
      return <NotFoundPage />
    }
    return <ServerError currentError={currentError} />
  }
}

function ServerError({currentError}) {
  return (
    <div className="container-fluid">
      <div className="headless-page row">
        <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div className="welcome-logo">
            <img src='/img/sp-logo.png' alt="Snugg Pro" style={{width: 200}} />
          </div>
          <h1>You just encountered a server error</h1>
          <p>We're really sorry about this. We've been notified and will look into it. In the meantime, here are some things you could try on your end:</p>
          <ul>
            <li>Go to <a href="/">the main jobs screen</a> and try again.</li>
            <li>Refresh this page in a moment.</li>
            <li>Contact support if this problem doesn't go away in the next few minutes.</li>
          </ul>
          <h3>Here is how to get support</h3>
          <h3>About contacting support</h3>
          <p>First please take note of the beginning of the error message below:</p>
          <div className="well scroll-past-200 ma-tb-20 alert-error">
            <pre>
              {JSON.stringify(_.get(currentError, 'json.data', currentError.message), null, 2).replace(/\\n/g, '\n')}
            </pre>
          </div>
          <p>
            <strong>Then get support in one of the following ways:</strong>
          </p>
          <ul>
            <li><a href="http://snuggpro.com/support-section" target="_blank">Check out our support topics</a></li>
            <li><a href="javascript:void(0);" onClick={() => window.Intercom('showNewMessage')}>Live chat with us</a></li>
            <li><a href="//snuggpro.com/contact">Fill out our online contact form</a></li>
            <li>Email us at <a href="mailto:pro@snugghome.com?subject=500%20error%20in%20app">pro@snugghome.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="container-fluid">
      <div className="headless-page row">
        <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div className="welcome-logo">
            <img src='/img/sp-logo.png' alt="Snugg Pro" style={{width: 200}} />
          </div>
          <h1>This page cannot be found</h1>
          <p>This looks like a bad link, also called a 404 error.</p>
          <h3>Luckly, there are some things you can try to keep going:</h3>
          <ul>
            <li>Start from <a href="/">the main jobs screen</a> and retrace your steps</li>
            <li>If you typed a web adddress manually, please check for typos in the browser's address bar</li>
            <li>Contact support if you keep hitting this page or don't know what else to do.</li>
          </ul>
          <h3>Here is how to get support</h3>
          <ul>
            <li><a href="http://snuggpro.com/support-section">Check out our support topics</a></li>
            <li><a href="javascript:void(0);" onClick={() => window.Intercom('showNewMessage')}>Live chat with us</a></li>
            <li><a href="//snuggpro.com/contact">Fill out our online form</a></li>
            <li>Email us at <a href="mailto:pro@snugghome.com?subject=404%20error%20in%20app">pro@snugghome.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
