import React from 'react'
import {Map as IMap} from 'immutable'
import moment from 'moment'
import {PillContainer, Pill} from 'ui';
import JobInfo from 'app/job/components/job-info'
import JobOwnership from 'app/job/components/job-ownership'
import {Modal} from 'react-bootstrap'
import pure from 'pure-render-decorator'

function JobHeaderContent({job, jobId}) {
  return (
    <div>
      <div className="form-block">
        <form autoComplete="off">
          <PillContainer sm={8} smOffset={2}>
            <Pill title="Job" subtitle="Contact Info">
              <JobInfo job={job} jobId={jobId} />
            </Pill>
            <Pill title="Settings" subtitle="Co., user, stage & program">
              <JobOwnership jobId={jobId} />
            </Pill>
          </PillContainer>
        </form>
      </div>
    </div>
  )
}

@pure
export default class JobHeaderInfoInlay extends React.Component {

  static propTypes = {
    job: React.PropTypes.instanceOf(IMap).isRequired,
    show: React.PropTypes.bool.isRequired
  };

  render() {
    const {job} = this.props
    const jobId = job.get('id')
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.hideJobInfo}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div id='jobinfo'>
              <span className="title-bg">{job.get('is_template') ? `Template Info | #${jobId}` : `Job #${jobId} | `}</span>
              <small>
                Created on {moment(job.get('created_at')).format('MMMM DD, YYYY')}
              </small>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JobHeaderContent jobId={jobId} {...this.props} />
        </Modal.Body>
      </Modal>
    );
  }
}
