import React, { Component } from 'react'
import {browser as BrowserType} from 'bowser'
import ConfirmationModal from '../components/overlays/modals/ConfirmationModal'
import UAParser from 'ua-parser-js'
import compareVersions from 'compare-versions'
const parser = new UAParser()

function OSWarning(props) {
  const {os} = props
  const manufacturer = os === "Windows" ? 'Microsoft' : 'Apple'
  return (
    <div>
      <h4>Incompatible OS Warning</h4>
      <p>
        You are on a version of {os} that is no longer supported by Google Chrome or {manufacturer}.
      </p>
      <p>
        Please update your OS and/or device to a more stable and secure system that will allow you to install a modern version of Google Chrome.
      </p>
    </div>
  )
}

function BrowserWarning() {
  return (
    <div>
      <h4>Before you go any further:<br/> Please switch your browser to Google Chrome.</h4>
      <p>
        Snugg Pro is a seriously powerful application that requires a recent version of Google Chrome.
      </p>
      <p>
        If you're on iOS, we also support Mobile Safari.
      </p>
      <p>
        <a href="https://www.google.com/chrome/">Download Google Chrome now</a> or contact support if you need assistance.</p>
    </div>
  )
}

export default class BrowserSupportModal extends Component {
  constructor(props) {
    super(props)
    const osObj = parser.getOS()
    const os = `${osObj.name} ${osObj.version}`
    this.state = {
      showBrowserSupportWarning: !BrowserType.chrome && !(BrowserType.ios && BrowserType.webkit),
      showOSSupportWarning: (os === 'Windows XP') || (os === 'Windows Vista') || (osObj.name === 'Mac OS' && compareVersions(osObj.version, '10.8.9') !== 1)
    }
  }

  close = () => {
    this.setState({
      showBrowserSupportWarning: false,
      showOSSupportWarning: false
    })
  }

  render() {
    const osObj = parser.getOS()
    const os = osObj.name
    const {showOSSupportWarning, showBrowserSupportWarning} = this.state
    return (
      <ConfirmationModal
        show={showOSSupportWarning || showBrowserSupportWarning}
        onConfirm={this.close}
        confirmText={`Continue with this ${showOSSupportWarning ? 'OS' : 'browser'} for now`}>
          {showOSSupportWarning ? <OSWarning os={os}/> : null}
          {showBrowserSupportWarning && !showOSSupportWarning ? <BrowserWarning /> : null}
      </ConfirmationModal>
    );
  }
}
