import React from 'react'
import Value from 'util/value'
import {connectSelector} from 'snugg-redux'
import {currentTotals, currentReport} from 'data/selectors'

// @connectSelector({
//   totals: currentTotals,
//   report: currentReport
// })
export default class FinancingReportSidebar extends React.Component {

  renderEnergySavings(totals) {
    return (
      <div>
        <h3>Post Upgrade Savings:</h3>
        <p>{new Value(totals.monthlyEnergySavings()).prefix('$ ').suffix(' /mo').toString()}</p>
      </div>
    )
  }

  render() {
    let {totals, report} = this.props
    return (
      <div>
        <h3>About financing</h3>
        <p>
          The loan scenario(s) listed are examples only and are not a formal offer of financing.
          Rates, terms and closing costs and eligibility requirements may vary.
        </p>
      </div>
    );
  }

}
