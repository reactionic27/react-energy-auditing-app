import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import HealthReportSidebar from './HealthReportSidebar'
import RecommendationContent from './RecommendationContent'
import {ReportSection, ReportHeader, ReportBody, ReportFooter} from 'app/report/components'

@connect((state, {jobId}) => {
  const healthRec = state.fn.recByType(jobId, 'health')
  return {
    uuid: healthRec.get('uuid')
  }
})
export default class HealthAndSafety extends React.Component {
  static contextTypes = {
    jobId: PropTypes.number,
    printing: PropTypes.bool
  }
  render() {
    const {
      props: {uuid},
      context: {jobId, printing}
    } = this
    return (
      <ReportSection name="health" paginating={RecommendationContent.paginating} uuid={uuid} health>
        <ReportHeader field='Recommendation: Title' uuid={uuid} />
        <ReportBody>
          <HealthReportSidebar jobId={jobId} printing={printing} />
          <RecommendationContent jobId={jobId} uuid={uuid} printing={printing} />
        </ReportBody>
        <ReportFooter jobId={jobId} />
      </ReportSection>
    )
  }

};
