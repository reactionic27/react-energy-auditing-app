import React from 'react'
import Fields from 'fields'
import localForm from 'decorators/localFormDecorator'
import {Modal} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import {connect} from 'snugg-redux'
import {Row, Col, PrimaryButton} from 'ui'
import strip from 'util/strip'
import {dispatchCreate, successAction} from 'data/actions'

const initialState = {
  hasAttemptedSubmit: false,
  isSubmitting: false,
  form: {
    name: '',
    website: '',
    phone: '',
  }
};

@connect((state, props) => {
  const user = state.fn.loggedInUser()
  return {
    fullName: strip`${user.get('first_name')} ${user.get('last_name')}`,
    companies: state.fn.companiesByUser(user),
    programs: state.snugg.get('programs')
  }
}, {dispatchCreate, successAction})
@localForm
export default class CreateCompanyForm extends React.Component {

  state = initialState;

  handleSubmit = (e) => {
    e.preventDefault()
    this.props
      .dispatchCreate('companies', this.state.form)
      .then(resp => {
        browserHistory.push(`/settings/company/${resp.id}`)
        this.props.successAction({
          theme: 'success',
          title: 'You successfully created a new company.',
          message: "Now complete your company's information and invite your colleagues here.",
          timeout: 10000
        })
      })
  };

  render() {
    const {fullName, show, companies, programs} = this.props
    let programOptions = []
    programs.map((program) => {
      return programOptions.push({value: program.get('name'), label: program.get('name')})
    })
    return (
      <Modal show={show} onHide={() => {
        browserHistory.replace(`/settings/companies`)
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{marginTop: 10, marginBottom: 30}}>
            <p>You're logged in as {fullName}.  Not you? <a href='/logout?from=settings/companies/add-new'>Log in as a different user.</a></p>
            <p>You're already associated with the following companies:</p>
            <ul>
              {companies.map((company, i) => (
                <li key={i}>{company.get('name')}</li>
              ))}
            </ul>
          </div>
          <hr/>
          <form onSubmit={this.handleSubmit}>
            <Fields.Input {...this.stateField('name')} validate="required" label="Company name" required size={6} />
            <Fields.Input {...this.stateField('website')} label="Website" placeholder="http://example.com" size={6} />
            <Fields.Input {...this.stateField('phone')} label="Office Phone" placeholder="(555) 555-5555" size={6} />
            <Fields.MultiSelect
              {...this.stateField('source')}
              multi options={programOptions}
              label="Program(s)"/>
            <Row>
              <Col sm={6} smOffset={3}>
                <PrimaryButton isSubmit label="Create Company" />
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}
