import React from 'react'

require('../../../../../src/less/app/programs/xcel.less')

class XcelAdvising extends React.Component {

  render() {
    return (
      <div className="report-page-rebates-xcel">
        <h2 className="rebate-header large-sub-header">Advising</h2>
        <p>Xcel Energy’s expert Energy Advisors at CLEAResult will provide <strong>unbiased advice and impartial guidance</strong> on the next steps toward making your home more comfortable and less costly to operate. They can help you with applicable rebates, incentives, contractors and best practices <strong>so you know you’re making educated, smart decisions</strong> that are right for your home.</p>
        <h3 className="text-center">Call (303) 446-7910 to speak with a free, impartial Energy Advisor about your home.</h3>
        <div className="r-row">
          <div className="r-spa6">
            <h4>Energy Advisors are expert consultants who can:</h4>
            <ul>
              <li>Provide expert advice about energy upgrades</li>
              <li>Help you prioritize next steps for your home energy improvements</li>
              <li>Connect you with qualified contractors</li>
              <li>Connect you with applicable rebates, financing, and incentives and help you with the paperwork</li>
              <li>Connect you with Xcel Energy’s complementary programs, such as the Saver’s Switch, Solar Rewards, and Wind Source, among others</li>
            </ul>
            <p>You may receive a call from an Energy Advisor offering to review this audit with you.  We look forward to working with you.</p>
            <p><strong>Spots are limited, so take advantage of this service while it lasts.</strong></p>
          </div>
          <div className="r-spa6">
            <h4>Here’s what homeowners are saying about CLEAResult’s Energy Advisors:</h4>
            <blockquote>Thank you for all of your thoroughness and assistance throughout.</blockquote>
            <blockquote>[My advisor was] very professional, knowledgeable, and extremely helpful.</blockquote>
            <blockquote>[My advisor] was fantastic! She was super helpful, answered all of my questions, and was very prompt responding to emails.</blockquote>
          </div>
        </div>
        <div className="r-row">
          <div className="r-spa12">
            <div className="call-to-action">
              <h2 className="contact text-center">Call to speak with an Energy Advisor:  
                <span>(303) 446-7910</span>
                <span>xcelenergyadvisors@clearesult.com</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default  XcelAdvising;
