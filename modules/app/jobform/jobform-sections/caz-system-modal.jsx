import React from 'react'
import {Modal, Form} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import {Button} from 'ui'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'

class CazSystemModalBody extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (!nextProps.systemUUID) {
      return false
    }
    return true
  }

  render() {
    const {
      props: {systemUUID, systemName, cazZones, jobId}
    } = this
    const cazOptions = cazZones.map((c) => [c.get('uuid'), c.get('caz_name')])
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>CAZ Measurements for {systemName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <Snugg.Select uuid={systemUUID} label="CAZ" field="CAZ Uuid" options={cazOptions} />
            {/*The following fields are for each individual combustion appliance (heating system or DHW that burns fuel)*/}
            <Snugg.Rec.Row uuid={systemUUID} field="CAZ Appliance Vent System Type" />
            <Snugg.Rec.Row uuid={systemUUID} field="CAZ Appliance CO Current Condition" />
            <Snugg.Rec.Row uuid={systemUUID} field="CAZ Appliance CO Poor Scenario" />
            <Snugg.Rec.Row uuid={systemUUID} field="CAZ Appliance CO Test Result" />
            <Snugg.Rec.Row uuid={systemUUID} field="CAZ Appliance Spillage Current Condition" />
            <Snugg.Rec.Row uuid={systemUUID} field="CAZ Appliance Spillage Poor Condition" />
            <Snugg.Rec.Row uuid={systemUUID} field="CAZ Appliance Spillage Test Result" />
            <Snugg.Rec.Row uuid={systemUUID} field="CAZ Fuel Leaks Identified" />
            <Snugg.Rec.Row uuid={systemUUID} field="CAZ Fuel Leaks Addressed" />

            {/*Use this next one only if the appliance is a water heater (DHW)*/}
            <Snugg.Rec.Row uuid={systemUUID} field="CAZ Water Heater Orphaned" />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={exitHandler(jobId)} size="lg" variant="link">Close</Button>
        </Modal.Footer>
      </div>
    )
  }
}

@connect((state, {show, jobId, systemUUID}) => {
  if (!show) {
    return {}
  }
  return {
    systemName: f.caz.cazSystemName(state, systemUUID),
    cazZones: state.fn.cazByJobId(jobId)
  }
})
export default class CazSystemModal extends React.Component {

  render() {
    const {
      props: {show, systemUUID, systemName, cazZones, jobId}
    } = this
    return (
      <Modal show={show} onHide={exitHandler(jobId)} >
        <CazSystemModalBody jobId={jobId} systemName={systemName} systemUUID={systemUUID} cazZones={cazZones} />
      </Modal>
    )
  }

}

function exitHandler(jobId: number) {
  return (e) => {
    if (e) e.preventDefault()
    browserHistory.push(`/job/${jobId}`)
  }
}
