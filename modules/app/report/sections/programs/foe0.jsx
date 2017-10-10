import React from 'react'
import {RRow, RCol} from 'ui'


export default class FOE0 extends React.Component {

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
                <br/>
              </RCol>
              <RCol span={9}>
                <h2>Whole Home Improvements</h2>
                <table className="table table-striped table-bordered" cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr>
                      <th>Air
                      Sealing and Insulation</th>
                      <th style={{textAlign: 'right'}}>Tier 1</th>
                      <th style={{textAlign: 'right'}}>Tier 2</th>
                    </tr>
                    <tr>
                      <td>10-19%
                      energy reduction</td>
                      <td style={{textAlign: 'right'}}>$850 </td>
                      <td style={{textAlign: 'right'}}>$1,000 </td>
                    </tr>
                    <tr>
                      <td>20-29%
                      energy reduction</td>
                      <td style={{textAlign: 'right'}}>$1,250 </td>
                      <td style={{textAlign: 'right'}}>$1,500 </td>
                    </tr>
                    <tr>
                      <td >30%+
                      energy reduction</td>
                      <td style={{textAlign: 'right'}}>$2,000 </td>
                      <td style={{textAlign: 'right'}}>$2,250 </td>
                    </tr>
                  </tbody>
                </table>
                <p>Note: To qualify for Tier 2 incentives your household income must
                be equal to or less than 80 percent of the 2017 State Median Income.</p>

                <p>Improvements that are used to improve incentive savings numbers: </p>
                <RRow>
                  <RCol span={3}>
                    <ul>
                      <li>Air Leaks</li>
                      <li>Attic &amp; Kneewalls</li>
                      <li>Crawl Space</li>
                    </ul>
                  </RCol>
                  <RCol span={2}>
                    <ul>
                      <li>Exterior Walls</li>
                      <li>Basement</li>
                    </ul>
                  </RCol>
                  <RCol span={4}>
                    <ul>
                      <li>Frame Floor &amp; Cantilevers</li>
                      <li>Sloped or Cathedral Ceilings</li>
                    </ul>
                  </RCol>
                </RRow>

                <p>Receive a $250 bonus when you complete Whole Home Improvements
                and Heating and Cooling Improvements together.
                Improvements must be completed within 90 days of each other. </p>

                <p>The Total Energy Savings estimated is based on the installation
                of all measures as specifically stated above and is solely based
                on the information as entered by the Trade Ally in the Program software.
                The Program reserves the right to inspect all installations in
                order to ensure compliance with all Program requirements.
                Responsibility for proper installations of measures, as well
                as delivery and workmanship related to any measures or services
                the customer procures rests exclusively with the Trade Ally
                selected by the Customer.</p>
                <p>Incentive Amounts and requirements are subject to change.
                Consult with your Trade Ally or visit <a href="http://focusonenergy.com/myhome" target="_blank">focusonenergy.com/myhome </a>
                for complete program information.</p>
              </RCol>
            </RRow>
          </div>
        </div>
      </div>
    )
  }

}
