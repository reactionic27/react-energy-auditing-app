/**
 * The output of this is used for CA programs. It shows up in the sidebar
 * of the solutions page in the report.
 * This calculates the total incentive based on the percent savings
 * See ticket https://github.com/SnuggHome/4SnuggPro/issues/64 for calculations
*/
import React from 'react'
import {RRow, RCol} from 'ui'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'

@connect((state, {jobId}) => {
  const cost = f.recs.recTotalCost(state.fn.recommendationsByJobId(jobId))
  const report = state.fn.reportByJobId(jobId)
  const totals = state.fn.totalsByJobId(jobId)
  const programId = state.fn.programByJobId(jobId).get('id')

  let metrics = f.totals.calculatedMetrics(totals)
  // metrics = {...metrics, saved_mbtu_percent: 9}

  const costDisplayType = f.report.costDisplayType(report)

  return {
    cost,
    metrics,
    costDisplayType,
    displayCost: f.report.formattedRecTotalCost(cost),
    euc: f.program.eucIncentives(programId, metrics, cost, costDisplayType),
    showCosts: f.report.showCosts(report)
  }
})
export default class EucRebateCalculation extends React.Component {

  render() {
    const {metrics, displayCost, costDisplayType, euc, showCosts} = this.props
    return (
      <div>
        <RRow>
          <RCol span={12}>
            <div style={styles.incentiveBox} className="clearfix">
              <div style={styles.leftText}>
                If you perform these upgrades, <br/>
                you could be eligible for incentives up to:
              </div>
              <div style={styles.rightText}>{euc.formattedTotalIncentive}</div>
            </div>
          </RCol>
        </RRow>
        <RRow>
          <RCol span={12}>
            <h2 style={{marginTop: 40, marginBottom: 20}}>
              Energy Upgrade California® Home Upgrade
            </h2>
          </RCol>
        </RRow>
        <RRow>
          <RCol span={7}>
            <table className="table" style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Energy Type</th>
                  <th style={styles.th}>Now</th>
                  <th style={styles.th}>Goal</th>
                  <th style={styles.th}>Saved</th>
                  <th style={styles.thRight}>Incentive</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">Combined Energy Reduction</td>
                  <td>{metrics.mbtu_base} MBtu</td>
                  <td>{metrics.mbtu_improved} MBtu</td>
                  <td>{metrics.saved_mbtu_percent} %</td>
                  <td style={styles.tdRight}>{euc.formattedPercentIncentive}</td>
                </tr>
                <tr>
                  <td scope="row">Reduced Electricity</td>
                  <td>{metrics.annual_electric_kWh_used} kWh</td>
                  <td>{metrics.annual_electric_kWh_improved} kWh</td>
                  <td>{metrics.annual_electric_kWh_used_saved} kWh</td>
                  <td style={styles.tdRight}>{euc.showElectricIncentive ? euc.formattedElectricIncentive : ''}</td>
                </tr>
                <tr>
                  <td scope="row">Reduced Fuel</td>
                  <td>{metrics.annual_fuel_therms_used} Therms</td>
                  <td>{metrics.annual_fuel_therms_improved} Therms</td>
                  <td>{metrics.annual_fuel_therms_used_saved} Therms</td>
                  <td style={styles.tdRight}>{euc.showThermIncentive ? euc.formattedThermIncentive : ''}</td>
                </tr>
              </tbody>
            </table>
          </RCol>
          <RCol span={5}>
            <table className="table" style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Net Savings & Costs</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr style={{display: showCosts ? 'tableRow' : 'none'}}>
                  <td scope="row">
                    {costDisplayType === 'rounded' ? 'Estimated cost ' : 'Cost '}
                    before incentives
                  </td>
                  <td style={styles.tdRight}>{displayCost}</td>
                </tr>
                <tr>
                  <td scope="row">
                    Estimated Incentives
                    {euc.incentivesDescription ?
                      <small><br/>{euc.incentivesDescription}</small> : null
                    }
                  </td>
                  <td style={styles.tdRight}>{euc.formattedTotalIncentive}</td>
                </tr>
                <tr>
                  <td scope="row"><strong>Estimated net cost after incentives</strong></td>
                  <td style={styles.tdRight}><strong>{euc.formattedNetCost}</strong></td>
                </tr>
              </tbody>
            </table>
          </RCol>
        </RRow>
      </div>
    )
  }
}

// Not using radium here because we're not doing anything fancy with
// pseudo classes or media queries.
const styles = {
  incentiveBox: {
    paddingTop: 20,
    paddingRight: 25,
    paddingBottom: 25,
    paddingLeft: 25,
    backgroundColor: "#E9E9E9",
    borderRadius: 5,
    WebkitBorderRadius: 5
  },
  leftText: {
    fontSize: 24,
    width: "52%",
    float: "left",
    display: "inline-block",
    padding: "8px 0 0",
    lineHeight: "1.4em",
    color: "#575757"
  },
  rightText: {
    fontWeight: 700,
    fontSize: 80,
    color: "#363231",
    display: "block",
    textAlign: "right",
    lineHeight: "1em",
    whiteSpace: "nowrap"
  },
  tdRight: {
    textAlign: "right",
    whiteSpace: "nowrap"
  },
  table:{
    fontSize: "0.9em"
  },
  th: {
    fontSize: 11,
    textTransform: "uppercase",
  },
  thRight: {
    fontSize: 11,
    textTransform: "uppercase",
    textAlign: "right"
  }
}
