import React from 'react'
import Fields from 'fields'
import localForm from '../../decorators/localFormDecorator'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {Row, Col, PrimaryButton} from 'ui'
import DupeExampleIDs from './DupeExampleIDs'
import {errorAction, successAction} from 'data/actions'
import {post} from 'util/network'


const initialState = {
  isSubmitting: false,
  form: {
    from_job_id: '',
    company_id: '',
    account_id: '',
    program_id: '',
  }
};

@connect(null, {errorAction, successAction})
@localForm
export default class DuplicateJob extends React.Component {

  state = initialState

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({hasAttemptedSubmit: true})
    if (this.formIsValid()) {
      this.setState({isSubmitting: true})
      post('/snuggadmin/create-job-from-job', this.state.form)
        .then(data => {
          this.props.successAction({
            title: `Job duplicated successfully.`,
            message: 'You are now viewing the current duplicated job'
          })
          browserHistory.push(`/job/${data.id}`)
        })
        .catch(e => {
          this.props.errorAction({
            title: `Job was not able to be duplicated.`,
            message: e.message
          })
        })
    } else {
      this.props.errorAction({
        title: "Validation failed.",
        message: "All fields need to be filled out",
      })
    }
  };

  refresh = (e) => {
    e.preventDefault()
    this.setState(initialState)
  }

  render() {
    const {isSubmitting, form: {from_job_id}} = this.state
    const submitLabel = from_job_id ? `Duplicate Job ${from_job_id}` : 'Duplicate Job'
    const isDisabled = isSubmitting || !from_job_id
    console.log(isSubmitting, from_job_id, this.state)
    return (
      <div>
        <Row>
          <Col md={8}>
            <h3>Duplicate Job or Template:</h3>
            <form className="form-horizontal" noValidate onSubmit={this.handleSubmit}>
              <Fields.Input validate="required" label='Job ID to Duplicate' {...this.stateField('from_job_id')} placeholder={this.props.jobId} />
              <Fields.Input label='New Company ID' {...this.stateField('company_id')} />
              <Fields.Input label='New Account ID' {...this.stateField('account_id')} />
              <Fields.Input label='New Program ID' {...this.stateField('program_id')} />
              <Row>
                <Col sm={3} style={{marginTop: 40, textAlign: 'right'}}>
                  <a href="#" onClick={this.refresh}>Refresh form</a>
                </Col>
                <Col sm={4} style={{marginBottom: 30}}>
                  <PrimaryButton isSubmit disabled={isDisabled} label={submitLabel} />
                </Col>
              </Row>
            </form>
          </Col>
          <Col md={4}>
            <DupeExampleIDs />
          </Col>
        </Row>
      </div>
    )
  }
}
