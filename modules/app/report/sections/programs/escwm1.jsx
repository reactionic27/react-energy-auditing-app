import React from 'react'
import campusImage from '../../../../../src/img/programs/esc-wm/walkingmountaincampus.png'

var ESCWM1 = React.createClass({

  render() {
    return (
      <div className="report-page-rebates-foe">
        <div className="report-body">
          <div className="report-main" style={{fontSize: '0.9em'}}>
            <h2>Advising</h2>
            <p>
              Walking Mountains Science Center’s expert Energy Advisors can provide
              <strong> guidance on the next steps toward making your home more comfortable,
              energy efficient, and less costly to operate.</strong> You may receive an email
              or call in a few weeks from an Energy Advisor offering to help.
              We look forward to working with you. Energy Advisors are expert consultants
              who can provide: free energy advising, education on best practices so you make
              smart decisions, access to preferred contractors, access to Energy Smart and utility rebates,
              information about financing, and free radon test kits.
            </p>
            <p>
              Now that you have had an Energy Smart Home Assessment, you may be
              eligible for rebates available through the Energy Smart Colorado program at Walking Mountains.
              The projects below qualify for $500, up to 50% of total project cost when
              combined with utility rebates, with an additional $500 offered for
              Solar PV installations and Radon Mitigation systems. Find more information and apply for rebates online: <a href="www.energysmartcolorado.com/rebates" style={styles.link}>EnergySmartColorado.com/rebates</a>.
            </p>
            <h3>Eligible Rebate Measures</h3>
            <div className="r-row">
              <div className="r-spa6">
                <h5>Boiler or Furnace Replacement</h5>
                <ul>
                  <li>Boiler must be at least 92% AFUE</li>
                  <li>Furnace must be at least 95% AFUE</li>
                </ul>

                <h5>Water Heating</h5>
                <ul>
                  <li>Storage Tank must be ENERGY STAR Certified</li>
                  <li>Tank-less must have at least .82 EF</li>
                  <li>Solar thermal systems</li>
                </ul>

                <h5>Attic/Wall/Crawlspace Insulation</h5>
                <ul>
                  <li>Attic/roof minimum R-49</li>
                  <li>Walls minimum R-19</li>
                  <li>Air sealing required</li>
                  <li>Blower door test-out required</li>
                  <li>Vented crawlspace to conditioned with vapor barrier</li>
                </ul>

                <h5>Window Replacement</h5>
                <ul>
                  <li>New windows U-.28 or lower</li>
                  <li>Must be whole-house replacement</li>
                </ul>

              </div>
              <div className="r-spa6">
                <h5>Air Sealing</h5>
                <ul>
                  <li>Must be comprehensive, minimum 10% leakage reduction</li>
                  <li>Blower door test-out required</li>
                </ul>
                <h5>Smart/Learning Thermostats</h5>
                <ul>
                  <li>Must have motion detection learning & remote capability</li>
                  <li>Limit one per customer, $125 cap</li>
                  <li>If old thermostat contains mercury, recycle properly</li>
                </ul>
                <h5>Lighting</h5>
                <ul>
                  <li>Replace incandescent lamps with LEDs</li>
                  <li>LEDs must be Energy Star or Lighting Facts listed</li>
                </ul>
                <h5>Solar</h5>
                <ul>
                  <li>Grid-tied Solar Photo-Voltaic projects (on premise)</li>
                  <li>NABCEP certification required</li>
                </ul>
                <h5>Radon Mitigation</h5>
                <ul>
                  <li>Test-in/Test-out of Radon levels required</li>
                </ul>
              </div>
            </div>
            <div className="r-row">
              <div className="r-spa2"/>
              <div className="r-spa10">
                <br/>
                <img src={campusImage} style={{float:'left', marginRight: 20, height: 90}}/>
                <p style={{fontSize: '1.3em', lineHeight: '1.5em', marginTop: 5}}>
                  <strong>Connect with Walking Mountains’ Energy Advisors </strong><br/>
                  at <a href="tel:970-328-8777" style={styles.link}>970-328-8777</a> or <a href="mailto:eagle@EnergySmartColorado.com" style={styles.link}>eagle@EnergySmartColorado.com</a><br/>
                  or visit our <strong>Resource Center</strong> at <strong>318 Walking Mountains Lane in Avon</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

const programGreen = '#008000'
const styles = {
  link: {
    color: programGreen,
    fontWeight: 600
  }
}

module.exports = ESCWM1;
