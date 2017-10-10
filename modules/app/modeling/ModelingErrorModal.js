import React, {PropTypes} from 'react'
import {Modal, Form} from 'react-bootstrap'
import {Button} from 'ui'
import FoundationTable from '../jobform/tables/FoundationTable'
import PercentLoadTable from '../hvacs/PercentLoadTable'
import DuctsValidation from '../hvacs/DuctsValidation'
import HvacSection from '../jobform/jobform-sections/hvacs'
import AtticVaultTotalTable from './AtticVaultTotalTable'
import PercentDhwTable from './PercentDhwTable'
import PercentWallTable from './PercentWallTable'
import WindowTable from './WindowTable'
import WindowAreaTable from './WindowAreaTable'

import {InlineNotification} from 'app/components/overlays'

export default class ModelingErrorModal extends React.Component {

  static childContextTypes = {
    jobId: PropTypes.number.isRequired
  };

  getChildContext() {
    return {
      jobId: this.props.jobId
    }
  }

  static propTypes = {
    jobId: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
    errors: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    onModelClick: PropTypes.func.isRequired
  };

  render() {
    const {
      props: {jobId, show, onClose, onModelClick, errors}
    } = this
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            The following errors must be fixed before modeling:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontSize: '0.9em'}}>
          <Form onSubmit={onModelClick}>
            {errors.map((err, i) => {
              const {uuid, improved, field, type, component, message, id, collectionIndex} = err
              if (field) {
                return (
                  <div key={i}>
                    <Snugg.Input id={id} jobId={jobId} field={field} uuid={uuid} improved={improved} error={message}/>
                    <InlineNotification theme="error" message={message} />
                  </div>
                )
              }
              if (component === 'FoundationTable') {
                return <FoundationTable jobId={jobId} key={i} />
              }
              if (component === 'PercentLoadTable') {
                return <PercentLoadTable jobId={jobId} type={type} improved={improved} key={i} />
              }
              if (component === 'AtticVaultTotalTable') {
                return <AtticVaultTotalTable jobId={jobId} uuid={uuid} key={i} />
              }
              if (component === 'DuctsValidation') {
                return <DuctsValidation inlineNotification={message} jobId={jobId} uuid={uuid} key={i} />
              }
              if (component === 'PercentDhwTable') {
                return <PercentDhwTable jobId={jobId} key={i} />
              }
              if (component === 'PercentWallTable') {
                return <PercentWallTable jobId={jobId} key={i} />
              }
              if (message === 'NO_HVAC_SYSTEMS') {
                return <InlineNotification key={i} theme='error' message='You must add at least one HVAC system'/>
              }
              if (message === 'NO_HVAC_BASE_SYSTEMS') {
                return <HvacSection jobId={jobId} key={i} inlineNotification='You must have at least one HVAC "base" system' />
              }
              if (message === 'NO_HVAC_IMPROVED_SYSTEMS') {
                return <HvacSection jobId={jobId} key={i} inlineNotification='You must have at least one HVAC "improved" system' />
              }
              if (message === 'TOO_MANY_HVAC_SYSTEMS') {
                return <HvacSection jobId={jobId} key={i} inlineNotification='Invalid HVAC configuration, please contact support for help' />
              }
              if (component === 'WindowTable') {
                return <WindowTable jobId={jobId} uuid={uuid} key={i} collectionIndex={collectionIndex}/>
              }
              if (component === 'WindowAreaTable') {
                return <WindowAreaTable jobId={jobId} errorMessage={message} key={i} />
              }
              return <div key={i}>{JSON.stringify(err)}</div>
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onModelClick} size="lg" variant="link">Complete Modeling</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
