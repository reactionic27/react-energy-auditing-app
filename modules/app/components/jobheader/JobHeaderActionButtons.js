import React from 'react'
import dimensions from 'util/dimensions'
import scrollSpy from 'decorators/scrollSpyDecorator'
import {Icon, Col} from 'ui'
import {Clearfix} from 'react-bootstrap'
import Color from 'color'
import {palette} from 'app/lib/global-styles'
import * as f from 'data/formatters'
import {connect} from 'snugg-redux'
import dynamicResize from 'decorators/dynamicResize'

@connect((state, {jobId}) => {
  return {
    isJobTemplate: f.job.isJobTemplate(state.fn.jobById(jobId)),
    unreadActivityCount: f.activityFeed.unreadCount(state, {jobId}),
    showActivityPane: state.localState.get('showActivityPane')
  }
})
@dynamicResize
@scrollSpy
export default class JobHeaderActionButtons extends React.Component {

  static propTypes = {
    jobId: React.PropTypes.number.isRequired,
    programId: React.PropTypes.number,
    togglePane: React.PropTypes.func.isRequired
  };

  toggleActivity = (e) => {
    e.preventDefault()
    this.props.togglePane('Activity')
  };
  toggleAlerts = (e) => {
    e.preventDefault()
    this.props.togglePane('Alerts')
  };
  toggleMetrics = (e) => {
    e.preventDefault()
    this.props.togglePane('Metrics')
  };
  toggleExport = (e) => {
    e.preventDefault()
    this.props.togglePane('Export')
  };
  toggleContext = (e) => {
    e.preventDefault()
    this.props.togglePane('Context')
  };

  render() {
    const {
      props: {segments: {one, three}, unreadActivityCount, showActivityPane, isJobTemplate},
      state: {isSpying}
    } = this
    if (isSpying && dimensions.screenSize === 'xs') return null
    const {screenSize} = dimensions
    const isJobPage = (one === 'job') && !three
    const isRecPage = (one === 'job') && three === 'recommendation'
    const showContextButton = (screenSize === 'xs') && (isJobPage || isRecPage)
    const navbarStyle = !isJobTemplate && screenSize === 'xs' ? {width: '25%'} : {width: '33%'}
    if (isSpying && screenSize === 'xs') return null
    return (
      <Col sm={5} noGutter={['alRight', 'xs']}>
        <div className="navbar-group">
          {!isJobTemplate ? <div className="header-navbar" style={navbarStyle}>
            <button className="btn btn-header" onClick={this.toggleActivity}>
              <Icon type="activity" size={16}/> <br/>
              Activity
              {(unreadActivityCount > 0) && !showActivityPane && <div style={styles.activityBadge}>{unreadActivityCount}</div>}
            </button>
          </div> : null}
          <div className="header-navbar" style={navbarStyle}>
            <button className="btn btn-header" onClick={this.toggleMetrics}>
              <Icon type="metrics" size={16}/><br/>
              Metrics
            </button>
          </div>
          <div className="header-navbar" style={navbarStyle}>
            <button className="btn btn-header" onClick={this.toggleExport}>
              <Icon type="export" size={16}/><br/>
              Export
            </button>
          </div>
          {showContextButton ?
            <div className="header-navbar" style={navbarStyle}>
              <button className="btn btn-header" onClick={this.toggleContext}>
                <Icon type="context" size={16}/><br/>
                Context
              </button>
            </div>
            : null
          }

        </div>
        <Clearfix />
      </Col>
    );
  }
}

const badgeColor = 'rgba(255,255,255,0.9)'

const styles = {
  activityBadge: {
    backgroundColor: Color(palette.ALERTRED).clearer(0.3).darken(0.2).desaturate(0.0).rgbString(),
    color: badgeColor,
    position: 'absolute',
    top: 13,
    margin: 'auto',
    right: '25%',
    minWidth: 15,
    padding: '2px',
    borderRadius: 4,
    fontSize: 10
  }
}
