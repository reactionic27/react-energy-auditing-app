import _ from 'lodash'
import moment from 'moment'
import {Map as IMap, List as IList} from 'immutable'
import tinyIntToBoolean from 'util/tinyIntToBoolean'
import {HPXML_STAGES, HES_STAGES} from 'data/constants'
import Value from 'util/value'
import type {hesAssessmentTypeTypes} from '../flowtypes/flowtypes'
import {jobStageToHesStage} from 'util/jobStageToHesStage'


export function hpxmlToHesStage(stage: string) {
  const stageIndex = HPXML_STAGES.findKey((hpxmlStage, key) => hpxmlStage === stage)
  return HES_STAGES.get(stageIndex)
}


export function hesScoresByType(scores: Array): Object {
  return IList(scores)
    .groupBy(scoreTypeCode)
    .map(assessmentTypeGroup => assessmentTypeGroup.last())
    .map(score => formatScore(score))
    .toObject()
}


export function latestHesScore(scores: Array, scoreType: ?hesAssessmentTypeTypes): Object {
  const filteredScores = scores.filter((score) => {
    return !scoreType || (scoreTypeCode(score) === scoreType)
  })
  return formatScore(_.last(filteredScores))
}


export function hesScoresByStageId(stageId: number, scores: Array): Object {
  const currentScoreType = jobStageToHesStage(stageId)
  if (_.includes(['initial', 'alternative'], currentScoreType)) {
    return {
      primaryScore: latestHesScore(scores, 'initial'),
      altScore: latestHesScore(scores, 'alternative')
    }
  }
  return {
    primaryScore: latestHesScore(scores, currentScoreType),
    altScore: null
  }
}


export function formattedHesScores(scores: Array): Object {
  return _.map(scores, score => formatScore(score))
}


export function formatScore(score: ?IMap): Object {
  if (!score) {
    return sampleHesScore
  }
  if (IMap.isMap(score) && score.isEmpty()) {
    return sampleHesScore
  }
  return {
    isSample: false,
    baseScore: score.get('hes_base_score'),
    locked: tinyIntToBoolean(score.get('hes_locked')),
    city: score.get('hes_city'),
    state: score.get('hes_state'),
    zip: score.get('hes_zip_code'),
    coolingPresent: tinyIntToYesNo(score.get('hes_cooling_present')),
    yearBuilt: score.get('hes_year_built'),
    conditionedArea: new Value(score.get('hes_conditioned_floor_area')).toString(),
    assessmentTypeLabel: score.get('hes_assessment_type'),
    assessmentTypeCode: score.get('hes_assessment_type_code'),
    labelNumber: score.get('hes_label_number'),
    scoreVersion: score.get('hes_hescore_version'),
    assessorId: score.get('hes_qualified_assessor_id'),
    assessmentDate: formatHesDate(score.get('hes_assessment_date')),
    rawAssessmentDate: score.get('hes_assessment_date'),
    hpxmlBuildingNode: score.get('hes_hpxml_building_node'),
    hpxmlEventType1: score.get('hes_hpxml_event_type_1'),
    hpxmlEventType2: score.get('hes_hpxml_event_type_2'),
    hpxmlTransactionType: score.get('hes_xml_transaction_type'),
  }
}

// hes_assessment_date is returned as string instead of Date when it is returned from model-hes-scores-handler.js
export function formatHesDate(val): string {
  return _.isDate(val)
    ? moment(val).format('MMM DD, YYYY')
    : 'N/A'
}


// Can model HES score type if it that type doesn't exist yet or it's unlocked
export function canModelScoreType(scoreTypeToModel: hesAssessmentTypeTypes, hesScores: Object): boolean {
  const score = _.isObject(hesScores) ? hesScores[scoreTypeToModel] : null
  if (!score) {
    return true
  }
  return !score.locked
}


export function scoreIsUnlocked(scoreTypeToModel: hesAssessmentTypeTypes, hesScores: Object): boolean {
  const score = _.isObject(hesScores) ? hesScores[scoreTypeToModel] : null
  if (!score) {
    return false
  }
  return !score.locked
}


// == Local functions ==========================================================
function scoreTypeCode(score: Object) {
  if (score.get('hes_assessment_type_code') === 'corrected') {
    if (score.get('hes_hpxml_building_node') === 'base') {
      return hpxmlToHesStage(score.get('hes_hpxml_event_type_1'))
    }
    if (score.get('hes_hpxml_building_node') === 'improved') {
      return hpxmlToHesStage(score.get('hes_hpxml_event_type_2'))
    }
  }
  return score.get('hes_assessment_type_code')
}


function tinyIntToYesNo(val: number): string {
  return val ? 'Yes' : 'No'
}


const sampleHesScore = {
  isSample: true,
  baseScore: 2,
  locked: true,
  city: 'New York',
  state: 'NY',
  zip: '10003',
  coolingPresent: 'Yes',
  yearBuilt: 1969,
  conditionedArea: '2,000',
  assessmentTypeLabel: 'Non-Official',
  labelNumber: 41896,
  scoreVersion: 'v2014.4336',
  assessorId: 'CA-LBNL-040',
  assessmentDate: 'Mar 06, 2013'
}
