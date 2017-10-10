import React from 'react'
import {Map as IMap} from 'immutable'
import {connect} from 'snugg-redux'
import RecommendationBody from 'app/recommendations/RecommendationBody'
import {Modal} from 'react-bootstrap'
import { browserHistory } from 'react-router'
import pureRender from 'react-pure-render/function';

@connect((state, {jobId, refineSection}) => {
  return {
    recommendation: refineSection ? state.fn.recByType(jobId, refineSection) : null
  }
})
class QuickEditRecommendation extends React.Component {

  // Don't update if we're unmounting.
  shouldComponentUpdate(nextProps) {
    if (nextProps.recommendation === null) {
      return false
    }
    return pureRender.apply(this, arguments)
  }

  render() {
    const {jobId, recommendation} = this.props
    return <RecommendationBody jobId={jobId} recommendation={recommendation} inline />
  }
}

// TODO: Tim, fix this so it's not as glitchy on transition
@connect((state, {jobId, show, refineSection}) => {
  return {
    recommendation: show && refineSection ? state.fn.recByType(jobId, refineSection) : null
  }
})
export default class JobFormRefineModal extends React.Component {

  closeModal = (e) => {
    const { jobId } = this.props
    browserHistory.push(`/job/${jobId}`)
  };

  // TODO: Create a formatter for getting the recommendation title ?
  render() {
    const {show, recommendation} = this.props
    const modalTitle = IMap.isMap(recommendation) ? recommendation.get('title') : 'Untitled'
    return (
      <Modal show={show} bsSize='lg' onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle} | Quick Refine</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontSize: '0.9em'}}>
          <div className="rec-single">
            <QuickEditRecommendation {...this.props} />
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}
