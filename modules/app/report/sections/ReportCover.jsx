import React, {PropTypes} from 'react'
import {ReportSection, ReportHeader, ReportBody, ReportFooter} from 'app/report/components'
import ReportCoverContent from './ReportCoverContent'
import ReportCoverSidebar from './ReportCoverSidebar'

export default class ReportCover extends React.Component {
  static contextTypes = {
    jobId: PropTypes.number,
    printing: PropTypes.bool
  }
  render() {
    const {
      props: {visibleSections},
      context: {jobId, printing}
    } = this
    return (
      <ReportSection name="cover">
        <ReportHeader field='Report: Cover Title' jobId={jobId} />
        <ReportBody>
          <ReportCoverSidebar jobId={jobId} />
          <ReportCoverContent jobId={jobId} visibleSections={visibleSections} printing={printing} />
        </ReportBody>
        <ReportFooter jobId={jobId} />
      </ReportSection>
    )
  }

}
