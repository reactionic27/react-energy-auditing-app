import React, {PropTypes} from 'react'
import FinancingReportSidebar from './FinancingReportSidebar'
import FinancingReportPane from './FinancingReportPane'
import {connect} from 'react-redux'
import {RRow, RCol} from 'ui'
import {InlineNotification} from 'app/components/overlays'
import {ReportSection, ReportHeader, ReportBody, ReportFooter} from 'app/report/components'

const FinancingBlankState = () => (
  <RCol span={9}>
    <InlineNotification
      title="You have not selected any loan products to show."
      message="You can either hide this page in the report's settings menu or choose to offer loan products by going to this job's finance screen." />
  </RCol>
)

// Simple memoization of the last return value to
// prevent excess re-renders when printing
let lastFinancing, lastReturn
@connect((state, props) => {
  const financing = state.fn.jobFinancingByJobId(props.jobId)
  if (lastFinancing === financing) return lastReturn
  lastFinancing = financing
  lastReturn = {
    selectedJobFinancing: financing.filter((p) => p.get('is_shown')).slice(0, 3)
  }
  return lastReturn
})
export default class FinancingReportSection extends React.Component {
  static contextTypes = {
    jobId: PropTypes.number,
    printing: React.PropTypes.bool
  }
  render() {
    const {
      props: {selectedJobFinancing},
      context: {jobId, printing}
    } = this
    let financingContent = <FinancingBlankState />

    if (selectedJobFinancing.length === 0 && printing) {
      return null
    }

    if (selectedJobFinancing.length > 0) {
      financingContent = selectedJobFinancing.map(product => (
        <FinancingReportPane jobId={jobId} product={product} key={product.get('uuid')} count={selectedJobFinancing.length} />
      ))
    }
    return (
      <ReportSection name="financing">
        <ReportHeader field='Report: Financing Title' jobId={jobId} />
        <ReportBody>
          <FinancingReportSidebar jobId={jobId} />
          <RRow>
            {financingContent}
          </RRow>
        </ReportBody>
        <ReportFooter jobId={jobId} />
      </ReportSection>
    )
  }

}
