import {RRow, RCol} from 'ui'
import React from 'react'

class NYSERDA extends React.Component {

  render() {
    return (
      <div className="report-body"><p>&nbsp;</p>
        <div className="r-row">
          <div className="report-main">
            <div className="r-spa4">
              <h3>Assisted Home Performance with ENERGY STAR</h3>
              <p>
                Each year, New York State homeowners waste hundreds of dollars in energy. Many feel powerless in the face of high energy bills and are unaware of what they can do to control these costs. The Assisted Home Performance with ENERGY STAR program makes it easy and affordable to make the smart investment in a more energy-efficient home, helping income-eligible homeowners across the State lower their energy bills and live more comfortably all year long.
              </p><p>
                It provides those who qualify with a discount covering 50% of the cost of eligible energy efficiency improvements up to $4,000 per project for single-family homes. Two- to four-unit residential homes with income-eligible residents may qualify for a discount of up to $8,000.
              </p>
              <p />
              <p>
                To learn more go to:<br/>
                <a href="http://on.ny.gov/2nqLVNo" title="Details about NYSERDA Assisted Home Performance with ENERGY STAR" target="_blank">on.ny.gov/2nqLVNo</a>
              </p>
            </div>
            <div className="r-spa8">
              <h2>
                Residential Financing Options
              </h2>
              <p>NYSERDA offers two loan options to help New York State residents finance energy efficiency and renewable energy improvements made through NYSERDA’s programs. NYSERDA offers lower interest rates to lower income New Yorkers and those who cannot qualify for traditional financing. Talk to your participating contractor and select the loan that works best for you. Loans are not incentives or rebates, and must be paid back.
              </p>
              <p>These loan options can be used with the following NYSERDA programs:</p>
              <RRow>
                <RCol>
                  <ul>
                    <li>Home Performance with ENERGY STAR and Assisted Home Performance with ENERGY STAR® use home assessments to inform homeowners where their house is wasting energy</li>
                    <li>The NY-Sun program makes solar-generated electricity accessible and affordable by converting sunlight into electricity</li>
                    <li>Renewable Heat NY supports the installation of high-efficiency, low-emission, wood-heating technology</li>
                  </ul>
                </RCol>
              </RRow>
              <br/>
              <h3>
                On-Bill Recovery Loan
              </h3>
              <p>
                With the On-Bill Recovery Loan, your monthly payments may not exceed your estimated average monthly energy cost savings. Your loan payments are built right into your utility bill so you will not have an extra bill each month. Your energy savings essentially pay for your work.
              </p>
              <p>
                Learn more here:<br/><a href="http://on.ny.gov/2ndo3Ly" title="Details about NYSERDA's On-Bill Recovery Loan" target="_blank">on.ny.gov/2ndo3Ly</a>
              </p>
              <h3>
                Smart Energy Loan
              </h3>
              <p>
                The Smart Energy Loan is a more traditional loan that you repay monthly via check or automatic payment.
              </p>
              <p>
                Learn more here:<br/><a href="http://on.ny.gov/2ndo3Ly" title="Details about NYSERDA's On-Bill Recovery Loan" target="_blank">on.ny.gov/2ndo3Ly</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }


}

export default  NYSERDA
