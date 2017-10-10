import React from 'react'
import {findDOMNode} from 'react-dom'
import LeftSidebarJob from './LeftSidebarJob'
import {connect} from 'snugg-redux'
import {segmentsType} from 'data/types'
import {Overlay} from 'react-bootstrap'
import {SettingsPopover, SupportPopover} from 'app/components/LeftSidebarPopovers'
import dynamicResize from 'decorators/dynamicResize'
import Color from 'color'
import {palette} from 'app/lib/global-styles'
import Radium from 'radium'
import LeftSidebarButton from 'app/components/LeftSidebarButton.jsx'


@connect((state, props) => {
  const user = state.fn.loggedInUser()
  return {
    firstName: user.get('first_name'),
    stageId: state.localState.getIn(['jobList', 'stageId'])
  }
})
@dynamicResize
@Radium
export default class LeftSidebar extends React.Component {

  static contextTypes = {
    isProgramAdmin: React.PropTypes.bool,
    hideLeftPushNav: React.PropTypes.func
  };

  static propTypes = {
    jobId: React.PropTypes.number,
    lastCompanyId: React.PropTypes.number.isRequired,
    segments: segmentsType
  };

  constructor() {
    super(...arguments)
    this.state = {
      settingsIsVisible: false,
      supportIsVisible: false,
    };
    this.toggleSettings = this.toggleSettings.bind(this)
    this.toggleSupport = this.toggleSupport.bind(this)
  }

  // Remove the push state when clicking on the semi-transparent overlay
  handleButtonClick = (e) => {
    this.context.hideLeftPushNav()
  };

  toggleSettings = (e) => {
    e.preventDefault()
    this.setState({
      settingsIsVisible: !this.state.settingsIsVisible
    })
  };

  toggleSupport = (e) => {
    e.preventDefault()
    this.setState({
      supportIsVisible: !this.state.supportIsVisible
    })
  };

  render() {
    const {
      context: {isProgramAdmin},
      props: {
        lastCompanyId,
        jobId,
        isTemplate,
        segments: {one, two},
        firstName,
        stageId
      }
    } = this
    let linkLocation = lastCompanyId ? `/joblist/${lastCompanyId}` : '/'
    if (lastCompanyId && stageId) {
      linkLocation = linkLocation + `/stage/${stageId}`
    }
    return (
      <div style={styles.sidebar} className="side-left">
        <div style={styles.topButtons}>
          <div style={styles.dividerTitle}>
            Main
          </div>
          <LeftSidebarButton
            iconType="jobs"
            iconLabel="Jobs"
            iconRotate={180}
            onClick={this.handleButtonClick}
            to={linkLocation}
            isActive={one === 'joblist'}
          />
          {!isProgramAdmin &&
            <LeftSidebarButton
              iconType="templates"
              iconLabel="Templates"
              onClick={this.handleButtonClick}
              to="/settings/templates"
              isActive={two === 'templates' || one === 'templates'}
            />
          }
          {jobId &&
            <div style={styles.dividerTitle}>
              {isTemplate ? 'Template' : 'Job'}
            </div>
          }
          {jobId && <LeftSidebarJob {...this.props} />}
        </div>


        <div style={styles.bottomButtons}>
          <LeftSidebarButton
            iconType="settings"
            iconLabel="Settings"
            ref='settingsButton'
            onClick={this.toggleSettings}
            isActive={one === 'settings' && two !== 'templates' || this.state.settingsIsVisible}/>

          <Overlay
            show={this.state.settingsIsVisible}
            onHide={() => this.setState({ settingsIsVisible: false })}
            placement='right'
            container={() => findDOMNode(this.refs.settingsButton)}
            rootClose>
            <SettingsPopover firstName={firstName} />
          </Overlay>

          <LeftSidebarButton
            iconType="support"
            iconLabel="Support"
            ref='supportButton'
            onClick={this.toggleSupport}
            isActive={this.state.supportIsVisible}
          />

          <Overlay
            show={this.state.supportIsVisible}
            onHide={() => this.setState({ supportIsVisible: false })}
            placement='right'
            container={props => findDOMNode(this.refs.supportButton)}
            rootClose>
            <SupportPopover jobId={jobId} />
          </Overlay>
        </div>
      </div>
    )
  }
};

const styles = {
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'stretch'

  },
  dividerTitle: {
    borderTop: `1px solid ${Color(palette.BROWN).darken(0.2).rgbString()}`,
    borderBottom: `1px solid ${Color(palette.BROWN).darken(0.2).rgbString()}`,
    marginBottom: 1,
    display: 'block',
    color: Color(palette.BEIGE).darken(0.4).desaturate(0.5).rgbString(),
    textTransform: 'uppercase',
    fontSize: '.67em',
    paddingBottom: 2,
    letterSpacing: '0.05em',
    backgroundColor: Color(palette.BROWN).lighten(0.1).rgbString(),
  },
  topButtons: {
  },
  bottomButtons: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'space-between',
    flexGrow: 2,
    flexShrink: 0,
    flexBasis: 0,
    marginBottom: 10
  }
}
