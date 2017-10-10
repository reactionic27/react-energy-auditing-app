import React from 'react'
import {connect} from 'snugg-redux'
import StatusToggle from './components/status-toggle'
import Col from 'ui/UICol'
import * as f from 'data/formatters'
import fmtFn from '../../util/fmtFn'

@connect((state, {rec, jobId}) => {
  const job = state.fn.jobById(jobId)
  const isTemplate = job.get('is_template')
  const hasCalculated = job.get('has_calculated')
  const hasUnmodeledChanges = f.job.hasUnmodeledChanges(job)
  const isHealthRec = f.recs.isHealthRec(rec)
  const isCustomRec = f.recs.isCustomRec(rec)
  const isRecommendedRec = f.recs.isRecommendedRec(rec)
  return {
    rec,
    hasCalculated,
    hasUnmodeledChanges,
    isHealthRec,
    isCustomRec,
    isRecommendedRec,
    modelWarning: !isTemplate && !isCustomRec && !hasCalculated,
    savingsWarning: isTemplate && !isCustomRec
  }
})
export default class CalculatedWrapper extends React.Component {

  static propTypes = {
    uuid: React.PropTypes.string.isRequired
  };

  savingsAndSir() {
    const {isRecommendedRec, hasCalculated, hasUnmodeledChanges, rec} = this.props
    const mutedSavingsStyle = isRecommendedRec ? {color: '#99928e'} : {}
    const unmodeledChangesStyle = hasUnmodeledChanges ? {textDecoration: 'line-through'} : {}

    const savingsInput = hasCalculated
      ? <span style={unmodeledChangesStyle}>{fmtFn(rec.get('savings'), "d!0~prefix!$")}</span>
      : "..."

    const sirInput = hasCalculated
      ? <span style={unmodeledChangesStyle}>{fmtFn(rec.get('sir'), "d!1")}</span>
      : "..."
    return (
      <div>
        <div className="span-savings span-rec" style={mutedSavingsStyle}>
          <small className="visible-xs-block span-label">Savings: </small>
          {savingsInput}
        </div>
        <div className="span-sir span-rec" style={mutedSavingsStyle}>
          <small className="visible-xs-block span-label">SIR: </small>
          {sirInput}
        </div>
      </div>
    )
  }

  render() {
    let {isRecommendedRec, isHealthRec, isCustomRec, uuid} = this.props

    const savingsAndSir = !isHealthRec && !isCustomRec
      ? this.savingsAndSir()
      : null

    return (
      <div>
        <Col sm={3} noGutter={['sm']} smOffset={0} xs={11} xsOffset={1} >
          {!isHealthRec ?
            <div onClick={(e) => e.stopPropagation()}>
              <StatusToggle uuid={uuid} view='list' />
            </div> : null}
        </Col>
        <Col xs={11} xsOffset={1} sm={4} md={5} smOffset={0} className="xs-ma-bo-20">
          <div className="span-cost span-rec">
            <small className="visible-xs-block span-label">Cost: </small>
            <Snugg.Input
              uuid={uuid}
              field='Recommendation: Cost'
              onClick={(e) => e.stopPropagation()}
              bareWithHelpBlock
              validate='decimals:2|gte:0|lte:100000'
              prefix="$"
              errorFormat="compact"
              disabled={!isRecommendedRec}
              style={{width: '110%'}} />
          </div>

          {savingsAndSir}

        </Col>
      </div>
    )
  }
};
