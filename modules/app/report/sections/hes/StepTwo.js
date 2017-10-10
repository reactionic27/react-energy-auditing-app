import React from 'react'
import HesTable from './HesTable'
import Step from './Step'
import {InlineNotification} from 'app/components/overlays'
import HesErrorModal from './HesErrorModal'
import {Button} from 'ui'
import {Row, Col} from 'react-bootstrap'
import {connect} from 'snugg-redux'
import {browserHistory} from 'react-router'

function StepTwoErrors({validationErrors, baseDataErrors, baseDisabled, improvedDisabled}) {
  if (validationErrors.length > 0 || baseDataErrors.length > 0) {
    return (
      <InlineNotification
        theme="error">
        <h3>As per DOE HES requirements,&nbsp;
          {validationErrors.length + baseDataErrors.length === 1 ?
            `this error needs fixing:`
            :
            `these ${validationErrors.length + baseDataErrors.length} errors need fixing:`
          }
        </h3>

        {baseDataErrors.length > 0 &&
          <div>
            <h4>Fix the following field(s) on the input screen</h4>
            <ol>
              {baseDataErrors.map(function(error, index) {
                return <li key={index}>{error.message}</li>
              })}
            </ol>

          </div>
        }
        {validationErrors.length > 0 &&
          <div>
            <h4>Fix the {improvedDisabled ? 'base' : 'improved'} values for the following field(s): </h4>
            <ol>
              {validationErrors.map(function(error, index) {
                return <li key={index}>{error.message}</li>
              })}
            </ol>
            <p style={{marginTop: 20}}>
              <strong>Why am I being asked to re-enter values when they already exist?</strong><br/>
              The DOE's Home Energy Score does not accept R-values
              that are calculated through utility bill calibration.
              All assessors must therefore calculate these numbers
              by hand as per DOE Home Energy Score requirements and
              enter them manually into Snugg Pro (even if they end
              up being identical).
            </p>
          </div>
        }
        <p style={{marginTop: 10}}><strong>Note: You'll need to model this job again after you fix the above issue(s).</strong></p>
      </InlineNotification>
    )
  }
  return null
}

@connect((state, {segments: {three, four}}) => {
  return {
    isHesErrorModalOpen: three === 'report' && four === 'hes-error-modal'
  }
})
export default class StepTwo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      baseDataErrors: this.props.baseDataErrors,
      validationErrors: this.props.validationErrors
    }
    this.showHesErrorModal = this.showHesErrorModal.bind(this)
    this.closeHesErrorModal = this.closeHesErrorModal.bind(this)
  }

  showHesErrorModal() {
    const {jobId} = this.props
    browserHistory.push(`/job/${jobId}/report/hes-error-modal`)
    this.setState({
      baseDataErrors: this.props.baseDataErrors,
      validationErrors: this.props.validationErrors
    })
  }

  closeHesErrorModal() {
    const {jobId} = this.props
    browserHistory.push(`/job/${jobId}/report`)
    this.setState({
      baseDataErrors: [],
      validationErrors: []
    })
  }

  static contextTypes = {
    printing: React.PropTypes.bool
  };

  render() {
    const {
      props: {
        jobId, scoreTypeToModel,
        isEnabled,
        valuesMap, basedataValues,
        recs, validationErrors, baseDataErrors, baseDisabled, improvedDisabled
      },
    } = this
    return (
      <Step isEnabled={isEnabled} title="Step 2: Verify that all the data is correct.">
        <StepTwoErrors
          validationErrors={validationErrors}
          baseDisabled={baseDisabled}
          improvedDisabled={improvedDisabled}
          baseDataErrors={baseDataErrors}/>
        {(validationErrors.length + baseDataErrors.length) === 0 ?
          <HesTable
            jobId={jobId}
            scoreTypeToModel={scoreTypeToModel}
            valuesMap={valuesMap}
            basedataValues={basedataValues}
            baseDisabled={baseDisabled}
            improvedDisabled={improvedDisabled}
            recs={recs} />
          :
          <Row>
            <Col sm={4}>
              <Button variant="link" size="lg" isFlat customStyle={{width: 'auto', display:'inline'}} onClick={this.showHesErrorModal}>Fix these errors →</Button>
            </Col>
          </Row>
          }
        <HesErrorModal
          jobId={jobId}
          show={this.props.isHesErrorModalOpen}
          onClose={this.closeHesErrorModal}
          baseDataErrors={this.state.baseDataErrors}
          validationErrors={this.state.validationErrors} />
      </Step>
    )
  }
}
