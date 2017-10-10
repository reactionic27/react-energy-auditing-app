import React, {PropTypes, Component} from 'react'
import {connect} from 'snugg-redux'
import {RRow, RCol} from 'ui'
import {Clearfix} from 'react-bootstrap'
import Immutable from 'immutable'
import * as f from 'data/formatters'
import DoeLogo from '../../../../../src/img/partners/doe/us-doe-logo-color@2x.png'


@connect((state, {jobId}) => {
  const job = state.fn.jobById(jobId)
  const stageId = job.get('stage_id')
  const hesScores = state.fn.hesScoresByJobId(jobId)
  const hesScoresToDisplay = f.hes.hesScoresByStageId(stageId, hesScores)
  return {
    job,
    hesScoresToDisplay
  }
})
export default class HesViewScore extends Component {

  propTypes: {
    jobId: PropTypes.number,
    hesScoresToDisplay: PropTypes.object,
  }

  static contextTypes = {
    printing: React.PropTypes.bool
  }

  render() {
    const {job, hesScoresToDisplay} = this.props
    const {primaryScore, altScore} = hesScoresToDisplay
    const spectrumSize = scoreSize * 10
    return (
      <div className={primaryScore.isSample ? "sample-job-watermark" : ''}>
        <div className="hes-home">
          <RRow>
            <RCol span={12}>
              <dl>
                <dt>Address:</dt>
                <dd>
                  {/* TODO: Address, city, state and zip should be pulling from
                    the HES score values. This sounds unimportant, but they reference
                    jobs in their system by address. We need to make sure they match */}
                  {job.get('address_1') }
                  <br/>
                  {job.get('address_2') }
                  {job.get('city') + ', ' + job.get('state') + ' ' + job.get('zip') + ' '}
                </dd>
              </dl>
            </RCol>
          </RRow>
          <RRow>
            <RCol span={4}>
              <dl className="hes-home-info">
                <dt>Home Size:</dt><dd>{primaryScore.conditionedArea} square feet</dd>
                <dt>Year Built:</dt><dd>{primaryScore.yearBuilt}</dd>
                <dt>Air Conditioned:</dt><dd>{primaryScore.coolingPresent}</dd>
              </dl>
            </RCol>
            <RCol span={3}/>
            <Clearfix/>
          </RRow>
        </div>

        <div className="hes-container">
          <div className="hes-legend" style={{textAlign: 'right'}} >
            Uses<br/> more<br/> energy
          </div>
          <div className="hes-spectrum" style={{width: spectrumSize}}>
            <ScoreTooltip score={primaryScore} />
            <AltScoreTooltip score={primaryScore} altScore={altScore} />
            <ul>
              {Immutable.Range(1, 11).map((index) => {
                return <li style={{width: scoreSize}} key={'i' + index}>{index}</li>
              }).toArray()}
            </ul>
          </div>
          <div className="hes-legend" >
            Uses <br/>less<br/> energy
          </div>
          <Clearfix />
          <div style={{paddingTop: 110, fontWeight: 400, fontSize: 20, letterSpacing: '0.03em', textAlign: 'right'}}>
            Learn more at &nbsp;
            <a href="http://homeenergyscore.gov/"
              target="_blank"
              style={{color: "#196234"}}>
                homeenergyscore.gov
            </a>
          </div>
        </div>
        <RRow>
          <RCol span={12}>
            <div className="hes-definition">
              <img src={DoeLogo} width="200" style={{float:'left', marginRight: 20}}/>
              <p>The <strong style={{color: '#223F74'}}>Home Energy Score</strong> is a national rating system developed by the U.S. Department of Energy.
                The <strong>Score</strong> reflects the energy efficiency of a home based on the home’s structure and heating, cooling, and hot water systems.
              </p>
            </div>
          </RCol>
        </RRow>
        <RRow>
          <RCol span={12}>
            <div className="hes-stats">
              <span style={{textTransform: 'uppercase'}}>
                {primaryScore.assessmentTypeLabel} assessment
              </span> |
              Assessor ID {primaryScore.assessorId} |
              Assessed on {primaryScore.assessmentDate} |
              Label ID# {primaryScore.labelNumber} | {String(primaryScore.scoreVersion).split('.')[0]}
            </div>
          </RCol>
        </RRow>
      </div>
    )
  }
}

// HES Score layout variables
const scoreSize = 62;

export const ScoreTooltip = function({score}) {
  const {baseScore} = score
  const tooltipRight = baseScore ? (scoreSize * (10 - baseScore)) + (scoreSize / 2) : 363
  const computedContainer = {
    ...tooltipContainer,
    right: tooltipRight,
  }
  return (
    <div style={computedContainer}>
      <div style={tooltipLabel}>Your home's current score</div>
      <div style={tooltipValue}>{baseScore || "--"}</div>
      <div style={tooltipPoint} />
      <Clearfix />
    </div>
  )
}

export const AltScoreTooltip = function({altScore, score}) {
  if (!altScore || altScore.isSample) {
    return null
  }
  const baseScore = score.baseScore
  const altBaseScore = altScore.baseScore
  const altTooltipLeft = altBaseScore ? (scoreSize * (altBaseScore - 1)) + (scoreSize / 2) : 363

  // Figure out if the tooltips are going to overlap, in which case we drop
  // the alternative score below the grading scale:
  const isColliding = baseScore > altBaseScore && baseScore - altBaseScore < 5
  const computedPoint = isColliding ? altTooltipPoint2 : altTooltipPoint
  const computedContainer = {
    ...altTooltipContainer,
    left: altTooltipLeft,
    top: isColliding ? 130 : -72
  }
  return (
    <div style={computedContainer}>
      <div style={tooltipLabel}>Score with improvements</div>
      <div style={tooltipValue}>{altBaseScore || "--"}</div>
      <div style={computedPoint} />
      <Clearfix />
    </div>
  )
}

// INLINE STYLING

const tooltipLabel = {
  padding: '8px 0 8px 8px',
  fontWeight: 700,
  width: '69%',
  float:'left',
  fontSize: 14,
}

const tooltipValue = {
  fontSize: 36,
  fontWeight: 700,
  textAlign: 'center',
  lineHeight: '1.1em'
}

const tooltipPoint = {
  top: '100%',
  right: -7,
  width: 30,
  height: 25,
  position: 'absolute',
  pointerEvents: 'none',
  background: 'url(../../img/partners/doe/doe-tooltip-gray.svg) no-repeat 0 0',
  backgroundSize: '100% 100%'

}

const tooltipContainer = {
  position: 'absolute',
  top: -72,
  border: '3px #9A9A9A solid',
  backgroundColor: 'white',
  width: 160,
  lineHeight: '1em'

}

const altTooltipContainer = {
  ...tooltipContainer,
  border: '3px #7FC829 solid',
}

const altTooltipPoint = {
  ...tooltipPoint,
  left: -7,
  background: 'url(../../img/partners/doe/doe-tooltip-green.svg) no-repeat 0 0'
}

const altTooltipPoint2 = {
  ...altTooltipPoint,
  top: -tooltipPoint.height,
  bottom: '100%',
  transform: 'scaleY(-1)'
}
