import React from 'react'
import JobFinancingCardList from './JobFinancingCardList'
import HeaderMetrics from 'app/components/HeaderFinancingMetrics'
import DocumentTitle from 'react-document-title'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'
import {Row, Col, PrimaryButton, Icon} from 'ui'
import {Clearfix} from 'react-bootstrap'
import dynamicResize from 'decorators/dynamicResize'
import CreateJobFinancingTemplate from './FinancingCreateJob'
import EditJobFinancingTemplate from './FinancingEditJob'
import SelectProducts from './SelectProducts'
import {FinancingInfoBox} from 'app/components/overlays'

@connect((state, {segments: {four, five}, jobId}) => {
  const create = four === 'create'
  const edit = four === 'edit'
  const select = four === 'select'
  const job = state.fn.jobById(jobId)
  return {
    pageTitle: f.job.pageTitle(job, "> Financing | Snugg Pro"),
    shouldShowCreateModal: create,
    shouldShowEditModal: edit,
    shouldShowSelectModal: select,
    isSampleJob: job.get('sample_job')
  }
})
@dynamicResize
export default class FinancingContainer extends React.Component {

  constructor() {
    super(...arguments)
    this.state = {
      showTemplateList: false
    }
  }

  render() {
    const {jobId, financingUuid, isSampleJob, pageTitle, shouldShowSelectModal, shouldShowCreateModal, shouldShowEditModal} = this.props
    return (
      <DocumentTitle title={pageTitle}>
        <div className="animated fadeIn job-container">
          <Row>
            <div className="content-header content-header-2">
              <Col sm={5} smPush={7}>
                <HeaderMetrics jobId={jobId} />
                <Clearfix/>
              </Col>
            </div>
          </Row>
          <FinancingInfoBox jobId={jobId} isSampleJob={isSampleJob}/>
          <Row>
            <Col sm={7} md={8}>
              <h2>Financing Products</h2>
              <p>Calculate financing & show up to 3 financing options on the final report. </p>
            </Col>
            <Col sm={5} md={4}>
              <PrimaryButton to={`/job/${jobId}/financing/select`}>
                Add a financing product <span style={{float:'right'}}><Icon type="addNew"/></span>
              </PrimaryButton>
            </Col>
          </Row>
          <div className="cards">
            <JobFinancingCardList jobId={jobId} />
          </div>

          <CreateJobFinancingTemplate show={shouldShowCreateModal} jobId={jobId} />

          <EditJobFinancingTemplate show={shouldShowEditModal} jobId={jobId} financingUuid={financingUuid} />

          <SelectProducts show={shouldShowSelectModal} jobId={jobId} />

          <Row>
            <Col sm={5} smOffset={7}>
              <PrimaryButton to={`/job/${jobId}/financing/select`}>
                Add a financing product <span style={{float:'right'}}><Icon type="addNew"/></span>
              </PrimaryButton>
            </Col>
          </Row>
        </div>
      </DocumentTitle>
    )
  }
}
