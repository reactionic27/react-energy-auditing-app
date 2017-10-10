import React, {PropTypes} from 'react'
import cx from 'classnames'
import {Link} from 'react-router';
import {Button} from 'ui'
import {Clearfix} from 'react-bootstrap'
import {browser as BrowserType} from 'bowser'
import * as s from 'data/selectors'
import {connectSelector} from 'snugg-redux'
import {dispatchLocal} from 'data/actions'

// We're leveraging the Bootstrap Alert component: http://getbootstrap.com/components/#alerts
// This component is called from:
// <BannerNotification />  (Thin message across top of screen. No interaction)
// <InlineNotification />  (Contextual message in the app. No interaction)
// <DynamicAlert />        (Alert that shows up based on state of the app. Dismissable)
@connectSelector({alerts: s.alerts}, {dispatchLocal})
export default class Alert extends React.Component {

  static propTypes = {
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    title:PropTypes.string,
    showTitle: PropTypes.bool,
    theme: PropTypes.oneOf(['info', 'warning', 'success', 'error', 'internal', 'danger', 'neutral']),
    showCloseButton: PropTypes.bool,
    type: PropTypes.oneOf(['alert', 'inline', 'banner', 'field']),
    jobId: PropTypes.number,
    action: PropTypes.func,
    actionLabel: PropTypes.string,
    timeout: PropTypes.number,
    style: PropTypes.object
  }

  static defaultProps = {
    theme: "info",
    showCloseButton: true,
    type: 'fixed',
    showTitle: true
  }

  state = {
    closeAlert: false
  }

  closeAlert(e) {
    e.preventDefault()
    this.setState({closeAlert: true}, () => {
      setTimeout(() => {
        this.props.dispatchLocal('removeAlert', this.props.uuid)
      }, 200)
    })
  }

  actionHandler = (e) => {
    this.props.action()
    this.closeAlert(e)
  }

  render() {
    const {
      props: {
        type,
        message,
        theme,
        title,
        showTitle,
        showCloseButton,
        jobId,
        action,
        actionLabel,
        style
      },
      state: {closeAlert}
    } = this
    const messageProps = (typeof message === 'string')
          ? {dangerouslySetInnerHTML: {__html: message}}
          : {children: message}
    const chromePaddingStyles = BrowserType.chrome && type === 'fixed' ? {paddingBottom: 10} : null
    const dynamicClasses = cx({
      // This is makes popup alerts appear
      'animated fadeInUp': closeAlert === false && type === 'alert',
      // This makes popup alerts disappear
      'animated fadeOutDown' : closeAlert === true && type === 'alert',
      // This makes inline notifications disappear
      'animated fadeIn' : closeAlert === false && type === 'inline',
      // This makes inline notifications disappear
      'animated fadeOut' : closeAlert === true && type === 'inline'
    })
    return (
      <div className={`alert alert-${theme} alert-${type} ${dynamicClasses}`}
           style={{...chromePaddingStyles, ...style}}>
        {showCloseButton &&
          <button type="button" className="close" onClick={(e) => this.closeAlert(e)}>
            <span>&times;</span>
          </button>
        }
        {showTitle && title &&
          <h4 className="alert-title">
            {title}
            {jobId && <Link to={`/job/${jobId}`} className="alert-job-id"> Job# {jobId}</Link>}
          </h4>
        }
        {message &&
          <div className="alert-message" {...messageProps} />
        }
        {action &&
          <div style={{paddingBottom: 10}}>
            <Button customStyle={alertButtonStyle} onClick={this.actionHandler}>
              {actionLabel}
            </Button>
            <Clearfix/>
          </div>
        }
        {this.props.children}
      </div>
    )
  }
};

const alertButtonStyle = {
  width: 'auto',
  boxShadow: 'none',
  backgroundColor: 'rgba(0,0,0,0.1)',
  color: 'inherit',
  ':hover': {
    backgroundColor: 'rgba(0,0,0,0.34)',
    color: 'white'
  },
  ':active': {
    backgroundColor: 'rgba(0,0,0,0.8)',

  }
}
