import React from 'react'
import {Map as IMap} from 'immutable'
import {Modal} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import {connectSelector} from '../../snugg-redux'
import FinancingFormContainer from './FinancingFormContainer'

@connectSelector({
  product: (state, {financingUuid}) => (
    financingUuid ? state.fn.jobFinancingByUuid(financingUuid) : IMap()
  )
})
export default class EditJobFinancingTemplate extends React.Component {

  render() {
    const {show, jobId, product} = this.props
    return (
      <Modal show={show} onHide={() => {
        browserHistory.replace(`/job/${jobId}/financing`)
      }} containerClassName="modal-containerthing">
        <Modal.Header closeButton>
          <Modal.Title>
            Edit: {product.get('title', '')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FinancingFormContainer
            editing={product}
            submitLabel="Save changes"
            editProductId={product.get('id')}
            cancelPath={`/job/${jobId}/financing`} />
        </Modal.Body>
      </Modal>
    )
  }

}
