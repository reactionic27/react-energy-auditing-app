import {Map as IMap, fromJS, List as IList} from 'immutable'
import bulkUpdate from 'util/bulkUpdate'
import {
  BASE_TABLES,
  JOB_COLLECTION_TABLES,
  JOB_ENTITY_TABLES
} from '../constants/constants'

const BASE_REGEX = new RegExp(`(${BASE_TABLES.join('|')})/(save|create)`)
const JOB_COLLECTION_REGEX = new RegExp(`(${JOB_COLLECTION_TABLES.join('|')})/(save|create)`)
const JOB_ENTITY_REGEX = new RegExp(`(${JOB_ENTITY_TABLES.join('|')})/save`)

const defaultValue = IMap({
  // Base Tables
  accounts: IMap(),
  companies: IMap(),
  invitations: IMap(),
  jobs: IMap(),
  programs: IMap(),

  // Not currently edited on the client:
  accountsCompanies: IMap(),
  companiesPrograms: IMap(),

  attic: IMap(),
  basedata: IMap(),
  caz: IMap(),
  cazSystem: IMap(),
  concern: IMap(),
  dhw: IMap(),
  door: IMap(),
  jobFinancing: IMap(),
  financingTemplates: IMap(),
  freezer: IMap(),
  health: IMap(),
  hvac: IMap(),
  recommendationCaptionRows: IMap(),
  recommendations: IMap(),
  refrigerator: IMap(),
  reports: IMap(),
  totals: IMap(),
  utilities: IMap(),
  vault: IMap(),
  wall: IMap(),
  window: IMap(),
  pv: IMap(),
  hesScores: IMap(),
  activityTracking: IList()
})

export default function snuggReducer(state = defaultValue, action) {
  let {type, payload} = action;
  switch (type) {
    case 'om/model':
    case 'om/cancel': {
      return state.setIn(['jobs', payload.job_id, 'is_calculating'], payload.is_calculating)
    }
    case 'om/complete': {
      return bulkUpdate(state, payload)
    }
    case 'swap-order': {
      let orderA = state.getIn([payload.table, payload.uuid_a, 'order'])
      let orderB = state.getIn([payload.table, payload.uuid_b, 'order'])
      return state
        .setIn([payload.table, payload.uuid_a, 'order'], orderB)
        .setIn([payload.table, payload.uuid_b, 'order'], orderA)
    }
    case 'recommendations/create': {
      return state.update('recommendations', (recs) => {
        return recs.reduce((acc, rec, key) => {
          rec = rec.get('job_id') === payload.job_id ? rec.set('order', rec.get('order') + 1) : rec
          return acc.set(key, rec)
        }, IMap())
      }).mergeIn(['recommendations', payload.uuid], IMap(payload))
    }
    case 'update-jobs-stages': {
      return payload.job_ids.reduce((acc: IMap, id: number) => {
        return acc.setIn(['jobs', id, 'stage_id'], payload.stage_id)
      }, state)
    }
    case 'mark-all-read': {
      payload.job_ids.forEach((job_id: number) => {
        const index = state.get('activityTracking').findIndex(item => item.get('job_id') === job_id)
        if (index !== -1) {
          state = state.setIn(['activityTracking', index, 'unread_count'], 0)
        }
      })
      return state
    }
    case 'hesScores/update': {
      return bulkUpdate(state, fromJS({hesScores: {[payload.id]: payload}}))
    }
    case 'company/update': {
      return state.mergeDeepIn(['companies', payload.id], fromJS(payload))
    }
    case 'activityTracking/save': {
      const index = state.get('activityTracking').findIndex(item => item.get('account_id') === payload.account_id &&
                                                                    item.get('job_id') === payload.job_id)
      return (index !== -1) ? state.setIn(['activityTracking', index], IMap(payload)) : state
    }
  }

  if (BASE_REGEX.test(type) && payload.id) {
    const [, key] = type.match(BASE_REGEX)
    return state.mergeDeepIn([key, payload.id], fromJS(payload))
  }
  if (JOB_COLLECTION_REGEX.test(type) && payload.uuid) {
    const [, key] = type.match(JOB_COLLECTION_REGEX)
    return state.mergeDeepIn([key, payload.uuid], fromJS(payload))
  }
  if (JOB_ENTITY_REGEX.test(type) && payload.job_id) {
    const [, key] = type.match(JOB_ENTITY_REGEX)
    return state.mergeDeepIn([key, payload.job_id], fromJS(payload))
  }

  return state
}
