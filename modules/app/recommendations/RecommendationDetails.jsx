import React, {PropTypes} from 'react'
import {Map as IMap} from 'immutable'
import {InlineNotification} from 'app/components/overlays'
import {connect} from 'snugg-redux'
import {SectionCard} from 'ui'
import {Col} from 'react-bootstrap'
import * as f from 'data/formatters'
import fmtFn from '../../util/fmtFn'

@connect((state, {recommendation: rec, jobId}) => {
  const job = state.fn.jobById(jobId)
  const isTemplate = job.get('is_template')
  const hasCalculated = job.get('has_calculated')
  const isHealthRec = f.recs.isHealthRec(rec)
  const isCustomRec = f.recs.isCustomRec(rec)
  const isRecommendedRec = f.recs.isRecommendedRec(rec)
  return {
    hasCalculated,
    isHealthRec,
    isCustomRec,
    isRecommendedRec,
    savingsWarning: isTemplate && !isCustomRec
  }
})
export default class RecDetails extends React.Component {

  static props = {
    uuid: PropTypes.string.isRequired,
    jobIsTemplate: PropTypes.bool.isRequired,
    jobHasCalculated: PropTypes.bool.isRequired,
    recommendation: PropTypes.instanceOf(IMap).isRequired
  };

  costBlock() {
    const {uuid, isRecommendedRec} = this.props
    return (
      <Snugg.Input
        field="Recommendation: Cost"
        uuid={uuid}
        bare
        prefix="$"
        className="form-control"
        disabled={!isRecommendedRec} />
    )
  }

  savingsBlock() {
    const {hasCalculated, isHealthOrCustomRec, recommendation} = this.props
    if (isHealthOrCustomRec) return null
    const spanValue = hasCalculated
      ? fmtFn(recommendation.get('savings'), 'd!0~prefix!$')
      : "Not yet calculated"
    return (
      <Col sm={3} className="xs-ma-bo-20 span-savings span-rec">
        <small className="span-label">Savings: </small>
        <div className="span-value">{spanValue}</div>
      </Col>
    )
  }

  sirBlock() {
    const {hasCalculated, isHealthOrCustomRec, recommendation} = this.props
    if (isHealthOrCustomRec) return null
    const spanValue = hasCalculated
      ? fmtFn(recommendation.get('sir'),  "d!1")
      : "Not yet calculated"
    return (
      <Col sm={3} className="xs-ma-bo-20 span-sir span-rec">
        <small className="span-label">SIR: </small>
        <div className="span-value">{spanValue}</div>
      </Col>
    )
  }

  render() {
    const {isHealthRec, savingsWarning} = this.props

    if (isHealthRec) return null

    const savingsNotification = savingsWarning
      ? <InlineNotification message="Savings and SIR are not shown in templates. They will appear once you create and model a job." />
      : null

    return (
      <SectionCard.Container>
        <SectionCard.Header title="Cost" field="Recommendation: Cost" />
        <SectionCard.Body>
          {savingsNotification}
          {this.costBlock()}
          {/*TO DO BENKIRAN - Put this in the context pane
            {this.savingsBlock()}
            {this.sirBlock()}
            */}
        </SectionCard.Body>
      </SectionCard.Container>
    )
  }
}
