import React from 'react'
import {InlineNotification} from 'app/components/overlays'
import {Button} from 'ui'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'
const creditCardIcon = require('../../../src/img/ui/creditCardIcon.svg');
import StripeBox from 'app/components/StripeBox'

@connect((state, {company_id}) => {
  const company = state.fn.companyById(company_id)
  const canAdminCompany = f.account.canAdminCompany(state, company)
  return {
    company: company,
    canAdminCompany: canAdminCompany
  }
})
export default class CardError extends React.Component {

  render() {
    const {cardError, canAdminCompany, company, showModal, closeModal, showStripeModal} = this.props
    return (
      <div>
        <InlineNotification theme='neutral' style={{paddingTop: 40, paddingBottom: 20, marginBottom: 50, textAlign: 'center'}}>
          <img src={creditCardIcon} style={{width: 100, paddingBottom: 30}}/>
          <br/>
          <div style={{fontWeight: 600, paddingBottom: 10 }}>{cardError}</div>
          {canAdminCompany ?
            "Since this job is billable, you'll need to fix that before you can continue."
            :
            "Since this job is billable, you'll need to ask a company admin to add a credit card before you can create a job."
          }
          <br/>
          {canAdminCompany ?
            <Button
            label="Enter a credit card to continue"
            onClick={showModal}
            variant="link"
            customStyle={{marginTop: 15, display: 'inline-block', width: 'auto'}}/>
            : null
          }
        </InlineNotification>
        <StripeBox
          companyId={company.get('id')}
          show={showStripeModal}
          onClose={closeModal}
        />
      </div>
    )
  }
}
