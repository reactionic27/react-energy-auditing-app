import React, { Component } from 'react'
import WindowArea from 'app/jobform/tables/WindowArea'
import {connect} from 'snugg-redux'
import {InlineNotification} from 'app/components/overlays'

function toJS(obj) {
  if (Array.isArray(obj)) return obj.map(toJS)
  return (obj && obj.toJS) ? obj.toJS() : obj
}

@connect((state, {jobId}) => {
  const windows = toJS(state.fn.windowsByJobId(jobId))
  return {
    windows
  }
})
export default class WindowAreaTable extends Component {

  render() {
    const { windows, jobId, errorMessage } = this.props
    if (!windows) {
      return
    }
    return (
      <div>
        {windows.map(function(win, index) {
          return (
            <div key={win.uuid}>
              <h4>Window System {index + 1}</h4>
              <WindowArea uuid={win.uuid} jobId={jobId} />
            </div>
          )
        })}
        {errorMessage ? <InlineNotification theme='error' message={errorMessage} /> : null}
      </div>
    );
  }
}
