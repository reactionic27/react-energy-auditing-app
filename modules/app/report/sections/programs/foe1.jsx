import React from 'react'
import {RRow, RCol} from 'ui'


export default class FOE1 extends React.Component {

  render() {
    return (
      <div className="report-page-rebates-foe">
        <div className="report-body">
          <div className="report-main">
            <RRow>
              <RCol span={3}>
                <h3>Focus info</h3>

                <p>Focus on Energy is Wisconsin utilities’ statewide energy
                efficiency and renewable resource program.
                Since 2001, the program has worked with eligible Wisconsin
                residents and businesses to install cost-effective energy
                efficiency and renewable energy projects. </p>
                <p>The information,
                resources and financial incentives we provide help to implement
                energy saving projects that otherwise would not be completed,
                or to complete projects sooner than scheduled.</p>
                <hr/>
                <p>
                  Note: To qualify for Tier 2 incentives your household income
                  must be equal to or less than 80 percent of the 2017 State Median Income.
                  <br/>Incentive Amounts and requirements are subject to change.
                  Consult with your Trade Ally or visit focusonenergy.com/myhome
                  for complete program information.
                </p>
              </RCol>

              <RCol span={9}>
                <h2>Heating & Cooling Improvements</h2>
                <table cellPadding="0" cellSpacing="0" className="table table-striped table-bordered table-extra-condensed">
                  <tbody>
                    <tr>
                      <th>Equipment</th>
                      <th colSpan='2' style={{textAlign: 'center'}}>Tier 1</th>
                      <th colSpan='2' style={{textAlign: 'center'}}>Tier 2</th>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}></td>
                      <td style={{width: 100}}>Incentive</td>
                      <td style={{width: 100}}>Incentive w/ Smart
                      Thermostat*</td>
                      <td style={{width: 100}}>Incentive</td>
                      <td style={{width: 100}}>Incentive w/ Smart
                      Thermostat*</td>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}>Natural
                      gas multi-stage furnace with ECM, 95%+ AFUE</td>
                      <td>$125 </td>
                      <td>$250 </td>
                      <td>$525 </td>
                      <td>$650 </td>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}>Natural
                      gas multi-stage furnace with ECM and 95%+ AFUE installed with a 16+ SEER air
                      conditioner</td>
                      <td>$250 </td>
                      <td>$375 </td>
                      <td>$750 </td>
                      <td>$875 </td>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}>Modulating
                      natural gas boiler with outdoor reset control, 95%+ AFUE</td>
                      <td>$400 </td>
                      <td>$525 </td>
                      <td>$550 </td>
                      <td>$675 </td>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}>Indirect
                      water heater (installed at the same time as qualified boiler)</td>
                      <td>$100 </td>
                      <td>NA</td>
                      <td>$150 </td>
                      <td>NA</td>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}>Modulating
                      combination natural gas boiler with integrated domestic hot water and outdoor
                      reset control, 95%+AFUE</td>
                      <td>$500 </td>
                      <td>$625 </td>
                      <td>$675 </td>
                      <td>$800 </td>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}>Propane
                      multi-stage furnace with ECM, 90%+ AFUE</td>
                      <td>$100 </td>
                      <td>NA</td>
                      <td>$300 </td>
                      <td>NA</td>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}>Natural
                      gas furnace, 95%+ AFUE</td>
                      <td>NA</td>
                      <td>NA</td>
                      <td>$350 </td>
                      <td>$475 </td>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}>Air
                      source heat pump, 16+ SEER and 8.4 HSPF (propane, oil or electric furnace
                      only; cannot be a mini-split or ductless system)</td>
                      <td>$300 </td>
                      <td>$425 </td>
                      <td>$300 </td>
                      <td>$425 </td>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}>Ductless/mini-split
                      heat pump for electric resistance heated home, 18+ SEER and 9.0 HSPF (only for homes heated solely with electric
                      resistance heat)</td>
                      <td>$500 </td>
                      <td>NA</td>
                      <td>$500 </td>
                      <td>NA</td>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}>ECM
                      replacement</td>
                      <td>$100 </td>
                      <td>NA</td>
                      <td>$100 </td>
                      <td>NA</td>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}>Smart
                      thermostat stand-alone (not installed along with new program qualified HVAC
                      equipment). For use with natural gas furnace, natural gas boiler, and air
                      source heat pump only.</td>
                      <td>$75 </td>
                      <td>NA</td>
                      <td>$75 </td>
                      <td>NA</td>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}>Heat
                      pump water heater for electric water heater replacement only (ENERGY STAR®
                      qualified)</td>
                      <td>$300 </td>
                      <td>NA</td>
                      <td>$300 </td>
                      <td>NA</td>
                    </tr>
                    <tr style={{textAlign: 'right'}}>
                      <td style={{textAlign: 'left'}}>BONUS
                      when you complete Heating and Cooling Improvements and Whole Home
                      Improvements together within 90 days of each other. Does not include smart
                      thermostat stand-alone.</td>
                      <td>$250 </td>
                      <td>$250 </td>
                      <td>$250 </td>
                      <td>$250 </td>
                    </tr>
                  </tbody>
                </table>
                <p><small>* Includes installation and smart thermostat incentive.</small></p>
              </RCol>
            </RRow>
          </div>
        </div>
      </div>
    )
  }

}
