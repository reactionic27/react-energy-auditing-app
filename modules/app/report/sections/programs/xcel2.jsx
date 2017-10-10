import React from 'react'
require('../../../../../src/less/app/programs/xcel.less')
import flameIcon32 from '../../../../../src/img/programs/xcel/flameicon32.png'
import plugicon32 from '../../../../../src/img/programs/xcel/plugicon32.png'
import toolboxIcon from '../../../../../src/img/programs/xcel/toolbox.png'


export default class XCEL2 extends React.Component {

  render() {
    return (
      <div className="report-page-rebates-xcel">
        <h2 className="rebate-header">2017-2018 Xcel Energy Rebate Summary Continued...</h2>
        <table className="table rebate-table xcel-table-2">
          <colgroup>
            <col className="col-power" />
            <col className="col-rebate-area" />
            <col className="col-rebate" />
            <col className="col-info" />
          </colgroup><thead>
            <tr>
              <th>Key*</th>
              <th>Rebate Area</th>
              <th>Rebate</th>
              <th>More Information</th>
            </tr>
          </thead>
          <tbody>
            <tr className="header-audit">
              <td colSpan={4}><strong>HOME ENERGY AUDIT BY XCEL ENERGY</strong></td>
            </tr>
            <tr className="item-audit-odd">
              <td className="col-power"><img src={plugicon32} className="rebate-icon" /><img src={flameIcon32} className="rebate-icon" /><img src={toolboxIcon} className="rebate-icon" /></td>
              <td className="col-rebate-area">Infrared Audit</td>
              <td className="col-rebate">$200</td>
              <td className="col-info">60% of the cost, up to $200</td>
            </tr>
            <tr className="item-audit-even">
              <td className="col-power"><img src={plugicon32} className="rebate-icon" /><img src={flameIcon32} className="rebate-icon" /><img src={toolboxIcon} className="rebate-icon" /></td>
              <td className="col-rebate-area">Blower door audit</td>
              <td className="col-rebate">$160</td>
              <td className="col-info">60% of the cost, up to $160</td>
            </tr>
            <tr className="item-audit-odd">
              <td className="col-power"><img src={plugicon32} className="rebate-icon" /><img src={flameIcon32} className="rebate-icon" /><img src={toolboxIcon} className="rebate-icon" /></td>
              <td className="col-rebate-area">Standard audit</td>
              <td className="col-rebate">$100</td>
              <td className="col-info">60% of the cost, up to $100</td>
            </tr>
          </tbody>
        </table>
        <table className="table rebate-table xcel-table-2">
          <colgroup>
            <col className="col-power" />
            <col className="col-rebate" />
            <col className="col-rebate" />
            <col className="col-info" />
          </colgroup>
          <tbody>
            <tr className="header-hpwes">
              <td colSpan={4}>
                <strong>Home Performance with ENERGY STAR&reg;</strong></td>
            </tr>
            <tr>
              <td className="col-power"><img src={plugicon32} className="rebate-icon" /><img src={flameIcon32} className="rebate-icon" /><img src={toolboxIcon} className="rebate-icon" /></td>
              <td colSpan={3}><strong>Begin with an advanced Home Energy Audit.</strong> Bundle three or more energy ef ciency improvements with Home Performance with ENERGY STAR. Natural gas service customers without Xcel Energy electric service do not qualify for this rebate program. Customers should specify that they want the higher, bundled rebates before any work is performed by a contractor. Customers applying for Home Performance rebates cannot receive other Xcel Energy rebates for the same improvements.</td>
            </tr>
          </tbody>
        </table>

        <table className="table rebate-table xcel-table-2-1">
          <colgroup>
            <col className="col-measures" />
            <col className="col-utility1" />
            <col className="col-utility1.1" />
            <col className="col-utility2" />
            <col className="col-utility3" />
          </colgroup>
          <thead>
            <tr>
              <th colSpan={1}>Home Improvement Measures</th>
              <th colSpan={4}>Rebates for Home Performance Measures</th>
            </tr>
          </thead>
          <tbody>
            <tr className="subheader-hpwes">
              <td><strong>Top three REQUIRED improvements</strong><br/>(If listed as a recommendation in the customer’s audit report)</td>
              <td colSpan={2}>Natural gas heating, no AC cooling</td>
              <td>Natural gas heating with AC cooling</td>
              <td>Electric resistance heating</td>
            </tr>
            <tr className="item-hpwes-odd">
              <td>High effciency LEDs*</td>
              <td colSpan={4} className="item-right">$2 per bulb up to $40</td>
            </tr>
            <tr className="item-hpwes-even">
              <td rowSpan={2}>Air sealing, bypass sealing and weather stripping*<br/>(60% up to cap)</td>
              <td>20% leakage reduction</td>
              <td className="item-right">$250</td>
              <td className="item-right">$400</td>
              <td className="item-right">$450</td>
            </tr>
            <tr className="item-hpwes-odd">
              <td>30% leakage reduction</td>
              <td className="item-right">$325</td>
              <td className="item-right">$500</td>
              <td className="item-right">$550</td>
            </tr>
            <tr className="item-hpwes-even">
              <td>Attic Insulation* (30% up to cap)</td>
              <td colSpan={2} className="item-right">$400</td>
              <td className="item-right">$600</td>
              <td className="item-right">$700</td>
            </tr>
            <tr className="subheader-hpwes">
              <td><strong>Optional Improvements</strong></td>
              <td colSpan={4}><strong>Rebates</strong></td>
            </tr>
            <tr className="item-hpwes-odd">
              <td>Wall insulation, above grade (30% up to cap)</td>
              <td colSpan={2} className="item-right">$400</td>
              <td className="item-right">$600</td>
              <td className="item-right">$700</td>
            </tr>
            <tr className="item-hpwes-even">
              <td>Evaporative cooling – standard system (First-time install)</td>
              <td colSpan={4} className="item-center">$325</td>
            </tr>
            <tr className="item-hpwes-odd">
              <td>Evaporative cooling – standard system (Replacement)</td>
              <td colSpan={4} className="item-center">$225</td>
            </tr>
            <tr className="item-hpwes-even">
              <td>Evaporative cooling – premium system (First-time install)</td>
              <td colSpan={4} className="item-center">$725</td>
            </tr>
            <tr className="item-hpwes-odd">
              <td>Evaporative cooling – premium system (Replacement)</td>
              <td colSpan={4} className="item-center">$625</td>
            </tr>
            <tr className="item-hpwes-even">
              <td>Evaporative cooling – Whole house system</td>
              <td colSpan={4} className="item-center">$1200</td>
            </tr>
            <tr className="item-hpwes-odd">
              <td>Central AC-15 SEER, 12.5 EER</td>
              <td colSpan={4} className="item-center">$400</td>
            </tr>
            <tr className="item-hpwes-even">
              <td>Central AC-16 SEER, 13 EER</td>
              <td colSpan={4} className="item-center">$550</td>
            </tr>
            <tr className="item-hpwes-odd">
              <td>Central AC-17 SEER, 13 EER</td>
              <td colSpan={4} className="item-center">$700</td>
            </tr>
            <tr className="item-hpwes-even">
              <td>Central AC trade-in (with qualifying new equipment)</td>
              <td colSpan={4} className="item-center">$550</td>
            </tr>
            <tr className="item-hpwes-odd">
              <td>Ground source heat pump-Min. 3.3 COP and 14.1 EER</td>
              <td colSpan={4} className="item-center">$300 per ton</td>
            </tr>
            <tr className="item-hpwes-even">
              <td>Programmable set back thermostat</td>
              <td colSpan={4} className="item-center">$25</td>
            </tr>
            <tr className="item-hpwes-odd">
              <td>95% + AFUE furnace</td>
              <td colSpan={4} className="item-center">$200</td>
            </tr>
            <tr className="item-hpwes-even">
              <td>Electronically commutated motor (ECM)</td>
              <td colSpan={4} className="item-center">$125</td>
            </tr>
            <tr className="item-hpwes-odd">
              <td>Tankless water heater .90 EF or higher</td>
              <td colSpan={4} className="item-center">$200</td>
            </tr>
            <tr className="item-hpwes-even">
              <td>Water heater .67 EF or higher</td>
              <td colSpan={4} className="item-center">$100</td>
            </tr>
            <tr className="item-hpwes-odd">
              <td>Electric heat pump water heater</td>
              <td colSpan={4} className="item-center">$550</td>
            </tr>
            <tr className="item-hpwes-even">
              <td>ENERGY STAR refrigerator – primary</td>
              <td colSpan={4} className="item-center">$15</td>
            </tr>
            <tr className="item-hpwes-even">
              <td>ENERGY STAR clothes washer</td>
              <td colSpan={4} className="item-center">$30</td>
            </tr>
          </tbody>
        </table>
        <div className="fine-print">*If any of these three measures are a recommended improvement from the energy audit, they must be completed in order to successfully complete the program.<br/><b>KEY:</b> <img src={flameIcon32} className="rebate-icon" />
          <b>Natural Gas</b>: This symbol indicates a program designed for our natural gas customers. &nbsp;
          <img src={plugicon32} className="rebate-icon" /><b>Electric</b>: This symbol indicates a program available to our electric customers.
          <br />
          <img src={toolboxIcon} className="rebate-icon" /><b>Participating contractor</b>: This symbol indicates a program that requires customers to use an Xcel Energy participating contractor to install the equipment or make the improvement.
        </div>
      </div>
    )
  }

}
