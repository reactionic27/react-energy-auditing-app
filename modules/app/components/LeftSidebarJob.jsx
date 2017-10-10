import React from 'react'
import {connectSelector} from 'snugg-redux'
import {dispatchModel} from 'data/actions'
import ModelingErrorModal from '../modeling/ModelingErrorModal'
import LeftSidebarButton from 'app/components/LeftSidebarButton.jsx'
import {Icon} from 'ui'
import * as f from 'data/formatters'

@connectSelector({
  job: (state, {jobId}) => state.fn.jobById(jobId)
}, {dispatchModel})
export default class LeftSidebarJob extends React.Component {

  state = {
    errors: [],
    show: false
  };

  static propTypes = {
    jobId: React.PropTypes.number.isRequired
  };

  static contextTypes = {
    isSnuggAdmin: React.PropTypes.bool.isRequired,
    isProgramAdmin: React.PropTypes.bool.isRequired,
    hideLeftPushNav: React.PropTypes.func
  };

  // Remove the push state when clicking on the semi-transparent overlay
  handleButtonClick = (e) => {
    this.context.hideLeftPushNav()
  };

  optimiserClick = (e) => {
    e.preventDefault()
    const {props: {jobId: job_id, job}} = this
    const account_id = job.get('account_id')
    this.props.dispatchModel({job_id, account_id})
      .then(resp => {
        if (resp && resp.errors) {
          this.setState({show: true, errors: resp.errors})
        } else {
          this.setState({show: false})
        }
      })
  }

  onModalClose = () => {
    this.setState({show: false})
  }

  render() {
    const {
      context: {isProgramAdmin, isSnuggAdmin},
      props: {job, jobId, segments}
    } = this

    const isTemplate = job.get('is_template')
    const segmentThree = segments.three
    const modelingId = job.get('is_calculating')
    const hasUnmodeledChanges = f.job.hasUnmodeledChanges(job)
    const canCalculate = !isTemplate && !isProgramAdmin
    const modelingIcon = hasUnmodeledChanges || modelingId ? 'modeling' : 'checkMark'
    let modelingText

    switch (modelingId) {
      case true:
        modelingText = 'Sending';
        break;
      case false:
        modelingText = 'Cancelling';
        break;
      default: {
        modelingText = modelingId ? 'Cancel' : 'Model it'
      }
    }

    if (!hasUnmodeledChanges && !modelingId) {
      modelingText = 'Modeled'
    }

    return (
      <div>
        <LeftSidebarButton
          iconType="input"
          iconLabel="Input"
          to={`/job/${jobId}`}
          onClick={this.handleButtonClick}
          isActive={!segmentThree}/>

        <LeftSidebarButton
          iconType="refine"
          iconLabel="Refine"
          to={`/job/${jobId}/recommendations`}
          onClick={this.handleButtonClick}
          isActive={segmentThree === 'recommendations' || segmentThree === 'recommendation'}
          />

        <LeftSidebarButton
          iconType="financing"
          iconLabel="Finance"
          to={`/job/${jobId}/financing`}
          onClick={this.handleButtonClick}
          isActive={segmentThree === 'financing'}
        />

        <LeftSidebarButton
          iconType="report"
          iconLabel="Report"
          to={`/job/${jobId}/report`}
          onClick={this.handleButtonClick}
          isActive={segmentThree === 'report'}
          />

        {!isTemplate && isSnuggAdmin
          ?
          <LeftSidebarButton
            iconLabel="Debug"
            iconType="debug"
            to={`/job/${jobId}/debug`}
            isActive={segmentThree === 'debug'} />
          :  null
        }
        {canCalculate &&
          <div>
            <div className="btn-calculate-job clickable" tabIndex="-1" onClick={this.optimiserClick}>
              <div className="isolate-spinner">
                <Icon type={modelingIcon} size={20} customClass={modelingId ? 'ico-spin' : ''} />
              </div>
              <span className="sidebar-text">
                {modelingText}
              </span>
            </div>
            <ModelingErrorModal
              jobId={jobId}
              show={this.state.show}
              errors={this.state.errors}
              onClose={this.onModalClose}
              onModelClick={this.optimiserClick} />
          </div>
        }
      </div>
    )
  }
}
