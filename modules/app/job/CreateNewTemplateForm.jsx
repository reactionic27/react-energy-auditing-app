import React from 'react'
import Fields from 'fields'
import {connect} from 'snugg-redux'
import {browserHistory} from 'react-router'
import {PrimaryButton} from 'ui'
import {Row, Col} from 'react-bootstrap'
import DocumentTitle from 'react-document-title'
import localForm from '../../decorators/localFormDecorator'
import {dispatchCreate} from 'data/actions'
import * as f from 'data/formatters'
import {InlineNotification} from 'app/components/overlays'

// TODO: Documentation:
//
// 1. hasAttemptedSubmit - triggers SnuggGenericFields to start showing error messages.
// This is done through the stateField.js function onErrorStateChange checks to
// see if the fields are valid based on validate attribute
//
// 2. This handleSubmit overrides the SnuggGenericFields handleSubmit
@connect((state, props) => {
  const user = state.fn.loggedInUser()
  const account_id = user.get('id')
  return {
    companies: state.fn.adminCompaniesByUser(user),
    account_id
  }
}, {dispatchCreate})
@localForm
export default class CreateNewTemplateForm extends React.Component {

  constructor({companies}) {
    super(...arguments)
    this.state = {
      form: {
        first_name: '',
        last_name: '',
        company_id: null,
        program_id: 1,
        is_template: 1
      },
      isSubmitting: false,
      hasAttemptedSubmit: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.companiesOptions = f.company.makeCompanyOptions(companies)
  }

  handleSubmit(e) {
    e.preventDefault()
    const {company_id} = this.state.form
    this.setState({hasAttemptedSubmit: true})
    if (this.formIsValid()) {
      this.setState({isSubmitting: true})
      const {account_id} = this.props
      const formVals = company_id === 'personal'
        ? {...this.state.form, account_id, company_id: null}
        : {...this.state.form, company_id, account_id: null}
      this.props
        .dispatchCreate('jobs', formVals)
        .then((resp) => {
          browserHistory.push(`/job/${resp.id}`)
        })
        .catch(() => {
          this.setState({isSubmitting: false})
        })
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.companies !== this.props.companies) {
      this.companiesOptions = f.company.makeCompanyOptions(nextProps.companies)
    }
  }

  render() {
    const {isSubmitting} = this.state
    return (
      <DocumentTitle title="Create a new job template | Snugg Pro">
        <Row>
          <Col mdOffset={1} sm={6} md={5} lg={4} lgOffset={2}>
            <h1>Create a template</h1>
            <form noValidate onSubmit={this.handleSubmit}>
              <Fields.Input
                label="Template Name"
                validate="required"
                {...this.stateField('first_name')} />
              <Fields.Input
                label="Template Description"
                {...this.stateField('last_name')} />
              <Fields.Select
                label="Share With"
                validate="required"
                options={this.companiesOptions}
                {...this.stateField('company_id')} />
              <div style={{marginTop: 30, marginBottom: 30}}>
                <PrimaryButton isSubmit disabled={isSubmitting} label="Create new job template" />
              </div>
            </form>
          </Col>

          <Col sm={5} smOffset={1} md={4} mdOffset={2} lg={3} lgOffset={1} style={{marginTop: 80}} >
            <InlineNotification theme="neutral" style={boxStyle}>
              <div style={boxHeader}>Why create a template?</div>
              <p>Job templates help speed up your workflow by creating a baseline for new jobs.</p>
              <p>
                When creating a job, you'll have the option to select from your templates.
              </p>
              <p>
                You could have a template for a particular DSM program that you work with, or perhaps for a type of building that you frequently audit.
              </p>
            </InlineNotification>
            <InlineNotification theme="neutral" style={boxStyle}>
              <div style={boxHeader}>Things you can do with templates</div>
              <ul style={{paddingLeft: 20}}>
                <li>Store boiler plate text</li>
                <li>Add stock photos </li>
                <li>Prefill common home data points</li>
                <li>Preselect recommended measures</li>
                <li>Configure audit reports</li>
              </ul>
              <br/>
              <a href="https://snuggpro.com/help/article/v5-template-updates1" target="_blank">Learn more about templates</a>.
            </InlineNotification>
            <InlineNotification theme="neutral" style={boxStyle}>
              <div style={boxHeader}>Sharing your templates</div>
              If you're the admin of a company, you can share templates with all users of your company.
              This can help ensure coherence and continuity across all audits performed within the company. Only company admins can edit company templates.
            </InlineNotification>
          </Col>
        </Row>
      </DocumentTitle>
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
