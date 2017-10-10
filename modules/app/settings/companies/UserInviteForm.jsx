import React from 'react'
import Fields from 'fields'
import {PrimaryButton} from 'ui'
import {Col} from 'react-bootstrap'
import {dispatchCreate, successAction} from 'data/actions'
import {connect} from 'snugg-redux'

@connect(null, {dispatchCreate, successAction})
export default class InviteForm extends React.Component {

  static propTypes = {
    closeForm: React.PropTypes.func
  };

  state = {
    submitting: false,
    form: {
      email: '',
      title: '',
      role: ''
    }
  };

  handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({submitting: true})
    this.props.dispatchCreate('invitations', {
      ...this.state.form,
      company_id: this.props.companyId
    })
    .then(() => {
      this.props.successAction({
        title: `Invite sent to ${this.state.form.email}`,
        timeout: 5000
      })
      this.setState({
        form: {email: '', title: '', role: ''},
        submitting: false
      })
    })
    .catch(e => {
      this.setState({submitting: false})
    })
  };

  fieldChange = (field, value) => {
    this.setState({form: {...this.state.form, [field]: value}})
  };

  render() {
    const {form: {role, title, email}, submitting} = this.state
    return (
      <Col sm={8} smOffset={2} style={{paddingTop: 40}}>
        <form className="well" style={{paddingTop: 40, position: 'relative'}} onSubmit={this.handleSubmit}>
          <div className="close" style={styles.closeBtn} onClick={this.props.closeForm}> × </div>
          <fieldset>
            <Fields.Input
              value={email}
              onChange={this.fieldChange.bind(this, 'email')}
              label="Email"
              type="email"
              required />
            <Fields.Input
              value={title}
              label="Title"
              onChange={this.fieldChange.bind(this, 'title')}
              placeholder="e.g.: Energy Auditor  "/>
            <Fields.Select
              value={role}
              required
              label="Permissions:"
              onChange={this.fieldChange.bind(this, 'role')}
              options={permissionOptions}
              required />
          </fieldset>
          <PrimaryButton isSubmit disabled={submitting} label="Send invite email" />
        </form>
      </Col>

    )
  }
};

const permissionOptions = [
  ['', ''],
  ['user', 'User - Manages their jobs'],
  ['admin', 'Admin - Manages all jobs, billing, company and users']
]

const styles = {
  closeBtn: {
    position: 'absolute',
    cursor: 'pointer',
    top: 10,
    right: 0,
    padding: "0px 20px 0 0",
    fontSize: 44,
    fontWeight: 300,
    lineHeight: '.9em',
    userSelect: 'none'
  }
}
