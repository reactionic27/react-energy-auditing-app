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
                <h2>Renewable Energy</h2>
                <table cellPadding="0" cellSpacing="0" className="table table-striped table-bordered table-extra-condensed">
                  <tbody>
                    <tr>
                      <th>Equipment</th>
                      <th style={{textAlign: 'left'}}>Incentive</th>
                    </tr>
                    <tr style={{textAlign: 'left'}}>
                      <td style={{textAlign: 'left'}}>Solar Electric (PV)</td>
                      <td>12% of installed cost up to $2000 </td>
                    </tr>
                    <tr style={{textAlign: 'left'}}>
                      <td style={{textAlign: 'left'}}>Geothermal</td>
                      <td>$650</td>
                    </tr>
                  </tbody>
                </table>
              </RCol>
            </RRow>
          </div>
        </div>
      </div>
    )
  }

}
