import React, { Component } from 'react'
import {Modal, Form, Row, Col, Clearfix} from 'react-bootstrap'
import {Button} from 'ui'
import {FieldAlert, InlineNotification} from 'app/components/overlays'
import FoundationTable from 'app/jobform/tables/FoundationTable'
import HvacCard from 'app/hvacs/HvacCard'
import {browserHistory} from 'react-router'
import * as f from 'data/formatters'

function ErrorBlock({message, children}) {
  return (
    <div style={{marginBottom: 25}}>
      {children}
      <Row>
        <Col smOffset={3} sm={4}>
          <FieldAlert theme="error" message={message}/>
        </Col>
      </Row>
    </div>
  )
}

function CavityAndContinuousFields({jobId, uuid, improved, message, type}) {
  return (
    <div>
      <Snugg.Input jobId={jobId} uuid={uuid} field={`${type} Cavity Insulation`} error={message} improved={improved}/>
      <Snugg.Input jobId={jobId} uuid={uuid} field={`${type} Continuous Insulation`} error={message} improved={improved}/>
      <InlineNotification theme="error" message={message} />
    </div>
  )
}

function WindowArea({jobId, uuid, improved, message, side}) {
  const windowSide = f.str.toTitleCase(side)
  return (
    <div>
      <Snugg.Percentage uuid={uuid} field={`Window: ${windowSide} Area Percent`} error={message} improved={improved}/>
      <Snugg.Rec.Row uuid={uuid} field={`Window Area: ${windowSide}`} improved={improved} />
      <InlineNotification theme="error" message={message} />
    </div>
  )
}

export default class HesErrorModal extends Component {
  componentDidMount() {
    const {baseDataErrors, validationErrors, jobId, show} = this.props
    if (baseDataErrors.length === 0 && validationErrors.length === 0 && show) {
      browserHistory.push(`/job/${jobId}/report`)
    }
  }
  render() {
    const {show, onClose, baseDataErrors, validationErrors, jobId} = this.props
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            The following errors must be fixed before modeling:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontSize: '0.9em'}}>
          <Form onSubmit={onClose}>
            {baseDataErrors.map((error, i) => {
              const {uuid, jobId, field, message, component, side, improved} = error
              if (field) {
                return (
                  <ErrorBlock key={i} message={message}>
                    <Snugg.Input jobId={jobId} uuid={uuid} field={field.name} error={message}/>
                  </ErrorBlock>
                )
              }
              if (component === 'FoundationTable') {
                return <FoundationTable jobId={jobId} key={i} />
              }
              if (component === 'WindowArea') {
                return (
                  <WindowArea
                    key={'validationErrors' + i}
                    side={side}
                    jobId={jobId} uuid={uuid}
                    message={message} improved={improved}
                  />
                )
              }
            })}
            {validationErrors.map((error, i) => {
              const {uuid, jobId, field, message, component, improved, index} = error
              if (field) {
                return (
                  <div key={'validationErrors' + i}>
                    <Snugg.Input jobId={jobId} uuid={uuid} field={field.name}  error={message} improved={improved}/>
                    <InlineNotification theme="error" message={message} />
                  </div>
                )
              }
              if (component === 'Vault' || component === 'Wall' || component === 'Basement') {
                return (
                  <CavityAndContinuousFields
                    key={'validationErrors' + i}
                    type={component}
                    jobId={jobId} uuid={uuid}
                    message={message} improved={improved}
                  />
                )
              }
              if (component === 'Crawlspace') {
                return (
                  <div key={'validationErrors' + i}>
                    <Snugg.Input jobId={jobId} uuid={uuid} field={`Crawl Cavity Insulation`} error={message} improved={improved}/>
                    <Snugg.Input jobId={jobId} uuid={uuid} field={`Crawl Wall Insulation`} error={message} improved={improved}/>
                    <InlineNotification theme="error" message={message} />
                  </div>
                )
              }
              if (component === 'Hvac') {
                return (
                  <div key={'validationErrors' + i} className="cards">
                    <HvacCard key={uuid} uuid={uuid} jobId={jobId} index={index} />
                    <Clearfix/>
                    <InlineNotification theme="error" message={message} />
                  </div>
                )
              }
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose} size="lg" variant="link">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
