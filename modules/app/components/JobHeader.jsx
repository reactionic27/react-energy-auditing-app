import React from 'react'
import {Map as IMap} from 'immutable'
import {Row, Col, LeftPushNavBtn} from 'ui'
import scrollSpy from '../../decorators/scrollSpyDecorator'
import JobHeaderActionButtons from './jobheader/JobHeaderActionButtons'
import JobHeaderInfoInlay from './jobheader/JobHeaderInfoInlay'
import * as f from 'data/formatters'
import {UISIZE, palette} from 'app/lib/global-styles'
import Color from 'color'
import Radium from 'radium'
import {connect} from 'snugg-redux'
import JobExportPane from './overlays/panes/JobExportPane'
import ContextSlidePane from './overlays/panes/ContextSlidePane'
import ActivityPane from './overlays/panes/ActivityPane'
import MetricsPane from './overlays/panes/MetricsPane'
import {dispatchLocal} from 'data/actions'
import _ from 'lodash'

@connect((state, {jobId}) => {
  const job = state.fn.jobById(jobId)
  return {
    currentStageName: f.stages.currentStageName(job.get('stage_id')),
    showActivityPane: state.localState.get('showActivityPane'),
    showContextSlidePane: state.localState.getIn(['contextState', 'showContextSlidePane'])
  }
}, {dispatchLocal})
@Radium
@scrollSpy
export default class JobHeader extends React.Component {

  static propTypes = {
    job: React.PropTypes.instanceOf(IMap).isRequired,
    jobId: React.PropTypes.number.isRequired
  };

  static defaultProps = {
    alertStatus: 'unresolved'
  };

  constructor() {
    super(...arguments)
    this.state = {
      showJobInfo: false,
      showExport: false,
      showAlerts: false,
      showActivity: false,
      showMetrics: false,
    }
  }

  // TODO: I dont' think getAlertButtonClass is being used. Probably delete it
  getAlertButtonClass() {
    const {alertStatus, alertType} = this.props
    if (alertStatus === 'unresolved' && alertType === 'error') {
      return 'btn-error'
    } else if (alertStatus === 'resolved' && alertType === 'warning') {
      return 'btn-warning'
    }
  }

  handleClick = (e) => {
    e.preventDefault()
    this.setState({showJobInfo: !this.state.showJobInfo})
  };

  hideJobInfo = (e) => {
    this.setState({showJobInfo: false})
  };

  expandHeader = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.segments, this.props.segments)) {
      this.closePanes()
    }
  }

  componentWillUnmount() {
    this.closePanes()
  }

  closePanes() {
    this.props.showContextSlidePane && this.props.dispatchLocal('contextState', {
      showContextSlidePane: false
    })
  }

  togglePane = (pane: 'Activity' | 'Alerts' | 'Metrics' | 'Export' | 'Context') => {
    if (pane === 'Activity') {
      this.props.dispatchLocal('setShowActivityPane', {
        showActivityPane: !this.props.showActivityPane
      })
    }
    if (pane === 'Context') {
      this.props.dispatchLocal('contextState', {
        showContextSlidePane: !this.props.showContextSlidePane
      })
    } else {
      this.setState({
        [`show${pane}`]: !this.state[`show${pane}`]
      })
    }
  };


  closeContextSlidePane = () => {
    this.props.dispatchLocal('contextState', {showContextSlidePane: false})
  }

  stopPropagation(e) {
    e.stopPropagation()
  }

  getDescriptionStyle(style) {
    const {state: {isSpying}} = this
    if (!isSpying) return style
    return {
      ...style
    }
  }

  clearSpying = (e) => {
    this.setState({isSpying: false})
  }

  render() {
    const {
      props: {job, jobId, currentStageName, showActivityPane, dispatchLocal, segments, showContextSlidePane},
      state: {isSpying, showExport, showMetrics, showJobInfo}

    } = this
    const finalStyles = isSpying ? scrolledStyles : styles
    const programId = job.get('program_id')

    return (
      <Row onClick={this.clearSpying}>
        <div style={finalStyles.header} className="content-header">
          <Col sm={isSpying ? 12 : 7} noGutter={['smLeft', 'xsRight']}>
            <div style={finalStyles.hamburger} key="hamburger">
              <LeftPushNavBtn />
            </div>
            <div onClick={!isSpying && this.handleClick} style={finalStyles.infoArea} key="info-area">
              <div style={finalStyles.topLine}>
                <div style={finalStyles.name} ref="name">
                  {job.get('is_template') ? <span style={{fontWeight: 600}}>Template: </span> : null}
                  {f.job.fullName(job)}
                </div>
                {!job.get('is_template') && <div style={styles.stage}>{currentStageName}</div>}
              </div>
              <div style={finalStyles.description} key="radium-description">
                {f.job.formattedAddress(job)}
              </div>
            </div>
          </Col>
          <div style={finalStyles.actionButtons} onClick={this.stopPropagation} key="radium-btns">
            <JobHeaderActionButtons
              jobId={jobId}
              programId={programId}
              isSpying={isSpying}
              alertCount={3}
              togglePane={this.togglePane}
              segments={segments} />
          </div>
          <JobHeaderInfoInlay
            job={job}
            show={showJobInfo}
            hideJobInfo={this.hideJobInfo} />
        </div>
        <ActivityPane
          jobId={jobId}
          show={showActivityPane}
          onExit={() => dispatchLocal('setShowActivityPane', {showActivityPane: false})} />
        <MetricsPane show={showMetrics} onExit={() => this.setState({showMetrics: false})} />
        <JobExportPane
          jobId={jobId}
          show={showExport}
          onExit={() => this.setState({showExport: false})} />
        <ContextSlidePane
          show={showContextSlidePane}
          onExit={this.closeContextSlidePane}
          segments={segments} />
      </Row>
    )
  }
};

const styles = {
  header: {
    position: 'fixed',
    maxHeight: UISIZE.xsJobHeader,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1061,
    transform: 'translateZ(0)',
    overflow: 'visible',
    transition: 'all .1s ease',
    '@media (min-width: 768px)': {
      transition: 'max-height .1s ease',
      height: UISIZE.header,
      left: UISIZE.sidebarWidth
    }
  },
  hamburger: {
    maxWidth: 60,
    maxHeight: 60,
  },
  infoArea: {
    display: 'inline-block',
    cursor: 'pointer',
    height: UISIZE.header,
    transform: 'translateZ(0)',
    paddingLeft: 10,
    paddingRight: 10,
    ':hover': {
      color: 'inherit',
      backgroundColor: Color(palette.BEIGE).darken(0.05).rgbString()
    },
    ':active': {
      backgroundColor: Color(palette.BEIGE).darken(0.07).rgbString()
    }
  },
  topLine: {
    transform: 'translateZ(0)',
    transition: 'all .1s ease',
    display: 'inline-block',
    minWidth: 180,
  },
  name: {
    fontSize: 16,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: 160,
    overflow: 'hidden',
    float:'left',
    marginBottom: 3,
    '@media (min-width: 768px)': {
      maxWidth: 220,
    }
  },
  stage: {
    textTransform: 'uppercase',
    paddingTop: 2,
    paddingRight: 4,
    paddingBottom: 2,
    paddingLeft: 4,
    display: 'inline-block',
    marginLeft: 10,
    color: 'rgba(0,0,0,0.6)',
    letterSpacing: '0.03em',
    fontSize: '0.7em',
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.08)'
  },
  description: {
    fontSize: 12,
    lineHeight: '1.2em',
    transform: 'translateZ(0)',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: palette.LINKCOLOR,
    whiteSpace: 'nowrap',
  },
  actionButtons: {
    transition: 'all .1s ease',
    transform: 'translateZ(0)'
  }
}

const scrolledStyles = {
  header: {
    ...styles.header,
    maxHeight: UISIZE.scrollSpyOffset,
    transition: 'max-height .1s ease',
    cursor: 'pointer',
    overflow: 'hidden',
    '@media (min-width: 768px)': {
      transition: 'all .1s ease',
      height: UISIZE.scrollSpyOffset,
      left: UISIZE.sidebarWidth
    }
  },
  hamburger:{
    ...styles.hamburger,
    transition: 'all .1s ease',
    transform: 'scale(0)',
    opacity: 0,
    display:'none',
  },
  infoArea: {
    ...styles.infoArea,
    height: UISIZE.scrollSpyOffset,
    marginLeft: -20,
    width: '100%',
    paddingLeft: 10,
    ':hover': {
      backgroundColor: 'inherit'
    },
    '@media (min-width: 768px)': {
      marginLeft: 0
    }
  },
  topLine: {
    ...styles.topLine,
    transform: 'scale(.9) translateX(-5%)',
    transition: 'all .1s ease',
  },
  name: {
    ...styles.name
  },
  description: {
    ...styles.description,
    float:'right',
    paddingTop: 6,
    color: '#555',
  },
  actionButtons:{
    ...styles.actionButtons,
    transition: 'all .1s ease',
    opacity: 0,
    maxHeight: 0,
    transform: 'translateY(-120px) translateZ(0)'
  }
}
