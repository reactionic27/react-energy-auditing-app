import React from 'react'
// import logo from '../../../../src/img/programs/ucoop/united-coop-logo-transparent.png'

// United CoOp in Texas
var UCOOP1 = React.createClass({

  render() {
    return (
      <div className="report-page-rebates-ucoop" style={{fontSize: '0.9em'}}>
        <div className="report-body">
          <div className="report-main">

            <div className="r-row">
              <div className="r-spa12">
                <h2>2017 Energy Solutions Rebate Program</h2>
                <h3>Member Information</h3>
                <p>Energy Solutions rebates are available only for qualifying
                  purchases and/or services. The availability of the Energy Solutions
                  Rebate Program is limited and rebates will be processed on a first-come,
                  first-served basis. When funds have been depleted, the Energy
                  Solutions Rebate Program will no longer be available until
                  the next year, pending board approval.
                </p>
                <p>Members must submit the rebate form and required documentation
                  to be eligible for rebates within 60 days of the completion of
                  construction and/or installation. Receipts for every rebate must
                  be submitted with an application!
                </p>
              </div>
            </div>

            <div className="r-row">
              <div className="r-spa12">
                {/*<img src={logo} style={{float: 'right', width: 120, margin: "0 0 20px 20px"}} className="rebate-icon" />*/}
                <h3>Total Rebates Per Home Are Capped at $1,200</h3>
                <p>IMPORTANT: All rebate requests must be received within 60 days
                of construction completion or installation, and all items in the
                appropriate rebate checklist must be completed to qualify for the rebate.</p>
              </div>
            </div>

            <h3>&nbsp;</h3>
            <hr style={{marginTop: 0, marginBottom: 5}}/>
            <h3>&nbsp;</h3>

            <div className="r-row">
              <div className="r-spa12">
                <h2>Current Rebate Offerings</h2>
                <p>The following items are eligible for rebates under United’s
                2017 Energy Solutions REBATE PROGRAM and are based on individual
                pieces of equipment for new residential construction, and full
                replacement upgrades made to existing HVAC equipment. </p>
              </div>
            </div>

            <div className="r-row">
              <div className="r-spa12">
                <h3>Attic Insulation Retrofit Rebate</h3>
                <ul>
                  <li>FREE ENERGY AUDIT required prior to installation for All Retrofit Insulation Rebates</li>
                  <li>$.02 per inch earned per square foot of installed insulation</li>
                  <li>Upon inspection, attic must have 8 inches or less of insulation</li>
                  <li>Example: 12 inches, less current insulation level in inches = inches eligible for rebate calculation</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

    )
  }

});

module.exports = UCOOP1;
