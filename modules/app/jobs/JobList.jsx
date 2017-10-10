import React, {PropTypes} from 'react'
import JobListRow from './JobListRow'
import JobListEmptyResult from './JobListEmptyResult'
import {InlineNotification} from 'app/components/overlays'

export default class JobList extends React.Component {

  static propTypes = {
    jobs: PropTypes.array.isRequired
  };

  renderGroup(groupedTitle, jobs) {
    if (jobs.length === 0) {
      return null
    }
    return (
      <div key={groupedTitle}>
        <h2>{groupedTitle}</h2>
        <div className="listings">
          {jobs.map(job => <JobListRow key={job.get('id')} jobId={job.get('id')} />)}
        </div>
      </div>
    )
  }

  getFilterType({hasJobs, currentStageId, filterString}) {
    if (filterString) {
      return 'search'
    } else if (currentStageId) {
      return 'stage'
    } else {
      return 'company'
    }
  }

  render() {
    const {jobs, hasJobs, currentStageId, filterString, companyId, strategy} = this.props
    const filteredSampleJobs = strategy === 'group' ? jobs.reduce((acc, jobGroup) => {
      const jobListInGroup = jobGroup[1]
      const sampleJobs = jobListInGroup && jobListInGroup.filter(job => {
        const isSample = job.get('sample_job');
        return isSample ? true : false
      })
      return jobListInGroup ? acc.concat(sampleJobs) : acc
    }, []) : jobs.filter(job => job.get('sample_job'))

    const jobCount = strategy === 'group' ? jobs.reduce((acc, jobGroup) => {
      return acc + (jobGroup[1] ? jobGroup[1].length : 0)
    }, 0) : jobs.length

    const hasOnlySampleJobs = jobCount > 0 && jobCount === filteredSampleJobs.length

    const jobsList = jobs.length > 0
      ? jobs.map((job) => {
        if (Array.isArray(job)) {
          return this.renderGroup(...job)
        }
        return <JobListRow jobId={job.get('id')} key={job.get('id')} />
      })
      : <JobListEmptyResult companyId={companyId} filterType={this.getFilterType({hasJobs, currentStageId, filterString})} />

    return (
      <div className="listings animated fadeIn">
        {jobsList}
        {hasOnlySampleJobs ?
          <InlineNotification theme="neutral" style={{
            marginTop: 15,
            marginBottom: 15,
            padding: 20,
            borderRadius: 5,
          }}>
            <div style={{fontSize: 18, fontWeight: 600, marginBottom: 5}}>Dive in with the sample job{ filteredSampleJobs.length > 1 ? 's' : ''} above.</div>
            Every Snugg Pro account comes with two free sample jobs already created:<br/>
            <ul style={{marginTop: 10, marginBottom: 10, paddingLeft: 20}}>
              <li>A reference job pre-filled with values, text and photos that you can edit.</li>
              <li>A blank job for evaluation purposes to start from scratch.</li>
            </ul>
            {filteredSampleJobs.length !== 2 ?
              <p>If you don't see both jobs above, one of them may have been moved to a different stage. Select the stages dropdown at the top of this screen and look for it.</p> : null
            }

            You can also <a href="https://snuggpro.com/help/article/free-sample-jobs" target="_blank">read about sample jobs</a> or &nbsp;
            <a href="https://snuggpro.com/images/uploads/SnuggPro-Sample-Report.pdf" target="_blank" >download a sample PDF report</a>.
          </InlineNotification>
          : null
        }
      </div>
    )
  }
};
