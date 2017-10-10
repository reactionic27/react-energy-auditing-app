import React, {PropTypes} from 'react'
import pure from 'pure-render-decorator'
import {connect} from 'snugg-redux'
import {ReportSection, ReportHeader, ReportBody, ReportFooter} from 'app/report/components'
import RecommendationContent from './RecommendationContent'
import AdditionalNotesReportSidebar from './AdditionalNotesReportSidebar'
import * as f from 'data/formatters'
import {dispatchEagerCreate} from 'data/actions'
import {InlineNotification} from 'app/components/overlays'

@pure
class AdditionalNotes extends React.Component {

  render() {
    const {uuid, jobId, printing} = this.props
    return (
      <ReportSection name="additional_notes" paginating={RecommendationContent.paginating} uuid={uuid}>
        <ReportHeader field="Recommendation: Title" uuid={uuid} />
        <ReportBody>
          <AdditionalNotesReportSidebar jobId={jobId} uuid={uuid} />
          <RecommendationContent jobId={jobId} uuid={uuid} printing={printing} />
        </ReportBody>
        <ReportFooter jobId={jobId} />
      </ReportSection>
    )
  }
}

@connect((state, {jobId}) => ({
  recs: state.fn.recommendationsByJobId(jobId)
}), {dispatchEagerCreate})
export default class AdditionalNotesReportSection extends React.Component {

  static contextTypes = {
    jobId: PropTypes.number,
    printing: PropTypes.bool
  }

  addRecommendation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {jobId} = this.context
    this.props.dispatchEagerCreate(
      'recommendations',
      f.recs.createPayload(jobId, 'mentioned')
    )
  }

  render() {
    const {
      props: { recs },
      context: { jobId, printing },
    } = this
    const additionalNotes = f.recs.mentionedRecs(recs);

    if (additionalNotes.length === 0 && printing) {
      return null
    }

    if (additionalNotes.length === 0) {
      return (
        <div>
          <h3 className="editable-container">Additional Notes</h3>
          <div className="report-page" style={{height: 665}}>
            <InlineNotification>
              <h4>You do not have any additional notes.</h4>
              <p>
                <a href='#' onClick={this.addRecommendation}>Click here to add a note.</a>
              </p>
              <p>This page will not show up on the final report unless you add an additional note.
              If you don't plan on having additional notes for this job, you can turn the page off
              in the 'settings' menu above.</p>
            </InlineNotification>
          </div>
        </div>
      )
    }

    return (
      <div>
        {additionalNotes.map(rec => (
          <AdditionalNotes key={rec.get('uuid')} jobId={jobId} uuid={rec.get('uuid')} printing={printing} />
        ))}
      </div>
    )
  }
}
