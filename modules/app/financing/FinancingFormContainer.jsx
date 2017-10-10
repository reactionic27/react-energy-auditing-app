import React, {PropTypes} from 'react'
import {Map as IMap} from 'immutable'
import {connect} from 'snugg-redux'
import Fields from 'fields'
import {Row, Col, PrimaryButton, CancelButton} from 'ui'
import {
  dispatchSave,
  dispatchCreate,
  dispatchEagerCreate,
  successAction,
  errorAction,
} from 'data/actions'
import localForm from '../../decorators/localFormDecorator'
import {browserHistory} from 'react-router'

const EMPTY_STATE = {
  title: '',
  rate: '',
  term: '',
  closing_cost: '',
  min_fico_score: '',
  min_cash_down: '',
  min_purchase: '',
  max_purchase: '',
  eligibility: '',
  description: '',
  contact_info: '',
  share_template_with: null
}

// If we are creating a job product / template, we arrive at .../create
// If we are editing a job product, we arrive at .../edit/:financingUuid
// If we are editing a template, we arrive at .../edit/:financingId
@connect((state, props) => {
  return {
    companies: state.fn.adminCompaniesByUser(state.fn.loggedInUser()),
    account_id: state.fn.loggedInUser().get('id')
  }
}, {
  dispatchSave,
  dispatchCreate,
  dispatchEagerCreate,
  successAction,
  errorAction,
})
@localForm
export default class FinancingFormContainer extends React.Component {

  static contextTypes = {
    jobId: PropTypes.number
  };

  static propTypes = {
    editing: PropTypes.instanceOf(IMap),
    financingId: PropTypes.number,
    financingUuid: PropTypes.string,
    isTemplate: PropTypes.bool,
    submitLabel: PropTypes.string.isRequired,
    cancelPath: PropTypes.string.isRequired
  };

  constructor(props) {
    super(...arguments)
    let form

    if (props.editing) {
      const {account_id, company_id, ...rest} = props.editing.toJS()
      form = rest
      if (account_id) {
        form.share_template_with = 'personal'
      } else {
        form.share_template_with = company_id
      }
    } else {
      form = EMPTY_STATE
    }

    // id is the product id if we are updating an existing product
    this.state = {
      form,
      hasAttemptedSubmit: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      state: {form},
      props: {editing, isTemplate, account_id},
      context: {jobId}
    } = this

    this.setState({hasAttemptedSubmit: true})

    if (this.formIsValid()) {
      let promise
      this.setState({isSubmitting: true})
      if (isTemplate) {
        const finalForm = (form.share_template_with === 'personal')
          ? {...form, type: 'account', account_id}
          : {...form, type: 'company', company_id: form.share_template_with}
        if (editing) {
          promise = this.props.dispatchSave('financingTemplates', {
            id: editing.get('id'),
            ...finalForm
          })
        } else {
          promise = this.props.dispatchCreate('financingTemplates', finalForm)
        }
      } else if (editing) {
        promise = this.props.dispatchSave('jobFinancing', {
          job_id: jobId,
          uuid: editing.get('uuid'),
          ...form
        })
      } else {
        promise = this.props.dispatchEagerCreate('jobFinancing', {
          job_id: jobId,
          ...form
        })
      }

      promise
        .then(() => {
          this.setState({isSubmitting: false})
          this.props.successAction({
            title: `Successfully ${editing ? 'saved' : 'added'} financing product`,
            timeout: 3000
          })
          const redirectURL = isTemplate ? '/settings/financing' : `/job/${jobId}/financing`
          browserHistory.push(redirectURL)
        })
        .catch(() => {
          browserHistory.goBack()
        })
    } else {
      this.props.errorAction({
        title: "Validation failed.",
        message: "All fields need to be filled out"
      })
    }
  };

  // Create a product based on existing ones. You can also assign it to an existing company
  renderShare() {
    return (
      <Fields.Select
        options={makeOptions(this.props.companies)}
        label="Share Financing Template With:"
        {...this.stateField('share_template_with')}/>
    )
  }

  render() {
    const {isTemplate, submitLabel, cancelPath} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        {isTemplate ? this.renderShare() : null}
        <Fields.Input
          label='Title'
          placeholder='Energy First Bank Loan'
          validate='required|maxLength:24'
          validateMessage='The {{label}} must not exceed {{var_1}} characters'
          {...this.stateField('title')} />
        <Fields.Input
          label='Rate'
          suffix='%'
          type='decimal'
          placeholder='4.25'
          validate='required|numeric'
          {...this.stateField('rate')} />
        <Fields.Input
          label='Term'
          suffix='Months'
          type='decimal'
          placeholder='60'
          validate='required|numeric'
          {...this.stateField('term')} />
        <Fields.Input
          label='Closing Costs'
          placeholder='Min: $20 / Max: $80'
          validate='numeric'
          {...this.stateField('closing_cost')} />
        <Fields.Input // .Number
          label='Min. FICO Score'
          suffix='#'
          placeholder={620}
          validate='integer'
          {...this.stateField('min_fico_score')} />
        <Fields.Input // .Number
          label='Min. Cash Down'
          suffix='Dollars'
          placeholder={0}
          validate='required|numeric'
          {...this.stateField('min_cash_down')} />
        <Fields.Input // .Number
          label='Min. Loan Amount'
          suffix='Dollars'
          placeholder={500}
          validate='numeric'
          {...this.stateField('min_purchase')} />
        <Fields.Input // .Number
          label='Max. Loan Amount'
          suffix='Dollars'
          placeholder='30000'
          validate='numeric'
          {...this.stateField('max_purchase')} />
        <Fields.Textarea
          label='Eligibility Requirements'
          placeholder='Available in Colorado, Wyoming, and Nebraska only.'
          {...this.stateField('eligibility')} />
        <Fields.Textarea
          label='Description'
          placeholder='Energy First Bank Loans are available to all 21st Bank customers. They offer free energy advising to help you through the process and low interest rates for 3,5,7,10 and 15 year terms.'
          validate='maxLength:222'
          validateMessage='The {{label}} must not exceed {{var_1}} characters'
          {...this.stateField('description')} />
        <Fields.Textarea
          label='Contact Info.'
          placeholder='Call 21st Bank toll free at 800.555.1212.'
          {...this.stateField('contact_info')} />
        <PrimaryButton isSubmit label={submitLabel} customStyle={{display: 'inline-block', float:'left', width: 'auto'}}/>
        <CancelButton to={cancelPath} label="Cancel" />
      </form>
    )
  }
}

function makeOptions(companies: Array<IMap>) {
  return [
    [null, ''],
    ['personal', 'Only Me']
  ].concat(companies.map(c => [c.get('id'), c.get('name')]))
}
