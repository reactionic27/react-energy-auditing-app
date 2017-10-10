import {Map as IMap} from 'immutable'
import _ from 'lodash'
import {getRecDefinition} from '../definition-helpers'
import fmtFn from 'util/fmtFn'

// Recommendations
// ----------

const NO_STATUS = 0
const RECOMMENDED = 1
const MENTIONED = 2
const DECLINED = 3
const HEALTH = 4
const CUSTOM = 19

export function createPayload(job_id: number, status: 'recommended' | 'mentioned' | 'declined') {
  switch (status) {
    case 'recommended': status = 1; break;
    case 'mentioned': status = 2; break;
    case 'declined': status = 3; break;
  }
  return {
    job_id,
    status,
    rec_definition_id: 19,
    order: 0
  }
}

export const recByType = (recs: Array<IMap>, type: string) => {
  return recs.find((rec) => rec.get('rec_definition_id') === getRecDefinition(type).id)
}

export const recommendedRecs = (jobRecs: Array<IMap | Object>) => {
  return jobRecs.filter(isRecommendedRec)
}

export const mentionedRecs = (jobRecs: Array<IMap>) => {
  return jobRecs.filter(rec => rec.get('status') === MENTIONED)
}

export const declinedRecs = (jobRecs: Array<IMap>) => {
  return jobRecs.filter(rec => rec.get('status') === DECLINED)
}

export const isHealthRec = (rec: IMap) => rec.get('status') === HEALTH

export const isCustomRec = (rec: IMap) => rec.get('rec_definition_id') === CUSTOM

export const isRecommendedRec = (rec: IMap | Object) => {
  const status = IMap.isMap(rec) ? rec.get('status') : rec.status
  return status === RECOMMENDED || status === NO_STATUS
}

export const isDeclinedRec = (rec: IMap) => {
  const status = rec.get('status')
  return status === DECLINED
}

export const healthRec = (recs: Array<IMap>) => {
  return recs.find(r => r.get('status') === HEALTH)
}

export const recTotalCost = (jobRecs: Array<IMap | Object>, fmt: ?string) => {
  var val = recommendedRecs(jobRecs)
    .map(r => IMap.isMap(r) ? r.get('cost') : r.cost)
    .reduce(sumReducer, 0)
  return fmt ? fmtFn(val, fmt) : val
}

function sumReducer(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (_.isNaN(b)) return a;
  return a + b;
}

export const category = (rec: IMap) => {
  const definition = getRecDefinition(rec.get('rec_definition_id'))
  return definition.category
}

