import React from 'react'
import Step from './Step'
import ScoreTypeDescription from './ScoreTypeDescription'
import {InlineNotification} from 'app/components/overlays'
import moment from 'moment'
import RadioGroup from 'fields/RadioGroup'


export default class StepOne extends React.Component {

  errorMessage(isJobModeled, canModelScoreType, isHesAssessor, scoreTypeToModel, modelAsMentor) {
    let message = ''
    if (!isHesAssessor) {
      message = 'There is no DOE assessor ID associated with your user account. If you do not have an assessor ID, you will be able to view existing scores, but you will not be able to get a new HEScore. If you have a DOE assessor ID, you can add it in your profile settings.'
    }
    else if (!scoreTypeToModel) {
      message = 'Your job is in a stage for which there is no HEScore. Learn when and how to get a score below:'
    }
    else if (!canModelScoreType && !modelAsMentor) {
      message = ` Your job's current stage means you're attempting to get the ${scoreTypeToModel} score for this home.
      This is not possible because you already have that score.  Learn how to get a different score below.`
    }
    else if (!isJobModeled) {
      message = 'You must first model the job before you can get a HEScore.'
    }
    if (!message) {
      return null
    }
    return message
  }

  isActiveScore(type): boolean {
    const {scoreTypeToModel, hesScoresByType, unlocked, modelAsMentor} = this.props
    return (type === scoreTypeToModel) && (!hesScoresByType[type] || unlocked || modelAsMentor)
  }

  render() {
    const {isEnabled, scoreTypeToModel, hesScoresByType, isJobModeled, canModelScoreType, isHesAssessor, hesMentorToggle, hesMentor, modelAsMentor} = this.props
    const errorMessage = this.errorMessage(isJobModeled, canModelScoreType, isHesAssessor, scoreTypeToModel, modelAsMentor)
    return (
      <Step isEnabled={isEnabled} title="Step 1: Ensure you are applying for the correct score.">
        {hesMentor ?
          <div style={{float: 'right', marginTop: -40, height: 45, marginBottom: 10}}>
            <label>Mentor mode: </label>
            <RadioGroup options={['On', 'Off']} bsSize="lg" name="Mentor Mode: " value={modelAsMentor ? 'On' : 'Off'} onChange={hesMentorToggle} />
          </div>
          : null}
        {hesScoresByType.mentor ?
          <InlineNotification theme="success">
            <div>
              This home obtained a mentor score of <strong>{hesScoresByType.mentor.baseScore}</strong>
              &nbsp;on {moment(hesScoresByType.mentor.rawAssessmentDate).format('MMM D, YYYY')} at
              &nbsp;{moment(hesScoresByType.mentor.created_at).format('h:mm a')}.
              The {hesScoresByType.mentor.hpxmlBuildingNode} values were sent for scoring.
            </div>
          </InlineNotification>
          : null
        }

        {errorMessage ?
          <InlineNotification theme="error" message={errorMessage} />
          : null
        }

        {scoreTypeToModel &&
          <p>The <strong>{scoreTypeToModel}</strong> score is preselected for you based on the progress of your job. Learn how to get a different score below:</p>
        }
        <ScoreTypeDescription
          hesScore={hesScoresByType.initial}
          title='Initial'
          isActive={this.isActiveScore('initial')}>
          <p><strong>About this score: </strong>
            The initial score is the score of the home at the time of the audit.
            You may only obtain the initial score once per home.
          </p>
          <p><strong>How to get the initial score: </strong>
            You can apply for this score when your job is in the <em>audit</em> stage.</p>
          <p>
            Alternatively, if you do not have an initial score and your job is in the <em>bid proposed</em> and <em>bid approved</em> stages, you will first obtain an initial score before you can apply for the alternative score.
          </p>
        </ScoreTypeDescription>
        <ScoreTypeDescription
          hesScore={hesScoresByType.alternative}
          title='Alternative'
          isActive={this.isActiveScore('alternative')}>
          <p><strong>About this score: </strong>
            This score is speculative and appears in a green box to the right of the initial score on the HES page.
          </p>
          <p><strong>How to get this score: </strong>
            The alternative score is obtainable in Snugg Pro when you already have an initial
            score AND your job’s stage is in one of these stages <em>bid proposed</em>, <em>bid approved</em> or <em>Retrofit in progress</em>.
          </p>
        </ScoreTypeDescription>
        <ScoreTypeDescription
          hesScore={hesScoresByType.final}
          title='Final'
          isActive={this.isActiveScore('final')}>
          <p><strong>About this score: </strong>
            The final score is the score of the home after the upgrades have been installed.
            You may only obtain the initial score one per home.
          </p>
          <p><strong>How to get the final score: </strong>
            Set this job's stage to either Retrofit Complete or QA.
          </p>
        </ScoreTypeDescription>
      </Step>
    )
  }
}
