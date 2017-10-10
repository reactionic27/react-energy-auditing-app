import React from 'react'
import {InlineNotification} from 'app/components/overlays'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'
import {Map as IMap} from 'immutable'
import {Clearfix} from 'react-bootstrap'
import {Card, BlankText} from 'ui'
const creditCardIcon = require('../../../src/img/ui/creditCardIcon.svg');



@connect((state, {company_id, program_id}) => {
  const company = company_id ? state.fn.companyById(company_id) : IMap()
  const canAdminCompany = f.account.canAdminCompany(state, company)
  const program = program_id ? f.program.programById(program_id) : IMap()
  const hasPlan = company && f.billing.hasPlan(company.get('pricing_plan'))
  const billingPlan = company ? f.billing.billingPlansByCode(company.get('pricing_plan')) : IMap()
  const planPrice = company && f.billing.planPrice(company.get('pricing_plan'))
  const planType = company ? f.billing.planTypeByCode(company.get('pricing_plan')) : "Ask support"
  const nextBillDate = company ? f.billing.nextBillDateByCode(company.get('pricing_plan')) : "Ask support"
  return {
    company: company,
    canAdminCompany: canAdminCompany,
    program: program,
    billingPlan,
    planType,
    nextBillDate,
    hasPlan,
    planPrice
  }
})
export default class CreateJobContext extends React.Component {


  chatSupport = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (typeof window.Intercom !== 'undefined') {
      window.Intercom('showNewMessage')
    }
  };

  render() {
    const {program, company, hasPlan, billingPlan, planPrice, canAdminCompany, planType, nextBillDate} = this.props
    const planTypeDescription = program.get('paysForJob') ? 'N/A' : planType
    const billTo = program.get('paysForJob') ? program.get('name') : company.get('name')
    const billDate = program.get('paysForJob') ? 'Billed to program' : nextBillDate
    const perJobPrice = f.num.dollars(billingPlan.get('pricePerJob'))
    const formattedPlanPrice = f.num.dollars(planPrice)

    return (
      <div>
        <InlineNotification theme="neutral" style={boxStyle}>
          <div style={boxHeader}>
            <img src={creditCardIcon} style={iconStyle}/>
            Billing For This Job
            <Clearfix/>
          </div>
          {company.get('id') ?
            <div>
              <Card.NameValue name="Billable to:" value={billTo}/>
              {!program.get('paysForJob') ?
                <div>
                  {hasPlan ?
                    <div>
                      <Card.NameValue name="Plan type:" value={planTypeDescription}/>
                      {billingPlan.get('isSubscription') ?
                        <div>
                          <Card.NameValue name="Subscription price:" value={formattedPlanPrice}/>
                          <Card.NameValue name="Number of jobs included:" value={billingPlan.get('jobsIncluded')}/>
                          <Card.NameValue name="Cost per add'l job:" value={perJobPrice}/>
                        </div>
                        :
                        <Card.NameValue name="Cost for this job:" value={perJobPrice}/>
                      }
                      <Card.NameValue name="Next billing:" value={billDate}/>
                    </div>
                  : null
                  }
                  <Card.NameValue name="Card on file:" value={`**** **** **** ${company.get('cached_stripe_last4')}`}/>
                </div>
                : null
              }
            </div>
          : <BlankText>Select a company to find out how you'll be billed for this job.</BlankText>
          }
        </InlineNotification>
        <InlineNotification theme="neutral" style={boxStyle}>
          <div style={boxHeader}>
            Need help creating this job?
          </div>
          <a href="#" onClick={this.chatSupport}>Live chat with us</a> if you need assistance with this screen
          {canAdminCompany ? " or if you have  any billing questions" : ""}.
        </InlineNotification>
      </div>
    )
  }
}
const boxStyle = {
  fontSize: 12,
  padding: 20,
  marginTop: 10,
  marginBottom: 10

}
const boxHeader = {
  fontSize: '1.1em',
  marginBottom: '.5em',
  fontWeight: 600
}
const iconStyle = {
  width: 40,
  float: 'right',
  display: 'inline-block',
  marginTop: -5,
  marginLeft: 10,
  marginBottom: 5
}
