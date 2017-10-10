import React from 'react'
import SettingsAccount from './wrapper'
import DocumentTitle from 'react-document-title'
import {connect} from 'snugg-redux'
import {Row, Col, Clearfix} from 'react-bootstrap'

// These values update live via web sockets so there is no submit.
// TODO: disable editing email. That will require a way for people to have a
// configurable email to display in the report.
@connect((state) => {
  return {
    accountId: state.fn.loggedInUser().get('id')
  }
})
export default class SettingsMainAccountForm extends React.Component {

  render() {
    const {accountId} = this.props
    return (
      <DocumentTitle title="Settings > Your Profile | Snugg Pro">
        <SettingsAccount {...this.props}>
          <h2>Manage your profile</h2>
          <Row>
            <Col sm={8} md={6}>
              <form>
                <Snugg.Input id={accountId} field="Account: First name" required />
                <Snugg.Input id={accountId} field="Account: Last name" required />
                <Snugg.Input id={accountId} field="Account: Email" label="Login email" type="email" required />
                <Snugg.Telephone id={accountId} field="Account: Personal Phone" />
                <Snugg.Input id={accountId} field="Account: Title" />
                <Snugg.Input id={accountId} field="Account: Certifications" />
                <Snugg.Input id={accountId} field="Account: DOE Assessor ID" />
                <Snugg.Textarea id={accountId} field="Account: Hours of operation" rows={4} />
                <Snugg.Radio id={accountId} field="Account: Receive newsletter" />
                <Clearfix/>
              </form>
            </Col>
          </Row>
        </SettingsAccount>
      </DocumentTitle>
    )
  }
}
