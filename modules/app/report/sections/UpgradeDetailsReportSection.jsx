import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import RecommendationContent from './RecommendationContent'
import UpgradeDetailsReportSidebar from './UpgradeDetailsReportSidebar'
import * as f from 'data/formatters'
import pure from 'pure-render-decorator'
import {ReportSection, ReportHeader, ReportBody, ReportFooter} from 'app/report/components'

@pure
class UpgradePage extends React.Component {
  static contextTypes = {
    jobId: PropTypes.number,
    printing: PropTypes.bool
  }
  render() {
    const {
      props: {recDefId, uuid},
      context: {jobId, printing}
    } = this
    return (
      <ReportSection name="upgrade_details" paginating={RecommendationContent.paginating} uuid={uuid} recDefId={recDefId}>
        <ReportHeader field='Recommendation: Title' uuid={uuid} />
        <ReportBody>
          <UpgradeDetailsReportSidebar uuid={uuid} jobId={jobId} />
          <RecommendationContent jobId={jobId} uuid={uuid} recDefId={recDefId} printing={printing} />
        </ReportBody>
        <ReportFooter jobId={jobId} />
      </ReportSection>
    )
  }
}

@connect((state, {jobId}) => ({
  recommendations: state.fn.recommendationsByJobId(jobId)
}))
export default class ReportPageUpgradeDetailContainer extends React.Component {

  render() {
    const {recommendations} = this.props
    const recs = f.recs.recommendedRecs(recommendations)
    return (
      <div>
        {recs.map(rec => (
          <UpgradePage
            recDefId={rec.get('rec_definition_id')}
            uuid={rec.get('uuid')}
            key={rec.get('uuid')} />
        ))}
      </div>
    )
  }
}
