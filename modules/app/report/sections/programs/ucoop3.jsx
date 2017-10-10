import React from 'react'
// import logo from '../../../../src/img/programs/ucoop/united-coop-logo-transparent.png'

// United CoOp in Texas
var UCOOP2 = React.createClass({

  render() {
    return (
      <div className="report-page-rebates-ucoop" style={{fontSize: '0.9em'}}>
        <div className="report-body">
          <div className="report-main">

            <div className="r-row">
              <div className="r-spa12">
                <h2>Current Rebate Offerings (continued)</h2>
                <br/>
              </div>
            </div>

            <div className="r-row">
              <div className="r-spa12">
                <h3>EnergyStar® Room Air Conditioner Rebate - $30</h3>
                <p>Room air conditioner units are typically mounted in a window so that part of the unit is outside, and part is inside. An insulated divider to reduce heat transfer losses typically separates the two sides. To be eligible for this rebate, the unit must be EnergyStar® rated and have a minimum EER of 10.8.</p>
              </div>
            </div>

            <div className="r-row">
              <div className="r-spa12">
              </div>
            </div>

            <div className="r-row">
              <div className="r-spa12">
                <h3>Smart Thermostat Rebate</h3>
                <ul>
                  <li>UP TO $50</li>
                  <li>For existing home only (No New Home Construction)</li>
                  <li>Must replace non-WIFI thermostat with a WIFI-enabled thermostat (preferably app-enabled)</li>
                  <li>Must have learning capabilities (for example: Honeywell Lyric, Lennox iComfort530, Nest Labs)</li>
                </ul>
              </div>
            </div>

            <div className="r-row">
              <div className="r-spa12">
                <h3>Heat Pump Water Heater Rebate *</h3>
                <ul>
                  <li>$150 per unit</li>
                  <li>40-gallon minimum capacity</li>
                  <li>2.0 energy factor, or above</li>
                </ul>
                <p>* No rebates are offered for gas, tankless or LP water heaters.</p>

                <h3>Solar Screen Rebate</h3>
                <p>Member-installed screens require an energy audit prior to install, including validation that screens are not already installed. Post install receipts and photos are required.</p>
                <ul>
                  <li>Up to $50</li>
                  <li>$5 per 3' x 5' window, (or 15 sq. ft. of installed screen)</li>
                  <li>70% solar heat gain blockage required</li>
                  <li>Excludes North-facing windows</li>
                </ul>
              </div>
            </div>

            <div className="r-row">
              <div className="r-spa12">
                <hr/>
                <h5>Please download the rebate application here: <a href="http://bit.ly/uc-2017" target="_blank">http://bit.ly/uc-2017</a></h5>
              </div>
            </div>

          </div>
        </div>
      </div>

    )
  }

});

module.exports = UCOOP2;
