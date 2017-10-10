import React from 'react'
import Fields from 'fields'
import SettingsAccount from './wrapper'
import {Row, Col} from 'react-bootstrap'
import {PrimaryButton} from 'ui'
import {connect} from 'snugg-redux'
import DocumentTitle from 'react-document-title'
import localForm from '../../../decorators/localFormDecorator'
import {updatePassword, errorAction} from 'data/actions'

const initialState = {
  isSubmitting: false,
  hasAttemptedSubmit: false,
  form: {
    password: '',
    password_confirm: ''
  }
}

@connect(null, {updatePassword, errorAction})
@localForm
export default class SettingsPasswordForm extends React.Component {

  state = initialState;

  formSubmit = (e) => {
    e.preventDefault()
    const {form: {password, password_confirm}} = this.state
    this.setState({hasAttemptedSubmit: true})
    if (password !== password_confirm) {
      this.props.errorAction({
        title: "Passwords don't match. Try again."
      })
      return
    }
    if (this.formIsValid()) {
      this.props.updatePassword(this.state.form)
        .then(() => {
          this.setState(initialState)
        })
        .catch(() => {
          this.setState({isSubmitting: false})
        })
    }
  };

  render() {
    const {isSubmitting} = this.state
    return (
      <DocumentTitle title="Settings > Change password | Snugg Pro">
        <SettingsAccount {...this.props}>
          <h2>Change your password</h2>
          <Row>
            <Col sm={6}>
              <form noValidate onSubmit={this.formSubmit}>
                <Fields.Password
                  label="New password:"
                  validate="required"
                  {...this.stateField('password')} />
                <Fields.Password
                  label="New password again:"
                  validate="required"
                  {...this.stateField('password_confirm')} />
                <PrimaryButton type="submit" isSubmit disabled={isSubmitting} label="Update Password" />
              </form>
            </Col>
          </Row>
        </SettingsAccount>
      </DocumentTitle>
    )
  }
}
