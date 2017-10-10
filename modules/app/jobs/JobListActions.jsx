import React, {PropTypes} from 'react'
import {Icon} from 'ui'
import Radium from 'radium'
import {connect} from 'snugg-redux'
import {Clearfix, Col} from 'react-bootstrap'
import {markAllRead} from 'data/actions'

@connect(null, {markAllRead})
@Radium
export default class JobActions extends React.Component {

  static propTypes = {
    togglePane: PropTypes.func.isRequired,
    filteredJobCount: PropTypes.number.isRequired,
    selectedJobCount: PropTypes.number.isRequired,
    selectedJobNames: PropTypes.string.isRequired
  };

  toggleBulkStage = (e) => {
    this.props.togglePane('BulkStage')
  };

  toggleBulkExport = (e) => {
    this.props.togglePane('BulkExport')
  };

  markAllReadHandler = (e) => {
    this.props.markAllRead({company_id: this.props.companyId})
  }

  // TODO: need to get the total number of filtered jobs (filterSelector)
  render() {
    const {selectedJobCount} = this.props
    const viewClasses = `content-header content-header-2 inlay
          ${selectedJobCount !== 0 ? 'inlay-open-60' : ''}`
    return (
      <div className={viewClasses} style={styles.actionToolbar}>
        <Col xs={7}>
          <div style={styles.jobCount}>{`${selectedJobCount} job${selectedJobCount > 1 ? 's' : ''} selected`}</div>
          {/*<small>{selectedJobNames}</small>*/}
        </Col>
        <Col xs={5}>
          <div className="pull-right">
            <div className="header-navbar">
              <button className="btn btn-header" style={styles.buttonStyle} onClick={this.markAllReadHandler}>
                <Icon type='circleCheck' size={16} /><br/> Mark as read
                <Clearfix/>
              </button>
            </div>
            <div className="header-navbar">
              <button className="btn btn-header" style={styles.buttonStyle} onClick={this.toggleBulkStage}>
                <Icon type='transfer' size={16} /><br/> Move
              </button>
            </div>
            <div className="header-navbar">
              <button className="btn btn-header" onClick={this.toggleBulkExport}>
                <Icon type="export" size={16} /><br/> Export
              </button>
            </div>
          </div>
        </Col>
      </div>
    )
  }
}

const styles = {
  actionToolbar: {
    position: 'fixed',
    height: 50,
    right: 0,
    left: 0,
    bottom: 0,
    width: 'auto',
    zIndex: 10,
    paddingLeft: 10,
    boxShadow: '0 -4px 4px rgba(0,0,0,0.3)',
    '@media (min-width: 768px)': {
      left: 60
    }
  },
  jobCount: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '19px',
    paddingTop: 14,
    float: 'left'
  },
  buttonStyle: {
    height: 50,
    paddingTop: 6,
    paddingBottom: 6
  }
}
