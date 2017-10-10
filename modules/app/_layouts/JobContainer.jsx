import React from 'react'
import {Map as IMap} from 'immutable'
import JobHeader from 'app/components/JobHeader'
// import {ServicesDown} from 'app/components/overlays'
import {connect} from '../../snugg-redux'
import DocumentTitle from 'react-document-title'
import {Col, Row} from 'react-bootstrap'

@connect((state, {jobId}) => {
  const job = state.fn.jobById(jobId)
  const isTemplate = job.get('is_template')
  const company = state.fn.companyByJobId(jobId) || IMap()
  return { job, isTemplate, companyName: company.get('name'), companyId: company.get('id') }
})
export default class JobLayout extends React.Component {

  static childContextTypes = {
    jobId: React.PropTypes.number.isRequired
  };

  getChildContext() {
    return {
      jobId: this.props.jobId
    }
  }

  render() {
    const {jobId, job, segments} = this.props
    return (
      <DocumentTitle title="Snugg Pro">
        <Row style={{background: '#F4F4F4'}}>
          <Col sm={12}>
            <JobHeader job={job} jobId={jobId} segments={segments} />
            {/* <BannerNotification message={<ServicesDown />} theme="danger" /> */}
            {this.props.children}
          </Col>
        </Row>
      </DocumentTitle>
    );
  }
};
