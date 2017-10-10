import React from 'react'
require('../../../../../src/less/app/programs/xcel.less')
import flameIcon32 from '../../../../../src/img/programs/xcel/flameicon32.png'
import plugicon32 from '../../../../../src/img/programs/xcel/plugicon32.png'
import toolboxIcon from '../../../../../src/img/programs/xcel/toolbox.png'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'

@connect((state, {jobId}) => {
  const job = state.fn.jobById(jobId)
  const { conditioned_area, blower_door_reading, floors_above_grade} = state.fn.basedataByJobIdJS(jobId)
  return {
    xcelIncentives: f.program.xcelIncentives(job.get('zip'), conditioned_area, blower_door_reading, floors_above_grade)
  }
})
export default class XCEL1 extends React.Component {

  render() {
    const {xcelIncentives: {eligible, value, validation}} = this.props
    return (
      <div className="report-page-rebates-xcel">
        <h2 className="rebate-header">2017-2018 Xcel Energy Rebate Summary: Colorado Residential Energy Efficiency Programs</h2>
        {!eligible && value ?
          <div className="fine-print2" style={{fontWeight: 600}}>Based on the Xcel Energy air tightness calculation,
            your home is “too tight” to qualify for air-sealing rebates. The lower limit is 0.50 and this home is {value}. That’s good news!
          </div> : null}
        <div className="fine-print">Check with your local jurisdiction for additional rebates, financing, and incentives you may qualify for beyond the stated Utility Rebates. Rebates and incentives are not guaranteed. Programs are subject to change. Rebates subject to change under pending PUC filings. Current information is located at xcelenergy.com/HomeRebates.</div>
        <table className="table rebate-table xcel-table-1">
          <colgroup>
            <col className="col-power" />
            <col className="col-rebate-area" />
            <col className="col-qualifier1" />
            <col className="col-qualifier2" />
            <col className="col-rebate" />
            <col className="col-info" />
          </colgroup><thead>
            <tr>
              <th>Key*</th>
              <th>Rebate Area</th>
              <th>Qualifiers</th>
              <th colSpan={2}>Rebate</th>
              <th>More Information</th>
            </tr>
          </thead>
          <tbody>
            <tr className="header-cooling">
              <td colSpan={6}><strong>Cooling</strong></td>
            </tr>
            <tr className="item-cooling-odd">
              <td rowSpan={5} className="col-power"><img src={plugicon32} className="rebate-icon" /></td>
              <td rowSpan={5} className="col-rebate-area">Evaporative Coolers</td>
              <td rowSpan={2}>Standard (window unit)</td>
              <td>First time install</td>
              <td>$300</td>
              <td rowSpan={4}>Rebate can't be more than total cost.<br/><br/>Rebate for  first-time install only available if additional equipment is listed on invoice such as pipes, valves.</td>
            </tr>
            <tr className="item-cooling-odd">
              <td>Replacement</td>
              <td>$200</td>
            </tr>
            <tr className="item-cooling-odd">
              <td rowSpan={2}>Premium unit</td>
              <td>First time install</td>
              <td>$700</td>
            </tr>
            <tr className="item-cooling-odd">
              <td>Replacement</td>
              <td>$600</td>
            </tr>
            <tr className="item-cooling-odd">
              <td>Whole house system</td>
              <td>All</td>
              <td>$1,200</td>
              <td>Premium unit with 3 ducts or more</td>
            </tr>
            <tr className="item-cooling-even">
              <td rowSpan={12} className="col-power"><img src={plugicon32} className="rebate-icon" /><img src={toolboxIcon} className="rebate-icon" /></td>
              <td rowSpan={12} className="col-rebate-area">High-Efficiency AC or ASHP (air conditioners and air source heat pumps)</td>
              <td rowSpan={3}>SEER 14.5/EER 12</td>
              <td>New</td>
              <td>$0<br /></td>
              <td rowSpan={12}>The rebate is paid according to the lesser value of the SEER/EER. Example: A system with 16 SEER and 12.5 EER will receive a $350 rebate. AHRI certifcate required.<br/><br/>SEER = Seasonal Energy Effciency Ratio<br/>HSPF = Heating Seasonal Performance Factor<br/>EER = Energy Effciency Ratio</td>
            </tr>
            <tr className="item-cooling-even">
              <td>Trade-in</td>
              <td>$500</td>
            </tr>
            <tr className="item-cooling-even">
              <td>Max rebate</td>
              <td>$500</td>
            </tr>
            <tr className="item-cooling-even">
              <td rowSpan={3}>SEER 15/EER 12.5</td>
              <td>New</td>
              <td>$350</td>
            </tr>
            <tr className="item-cooling-even">
              <td>Trade-in</td>
              <td>$500</td>
            </tr>
            <tr className="item-cooling-even">
              <td>Max rebate</td>
              <td>$850</td>
            </tr>
            <tr className="item-cooling-even">
              <td rowSpan={3}>SEER 16/EER 13</td>
              <td>New</td>
              <td>$500</td>
            </tr>
            <tr className="item-cooling-even">
              <td>Trade-in</td>
              <td>$500</td>
            </tr>
            <tr className="item-cooling-even">
              <td>Max rebate</td>
              <td>$1000</td>
            </tr>
            <tr className="item-cooling-even">
              <td rowSpan={3}>SEER 17, EER 13</td>
              <td>New</td>
              <td>$650<br /></td>
            </tr>
            <tr className="item-cooling-even">
              <td>Trade-in</td>
              <td>$500</td>
            </tr>
            <tr className="item-cooling-even">
              <td>Max rebate</td>
              <td>$1,150</td>
            </tr>
            <tr className="item-cooling-odd">
              <td rowSpan={2} className="col-power"><img src={plugicon32} className="rebate-icon" /></td>
              <td rowSpan={1} className="col-rebate-area">Ductless mini-split heat pumps</td>
              <td rowSpan={1}>15+ SEER, 9+ HSPF**</td>
              <td>Max rebate</td>
              <td>$200</td>
              <td rowSpan={1}>AHRI certifcate required</td>
            </tr>
            <tr className="item-cooling-even">
              <td rowSpan={1} className="col-rebate-area">Ground Source Heat Pumps</td>
              <td rowSpan={1}>Minimum 3.3 COP and 14.1 EER</td>
              <td>Max rebate per ton</td>
              <td>$300</td>
              <td rowSpan={1}>ENERGY STAR ® qualifed, closed-loop systems</td>
            </tr>
            <tr className="header-heating">
              <td colSpan={6}><strong>Heating</strong></td>
            </tr>
            <tr className="item-heating-odd">
              <td className="col-power"><img src={flameIcon32} className="rebate-icon" /></td>
              <td className="col-rebate-area">Furnaces</td>
              <td>95% AFUE</td>
              <td colSpan={1}>$120</td>
              <td rowSpan={2} colSpan={2}>Only new furnaces located on <strong>ahridirectory.org</strong> qualifies for a rebate.<br/>Customers must have electric service to qualify for the ECM rebate, and gas service to qualify for the furnace rebate. Qualifying customers may receive both a furnace and an ECM rebate.</td>
            </tr>
            <tr className="item-heating-odd">
              <td className="col-power"><img src={plugicon32} className="rebate-icon" /></td>
              <td className="col-rebate-area">Electronically Commutated Motors (ECM)</td>
              <td>ECM in new or existing furnace</td>
              <td>$100</td>
            </tr>
            <tr className="header-dhw">
              <td colSpan={6}><strong>Water Heating</strong></td>
            </tr>
            <tr className="item-dhw-odd">
              <td className="col-power"><img src={flameIcon32} className="rebate-icon" /></td>
              <td className="col-rebate-area">Standard Tank</td>
              <td>.67 EF</td>
              <td>$70</td>
              <td rowSpan={3} colSpan={2}>Only new equipment located on <strong>energystar.gov</strong> or <strong>ahridirectory.org</strong> qualifies for a rebate.</td>
            </tr>
            <tr className="item-dhw-odd">
              <td className="col-power"><img src={flameIcon32} className="rebate-icon" /></td>
              <td className="col-rebate-area">Tankless</td>
              <td>.90 EF</td>
              <td>$100</td>
            </tr>
            <tr className="item-dhw-odd">
              <td className="col-power"><img src={plugicon32} className="rebate-icon" /></td>
              <td colSpan={1} className="col-rebate-area">Heat Pump</td>
              <td>&nbsp;</td>
              <td>$450</td>
            </tr>
          </tbody>
        </table>
        <table className="table rebate-table xcel-table-1-1">
          <colgroup>
            <col className="col-power" />
            <col className="col-rebate-area" />
            <col className="col-qualifier" />
            <col className="col-utility1" />
            <col className="col-utility2" />
            <col className="col-utility3" />
          </colgroup><thead>
            <tr>
              <th>Key*</th>
              <th>Rebate Area</th>
              <th colSpan={4}>Qualifiers and Associated Rebates</th>
            </tr>
          </thead>
          <tbody>
            <tr className="header-insulation">
              <td colSpan={2} ><strong>Air Sealing and Insulation</strong></td>
              <td colSpan={4}>Eligible for Xcel Air Sealing Rebate: {validation} ({value})</td>
            </tr>
            <tr className="subheader-insulation">
              <td colSpan={2}>&nbsp;</td>
              <td colSpan={2}>Natural gas heating, no AC cooling</td>
              <td>Natural gas heating with AC cooling</td>
              <td>Electric resistance heating</td>
            </tr>
            <tr className="item-insulation-odd">
              <td rowSpan={4} className="col-power"><img src={plugicon32} className="rebate-icon" /><img src={flameIcon32} className="rebate-icon" /><img src={toolboxIcon} className="rebate-icon" /></td>
              <td colSpan={1} rowSpan={2} className="col-rebate-area">Air sealing, bypass sealing, weather stripping (60% up to cap)</td>
              <td>20% leakage reduction</td>
              <td className="item-right">$175</td>
              <td className="item-right">$300</td>
              <td className="item-right">$350</td>
            </tr>
            <tr className="item-insulation-even">
              <td>30% leakage reduction</td>
              <td className="item-right">$250</td>
              <td className="item-right">$400</td>
              <td className="item-right">$450</td>
            </tr>
            <tr className="item-insulation-odd">
              <td colSpan={1} className="col-rebate-area">Attic insulation (30% up to cap)</td>
              <td>&nbsp;</td>
              <td className="item-right">$350</td>
              <td className="item-right">$500</td>
              <td className="item-right">$600</td>
            </tr>
            <tr className="item-insulation-even">
              <td colSpan={1} className="col-rebate-area">External wall insulation, above grade (30% up to cap)</td>
              <td>&nbsp;</td>
              <td className="item-right">$350</td>
              <td className="item-right">$500</td>
              <td className="item-right">$600</td>
            </tr>
          </tbody>
        </table>
        <div className="fine-print">*Please see key on next page. **After May 2nd, 2017 minimum EER of 11 is also required
        </div>
      </div>
    )
  }

}
