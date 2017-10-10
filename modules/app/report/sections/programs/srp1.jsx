import React from 'react'

var SRP = React.createClass({

  render() {
    return (
      <div className="report-page-rebates-aps">
        <div className="report-body">
          <div className="report-main">
            <h3 style={{lineHeight: '1.4em'}}>
              By participating in the Home Performance with ENERGY STAR® program,
              you may be eligible for additional SRP rebates. Ask your contractor
              for details about the following offers.
            </h3>
            <div className="r-row">
              <div className="r-spa5">
                <h4 style={styles.rebateTitle}>Air-sealing rebate*</h4>
                <p>
                  Rebate offer: 75% of the cost to seal air leaks (up to $250).
                  Details: <a href="http://bit.ly/srp-upgrades" target="_blank">bit.ly/srp-upgrades</a>
                </p>

                <h4 style={styles.rebateTitle}>Insulation rebate offer* </h4>
                <p>75% of the insulation cost (up to $250).
                  Details: <a href="http://bit.ly/srp-upgrades" target="_blank">bit.ly/srp-upgrades</a>
                </p>
                <small>*Eligibility limited to SRP Home Performance with ENERGY STAR participants.</small>


                <h4 style={styles.rebateTitle}>Duct-sealing rebate</h4>
                <p>
                  Rebate offer: 75% of the cost of qualified duct repairs (up to $400).
                  Eligibility requirements: All materials and installation processes
                  must meet BPI building analyst standards.  Details: <a href="http://bit.ly/srp-ducts" target="_blank">bit.ly/srp-ducts</a>
                </p>

                <h4 style={styles.rebateTitle}>Shade screen discount</h4>
                <p>
                  $0.80 per installed square foot. While blocking heat gain,
                  shade screens can protect your home's interior from sun damage,
                  provide added privacy and cut cooling costs by up to 25%.
                </p>
                <p>
                  Eligibility requirements: Exterior shade screens must block 80%
                  or more of the sun's rays and be installed on east, west and south-facing
                  clear glass windows. Details: <a href="http://bit.ly/srp-shade-screens" target="_blank">bit.ly/srp-shade-screens</a>
                </p>

                <h4 style={styles.rebateTitle}>Pool Pumps Rebate</h4>
                <p>
                  Save $100 on variable-speed pool pumps with SRP ENERGY STAR® Pools.
                  Switching to an ENERGY STAR®-certified variable-speed pool pump
                  can reduce pool-related energy costs by approximately 70% a year.
                  Details:&nbsp;
                  <a href="http://bit.ly/srp-pool" target="_blank">bit.ly/srp-pool</a>
                </p>
              </div>

              <div className="r-spa7">
                <h4 style={styles.rebateTitle}>High-efficiency cooling system rebate:</h4>
                <p>
                  Details & eligibility: <a href="http://bit.ly/srp-cool-cash" target="_blank">bit.ly/srp-cool-cash</a>
                </p>
                <table className="table table-bordered table-condensed" style={{textAlign: 'center'}}>
                  <tbody>
                    <tr>
                      <th style={styles.tableHeader} colSpan={5}>
                        <strong>Central AC and Heat Pump</strong>
                      </th>
                    </tr>
                    <tr>
                      <th width="152" rowSpan={5} style={{verticalAlign: 'middle', paddingBottom: 20, textAlign: 'center'}}>
                        Package and <br/> Split Systems
                      </th>
                      <th style={styles.tableHeader} width="109">SEER</th>
                      <th style={styles.tableHeader} width="116">EER</th>
                      <th style={styles.tableHeader} width="128">HSPF<br/>
                        <small>Heat pumps only</small>
                      </th>
                      <th style={styles.tableHeader} width="81">Incentive</th>
                    </tr>
                    <tr>
                      <td style={styles.tableCell}>16.0 or higher</td>
                      <td style={styles.tableCell} rowSpan={4}>12.0 or higher</td>
                      <td style={styles.tableCell} rowSpan={4}>8.0 or higher</td>
                      <td style={styles.tableCell}>$400</td>
                    </tr>
                    <tr>
                      <td style={styles.tableCell}>17.0 or higher</td>
                      <td style={styles.tableCell}>$600</td>
                    </tr>
                    <tr>
                      <td style={styles.tableCell}>Variable-capacity compressor</td>
                      <td style={styles.tableCell}>$800</td>
                    </tr>
                  </tbody>
                </table>

                <h4 style={styles.rebateTitle}>Plant savings with free shade trees</h4>
                <p>
                  SRP's Shade Tree Program provides customers up to two free
                  desert-adapted trees (approximately 4-to-6 foot saplings)
                  to plant in energy-saving locations around your home. Shading
                  your home helps reduce cooling costs, improve air quality and
                  lower the Valley's heat effect — without using a lot of water.
                  To receive a free tree, participants are required to aAend a free
                  workshop to learn how to best plant and care for your trees.
                  Space is limited. Reserve your spot by signing up online.
                  Details:&nbsp;
                  <a href="http://bit.ly/srp-trees" target="_blank">bit.ly/srp-trees</a>
                </p>

                <h4 style={styles.rebateTitle}>More incentives...</h4>
                <p>
                  Buy SRP discounted LEDs at participating Phoenix area retailers:&nbsp;
                  <a href="http://bit.ly/srp-lights" target="_blank">bit.ly/srp-lights</a>
                  <br/>
                  Do It Yourself energy-saving projects:&nbsp;
                  <a href="http://bit.ly/srp-diy" target="_blank">bit.ly/srp-diy</a>
                  <br/>
                  Low income weatherization assistance program:&nbsp;
                  <a href="http://bit.ly/srp-liw" target="_blank">bit.ly/srp-liw</a>
                </p>
                <h4><strong>For details visit <a href="http://savewithsrp.com" target="_blank">SaveWithSRP.com</a></strong></h4>
                <p>
                  <small style={{marginTop: 10, fontSize: '0.9em', lineHeight: '1.4em'}}>
                    SRP reserves the right to change or cancel
                    these promotions or their terms and conditioons at any time.
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
});

const styles = {
  rebateTitle: {
    marginTop: 15,
    marginBottom: 5
  },
  tableHeader: {
    textAlign: 'center'
  },
  tableCell: {
    verticalAlign: 'middle'
  }
}

module.exports = SRP;
