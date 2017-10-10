import React, {PropTypes} from 'react'
import {connect} from 'snugg-redux'
import {Alert, Clearfix} from 'react-bootstrap'
import {EQUIPMENT_OPTIONS} from '../../../constants/hvacConstants'
import {UPGRADE_ACTIONS} from '../../../constants/field-definitions/fields-hvac'
import {Col, PrimaryButton} from 'ui'
import Fields from '../../fields'
import localForm from 'decorators/localFormDecorator'
import {dispatchEagerCreate, dispatchLocal} from 'data/actions'
import {browserHistory} from 'react-router'
import {canAddHvac} from '../../data/formatters/hvacFormatters'

@connect((state, props) => {
  return {
    hvacs: state.fn.hvacsByJobId(props.jobId)
  }
}, {dispatchEagerCreate, dispatchLocal})
@localForm
export default class HvacCreateSystem extends React.Component {

  static propTypes = {
    hvacs: PropTypes.array.isRequired
  };

  constructor(props) {
    super(...arguments)
    this.state = {
      form: {
        hvac_system_name: `Hvac System ${props.hvacs.length + 1}`
      },
      blockError: null,
      isSubmitting: false
    }
  }

  submitHandler = (e) => {
    const {props: {jobId, dispatchLocal}, state: {form}} = this
    e.preventDefault()
    const canAdd = (this.canAddSystem() === true)
    this.setState({
      isSubmitting: canAdd
    })
    if (canAdd) {
      this.props.dispatchEagerCreate('hvac', {
        ...form,
        job_id: jobId
      }, {
        info: ({payload: {uuid}}) => {
          browserHistory.goBack()
          dispatchLocal('setNewHvacUuid', {uuid})
        }
      })

    }
  }

  canAddSystem = () => {
    const {
      state: {
        form: {
          hvac_upgrade_action,
          hvac_system_equipment_type
        }
      }
    } = this
    const ableToAdd = Boolean(hvac_upgrade_action && hvac_system_equipment_type)
    return ableToAdd && canAddHvac(this.props.hvacs, hvac_system_equipment_type, hvac_upgrade_action)
  }

  render() {
    let button = (
      <Col sm={6} smOffset={3}>
        <PrimaryButton isSubmit label="Add system and continue" />
      </Col>
    )
    if (!this.state.isSubmitting) {
      const canAddSystem = this.canAddSystem()
      if (canAddSystem instanceof Error) {
        button = <CanAddError error={canAddSystem} />
      }
    }
    return (
      <form onSubmit={this.submitHandler}>
        <Fields.Input label="System Name" placeholder="Name this system" {...this.stateField('hvac_system_name')} />
        <Fields.Select label="System Equipment Type" options={EQUIPMENT_OPTIONS} {...this.stateField('hvac_system_equipment_type')} />
        <Fields.Select label="Upgrade action" options={UPGRADE_ACTIONS} {...this.stateField('hvac_upgrade_action')} />
        {button}
        <Clearfix />
      </form>
    )
  }
}

function CanAddError({error}) {
  return (
    <Col sm={6} smOffset={3}>
      <Alert bsStyle="warning">
        <strong>Unable to add this system</strong><br /><br />
        {error.message}
      </Alert>
    </Col>
  )
}
