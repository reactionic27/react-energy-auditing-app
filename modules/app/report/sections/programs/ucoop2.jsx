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
                <h3>HVAC Tune-up Rebate</h3>
                <p>Residential members who own their homes are eligible for one
                rebate (up to $100) per unit in 2017. Tune-ups must be performed
                by a qualified service professional and must include the following criteria:</p>
                <div className="r-row">
                  <div className="r-spa12">
                    <ul>
                      <li>checking and correcting the unit’s refrigerant pressure and tubing</li>
                      <li>checking and adjusting belt tension</li>
                      <li>cleaning and lubricating the indoor blower unit</li>
                      <li>replacing filters and cleaning inside the “A” coil</li>
                      <li>checking the thermostat, wiring, and other electric parts</li>
                    </ul>
                  </div>
                </div>
                <p>A copy of the itemized receipt from a qualified contractor,
                showing all work that was performed, must be submitted to
                United within 60 days of completion.</p>
              </div>
            </div>

            <div className="r-row">
              <div className="r-spa12">
                <h3>Heat Pump Rebate *</h3>
                <p>Air Source Heat Pumps </p>
                <ul>
                  <li>Minimum SEER of 15.0 — $100</li>
                  <li>Minimum SEER of 16.0 — $200</li>
                  <li>Minimum SEER of 17.0 — $300</li>
                  <li>Minimum SEER of 18.0 — $400</li>
                  <li>Minimum SEER of 19.0 — $500</li>
                  <li>Duel Fuel Incentive — $75</li>
                </ul>
                <p>Geothermal/Ground Source Heat Pumps</p>
                <ul>
                  <li>Minimum EER of 11.0 — $200/Ton</li>
                </ul>
              </div>
            </div>

            <div className="r-row">
              <div className="r-spa12">
                * No rebate incentives are given for central air-strip heat systems (Electric Furnaces). Complete system change-outs are required for retrofit rebates.
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
