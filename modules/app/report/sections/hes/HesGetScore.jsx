import React from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import {Grid} from 'react-bootstrap'
import {connect} from 'snugg-redux'
import {calculateHesAction, successAction} from 'data/actions'
import * as f from 'data/formatters'
import {jobStageToHesStage} from 'util/jobStageToHesStage'
import {hesAssessmentTypeToModel} from 'util/hesAssessmentTypeToModel'
import {getHesFn, getFieldFn, getRecDefinition} from 'data/definition-helpers'
import _ from 'lodash'
import {HPXML_EVENT_OPTIONS} from 'data/constants'
import Immutable from 'immutable'

import {
  basedataCondition,
  foundationCondition,
  heatingCondition,
  coolingCondition,
  atticCondition,
  vaultCondition,
  basementCondition,
  crawlspaceCondition,
  wallCondition,
  windowCondition,
  pvCondition
} from '../../../../../constants/hes-conditions'

const coolingValuesFn = getHesFn(getRecDefinition('cooling').id)
const heatingValuesFn = getHesFn(getRecDefinition('heating').id)
const airLeakageValuesFn = getHesFn(getRecDefinition('air_leakage').id)
const atticValuesFn = getHesFn(getRecDefinition('attic').id)
const basementValuesFn = getHesFn(getRecDefinition('basement').id)
const crawlValuesFn = getHesFn(getRecDefinition('crawl').id)
const dhwValuesFn = getHesFn(getRecDefinition('dhw').id)
const ductsValuesFn = getHesFn(getRecDefinition('duct').id)
const wallValuesFn = getHesFn(getRecDefinition('wall').id)
const windowValuesFn = getHesFn(getRecDefinition('window').id)
const vaultValuesFn = getHesFn(getRecDefinition('vault').id)
const pvValuesFn = getHesFn(getRecDefinition('pv').id)
const basedataFn = getFieldFn({
  fields: [
    'Year Built',
    'Conditioned Area',
    'Average Wall Height',
    'House Length',
    'House Width',
    'Floors Above Grade',
    'Number of Bedrooms',
    'Type of Home',
    'Front of Building Orientation',
    '% of Ceilings Shared',
    '% of Floors Shared',
    'Exterior Wall Construction'
  ]
})

@connect((state, {jobId, account}) => {
  const user = state.fn.loggedInUser()
  const allHesScores = state.fn.hesScoresByJobId(jobId)
  const hesScoresByType = f.hes.hesScoresByType(allHesScores)
  const isHesAssessor = f.account.isHesAssessor(user)
  const hesMentor = user.get('hes_mentor')
  const job = state.fn.jobById(jobId)
  const stageId = job.get('stage_id')
  const scoreType = jobStageToHesStage(stageId)
  const scoreTypeToModel = hesAssessmentTypeToModel(scoreType, hesScoresByType)
  const unlocked = scoreTypeToModel && f.hes.scoreIsUnlocked(scoreTypeToModel, hesScoresByType)
  const isJobModeled = !!job.get('has_calculated')
  const canModelScoreType = scoreTypeToModel && f.hes.canModelScoreType(scoreTypeToModel, hesScoresByType)

  const coolingValues = coolingValuesFn(state, jobId)
  const heatingValues = heatingValuesFn(state, jobId)
  const airLeakageValues = airLeakageValuesFn(state, jobId)
  const atticValues = atticValuesFn(state, jobId)
  const basementValues = basementValuesFn(state, jobId)
  const crawlValues = crawlValuesFn(state, jobId)
  const dhwValues = dhwValuesFn(state, jobId)
  const ductsValues = ductsValuesFn(state, jobId)
  const wallValues = wallValuesFn(state, jobId)
  const windowValues = windowValuesFn(state, jobId)
  const vaultValues = vaultValuesFn(state, jobId)
  const basedataValues = basedataFn(state, jobId)
  const pvValues = pvValuesFn(state, jobId)
  const recs = state.fn.recommendationsByJobId(jobId)

  const valuesMap = Immutable.OrderedMap({
    air_leakage: airLeakageValues,
    attic: atticValues,
    vault: vaultValues,
    basement: basementValues,
    cooling: coolingValues,
    heating: heatingValues,
    crawl: crawlValues,
    wall: wallValues,
    window: windowValues,
    duct: ductsValues,
    dhw: dhwValues,
    pv: pvValues
  })

  const buildingNode = _.get(HPXML_EVENT_OPTIONS, `${scoreTypeToModel}.hpxml_building_node`)
  const baseDisabled = buildingNode !== 'base'
  const improvedDisabled = buildingNode !== 'improved'
  const {recByType, isDeclinedRec} = f.recs
  const baseDataErrors = [
    ...basedataCondition(basedataValues)(state, {jobId}),
    ...foundationCondition()(state, {jobId}),
    ...windowCondition(windowValues, baseDisabled, isDeclinedRec(recByType(recs, 'window')))(state, {jobId})
  ]
  const validationErrors = [
    ...heatingCondition(heatingValues, baseDisabled, isDeclinedRec(recByType(recs, 'heating')))(state, {jobId}),
    ...coolingCondition(coolingValues, baseDisabled, isDeclinedRec(recByType(recs, 'cooling')))(state, {jobId}),
    ...atticCondition(atticValues, baseDisabled, isDeclinedRec(recByType(recs, 'attic')))(state),
    ...vaultCondition(vaultValues, baseDisabled, isDeclinedRec(recByType(recs, 'vault')))(state),
    ...wallCondition(wallValues, baseDisabled, isDeclinedRec(recByType(recs, 'wall')))(state),
    ...basementCondition(basementValues, baseDisabled, isDeclinedRec(recByType(recs, 'basement')))(state, {jobId}),
    ...crawlspaceCondition(crawlValues, baseDisabled, isDeclinedRec(recByType(recs, 'crawl')))(state, {jobId}),
    ...pvCondition(pvValues, baseDisabled, isDeclinedRec(recByType(recs, 'pv')))(state, {jobId})
  ]
  return {
    scoreTypeToModel,
    hesScoresByType,
    isHesAssessor,
    hesMentor,
    transactionTypeToModel: unlocked ? 'update' : 'create',
    accountName: job.get('first_name'),
    canModelScoreType,
    isJobModeled,
    valuesMap,
    basedataValues,
    recs,
    baseDataErrors,
    validationErrors,
    baseDisabled,
    improvedDisabled,
    unlocked
  }
}, {calculateHesAction, successAction})
export default class HesGetScore extends React.Component {

  static contextTypes = {
    printing: React.PropTypes.bool
  };
  constructor(props) {
    super(props)
    this.state = {
      modelAsMentor: false
    }
  }
  hesMentorToggle = (e) => {
    this.setState({
      modelAsMentor: e.currentTarget.value === 'On'
    })
  }
  render() {
    const {
      props: {
        jobId,
        isJobModeled, scoreTypeToModel,
        hesScoresByType, isHesAssessor, hesMentor,
        canModelScoreType, validationErrors, baseDataErrors, unlocked, transactionTypeToModel,
        valuesMap, basedataValues, baseDisabled, improvedDisabled, recs, segments
      },
      state: {
        modelAsMentor
      }
    } = this

    const EnableStepOne = true
    const EnableStepTwo = EnableStepOne && scoreTypeToModel && (canModelScoreType || modelAsMentor) && isJobModeled
    const EnableStepThree = EnableStepTwo && (validationErrors.length + baseDataErrors.length) === 0
    return (
      <Grid fluid>
        <StepOne
          isEnabled={EnableStepOne}
          hesScoresByType={hesScoresByType}
          isJobModeled={isJobModeled}
          canModelScoreType={canModelScoreType}
          isHesAssessor={isHesAssessor}
          modelAsMentor={modelAsMentor}
          hesMentorToggle={this.hesMentorToggle}
          hesMentor={hesMentor}
          unlocked={unlocked}
          scoreTypeToModel={scoreTypeToModel}/>
        <StepTwo
          isEnabled={EnableStepTwo}
          jobId={jobId}
          scoreTypeToModel={scoreTypeToModel}
          validationErrors={validationErrors}
          baseDataErrors={baseDataErrors}
          valuesMap={valuesMap}
          basedataValues={basedataValues}
          baseDisabled={baseDisabled}
          improvedDisabled={improvedDisabled}
          recs={recs}
          segments={segments}
          />
        <StepThree
          jobId={jobId}
          isEnabled={EnableStepThree}
          scoreTypeToModel={scoreTypeToModel}
          unlocked={unlocked}
          transactionTypeToModel={transactionTypeToModel}
          modelAsMentor={modelAsMentor}/>
      </Grid>
    )
  }
}
