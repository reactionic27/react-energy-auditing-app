import React from 'react'
import FinancingFormContainer from './FinancingFormContainer'
import {Link} from 'react-router'
import {Modal} from 'react-bootstrap'
import {browserHistory} from 'react-router'

export default class CreateJobFinancingTemplate extends React.Component {

  render() {
    const {show, jobId} = this.props
    return (
      <Modal show={show} bsSize='lg' onHide={() => {
        browserHistory.replace(`/job/${jobId}/financing`)
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Add a financing product for this job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>If you want to create a reusable financing product, you should create a template in the
            <Link to="/settings/financing"> global settings section.</Link>
          </p>
          <hr />
          <FinancingFormContainer
            submitLabel="Add to this job"
            cancelPath={`/job/${jobId}/financing`} />
        </Modal.Body>
      </Modal>
    )
  }

};
