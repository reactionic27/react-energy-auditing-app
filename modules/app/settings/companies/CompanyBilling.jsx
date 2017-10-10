import React from 'react'
import StripeBox from 'app/components/StripeBox'
import {InlineNotification} from 'app/components/overlays'
import {connect} from 'snugg-redux'
import {Row, Col} from 'react-bootstrap'
import {Button, MainH1} from 'ui'

@connect((state, {companyId}) => {
  return {
    company: state.fn.companyByIdJS(companyId),
  }
})
export default class CompanyBilling extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showStripeModal: false
    }
    this.showStripeModal = this.showStripeModal.bind(this)
    this.hideStripeModal = this.hideStripeModal.bind(this)
  }
  showStripeModal() {
    this.setState({
      showStripeModal: true
    })
  }
  hideStripeModal() {
    this.setState({
      showStripeModal: false
    })
  }

  // TODO: include name on card here. Still need to add it to the db
  renderBillingInfo = () => {
    const {
      props: {
        company: {card_name, cached_stripe_last4, cached_stripe_exp}
      }
    } = this
    return (
      <Row>
        <Col sm={6}>
          <p>This is your current credit card information:</p>
          <ul className="unstyled">
            {card_name && <li>
              Card Name: {card_name}
            </li>}
            <li>
              Card number: **** **** **** {cached_stripe_last4}
            </li>
            <li>
              Expiry date: {cached_stripe_exp}
            </li>
          </ul>
        </Col>
        <Col sm={5} smOffset={1}>
          <h4>Pricing</h4>
          <p>Pricing may vary based on your energy efficiency programs. Please check with your program admin or contact support for details.</p>
          <p>Jobs performed within select programs are billed directly to the program.</p>
        </Col>
      </Row>
    )
  };

  renderNoBillingMessage = () => {
    const {
      props: {company: {name}}
    } = this
    return (
      <div>
        <InlineNotification theme="error" message={`We do not have a valid credit card on file for ${name}. Add a credit card to create jobs that can be billed to company.`} />
      </div>
    )
  };

  render() {
    const {
      props: {company: {stripe_id, id, name}},
      state: {showStripeModal}
    } = this
    return (
      <div className="tab-pane active">
        <MainH1>Billing Information</MainH1>
        {stripe_id ? this.renderBillingInfo() : this.renderNoBillingMessage()}
        <Button
          variant="link"
          size="lg"
          customStyle={{width: 'auto'}}
          onClick={this.showStripeModal}>
          Update credit card for {name}
        </Button>
        <StripeBox
          companyId={id}
          show={showStripeModal}
          onClose={this.hideStripeModal}
        />
      </div>
    )
  }
};
