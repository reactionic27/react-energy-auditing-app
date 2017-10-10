import React, {PropTypes} from 'react'
import RecommendationTitle from './RecommendationTitle'
import RecDetails from './RecommendationDetails'
import RecNotes from './RecommendationNotes'

import RecGroups from 'app/recommendations/groups'
import RecommendationCaptionRows from 'app/recommendations/RecommendationCaptionRows'
import {InlineNotification} from 'app/components/overlays'
import {connect} from 'snugg-redux'
import {SectionCard} from 'ui'

const RenderModelWarning = (
  <InlineNotification title="We strongly recommend modeling this job before editing base values."
    message="When left blank, base values are populated with high-precision estimates.
    This can improve your audit's accuracy, and you can always edit base values
    after modeling is complete. However, if you’re confident of the accuracy of
    your numbers, then feel free to override them here before modeling."/>
)

@connect((state, {jobId, recommendation}) => {
  const job = state.fn.jobById(jobId)
  return {
    showWarning: !job.get('is_template') && !job.get('has_calculated'),
    recDefId: recommendation.get('rec_definition_id')
  }
})
class RecGroup extends React.Component {

  render() {
    const {showWarning, recDefId, jobId} = this.props
    let Group = RecGroups[recDefId]
    const isHVAC = recDefId === 4 || recDefId === 12 || recDefId === 9
    if (Group) {
      return (
        <div>
          <SectionCard.Container>
            <SectionCard.Header title={isHVAC ? 'HVAC Systems' : 'Now and Goal:'}/>
            <SectionCard.Body>
              {!isHVAC && showWarning && RenderModelWarning}
              <Group jobId={jobId} />
            </SectionCard.Body>
          </SectionCard.Container>
        </div>
      )
    }
    return null
  }
}

// The "body" of a recommendation element.
export default function RecommendationBody({recommendation, showFinancing, jobId}) {
  const uuid = recommendation.get('uuid')
  return (
    <form className="animated fadeIn">
      <div className="span-rec span-rec-name">
        <RecommendationTitle recommendation={recommendation} uuid={uuid} jobId={jobId}/>
      </div>
      {showFinancing === true && <RecDetails jobId={jobId} uuid={uuid} recommendation={recommendation} />}
      <RecommendationCaptionRows uuid={uuid} jobId={jobId} />
      <RecNotes uuid={uuid} />
      <RecGroup jobId={jobId} recommendation={recommendation} />
    </form>
  )
}

RecommendationBody.propTypes = {
  recommendation: PropTypes.object.isRequired,
  showFinancing: PropTypes.bool.isRequired
};

RecommendationBody.defaultProps = {
  showFinancing: false
}
