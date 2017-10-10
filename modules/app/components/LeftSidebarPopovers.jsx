import React from 'react'
import {Link} from 'react-router'
import * as a from 'data/actions'
import {Popover} from 'react-bootstrap'
import pure from 'pure-render-decorator'
import {Icon} from 'ui'
import io from '../../util/socketInit'

@pure
export class SettingsPopover extends React.Component {

  static contextTypes = {
    hideLeftPushNav: React.PropTypes.func,
    isProgramAdmin: React.PropTypes.bool
  };

  // Remove the push state when clicking on the semi-transparent overlay
  handleButtonClick = (e) => {
    this.context.hideLeftPushNav()
  };

  logout() {
    // Kill the socket listeners when logging out so we don't get stuck in a
    // bad loop with the maybe-logout socket event.
    io.off()
    // May be becuase of styles, routing with href on <a /> tag is not working.
    // Using click handler to logout
    window.location.href = '/logout';
  }

  render() {
    const {
      props: {firstName},
      context: {isProgramAdmin}
    } = this
    return (
      <Popover id="settings" className='popover-dark right popover-leftnav popover-settings'>
        <Link to={isProgramAdmin ? '/settings/password' : '/settings'} onClick={this.handleButtonClick}>
          <div className="link-icon">
            <Icon type="user" size={18} size={18}/>
          </div>
          <span className="link-label">Your Profile</span>
        </Link>
        {!isProgramAdmin && <Link to="/settings/companies" onClick={this.handleButtonClick}>
          <div className="link-icon">
            <Icon type="company" size={18}/>
          </div>
          <span className="link-label">Your Companies</span>
        </Link>}
        {!isProgramAdmin && <Link to="/settings/financing" onClick={this.handleButtonClick}>
          <div className="link-icon">
            <Icon type="financingTemplate" size={18}/>
          </div>
          <span className="link-label">Financing Templates</span>
        </Link>}
        <a href="/logout" onClick={this.logout}>
          <div className="link-icon">
            <Icon type="logout"  size={18}/>
          </div>
          <span className="link-label">Log out</span>
        </a>
        <div className="list-footer">
          Logged in as {firstName}
        </div>
      </Popover>
    )
  }
}

@pure
export class SupportPopover extends React.Component {

  static contextTypes = {
    hideLeftPushNav: React.PropTypes.func
  }

  static propTypes = {
    jobId: React.PropTypes.number
  };

  chatSupport = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const preFilledMessage = this.props.jobId ? `Job #${this.props.jobId}: ` : ''
    this.context.hideLeftPushNav()
    if (typeof window.Intercom !== 'undefined') {
      window.Intercom('showNewMessage', preFilledMessage)
    }
  };

  customLink(href) {
    window.location.href = href
  }
  customLinkNewWindow(href) {
    window.open(href, '_blank')
  }

  render() {
    const {jobId} = this.props
    return (
      <Popover id='support-popover' className='popover-dark right popover-leftnav popover-support'>
        <a href="#" onClick={this.chatSupport}>
          <div className="link-icon">
            <Icon type="liveChat"  size={18}/>
          </div>
          <span className="link-label">Live support chat</span>
        </a>
        <a target="_blank" onClick={this.customLinkNewWindow.bind(this, 'http://snuggpro.com/support-section')}>
          <div className="link-icon">
            <Icon type="help" size={18}/>
          </div>
          <span className="link-label">Support topics</span>
        </a>
        <a onClick={this.customLink.bind(this, `mailto:pro@snugghome.com?subject=In-app%20support%20request&body=Please%20include%20your%20Snugg%20Pro%20email%20address%20and%20job%20number%20${jobId ? `(${jobId})%20` : ''}if%20applicable`)}>
          <div className="link-icon">
            <Icon type="mail" size={18}/>
          </div>
          <span className="link-label">Pro@snugghome.com</span>
        </a>
      {jobId
        ? <div className="list-footer"> Job #<span className="job-id">{jobId}</span></div>
        : null}
      </Popover>
    )
  }
}
