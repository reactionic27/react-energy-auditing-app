import React, {PropTypes} from 'react'
import dimensions from 'util/dimensions'
import {connectSelector} from 'snugg-redux'
import cx from 'classnames'
import {UISIZE, ANIMATION} from 'app/lib/global-styles'
import LeftSidebar from 'app/components/LeftSidebar'
import {BannerNotification, DynamicAlert} from 'app/components/overlays'
import FastClick from 'fastclick'
import Col from 'ui/UICol'
import DocumentTitle from 'react-document-title'
import * as f from 'data/formatters'
import * as s from 'data/selectors'
import dynamicResize from 'decorators/dynamicResize'
import {segmentsType, paramsType} from 'data/types'
import BrowserSupportModal from './BrowserSupportModal'
import {refreshUnreadActivity} from 'data/actions'

@connectSelector({
  transitioning: (state, props) => {
    return props.transitioning || state.localState.get('loaderCount', 0) > 0
  },
  isSnuggAdmin: (state) => f.account.isSnuggAdmin(state.fn.loggedInUser()),

  isInTemplate: (state, {jobId}) => {
    if (jobId) {
      return state.fn.jobById(jobId).get('is_template') === 1
    }
    return false
  },
  isProgramAdmin: (state) => f.account.isProgramAdmin(state.fn.loggedInUser()),
  alerts: s.alerts
}, {refreshUnreadActivity})
@dynamicResize
export default class ApplicationContainer extends React.Component {

  static propTypes = {
    segments: segmentsType,
    params: paramsType
  };

  static contextTypes = {
    hideLeftPushNav: PropTypes.func
  };

  static childContextTypes = {
    isSnuggAdmin: PropTypes.bool,
    isProgramAdmin: PropTypes.bool,
    segments: segmentsType,
  };

  getChildContext() {
    return {
      isSnuggAdmin: this.props.isSnuggAdmin,
      isProgramAdmin: this.props.isProgramAdmin,
      segments: this.props.segments
    }
  }

  componentDidMount() {
    // Remove the 300ms iOS delay on click:
    window.addEventListener('load', this.handleFastClick);
    this.props.refreshUnreadActivity()
  }

  handleFastClick = () => {
    FastClick.attach(document.body)
  };

  // Remove the push state when clicking on the semi-transparent overlay
  handlePushMenuOverlayClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.context.hideLeftPushNav()
  };

  getCoreContainerStyle() {
    const {screenSize} = dimensions
    const {showSecondaryNav} = this.props
    if (showSecondaryNav && screenSize === 'xs') {
      return {overflowX: 'hidden'}
    }
    return {}
  }
  getAlertsContainerStyle() {
    const {screenSize} = dimensions
    const {showLeftPushNav} = this.props
    if (screenSize === 'xs' && showLeftPushNav) {
      return {...alertsContainerStyle, left: UISIZE.sidebarWidth + 5}
    }
    return alertsContainerStyle

  }

  render() {
    const {
      props: {
        segments,
        showLeftPushNav,
        showSecondaryNav,
        transitioning,
        isProgramAdmin,
        isInTemplate,
        alerts,
        params,
        children,
        lastCompanyId
      }
    } = this
    const {three} = segments

    const isPrinting = (three === 'present' || three === 'print')
    if (isPrinting) {
      return (
        <div>
          <div className={cx('spin-box-container', {'hide' : !transitioning})}>
            <div className="circle"></div>
          </div>
          {children}
          <div style={this.getAlertsContainerStyle()}>
            {alerts.map(alert => <DynamicAlert {...alert} key={alert.uuid} />)}
          </div>
        </div>
      )
    }

    const menuClasses = cx('section', {
      'push-left': showLeftPushNav,
      'push-secondary-nav': showSecondaryNav,
      transitioning
    })

    return (
      <DocumentTitle title="Snugg Pro">
        <div className={menuClasses}>
          <div className={cx('spin-box-container', {'hide' : !transitioning})}>
            <div className="circle"></div>
          </div>
          <LeftSidebar lastCompanyId={lastCompanyId} segments={segments} jobId={params.jobId} />
          <div className="push-menu-overlay" onClick={this.handlePushMenuOverlayClick} />
          <div className="container-fluid core-container" style={this.getCoreContainerStyle()}>
            {isProgramAdmin
              ? <BannerNotification message="You are logged in as a program admin. Jobs are not editable. You can view them and generate PDF reports."/>
              : null
            }
            {isInTemplate
              ? <BannerNotification message="You are currently in a template. <strong>This is not a job.</strong>" />
              : null
            }
            <div className="row">
              <Col md={12}>
                {children}
              </Col>
            </div>
          </div>
          <div style={this.getAlertsContainerStyle()}>
            {alerts.map(alert => <DynamicAlert {...alert} key={alert.uuid} />)}
          </div>
          <BrowserSupportModal />
        </div>
      </DocumentTitle>
    );
  }
}

const alertsContainerStyle = {
  position:'fixed',
  zIndex: 1091,
  bottom: 5,
  left:5,
  right: 5,
  margin: 'auto',
  maxWidth: 500,
  transition: ANIMATION
}
