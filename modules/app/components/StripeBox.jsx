import React from 'react'
import Fields from 'fields'
import {connect} from 'snugg-redux'
import {ModalButton} from 'ui'
import {Modal, Row, Col} from 'react-bootstrap'
import {updateBilling} from 'data/actions'

const initialState = {
  name: '',
  number: '',
  exp_month: '',
  exp_year: '',
  cvc: ''
};

// Stripe test credit cards:
// 4012888888881881
// 4242424242424242
// Staging requires test cards and will fail with a real card.
@connect(null, {updateBilling})
export default class StripeBox extends React.Component {

  static propTypes = {
    companyId: React.PropTypes.number.isRequired,
  };

  state = initialState

  handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.updateBilling(this.props.companyId, this.state)
      .then(() => {
        this.props.onClose && this.props.onClose()
      })
  };

  fieldChange = (field, value) => {
    this.setState({[field]: value})
  };

  render() {
    const {name, number, exp_month, exp_year, cvc} = this.state
    const {onClose, show} = this.props
    return (
      <Modal show={show} bsSize="sm" onHide={onClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            Update credit card
          </Modal.Title>
        </Modal.Header>
        <form noValidate onSubmit={this.handleSubmit}>
          <Modal.Body>
            <fieldset id="billing-info">
              <Fields.Text
                value={name}
                label="Cardholder's name"
                placeholder="Name"
                onChange={this.fieldChange.bind(this, 'name')}
                helpBlock="As it appears on the card." />
              <Fields.CreditCard
                value={number}
                label="Credit card number"
                placeholder="5105 1051 0510 5100"
                onChange={this.fieldChange.bind(this, 'number')}
                required />
              <div className="form-group form-group-lg">
                <label className="control-label">Month/Year</label>
                <div className="clearfix">
                  <Row>
                    <Col sm={6}>
                      <Fields.Select
                        value={exp_month}
                        label="Expiration Month"
                        options={stripeMonths}
                        onChange={this.fieldChange.bind(this, 'exp_month')}
                        bare
                        required />
                    </Col>
                    <Col xs={12} smHidden mdHidden lgHidden>
                      <br/>
                    </Col>
                    <Col sm={6}>
                      <Fields.Select
                        value={exp_year}
                        label="Expiration Year"
                        options={stripeYears()}
                        onChange={this.fieldChange.bind(this, 'exp_year')}
                        bare
                        required />
                    </Col>
                  </Row>
                </div>
              </div>

              <Fields.Text
                value={cvc}
                label="Card Verification Code (CVC)"
                onChange={this.fieldChange.bind(this, 'cvc')}
                maxLength="4"
                required
                containerClass="col-sm-2" />
            </fieldset>
          </Modal.Body>
          <Modal.Footer>
            <ModalButton isSubmit label="Save changes" />
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}

const stripeMonths = [
  [null, ""],
  [1, "01 - Jan"],
  [2, "02 - Feb"],
  [3, "03 - Mar"],
  [4, "04 - Apr"],
  [5, "05 - May"],
  [6, "06 - Jun"],
  [7, "07 - Jul"],
  [8, "08 - Aug"],
  [9, "09 - Sep"],
  [10, "10 - Oct"],
  [11, "11 - Nov"],
  [12, "12 - Dec"]
]

const stripeYears = () => {
  let options = [[null, '']];
  let i = -1, y = new Date().getFullYear()
  while (i++ < 10) {
    var year = y++
    options.push([year, year])
  }
  return options;
}
