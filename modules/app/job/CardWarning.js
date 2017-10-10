import React from 'react'
import {InlineNotification} from 'app/components/overlays'
const creditCardIcon = require('../../../src/img/ui/creditCardIcon.svg');
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'
import {Button} from 'ui'
import StripeBox from 'app/components/StripeBox'

@connect((state, {company_id}) => {
  const company = state.fn.companyById(company_id)
  const canAdminCompany = f.account.canAdminCompany(state, company)
  return {
    company: company,
    canAdminCompany: canAdminCompany
  }
})
export default class CardWarning extends React.Component {

  render() {
    const {cardWarning, canAdminCompany, company, showModal, closeModal, showStripeModal} = this.props
    return (
      <div>
        <InlineNotification theme='neutral' style={{paddingTop: 40, paddingBottom: 20, marginBottom: 50, textAlign: 'center'}}>
          <img src={creditCardIcon} style={{width: 100, paddingBottom: 30}}/>
          <h4>{cardWarning}</h4>
          {canAdminCompany ?
            <div>
              You can still create a job, but you should update your card soon.
              <br/>
              <Button
              label="Update my card now"
              onClick={showModal}
              variant="link"
              customStyle={{marginTop: 15, display: 'inline-block', width: 'auto'}}/>
            </div>
          :
            <div>
              You can still create a job, but you might want to let a company admin know.
            </div>
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
