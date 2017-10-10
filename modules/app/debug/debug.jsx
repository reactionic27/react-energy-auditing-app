import React from 'react'
import cx from 'classnames'
import {Link} from 'react-router'
import DebugDiff from './diff'
import DebugHPXML from './hpxml'
import Main from './main'
import DebugRaw from './rawResponse'
import DuplicateJob from './dupe'
import RemoveMigrated from './remove-migrated-v5-job'
import {connect} from 'snugg-redux'

@connect((state, {jobId}) => {
  return { isTemplateJob: state.fn.jobById(jobId).get('is_template') === 1 }
})
export default class Debug extends React.Component {

  render() {
    const {
      props: {jobId, isTemplateJob, params: {debugPage: active}},
    } = this
    let activeTab = active
    let child = null
    if (!activeTab) {
      activeTab = isTemplateJob ? 'remove' : 'main'
    }
    if (activeTab === 'main') child = <Main jobId={jobId} />
    if (activeTab === 'diff') child = <DebugDiff jobId={jobId} />
    if (activeTab === 'rawResponse') child = <DebugRaw jobId={jobId} />
    if (activeTab === 'hpxml') child = <DebugHPXML jobId={jobId} />
    if (activeTab === 'dupe') child = <DuplicateJob jobId={jobId} />
    if (activeTab === 'remove') child = <RemoveMigrated jobId={jobId} />
    return (
      <div className="row">
        <div className="content-header" style={{width: '100%'}}>
          <div className="col-xs-12" style={{marginTop: 40}}>
            <h2>Debugging Job {this.context.jobId}</h2>
          </div>
        </div>
        <div className="col-md-12">
          <div className="job-container clearfix">
            <ul className="nav nav-tabs">
              {!isTemplateJob && <li className={cx({active: !activeTab})}>
                <Link to={`/job/${jobId}/debug`}>Optimiser Hash</Link>
              </li>}
              <li className={cx({active: activeTab === 'rawResponse'})}>
                <Link to={`/job/${jobId}/debug/rawResponse`}>Raw OM Response</Link>
              </li>
              {!isTemplateJob && <li className={cx({active: activeTab === 'hpxml'})}>
                <Link to={`/job/${jobId}/debug/hpxml`}>HPXML</Link>
              </li>}
              <li className={cx({active: activeTab === 'dupe'})}>
                <Link to={`/job/${jobId}/debug/dupe`}>Duplicate Jobs</Link>
              </li>
              <li className={cx({active: activeTab === 'remove'})}>
                <Link to={`/job/${jobId}/debug/remove`}>Remove Migrated v5 Job</Link>
              </li>
              {!isTemplateJob && <li className={cx({active: activeTab === 'diff'})}>
                <Link to={`/job/${jobId}/debug/diff`}>Diff vs Last Version</Link>
              </li>}
              <li>
                <a href='/kueadmin/api' target="_blank">Kue API</a>
              </li>
              <li>
                <a href='/kueadmin/kue' target="_blank">Kue Admin</a>
              </li>
            </ul>
            {child}
          </div>
        </div>
      </div>
    )
  }
}
