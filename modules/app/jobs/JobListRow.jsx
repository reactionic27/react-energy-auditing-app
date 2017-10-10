import React, {PropTypes} from 'react'
import {Map as IMap} from 'immutable'
import JobListRowDate from './JobListRowDate'
import JobListRowAccount from './JobListRowAccount'
import {Link} from 'react-router'
import getGoogleMap from 'util/getGoogleMap'
import {connect} from 'snugg-redux'
import JobListRowProgramLabel from './JobListRowProgramLabel'
import JobListRowSelect from './JobListRowSelect'
import {Icon, Row, Col} from 'ui'
import {palette} from 'app/lib/global-styles'
import {Clearfix} from 'react-bootstrap'
import * as f from 'data/formatters'
import pure from 'pure-render-decorator'
import Radium from 'radium'
import Color from 'color'

@connect((state, {jobId}) => {
  const job = state.fn.jobById(jobId)
  const account = state.fn.accountById(job.get('account_id'))
  const accountFullName = account ? f.account.firstNameLastNameInitial(account) : "Unknown user"
  const isJobSelected = f.job.isJobSelected(state, jobId)
  const stageName = f.job.stageName(job)
  const programName = (state.fn.programByJobId(jobId) || IMap()).get('name')
  const unreadActivityCount = f.activityFeed.unreadCount(state, {jobId})
  return {
    job,
    jobId,
    isJobSelected,
    stageName,
    accountFullName,
    programName,
    unreadActivityCount
  }
})
@pure
@Radium
export default class JobListRow extends React.Component {

  static propTypes = {
    jobId: PropTypes.number.isRequired,
    selectedJobs: PropTypes.array
  };

  render() {
    const {jobId, isJobSelected, accountFullName, stageName, programName, unreadActivityCount} = this.props
    const job = this.props.job.toJS()
    const rowSelectedClass = `jl ${isJobSelected ? 'snugg-selected' : ''}`
    return (
      <div className={rowSelectedClass} style={unreadActivityCount && !isJobSelected ? unreadRowStyle : {}}>
        <div className="jl-buttons">
          <JobListRowSelect jobId={jobId} selected={isJobSelected} />
          <a href={getGoogleMap(job.address_1, job.zip)}
             className="btn btn-map-it pull-left"
             target="_blank">
            <Icon type="mapIt" padding={0} />
          </a>
        </div>
        <Link to={`/job/${jobId}`}>
          <div className="jl-everything-else">
            <Row>
              <Col xs={8} noGutter={['al']}>
                <Col sm={4} noGutter={['al']}>
                  <JobListRowAccount {...job} unreadActivityCount={unreadActivityCount} />
                </Col>
                <Col sm={8} noGutter={['al']}>
                  <div className="jl-job-stats">
                    <JobListRowProgramLabel programName={programName} />
                    <span className="jl-box jl-job-id">
                      # {jobId}
                    </span>
                    <div className="jl-box jl-user hidden-xs">
                      {accountFullName}
                    </div>
                    <div className="jl-box jl-stage hidden-xs">
                      {stageName}
                    </div>
                  </div>
                  <Clearfix/>
                </Col>
              </Col>
              <Col xs={3} noGutter={['al']}>
                <JobListRowDate serviceTime={job.service_time} />
              </Col>
            </Row>
          </div>
        </Link>
      </div>
    )
  }
};

const unreadRowStyle = {
  backgroundColor: Color(palette.BEIGE).rgbString()
}
