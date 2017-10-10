import React from 'react'
import SettingsAccount from './wrapper'
import DocumentTitle from 'react-document-title'
import {connect} from 'snugg-redux'
import Fields from 'fields'
import {dispatchSave} from 'data/actions'
import {Row, Col} from 'react-bootstrap'

@connect((state, {accountCompany}) => {
  const companyName = state.fn.companyById(accountCompany.get('company_id')).get('name')
  const account = state.fn.loggedInUser()
  return {
    companyName,
    account
  }
}, {dispatchSave})
class CompanyPreference extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.accountCompany.get('display_title') || '',
      email: props.accountCompany.get('display_email') || ''
    }
    this.titleChangeHandler = this.changeHandler.bind(this, 'title')
    this.emailChangeHandler = this.changeHandler.bind(this, 'email')
    this.submitHandler = this.submitHandler.bind(this)
  }
  changeHandler(field, value) {
    const {company_id, account_id} = this.props.accountCompany.toJS()
    this.props.dispatchSave('accountsCompanies', {
      account_id,
      company_id,
      [`display_${field}`]: value
    })
    this.setState({
      [field]: value
    })
  }
  submitHandler(e) {
    e.preventDefault()
  }
  render() {
    const {companyName, account} = this.props
    const {title, email} = this.state
    const accountEmail = account.get('email')
    const accountTitle = account.get('title')
    return (
      <Row>
        <Col sm={6} style={{marginBottom: 40, paddingBottom: 20, borderBottom: '1px solid #dedede'}}>
          <form noValidate onSubmit={this.submitHandler}>
            <h4>{companyName}</h4>
            <Fields.Email label='E-mail' placeholder={accountEmail} onChange={this.emailChangeHandler} value={email} />
            <Fields.Input label='Title' placeholder={accountTitle} onChange={this.titleChangeHandler} value={title} />
          </form>
        </Col>
      </Row>
    )
  }
}

@connect((state) => {
  const account = state.fn.loggedInUser()
  const accountsCompanies = state.fn.accountsCompaniesByUser(account)
  return {
    account,
    accountsCompanies
  }
})
export default class SettingsPreferences extends React.Component {
  render() {
    const {account, accountsCompanies} = this.props
    const accountEmail = account.get('email')
    return (
      <DocumentTitle title="Settings > Your Profile | Snugg Pro">
        <SettingsAccount {...this.props}>
          <h2>Manage your company preferences</h2>
          <p>
            You can specify a different email address and job title for any
            of the companies you work with. This information will be visible in the audit reports and elsewhere.
            Leave any of these fields blank to display your login email address
            and default title.
          </p>
          <p>  <strong>Your login email continues to be {accountEmail} across all companies.</strong></p>
          <br/>
          {accountsCompanies.map(function(accountCompany) {
            return <CompanyPreference key={accountCompany} accountCompany={accountCompany} />
          })}
        </SettingsAccount>
      </DocumentTitle>
    )
  }
}
