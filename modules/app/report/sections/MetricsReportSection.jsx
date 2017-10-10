import React, {PropTypes} from 'react'
import JobMetrics from 'app/components/jobmetrics'
import MetricsReportSidebar from './MetricsReportSidebar'
import {ReportSection, ReportHeader, ReportBody, ReportFooter} from 'app/report/components'
import pure from 'pure-render-decorator'

@pure
export default class MetricsReportSection extends React.Component {

  static contextTypes = {
    jobId: PropTypes.number,
  }

  render() {
    const {
      context: {jobId}
    } = this
    return (
      <ReportSection name="metrics">
        <ReportHeader field='Report: Metrics Title' jobId={jobId} />
        <ReportBody>
          <MetricsReportSidebar jobId={jobId} />
          <JobMetrics jobId={jobId} />
        </ReportBody>
        <ReportFooter jobId={jobId} />
      </ReportSection>
    )
  }
};
