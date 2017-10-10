import React from 'react'
import {RRow, RCol} from 'ui'

require('../../../../../src/less/app/programs/aps.less')

class APS extends React.Component {

  render() {
    return (
      <div className="report-page-rebates-aps">
        <div className="report-body">
          <div className="report-main">
            <RRow>
              <RCol span={8}>
                <RRow>
                  <RCol span={4}>
                    <h3>Home Performance with ENERGY STAR<sup>®</sup> Rebates*</h3>
                    <p>Customers who sign up for a $99 comprehensive home assessment gain access to special rebates through their Home Performance with ENERGY STAR<sup>®</sup> contractor.   These rebates include:</p>
                    <h4>Sealing Air Leaks</h4>
                    <p>APS offers rebates up to $250 for air sealing that reduces infiltration and improves insulation’s performance.</p>
                    <h4>Improving/Adding Insulation</h4>
                    <p>APS offers rebates up to $250 to upgrade attic insulation to R-30 when the existing insulation has a performing R-value of less than R-19.  In order to qualify for insulation rebates, customers must seal air leaks first to ensure maximum insulation performance.</p>
                    <h4>Sealing Ductwork</h4>
                    <p>APS offers up to $400 to seal and repair leaks in their heating and cooling duct system.</p>
                    <p>*APS Home Performance with ENERGY STAR<sup>®</sup> rebates are funded by APS customers and are approved by the Arizona Corporation Commission.</p>
                    <p>Energy Saving Disclaimer: Procedures used to make these estimates are consistent with criteria established by the U.S. Department of Energy for residential assessments. Actual installation costs and savings realized from installing measures may differ from the estimates contained in this report.</p>
                  </RCol>
                  <RCol span={4}>
                    <h3>Financing from National Bank of Arizona</h3>
                    <p>National Bank of Arizona has partnered with the APS Home Performance with ENERGY STAR<sup>®</sup> program to offer low, fixed rate financing for energy saving home improvement projects<sup>1</sup>.</p>
                    <h4>Get Financing for Your Energy Saving Home Improvement Project</h4>
                    <ul>
                      <li>Schedule your $99 comprehensive home checkup and work with a participating contractor² to identify potential improvements to your home.</li>
                      <li>Work with a participating contractor to make recommended improvements.</li>
                      <li>See how you may qualify for additional APS rebates.</li>
                      <li>Finance the whole project with no up-front cost and low fixed APR<sup>3</sup> – not to exceed 7.99%<sup>4</sup>.</li>
                      <li>After your energy audit is completed, apply for financing by calling 800-995-5626.</li>
                    </ul>
                    <div className="">
                      <ol>
                        <li>Credit approval required</li>
                        <li>Upgrades must be performed by a participating contractor</li>
                        <li>Annual Percentage Rate</li>
                        <li>Program terms and conditions subject to change without notice</li>
                      </ol>
                    </div>
                    <p>Financing may include health and safety based measures directly required for the installation of energy efficiency measures.</p>
                  </RCol>
                </RRow>
                <p>The cost and incentive detailed above are estimated by your energy advisor. Final costs & incentives may differ from these estimates based on the actual scope of work installed. Please see azhomeperformance.com for incentive details & eligibility rules.</p>
              </RCol>
              <RCol span={4}>
                <h3>Other Energy Efficiency Rebates</h3>
                <h4>Improving Cooling Systems</h4>
                <p>Residential customers that install high efficiency equipment with a Quality Installation could be eligible for an APS rebate of $245.</p>
                <h4>Upgrading Lighting</h4>
                <p>In addition to the CFLs you receive during your assessment, APS offers instant savings on energy efficient CFLs at participating retailers.</p>
                <h4>Refrigerator Recycling Program</h4>
                <p>Old refrigerators and freezers can use up to three times more energy than newer models. Customers in APS service territory may qualify for a $30 rebate to pick up and recycle an operable second refrigerator or freezer.</p>
                <h4>Pool Pumps and Timers</h4>
                <p>Did you know that new high efficiency pool pumps and smart pool timers can save you up to 80% on your pool energy costs? Best of all, APS has new rebates up to $150 available to help you save even more.</p>
                <h4>Renewable Energy</h4>
                <p>Once you’ve maximized your home’s efficiency, renewable energy sources, such as solar panels, can help to reduce your utility bills even more.</p>
                <h4>Federal Tax Credits</h4>
                <p>If you purchase an energy-efficient product or renewable energy system for your home, you may be eligible for a federal tax credit. Read more about eligible measures, and consult a tax professional.</p>
              </RCol>
            </RRow>
          </div>
        </div>
      </div>
    )
  }

}



export default  APS;
