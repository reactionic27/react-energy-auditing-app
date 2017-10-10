import React from 'react'
import {connect} from 'snugg-redux'
import {Icon} from 'ui'
import * as f from 'data/formatters'

const APPROXIMATE = 1;
const EXACT = 2;

@connect((state, {jobId, rec}) => {
  const report = state.fn.reportByJobId(jobId)
  const totals = state.fn.totalsByJobId(jobId)

  const elementCosts = report.get('element_costs')
  const elementSavings = report.get('element_savings')
  const elementCo2 = report.get('element_co2')
  let totalCost, totalSavings, recTotalCost, savedCo2Tons, savedCo2Cars, savedMbtuPercent;

  if (elementCosts) {
    recTotalCost = f.recs.recTotalCost(state.fn.recommendationsByJobId(jobId))
    if (elementCosts === APPROXIMATE) {
      totalCost = f.num.format(recTotalCost, {specialCeil: true, decimals: 0, prefix: '$ '})
    } else if (elementCosts === EXACT) {
      totalCost = f.num.format(recTotalCost, {decimals: 0, prefix: '$ '})
    } else {
      console.error('Invalid elementCosts value: ' + elementCosts)
    }
  }

  if (elementSavings) {
    totalSavings = f.num.format(totals.get('total_savings'), {decimals: 0, prefix: '$', suffix: ' per year'})
  }

  if (elementCo2) {
    savedMbtuPercent = f.num.format(totals.get('saved_mbtu_percent'), {decimals: 0, suffix: '%'})
    savedCo2Tons = f.num.format(totals.get('saved_co2_tons'), {decimals: 0, suffix: ' tons'})
    savedCo2Cars = f.num.format(totals.get('saved_co2_tons'), {decimals: 1, times: 0.208, suffix: '/yr'})
  }

  return {
    sirDisplayType: f.report.sirDisplayType(report),
    sir: f.num.format(totals.get('sir'), {decimals: 1}),
    totalCost,
    totalSavings,
    elementCosts,
    elementSavings,
    elementCo2,
    savedMbtuPercent,
    savedCo2Cars,
    savedCo2Tons
  }
})
export default class SolutionsReportSidebar extends React.Component {

  render() {
    const {
      sir, sirDisplayType, elementCosts, elementCo2,
      savedCo2Tons, savedCo2Cars, savedMbtuPercent,
      totalCost, elementSavings, totalSavings
    } = this.props

    let displayedCosts = null
    let displayedSavings = null
    let impactOfUpgrades = null

    if (elementCosts === APPROXIMATE) {
      displayedCosts = (
        <span>
          <h3 className="costs">Approximate Cost</h3>
          <h4 className="costs">
            {totalCost}
          </h4>
          <div style={styles.explanation}>This is a ballpark guess. Ask your contractor for a detailed bid.</div>
        </span>
      )
    }

    if (elementCosts === EXACT) {
      displayedCosts = (
        <span>
          <h3 className="costs">Cost</h3>
          <h4 className="costs">
            {totalCost}
          </h4>
        </span>
      )
    }

    if (elementSavings) {
      displayedSavings = (
        <div>
          <h3 className="savings">Estimated Savings</h3>
          <h4 className="savings">
            {totalSavings}
          </h4>
          <div style={styles.explanation}>
            This is an estimate of how much you could save starting in Year 1. Savings will only increase as energy prices rise over the years.
          </div>
        </div>
      )
    }

    if (elementCo2) {
      impactOfUpgrades = <div style={styles.explanation}>
        <h3>Impact of upgrades</h3>
        <dl>
          <dt>Energy Reduction</dt>
          <dd>
            {savedMbtuPercent}
          </dd>
          <div>
            <dt>Carbon (CO2) Savings</dt>
            <dd>
              {savedCo2Tons}
            </dd>
            <dt>Equivalent cars removed from the road</dt>
            <dd>
              {savedCo2Cars}
            </dd>
          </div>
        </dl>
      </div>
    }

    return (
      <div>

        {(displayedCosts || displayedSavings) ? <h2 className="costs">Totals</h2> : null}

        {displayedCosts}

        {displayedSavings}

        {/*SirIcon*/}
        {sirDisplayType === 'icon' && <SirIcon sir={sir} />}

        {(sirDisplayType === 'lineItem' || sirDisplayType === 'net') && <SirLineItem sir={sir} />}

        {impactOfUpgrades}
      </div>
    )
  }
}

const SirIcon = ({sir}) => {
  return (
    <div>
      <h3 className="savings">Pays for itself</h3>
      <h4 className="savings">
        <div>
          Package SIR: {sir}
          &nbsp;
          {sir > 1 && <Icon type="checkMark" size={16}/>}
        </div>
      </h4>
      <div style={styles.explanation}>
        There are many reasons to upgrade. When items pay for themselves it's even better.*
      </div>
    </div>
  )
}

const SirLineItem = ({sir}) => {
  return (
    <div>
      <h3 className="savings">Savings to Investment Ratio</h3>
      <h4 className="savings">
        Package SIR: {sir}
      </h4>
      <div style={styles.explanation}>
        There are many reasons to upgrade. An SIR greater than 1 pays for itself over the equipment lifetime.
      </div>
    </div>
  )
}

const styles = {
  explanation: {
    fontSize: '13px'
  }
}
