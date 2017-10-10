import React from 'react'
import * as f from 'data/formatters'
import {pureConnect} from 'snugg-redux'

@pureConnect((state, {jobId}) => ({
  recs: state.fn.recommendationsByJobId(jobId),
  totals: state.fn.totalsByJobId(jobId),
  job: state.fn.jobById(jobId)
}))
export default class HeaderMetrics extends React.Component {
  render() {
    const {totals, recs, job} = this.props
    const hasUnmodeledChanges = job.get('has_unmodeled_changes')
    const formattedTotals = f.totals.formattedTotals(totals)
    const unmodeledChangesStyle = hasUnmodeledChanges ? {textDecoration: 'line-through'} : {}

    return (
      <div className="header-metrics">
        <div className="header-metric">
          <small>Costs</small>
          <span style={unmodeledChangesStyle}>{f.recs.recTotalCost(recs, 'd!0~prefix!$')}</span>
        </div>
        <span>
          <div className="header-metric">
            <small>Yr. Savings</small>
            <span style={unmodeledChangesStyle}>{formattedTotals.totalSavings}</span>
          </div>
          <div className="header-metric">
            <small>Savings</small>
            <span style={unmodeledChangesStyle}>{formattedTotals.savedMbtuPercent}</span>
          </div>
          <div className="header-metric">
            <small>SIR</small>
            <span style={unmodeledChangesStyle}>{formattedTotals.sir}</span>
          </div>
          <div className="header-metric">
            <small>MIRR</small>
            <span style={unmodeledChangesStyle}>{formattedTotals.mirr}</span>
          </div>
        </span>
      </div>
    )
  }
}
