import React, {PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {Button} from 'ui'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import HvacCreateSystem from './HvacCreateSystem'
import HvacEditSystem from './HvacEditSystem'

export default class HvacModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      uuid: props.uuid
    }
  }

  componentWillReceiveProps(nextProps) {
    // uuid is kept as state to prevent invalid state when unmounting
    if (nextProps.show !== false && nextProps.uuid !== undefined) {
      this.setState({uuid: nextProps.uuid})
    }
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static propTypes = {
    source: PropTypes.oneOf(['job', 'recommendation']).isRequired
  };

  exitHandler = () => {
    browserHistory.goBack()
  }

  renderCreate() {
    const {
      props: {show, jobId}
    } = this
    return (
      <Modal show={show} onHide={this.exitHandler}>
        <Modal.Header closeButton>
          <Modal.Title>
            Add New System
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontSize: '0.9em'}}>
          <HvacCreateSystem jobId={jobId} />
        </Modal.Body>
      </Modal>
    )
  }

  renderEdit() {
    const {
      props: {show, jobId},
      state: {uuid}
    } = this
    return (
      <Modal show={show} bsSize='lg' onHide={this.exitHandler}>
        <Modal.Header closeButton>
          <EditTitle uuid={uuid} />
        </Modal.Header>
        <Modal.Body style={{fontSize: '0.9em'}}>
          <HvacEditSystem jobId={jobId} uuid={uuid} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" size="lg" onClick={this.exitHandler}>Close HVAC System</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
    const {
      state: {uuid}
    } = this
    return uuid === 'create' ? this.renderCreate() : this.renderEdit()
  }
}

const EditTitle = connect((state, {uuid}) => {
  return {
    hvacTitle: 'Edit System ' + (state.fn.hvacByUuid(uuid).get('title') || '')
  }
})(function EditTitle({hvacTitle}) {
  return (
    <Modal.Title>
      {hvacTitle}
    </Modal.Title>
  )
})

HvacModal.propTypes = {
  jobId: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  uuid: PropTypes.string
}
