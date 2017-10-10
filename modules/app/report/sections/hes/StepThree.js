import React from 'react'
import Step from './Step'
import {Row, Col} from 'react-bootstrap'
import ConfirmationModal from 'app/components/overlays/modals/ConfirmationModal'
import {PrimaryButton, Icon} from 'ui'
import {InlineNotification} from 'app/components/overlays'
import {calculateHesAction, successAction} from 'data/actions'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'

@connect((state, {jobId}) => {
  const job = state.fn.jobById(jobId)
  const hasUnmodeledChanges = f.job.hasUnmodeledChanges(job)
  const mayHaveUnmodeledChanges = f.job.mayHaveUnmodeledChanges(job)
  return {
    hasUnmodeledChanges,
    mayHaveUnmodeledChanges
  }
}, {calculateHesAction, successAction})
export default class StepFour extends React.Component {

  constructor() {
    super(...arguments)
    this.state = {
      showHesModal: false,
      isHESModeling: false,
    }
    this.getHESConfirm = this.getHESConfirm.bind(this)
  }

  getHESConfirm() {
    this.setState({isHESModeling: true, showHesModal: false})
    const {jobId, scoreTypeToModel, transactionTypeToModel, calculateHesAction, successAction, modelAsMentor} = this.props
    calculateHesAction(jobId, scoreTypeToModel, transactionTypeToModel, modelAsMentor)
      .then((response) => {
        if (response) {
          successAction({
            message: 'You successfully obtained a Home Energy Score.',
            timeout: null
          })
        }
        this.setState({isHESModeling: false})
      })
  }

  render() {
    const {
      props: {isEnabled, scoreTypeToModel, modelAsMentor, hasUnmodeledChanges, mayHaveUnmodeledChanges},
      state: {showHesModal, isHESModeling}
    } = this
    return (
      <Step
        isEnabled={isEnabled}
        title={`Step 3: Get the ${scoreTypeToModel} home energy score for this home.`} >
        {mayHaveUnmodeledChanges ?
          <InlineNotification
            title="Does this job need modeling?"
            message={
              `If this job has any unmodeled changes, you must model this job before getting a Home Energy Score. <br/>A score cannot be easily changed.`} />
          : null
        }
        {hasUnmodeledChanges && !mayHaveUnmodeledChanges ?
          <InlineNotification
            title="Modeling required"
            theme="error"
            message={`This job has unmodeled changes and may not be accurate.
                You must model the job before obtaining a Home Energy Score.`}
          /> : null
        }
        <Row>
          <div className="animated slow fadeIn">
            <Col xs={8}>
              <p>
                This is the last step. Snugg Pro will
                send this home's data to the US Department of Energy API to obtain a Home Energy Score.
              </p>
              <p>
                The whole process can take a couple of minutes to complete. We'll let you know when we hear back.
              </p>
            </Col>
            <Col xs={4}>
              <PrimaryButton
                type="button"
                onClick={() => this.setState({showHesModal: true})}
                disabled={isHESModeling || (hasUnmodeledChanges && !mayHaveUnmodeledChanges)}
                customStyle={{margin: 0}}>
                <Icon
                  type="modeling"
                  size={18}
                  animation={isHESModeling ? "spin" : ""} style={{marginRight: 10, width: 18, height: 18}} />
                  {isHESModeling
                    ? <span>Getting {modelAsMentor ? 'Mentor' : scoreTypeToModel} Score...</span>
                    : <span>Get {modelAsMentor ? 'Mentor' : scoreTypeToModel} Score</span>
                  }
              </PrimaryButton>
            </Col>
          </div>
        </Row>


        <ConfirmationModal
          title=''
          show={showHesModal}
          onCancel={e => this.setState({showHesModal: false})}
          confirmText={`Get ${scoreTypeToModel} score`}
          onConfirm={this.getHESConfirm}>
          <p>Are you sure you want to get the {scoreTypeToModel} HES Score for this home? This score is not easily changed once obtained.</p>
        </ConfirmationModal>
        <ConfirmationModal
          title=''
          show={isHESModeling}
          hideActionButtons>
          <div style={{textAlign: 'center', paddingTop: 30, paddingBottom: 30}}>
            <Icon type="modeling" animation="spin" size={58} style={{color: '#999'}}/>
            <p style={{fontSize: '1.2em', paddingTop: 20}}>
              Please wait while we get your HEScore
              <br/>
              from the US Department of Energy.
            </p>
          </div>
        </ConfirmationModal>
      </Step>
    )
  }
}
