import React, {PropTypes} from 'react'
import Fields from 'fields'
import _ from 'lodash'
import {browserHistory} from 'react-router'
import states from 'app/job/components/states'
import {validateCard, checkMonthsUntilExpired} from 'util/cardValidation'
import CardWarning from './CardWarning'
import CardError from './CardError'
import CreateJobContext from './CreateJobContext'
import moment from 'moment'
import {PrimaryButton} from 'ui'
import {Row, Col} from 'react-bootstrap'
import {connect} from 'snugg-redux'
import DocumentTitle from 'react-document-title'
import localForm from 'decorators/localFormDecorator'
import {IMapType} from 'data/types'
import * as f from 'data/formatters'
import {STAGES} from 'data/constants'
import {warningAction, dispatchCreate} from 'data/actions'

@connect((state, props) => ({
  userId: state.fn.loggedInUser().get('id')
}))
export default class CreateNewJobForm extends React.Component {

  constructor({userId, segments: {two}}) {
    super(...arguments)

    this.state = {
      // Main info needed to render the rest of the form.
      company_id: two || null,
      account_id: userId,
      program_id: null,
      stage_id: 1,
      start_with: null,
      from_template_id: null,
    }
    this.updateKey = this.updateKey.bind(this)
  }

  updateKey(key: string, value: ?number) {
    this.setState({
      [key]: value
    })
  }

  render() {
    return <FinalCreateNewJobForm {...this.state} updateKey={this.updateKey} />
  }

}

function findTemplateOption(templateOptions: Array, templateId: number) {
  return _.find(templateOptions, (obj) => {
    if (_.isPlainObject(obj)) return findTemplateOption(_.values(obj)[0], templateId)
  })
}

@connect((state, {company_id, account_id, program_id, stage_id, from_template_id, start_with}) => {
  let cardError, cardWarning, company, accounts, programs, account, program, stage, template_options;
  const user = state.fn.loggedInUser()
  const userId = user.get('id')
  const companies = state.fn.companiesByUser(user)

  if (company_id) {
    company = state.fn.companyById(company_id)
    const canAdminCompany = f.account.canAdminCompany(state, company)
    accounts = canAdminCompany
      ? state.fn.accountsByCompanyId(company_id)
      : [user]
    programs = state.fn.programsByCompanyId(company_id)
    if (account_id) {
      account = accounts.find(a => a.get('id') === account_id)
      if (!account) {
        account_id = userId
      }
    }
    if (program_id) {
      program = programs.find(p => p.get('id') === program_id)
      if (!program) {
        program_id = 1
      }
    }
    if (stage_id) {
      stage = STAGES.find(s => s[0] === stage_id)
      if (!stage) {
        stage_id = 8 // Uncategorized
      }
    }
    if (company) {
      cardError = (program && program.get('paysForJob'))
      ? null
      : validateCard(company)

      cardWarning = !cardError && program && program.get('paysForJob')
      ? null
      : checkMonthsUntilExpired(company)
    }
    if (company) {
      if (start_with === TEMPLATE_JOB) {
        template_options = f.job.templatesDropdown(state, userId, company_id, program_id || 1)
        if (from_template_id) {
          if (!findTemplateOption(template_options, from_template_id)) {
            from_template_id = null
          }
        }
      } else {
        from_template_id = null
      }
    }
  }
  const hasPrograms = _.size(programs) > 1
  const hasProgramAndProgramSelected = hasPrograms ? program : false
  return {
    company_id,
    account_id,
    program_id,
    stage_id,
    start_with,
    template_options,
    account,
    accounts,
    program,
    programs,
    hasPrograms,
    hasProgramAndProgramSelected,
    company,
    companies,
    cardError,
    cardWarning
  }
}, {warningAction, dispatchCreate})
@localForm
class FinalCreateNewJobForm extends React.Component {

  static propTypes = {
    company_id: PropTypes.number,
    account_id: PropTypes.number,
    program_id: PropTypes.number,
    stage_id: PropTypes.number,
    companies: PropTypes.arrayOf(IMapType),
    accounts: PropTypes.arrayOf(IMapType),
    programs: PropTypes.arrayOf(IMapType),
    program: IMapType,
    company: IMapType
  };

  constructor(props) {
    super(...arguments)
    this.state = {
      isSubmitting: false,
      hasAttemptedSubmit: false,
      showStripeModal: false,
      form: {
        is_template: 0,
        service_time: null,
        first_name: null,
        last_name: null,
        email: null,
        home_phone: null,
        address_1: null,
        address_2: null,
        city: null,
        state: null,
        zip: null,
        renter_owner: null
      }
    }
    this.changeCompany = (val) => props.updateKey('company_id', val)
    this.changeAccount = (val) => props.updateKey('account_id', val)
    this.changeProgram = (val) => props.updateKey('program_id', val)
    this.changeStage = (val) => props.updateKey('stage_id', val)
    this.changeTemplate = (val) => props.updateKey('from_template_id', val)
    this.changeStartWith = (val) => props.updateKey('start_with', val)
    this.handleDateBlur = this.handleDateBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit(e) {
    e.preventDefault()
    const {program_id} = this.props
    this.setState({hasAttemptedSubmit: true})
    if (this.formIsValid()) {
      this.setState({isSubmitting: true})
      const formVals = {
        ..._.pick(this.props, ['company_id', 'stage_id', 'account_id', 'from_template_id']),
        program_id: program_id || 1,
        ...this.state.form
      }
      this.props
        .dispatchCreate('jobs', formVals)
        .then(resp => {
          browserHistory.push(`/job/${resp.id}`)
        })
        .catch(() => {
          this.setState({isSubmitting: false})
        })
    }
  };

  handleDateBlur(e) {
    e.preventDefault()
    if (!moment(e.currentTarget.value).isValid()) {
      this.props.warningAction({
        title: "Partial date and time set.",
        message: 'If you want to set an appointment time, you need to set both date and time (including AM/PM). The date and time will not be saved until the field is completely filled out. This is not a required field so you can leave it blank if you don\'t know the appointment time yet.',
        timeout: 15000
      })
    }
  };

  createJobBody() {
    const {cardError, cardWarning, from_template_id, start_with, company_id} = this.props
    const {showStripeModal} = this.state
    if (cardError) {
      return (
        <CardError showStripeModal={showStripeModal} showModal={this.showStripeModal} closeModal={this.hideStripeModal} cardError={cardError} company_id={company_id} />
      )
    }
    const cardWarningBlock = cardWarning
      ? <CardWarning showStripeModal={showStripeModal} showModal={this.showStripeModal} closeModal={this.hideStripeModal} company_id={company_id} cardWarning={cardWarning} />
      : null

    const templateSelector = start_with === TEMPLATE_JOB
      ? this.templateSelector()
      : null

    const allFields = (start_with === BLANK_JOB || start_with === TEMPLATE_JOB && from_template_id)
      ? this.createJobFields()
      : null
    return (
      <div>
        {cardWarningBlock}

        <Fields.Radio label='Start With:' options={JOB_START_WITH} value={start_with || ''} onChange={this.changeStartWith} />

        {templateSelector}

        {allFields}
      </div>
    )
  }

  templateSelector() {
    const {from_template_id, template_options} = this.props
    return (
      <Fields.Select
        label="Template"
        sm={3}
        value={from_template_id || ''}
        onChange={this.changeTemplate}
        options={template_options} />
    )
  }

  createJobFields() {
    const {isSubmitting} = this.state
    return (
      <div style={{paddingBottom: 50}}>
        <Fields.DateTimeField
          label='Appointment Date & Time'
          onBlur={this.handleDateBlur}
          style={{width: 300}}
          helpBlock="Example: 01/07/2017 02:30 PM"
          {...this.stateField('service_time')} />
        <Fields.Input label='First Name' {...this.stateField('first_name')} />
        <Fields.Input label='Last Name' {...this.stateField('last_name')} validate='required' />
        <Fields.Email label='Email' {...this.stateField('email')} />
        <Fields.Telephone label='Phone' {...this.stateField('home_phone')} />
        <Fields.Input label='Address 1' {...this.stateField('address_1')} validate='required' />
        <Fields.Input label='Address 2' {...this.stateField('address_2')} />
        <Fields.Input label='City' {...this.stateField('city')} validate='required' />
        <Fields.Select label='State' {...this.stateField('state')} options={states} validate='required' />
        <Fields.Zip label='Zip' {...this.stateField('zip')} validate='required|maxLength:5|minLength:5' />
        <Fields.Radio label='Rent or Own' {...this.stateField('renter_owner')} options={RENTER_OWNER} />
        <div style={{marginTop: 30, marginBottom: 30}}>
          <PrimaryButton isSubmit disabled={isSubmitting} label="Create new job" />
        </div>
      </div>
    )
  }

  getProgramOptions(programs) {
    const filteredPrograms = programs
                              .filter(p => p.get('id') !== 1)
                              .map(p => [p.get('id'), p.get('name')])
    const sortedPrograms = _.sortBy(filteredPrograms, (p) => p[1])
    return EMPTY_OPT
            .concat([[1, 'None']])
            .concat(sortedPrograms)
  }

  // Render the account & program dropdowns
  accountAndProgram() {
    const {account_id, program_id, stage_id, accounts, programs, hasPrograms} = this.props
    const accountOptions = EMPTY_OPT.concat(accounts.map(a => [a.get('id'), `${a.get('first_name')} ${a.get('last_name')}`]))
    const programOptions = this.getProgramOptions(programs)

    return (
      <div>
        <Fields.Select
          label="Assign To Account:"
          value={account_id || ''}
          onChange={this.changeAccount}
          sm={3}
          options={accountOptions} />
        {hasPrograms
          ? <Fields.Select
              label="Program:"
              value={program_id || ''}
              onChange={this.changeProgram}
              sm={3}
              options={programOptions} />
          : <span/>
        }
        <Fields.Select
          label="Stage:"
          value={stage_id || ''}
          onChange={this.changeStage}
          sm={3}
          options={STAGES} />
      </div>
    )
  }

  render() {
    const {companies, company_id, program_id, company, account, hasPrograms, hasProgramAndProgramSelected, cardWarning} = this.props
    const companiesOptions = EMPTY_OPT.concat(companies.map(c => [c.get('id'), c.get('name')]))

    const accountAndProgram = company_id
      ? this.accountAndProgram()
      : null

    const createJobBody = company && account && (!hasPrograms || hasProgramAndProgramSelected)
      ? this.createJobBody()
      : null

    return (
      <DocumentTitle title="Create a new job | Snugg Pro">
        <Row>
          <Col mdOffset={1} sm={6} md={5} lg={4} lgOffset={2}>
            <h1>Create a job</h1>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              {/* 1. Select the company the job will be assigned to. All following fields depend on company id*/}
              <Fields.Select
                label="Company:"
                value={company_id || ''}
                onChange={this.changeCompany}
                sm={3}
                options={companiesOptions} />

              {/* 2. Select account and program the job will be assigned to */}
              {accountAndProgram}

              {/* 3. Get the company info based on company id */}
              {createJobBody}
            </form>
          </Col>
          <Col sm={5} smOffset={1} md={4} mdOffset={2} lg={3} lgOffset={1} style={{marginTop: 80}} >
            <CreateJobContext company_id={company_id} program_id={program_id} cardWarning={cardWarning} />
          </Col>
        </Row>
      </DocumentTitle>
    );
  }
};

const EMPTY_OPT = [[null, '']]

const BLANK_JOB = 0
const TEMPLATE_JOB = 1

const JOB_START_WITH = [
  [BLANK_JOB, 'Blank Job'],
  [TEMPLATE_JOB, 'Template Job']
]

const RENTER_OWNER = [
  [0, 'Renter'],
  [1, 'Owner']
]
