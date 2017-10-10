import React, {PropTypes} from 'react'
import {ReportSection, ReportHeader, ReportBody, ReportFooter} from 'app/report/components'
import pure from 'pure-render-decorator'
import HesReportContent from './HesReportContent'
import HesHeader from './hes/HesHeader'

@pure
export default class HesReportSection extends React.Component {

  static contextTypes = {
    jobId: PropTypes.number,
  }

  render() {
    const {
      context: {jobId}
    } = this
    return (
      <ReportSection name="hes">
        <ReportHeader field='Report: HES Title' jobId={jobId} disabled >
          <HesHeader  jobId={jobId} />
        </ReportHeader>
        <ReportBody>
          <HesReportContent jobId={jobId} segments={this.props.segments} />
        </ReportBody>
        <ReportFooter jobId={jobId}>
          <span/>
        </ReportFooter>
      </ReportSection>
    )
  }
};
