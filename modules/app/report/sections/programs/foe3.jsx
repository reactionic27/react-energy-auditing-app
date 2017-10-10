import React from 'react'
import {RRow, RCol} from 'ui'


export default class FOE1 extends React.Component {

  render() {
    return (
      <div className="report-page-rebates-foe">
        <div className="report-body">
          <div className="report-main">
            <RRow>
              <RCol span={12}>
                <h2><strong>Ready to do more?</strong> Find the next program that is right for you!</h2>
                <table cellPadding="5" cellSpacing="5" className="table table-striped table-bordered">
                  <tbody>
                    <tr>
                      <th style={{textAlign: 'center'}} width="10%">PROGRAM NAME</th>
                      <th style={{textAlign: 'center'}} width="35%">WHO IS IT FOR</th>
                      <th style={{textAlign: 'center'}} width="45%">WHAT IS INCLUDED</th>
                      <th style={{textAlign: 'center'}} width="10%">INVESTMENT REQUIRED</th>
                    </tr>
                    <tr style={{textAlign: 'left'}}>
                      <td style={{textAlign: 'left'}}><a href="http://focusonenergy.com/heatingandcooling" target="_blank">Home Performance - Heating and Cooling Improvement Path</a><h6>focusonenergy.com/heatingandcooling</h6></td>
                      <td style={{textAlign: 'left'}}>Residents who have made air sealing and insulation improvements and want to do more. </td>
                      <td style={{textAlign: 'left'}}>Offers incentives for upgrading or installing heating and cooling equipment. </td>
                      <td style={{textAlign: 'center'}}>$$ - $$$ </td>
                    </tr>
                    <tr style={{textAlign: 'left'}}>
                      <td style={{textAlign: 'left'}}><a href="http://focusonenergy.com/appliance" target="_blank">Appliance Recycling</a><h6>focusonenergy.com/appliance</h6></td>
                      <td style={{textAlign: 'left'}}>Residents interested in removing an old or unused refrigerator or freezer. </td>
                      <td style={{textAlign: 'left'}}>Offers pickup of old, working refrigerators and freezers. Units will be recycled and disposed of in an environmentally friendly way. </td>
                      <td style={{textAlign: 'center'}}>FREE</td>
                    </tr>
                    <tr style={{textAlign: 'left'}}>
                      <td style={{textAlign: 'left'}}><a href="http://focusonenergy.com/appliancemarketplace" target="_blank">Online Marketplace</a><h6>focusonenergy.com/appliancemarketplace</h6></td>
                      <td style={{textAlign: 'left'}}>Residents interested in finding local retailers that offer discounts on energy-saving appliances. </td>
                      <td style={{textAlign: 'left'}}>Connects customers with participating retailers offering discounted ENERGY STAR appliances to make these high-performing, high-quality products more affordable.</td>
                      <td style={{textAlign: 'center'}}>FREE</td>
                    </tr>
                    <tr style={{textAlign: 'left'}}>
                      <td style={{textAlign: 'left'}}><a href="http://focusonenergy.com/simple" target="_blank">Simple Energy Efficiency</a><h6>focusonenergy.com/simple</h6></td>
                      <td style={{textAlign: 'left'}}>Residents interested in improving the energy efficiency of their homes by installing simple energy saving products. </td>
                      <td style={{textAlign: 'left'}}>Energy saving products for your home including LED light bulbs, power strips and more. </td>
                      <td style={{textAlign: 'center'}}>FREE</td>
                    </tr>
                    <tr style={{textAlign: 'left'}}>
                      <td style={{textAlign: 'left'}}><a href="http://focusonenergy.com/lighting" target="_blank">Retail Lighting</a><h6>focusonenergy.com/lighting</h6></td>
                      <td style={{textAlign: 'left'}}>Residents looking for an in-store discount on energy saving products. </td>
                      <td style={{textAlign: 'left'}}>Special discount pricing on LEDs at popular local participating retailers. </td>
                      <td style={{textAlign: 'center'}}>$</td>
                    </tr>
                    <tr style={{textAlign: 'left'}}>
                      <td style={{textAlign: 'left'}}><a href="http://focusonenergy.com/smart" target="_blank">Smart Thermostats</a><h6>focusonenergy.com/smart</h6></td>
                      <td style={{textAlign: 'left'}}>Residents interested in installing a new smart thermostat in their home. </td>
                      <td style={{textAlign: 'left'}}>Offers a cash incentive for installing a smart thermostat. </td>
                      <td style={{textAlign: 'center'}}>$$</td>
                    </tr>
                    <tr style={{textAlign: 'left'}}>
                      <td style={{textAlign: 'left'}}><a href="http://focusonenergy.com/newhomes" target="_blank">New Homes</a><h6>focusonenergy.com/newhomes</h6></td>
                      <td style={{textAlign: 'left'}}>Residents interested in building a new home. </td>
                      <td style={{textAlign: 'left'}}>Work with a certified Focus on Energy builder to ensure your new home is comfortable, combustion safe, energy efficient and durable. </td>
                      <td style={{textAlign: 'center'}}>$$$</td>
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
