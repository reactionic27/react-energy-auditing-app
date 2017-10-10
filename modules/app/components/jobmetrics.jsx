import React from 'react'
import {connect, createSelector} from 'snugg-redux'
import * as f from 'data/formatters'
import compareKeys from '../../util/compareKeys'

class FuelUsageInOriginalUnits extends React.Component {
  render() {
    const {metrics, fuelType} = this.props
    // Cannot return null inside <tbody>, so hide it instead
    const showOrHide = f.utilities.canConvertFuelToTherms(fuelType)
      ? {}
      : {display: 'none'}
    const units = f.utilities.fuelUnits(fuelType)
    return (
      <tr style={showOrHide}>
        <td>
          <h6>Fuel Energy Usage
            <small> {String(fuelType).toLowerCase()} {units}/year</small>
          </h6>
        </td>
        <NumberCell>{f.utilities.thermConversion(metrics.annual_fuel_therms_used, fuelType)}</NumberCell>
        <NumberCell>{f.utilities.thermConversion(metrics.annual_fuel_therms_improved, fuelType)}</NumberCell>
        <NumberCell>{f.utilities.thermConversion(metrics.annual_fuel_therms_used_saved, fuelType)}</NumberCell>
      </tr>
    )
  }
}

let lastSnugg, lastJobId, lastReturnValue
@connect((state, {jobId}) => {
  if (lastJobId === jobId && lastSnugg && compareKeys(
    ['totals', 'basedata', 'utilities', 'job'],
    state.snugg,
    lastSnugg
  )) {
    return lastReturnValue
  }
  lastJobId = jobId
  lastSnugg = state.snugg
  lastReturnValue = {
    metrics: f.totals.formattedMetrics(state.fn.totalsByJobId(jobId)),
    demandkW: f.totals.formattedDemandkW(state.fn.basedataByJobId(jobId)),
    fuelType: state.fn.utilitiesByJobId(jobId).get('primary_heating_fuel_type'),
    job: state.fn.jobById(jobId)
  }
  return lastReturnValue
})
export default class JobMetrics extends React.Component {

  render() {
    const {metrics, fuelType, demandkW, job, jobId} = this.props
    return (
      <div>
        <table className="table table-striped table-condensed" style={tableStyles}>
          <tbody>
            <tr>
              <th>Metric</th>
              <th className="text-right">Baseline</th>
              <th className="text-right">Improved</th>
              <th className="text-right">Saved</th>
            </tr>
            <tr>
              <td>
                <h6>Fuel Energy Usage
                  <small> therms/year</small>
                </h6>
              </td>
              <NumberCell>{metrics.annual_fuel_therms_used}</NumberCell>
              <NumberCell>{metrics.annual_fuel_therms_improved}</NumberCell>
              <NumberCell>{metrics.annual_fuel_therms_used_saved}</NumberCell>
            </tr>
            <FuelUsageInOriginalUnits fuelType={fuelType} metrics={metrics} />
            <tr>
              <td><h6>Electric Energy Usage <small>kWh/year</small></h6></td>
              <NumberCell>{metrics.annual_electric_kWh_used}</NumberCell>
              <NumberCell>{metrics.annual_electric_kWh_improved}</NumberCell>
              <NumberCell>{metrics.annual_electric_kWh_used_saved}</NumberCell>
            </tr>

            {job.get('state') === 'CA' &&
              <tr>
                <td><h6>Electric Energy Demand <small>kW</small></h6></td>
                <NumberCell>{demandkW.demandKWBase}</NumberCell>
                <NumberCell>{demandkW.demandKWImp}</NumberCell>
                <NumberCell>{demandkW.demandKWSavings}</NumberCell>
              </tr>
            }

            <tr>
              <td><h6>Total Energy Usage <small>MMBtu/year</small></h6></td>
              <NumberCell>{metrics.mbtu_base}</NumberCell>
              <NumberCell>{metrics.mbtu_improved}</NumberCell>
              <NumberCell>{metrics.mbtu_base_saved}</NumberCell>
            </tr>
            <tr>
              <td><h6>Fuel Energy Cost <small>$/year</small></h6></td>
              <NumberCell>{metrics.annual_fuel_dollars_spent}</NumberCell>
              <NumberCell>{metrics.annual_fuel_dollars_improved}</NumberCell>
              <NumberCell>{metrics.annual_fuel_dollars_spent_saved}</NumberCell>
            </tr>
            <tr>
              <td><h6>Electric Energy Cost <small>$/year</small></h6></td>
              <NumberCell>{metrics.annual_electric_dollars_spent}</NumberCell>
              <NumberCell>{metrics.annual_electric_dollars_improved}</NumberCell>
              <NumberCell>{metrics.annual_electric_dollars_spent_saved}</NumberCell>
            </tr>
            <tr>
              <td><h6>Total Energy Cost <small>$/year</small></h6></td>
              <NumberCell>{metrics.yearly_energy_cost}</NumberCell>
              <NumberCell>{metrics.yearly_energy_cost_improved}</NumberCell>
              <NumberCell>{metrics.yearly_energy_cost_saved}</NumberCell>
            </tr>
            <tr>
              <td><h6>CO2 Production <small>Tons/year</small></h6></td>
              <NumberCell>{metrics.total_co2_tons_base}</NumberCell>
              <NumberCell>{metrics.total_co2_tons}</NumberCell>
              <NumberCell>{metrics.total_co2_tons_base_saved}</NumberCell>
            </tr>
            <tr>
              <td><h6>Payback <small>years</small></h6></td>
              <td/>
              <td/>
              <NumberCell>{metrics.payback_years}</NumberCell>
            </tr>
            <tr>
              <td><h6>Total Energy Savings</h6></td>
              <td/>
              <td/>
              <NumberCell>{metrics.saved_mbtu_percent}</NumberCell>
            </tr>
            <tr>
              <td><h6>Total Carbon Savings</h6></td>
              <td />
              <td />
              <NumberCell>{metrics.saved_co2_percent}</NumberCell>
            </tr>
            <tr>
              <td><h6>Net Savings to Investment Ratio <small>SIR</small></h6></td>
              <td />
              <td />
              <NumberCell>{metrics.sir}</NumberCell>
            </tr>
            <tr>
              <td><h6>Net Annualized Return <small>MIRR</small></h6></td>
              <td />
              <td />
              <NumberCell>{metrics.mirr}</NumberCell>
            </tr>
          </tbody>
        </table>
        <HeatingAndCoolingLoad jobId={jobId} />
      </div>
    )
  }
}

@connect(createSelector(
  (state, {jobId}) => state.fn.basedataByJobId(jobId),
  f.basedata.formattedLoadCalcs
))
class HeatingAndCoolingLoad extends React.Component {

  render() {
    const load = this.props
    return (
      <table className="table table-striped table-condensed" style={tableStyles}>
        <tbody>
          <tr>
            <th>Heating & Cooling Load Calculations</th>
            <th/>
            <th/>
          </tr>
          <tr>
            <td><h6>Heating Load <small>Btu/hr</small></h6></td>
            <NumberCell>
              <span style={smaller}>Base: </span>{load.heatingLoadBase}
            </NumberCell>
            <NumberCell>
              <span style={smaller}>Improved: </span>{load.heatingLoadImproved}
            </NumberCell>
          </tr>
          <tr>
            <td><h6>Cooling Load: Sensible <small>Btu/hr</small></h6></td>
            <NumberCell>
              <span style={smaller}>Base: </span>{load.coolingLoadSensibleBase}
            </NumberCell>
            <NumberCell>
              <span style={smaller}>Improved: </span>{load.coolingLoadSensibleImproved}
            </NumberCell>
          </tr>
          <tr>
            <td><h6>Cooling Load: Latent <small>Btu/hr</small></h6></td>
            <NumberCell>
              <span style={smaller}>Base: </span>{load.coolingLoadLatentBase}
            </NumberCell>
            <NumberCell>
              <span style={smaller}>Improved: </span>{load.coolingLoadLatentImproved}
            </NumberCell>
          </tr>
          <tr>
            <td><h6>Winter Design Temperature</h6></td>
            <NumberCell>
              <span style={smaller}>Outdoor: </span>{load.designTempWinterOutdoorBase}
            </NumberCell>
            <NumberCell>
              <span style={smaller}>Indoor: </span>{load.designTempWinterIndoorBase}
            </NumberCell>
          </tr>
          <tr>
            <td><h6>Summer Design Temperature</h6></td>
            <NumberCell>
              <span style={smaller}>Outdoor: </span>{load.designTempSummerOutdoorBase}
            </NumberCell>
            <NumberCell>
              <span style={smaller}>Indoor: </span>{load.designTempSummerIndoorBase}
            </NumberCell>
          </tr>
        </tbody>
      </table>
    )
  }
}

const NumberCell = (props) => (
  <td style={{textAlign: 'right', verticalAlign: 'inherit'}}>
    {props.children}
  </td>
)

const smaller = {fontSize: 8 }

const tableStyles = {
  fontSize: '0.9em'
}
