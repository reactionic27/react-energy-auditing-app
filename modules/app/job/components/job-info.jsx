import React from 'react'
import {Map as IMap} from 'immutable'
import states from './states'
import {errorAction} from 'data/actions'
import {connect} from 'react-redux'
import moment from 'moment'
import {browser as Bowser} from 'bowser'
import {minJobDate, maxJobDate} from 'util/dateHelpers'
import * as f from 'data/formatters'
import {dispatchSave, dispatchLocal} from 'data/actions'
import Fields from 'fields'
import localForm from 'decorators/localFormDecorator'
// TODO: datetime-local field is not working like it does on master

// TODO: Fields should not be disabled on job or template create screen.
// Pass in those variables from a selector
const disableAddressFields = (isSample: ?number, isSnuggAdmin: boolean) => {
  return !isSample && !isSnuggAdmin
}

@connect((state, {jobId}) => {
  const user = state.fn.loggedInUser()
  const account_id = user.get('id')
  const companies = state.fn.adminCompaniesByUser(user)
  const isSnuggAdmin = f.account.isSnuggAdmin(state.fn.loggedInUser())
  return {
    companyOptions : f.company.makeCompanyOptions(companies),
    account_id,
    isSnuggAdmin
  }
}, {errorAction, dispatchSave, dispatchLocal})
@localForm
export default class JobInfo extends React.Component {

  static propTypes = {
    job: React.PropTypes.instanceOf(IMap).isRequired,
    jobId: React.PropTypes.number.isRequired
  };

  constructor({job}) {
    super(...arguments)
    this.state = {
      showedGamingAlert: false,
      form: {
        company_id: job.get('is_template') && job.get('account_id') ? 'personal' : job.get('company_id')
      }
    }
    this.saveShareWith = this.saveShareWith.bind(this)
  }
  componentWillUnmount() {
    this.props.dispatchLocal('contextState', {lastFocusedField: null})
  }

  // Show an alert to people who click on a disabled field, but only show it once
  // Don't alert if fields are not disabled (e.g.: on the create a job screen):
  gamingAlert(e) {
    if (this.state.showedGamingAlert) return null
    if (!this.props.isSampleJob) {
      this.props.errorAction({
        position: 'fixed',
        title: 'About locked fields:',
        message: "The name on this job is editable until the first time you model.  The address is only editable at the time of job creation. Please contact Support if you need assistance.",
        timeout: 20000
      })
    }
    this.setState({showedGamingAlert: true})
    return e
  }

  saveShareWith(company_id) {
    const {jobId, account_id} = this.props
    let formVals = {id: jobId, is_template: 1}
    if (company_id === 'personal') {
      formVals = {...formVals, account_id, company_id: null}
    } else {
      formVals = {...formVals, account_id: null, company_id}
    }
    this.setState({form: {company_id}})
    this.props.dispatchSave('jobs', formVals)
  }

  render() {
    const dateTimeFormat = "Example: " + moment().set({'hours': 14, 'minutes': 30}).format('MM/DD/YYYY hh:mm A')
    const {job, jobId, companyOptions, isSnuggAdmin} = this.props
    const preventAddressGaming = disableAddressFields(job.get('sample_job'), isSnuggAdmin)
    const preventNameGaming = job.get('has_calculated') && !isSnuggAdmin
    const disabledStyle = preventAddressGaming ? {cursor: 'pointer'} : null

    if (job.get('is_template')) {
      return (
        <fieldset>
          <Snugg.Input id={jobId} field="Job First name" label="Template name" size={6}/>
          <Snugg.Input id={jobId} field="Job Last name" label="Template description" size={6}/>
          <Fields.Select
            label="Share With"
            validate="required"
            options={companyOptions}
            {...this.stateField('company_id')}
            onChange={this.saveShareWith}
             />
        </fieldset>
      )
    }

    return (
      <fieldset>
        <div onClick={(e) =>  preventNameGaming && this.gamingAlert(e)}>
          <Snugg.Input id={jobId} field="Job First name" size={6} disabled={preventNameGaming} />
          <Snugg.Input id={jobId} field="Job Last name" size={6} disabled={preventNameGaming} />
        </div>
        <Snugg.Radio id={jobId} field="Job Rent or own" />
        <Snugg.DateTimeField
          id={jobId}
          field="Appointment Date & Time"
          max={maxJobDate}
          min={minJobDate}
          step="60"
          size={6}
          helpBlock={Bowser.isTouch() || dateTimeFormat} />
        <Snugg.Input id={jobId} field='Job Email' size={6}/>
        <Snugg.Input id={jobId} field='Job Phone' size={6}/>
        <div onClick={(e) => preventAddressGaming && this.gamingAlert(e)} style={disabledStyle}>
          <Snugg.Input id={jobId} field='Job Address 1' disabled={preventAddressGaming} size={6}/>
          <Snugg.Input id={jobId} field='Job Address 2' disabled={preventAddressGaming} size={6}/>
          <Snugg.Input id={jobId} field='Job City' disabled={preventAddressGaming} size={6}/>
          <Snugg.Select id={jobId} field='Job State' options={states} disabled={preventAddressGaming} size={6}/>
          <Snugg.Input id={jobId} field='Job Zip' validate='minLength:5|maxLength:5' disabled={preventAddressGaming} size={6}/>
        </div>
      </fieldset>
    )
  }

};
