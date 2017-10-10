import { JOB_COLLECTION_TABLES } from 'data/constants'
import _ from 'lodash'
import {Map as IMap, List as IList} from 'immutable'
import type {
  collectionNameType,
  recDefinitionTypes,
  rootStateType,
  cazTargetKeyType,
  cazTargetsMapType
} from 'data/flowtypes'
import {routerReducer} from 'react-router-redux'
import invariant from 'fbjs/lib/invariant'
import localStateReducer from './localStateReducer'
import localStorageReducer from './localStorageReducer'
import snuggReducer from './snuggReducer'
import {getRecDefinition} from '../definition-helpers'
import {burnsFuel} from '../formatters/cazFormatters'
import {programById} from '../formatters/programFormatters'

const reducers = {
  snugg: snuggReducer,
  localState: localStateReducer,
  localStorage: localStorageReducer,
  routing: routerReducer
}

const indexes = [{
  method: 'loggedInUser',
  table: 'accounts',
  asJS: true,
  lookupRaw: (state) => state.fn.accountById(state.localState.get('loggedInUserId'))
}, {
  method: 'recByUuid',
  table: 'recommendations',
  pk: true
}, {
  method: 'captionRowByUuid',
  table: 'recommendationCaptionRows',
  pk: true
}, {
  method: 'windowByUuid',
  table: 'window',
  pk: true
}, {
  method: 'hvacByUuid',
  table: 'hvac',
  pk: true
}, {
  method: 'atticByUuid',
  table: 'attic',
  pk: true
}, {
  method: 'vaultByUuid',
  table: 'vault',
  pk: true
}, {
  method: 'wallByUuid',
  table: 'wall',
  pk: true
}, {
  method: 'dhwByUuid',
  table: 'dhw',
  pk: true
}, {
  method: 'recommendationsByJobId',
  table: 'recommendations',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'hesScoresByJobId',
  table: 'hesScores',
  lookup: 'job_id',
  sortBy: 'id',
  filter: {deleted_at: null}
}, {
  method: 'recByType',
  table: ['recommendations'],
  lookupRaw: (jobId: number, type: recDefinitionTypes, state) => {
    const {id} = getRecDefinition(type) || {}
    return state.fn.recommendationsByJobId(jobId).find(rec => rec.get('rec_definition_id') === id)
  },
  resolver(jobId: number, type: recDefinitionTypes) {
    return `${jobId}:${type}`
  }
}, {
  method: 'captionRowsByRecUuid',
  table: 'recommendationCaptionRows',
  lookup: 'recommendation_uuid',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'captionRowsByUuid',
  table: ['recommendationCaptionRows'],
  lookupRaw(uuid: string, state) {
    return state.fn.captionRowsByRecUuid(
      state.fn.captionRowByUuid(uuid).get('recommendation_uuid')
    )
  }
}, {
  method: 'captionRowsByJobId',
  table: 'recommendationCaptionRows',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'atticsByJobId',
  table: 'attic',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'dhwsByJobId',
  table: 'dhw',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'doorsByJobId',
  table: 'door',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'freezersByJobId',
  table: 'freezer',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'clothesDryersByJobId',
  table: 'clothesDryer',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'rangesByJobId',
  table: 'range',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'ovensByJobId',
  table: 'oven',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'hvacsByJobId',
  table: 'hvac',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'refrigeratorsByJobId',
  table: 'refrigerator',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'vaultsByJobId',
  table: 'vault',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'wallsByJobId',
  table: 'wall',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'windowsByJobId',
  table: 'window',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'cazByJobId',
  table: 'caz',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'cazSystemByUuid',
  table: 'cazSystem',
  pk: true
}, {
  method: 'pvsByJobId',
  table: 'pv',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'jobStageHistoryByJobId',
  table: 'jobStageHistory',
  lookup: 'job_id',
  sortBy: 'order'
}, {
  method: 'jobStageHistoryByStageId',
  table: ['jobStageHistory'],
  lookup(jobId, stageId, jobStageHistory) {
    return jobStageHistory && jobStageHistory
      .valueSeq()
      .toArray()
      .filter(obj => obj.get('job_id') === jobId && obj.get('stage_id') === stageId)
  },
  sortBy: 'order'
}, {
  // Returns the potential target types for a CAZ Zone, filtering out
  // any system types that don't burn fuel
  method: 'cazTargetsByJobId',
  table: ['hvac', 'dhw', 'oven', 'range', 'clothesDryer'],
  lookupRaw(jobId: number, state: Object) : cazTargetsMapType {
    return freezeDev({
      hvac: state.fn.hvacsByJobId(jobId).filter(burnsFuel),
      dhw: state.fn.dhwsByJobId(jobId).filter(burnsFuel),
      oven: state.fn.ovensByJobId(jobId).filter(burnsFuel),
      range: state.fn.rangesByJobId(jobId).filter(burnsFuel),
      clothesDryer: state.fn.clothesDryersByJobId(jobId).filter(burnsFuel)
    })
  }
}, {
  method: 'availableCazTargetsByJobId',
  table: ['caz', 'cazSystem', 'hvac', 'dhw', 'oven', 'range', 'clothesDryer'],
  lookupRaw(jobId: number, state: rootStateType) : cazTargetsMapType {
    const cazTargetsByJobId = state.fn.cazTargetsByJobId(jobId)
    const cazSystemsByJobId = state.fn.cazSystemsByJobId(jobId)
    return freezeDev(_.mapValues(cazTargetsByJobId, (targets: Array<IMap>, key: cazTargetKeyType) => {
      return targets.filter(target => !_.some(cazSystemsByJobId[key], system => {
        return system.get(`${_.snakeCase(key)}_uuid`) === target.get('uuid')
      }))
    }))
  }
}, {
  // Returns all of the valid systems associated with a job
  method: 'cazSystemsByJobId',
  table: ['caz', 'cazSystem', 'hvac', 'dhw', 'oven', 'range', 'clothesDryer'],
  lookupRaw(jobId: number, state: rootStateType) : cazTargetsMapType {
    const targets = state.fn.cazTargetsByJobId(jobId)
    return freezeDev(state.snugg.get('cazSystem')
      .valueSeq()
      .toArray()
      .reduce((result: cazTargetsMapType, system: IMap) => {
        if (
          system.get('job_id') !== jobId ||
          system.get('deleted_at') ||
          !state.snugg.getIn(['caz', system.get('caz_uuid')]) ||
          state.snugg.getIn(['caz', system.get('caz_uuid'), 'deleted_at'])
        ) {
          return result
        }
        _.forEach(_.keys(result), (prefix: string) => {
          const typeUuid = system.get(`${_.snakeCase(prefix)}_uuid`)
          // Make sure it's a valid target
          if (typeUuid) {
            if (targets[prefix].find(t => t.get('uuid') === typeUuid)) {
              result[prefix].push(system)
              return false
            }
          }
        })
        return result
      }, {hvac: [], dhw: [], oven: [], range: [], clothesDryer: []}))
  }
}, {
  method: 'cazSystemsByCazUuid',
  table: ['caz', 'cazSystem', 'hvac', 'dhw', 'oven', 'range', 'clothesDryer'],
  lookupRaw(cazUuid: string, state: rootStateType) : cazTargetsMapType {
    const jobId = state.snugg.getIn(['caz', cazUuid, 'job_id'])
    const cazSystems = state.fn.cazSystemsByJobId(jobId)
    return freezeDev(_.mapValues(cazSystems, (values) => {
      return values.filter(v => v.get('caz_uuid') === cazUuid)
    }))
  }
}, {
  method: 'concernsByJobId',
  table: 'concern',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'jobsByCompanyId',
  table: 'jobs',
  filter: {is_template: 0},
  lookup: 'company_id'
}, {
  method: 'templateJobsByAccountId',
  table: 'jobs',
  filter: {is_template: 1, deleted_at: null},
  lookup: 'account_id'
}, {
  method: 'templateJobsByCompanyId',
  table: 'jobs',
  filter: {is_template: 1, deleted_at: null},
  lookup: 'company_id',
}, {
  method: 'templateJobsByProgramId',
  table: 'jobs',
  filter: {is_template: 1, account_id: null, company_id: null},
  lookup: 'program_id'
}, {
  method: 'accountById',
  table: 'accounts',
  pk: true
}, {
  method: 'companyById',
  table: 'companies',
  pk: true
}, {
  method: 'jobById',
  table: 'jobs',
  pk: true
}, {
  method: 'reportByJobId',
  table: 'reports',
  pk: true
}, {
  method: 'totalsByJobId',
  table: 'totals',
  pk: true
}, {
  method: 'basedataByJobId',
  table: 'basedata',
  pk: true
}, {
  method: 'healthByJobId',
  table: 'health',
  pk: true
}, {
  method: 'utilitiesByJobId',
  table: 'utilities',
  pk: true
}, {
  method: 'jobFinancingByUuid',
  table: 'jobFinancing',
  pk: true
}, {
  method: 'financingTemplateById',
  table: 'financingTemplates',
  pk: true
}, {
  method: 'financingTemplatesByAccountId',
  table: 'financingTemplates',
  lookup: 'account_id'
}, {
  method: 'financingTemplatesByCompanyId',
  table: 'financingTemplates',
  lookup: 'company_id'
}, {
  method: 'financingTemplatesByProgramId',
  table: 'financingTemplates',
  lookup: 'program_id'
}, {
  method: 'jobFinancingByJobId',
  table: 'jobFinancing',
  lookup: 'job_id',
  sortBy: 'order',
  filter: {deleted_at: null}
}, {
  method: 'companyByJobId',
  table: ['jobs', 'companies'],
  lookup(id, jobs, companies) {
    return companies.get(jobs.getIn([id, 'company_id']))
  }
}, {
  method: 'accountByJobId',
  table: ['jobs', 'accounts'],
  lookup(id, jobs, accounts) {
    return accounts.get(jobs.getIn([id, 'account_id']))
  }
}, {
  method: 'programByJobId',
  table: ['jobs'],
  lookup(id, jobs) {
    return programById(jobs.getIn([id, 'program_id']))
  }
}, {
  method: 'activityFeedByJobId',
  table: 'activityFeed',
  lookup: 'job_id',
  sortby: 'created_at',
  filter: {deleted_at: null}
}, {
  method: 'activityFeedByUuid',
  table: 'activityFeed',
  pk: true
}, {
  method: 'activityTrackingByCompanyAndUser',
  table: ['jobs', 'activityTracking'],
  lookup(company_id: number, account_id: number, jobs, activityTracking) {
    return activityTracking
              .filter(join =>  join.get('account_id') === account_id &&
                               join.get('company_id') === company_id)
  }
}, {
  method: 'activityTrackingByJobAndUser',
  table: ['activityTracking'],
  lookup(job_id: number, account_id: number, activityTracking: IList) {
    return activityTracking.find(join => (join.get('account_id') === account_id) && (join.get('job_id') === job_id))
  }
}, {
  method: 'companiesByUser',
  table: ['companies', 'accountsCompanies', 'companiesPrograms'],
  lookup(user: IMap, companies: IMap, accountsCompanies: IMap, companiesPrograms: IMap) {
    const userId = user.get('id')
    const programId = user.get('program_id')
    if (user.get('program_id')) {
      return companiesPrograms
        .valueSeq()
        .toArray()
        .filter(obj => obj.get('program_id') === programId)
        .map(obj => companies.get(obj.get('company_id')))
    }
    return accountsCompanies
      .valueSeq()
      .toArray()
      .filter(obj => obj.get('account_id') === userId)
      .map(obj => companies.get(obj.get('company_id')))
  }
}, {
  method: 'accountsCompaniesByUser',
  table: ['accountsCompanies'],
  lookup(user: IMap, accountsCompanies: IMap) {
    const userId = user.get('id')
    return accountsCompanies
      .valueSeq()
      .toArray()
      .filter(obj => obj.get('account_id') === userId)
  }
}, {
  method: 'adminCompaniesByUser',
  table: ['companies', 'accountsCompanies'],
  lookup(user: IMap, companies: IMap, accountsCompanies: IMap) {
    const userId = user.get('id')
    return accountsCompanies
      .valueSeq()
      .toArray()
      .filter(obj => obj.get('account_id') === userId && obj.get('role') === 'admin')
      .map(obj => companies.get(obj.get('company_id')))
  }
}, {
  method: 'userCompaniesByUser',
  table: ['companies', 'accountsCompanies'],
  lookup(user: IMap, companies: IMap, accountsCompanies: IMap) {
    const userId = user.get('id')
    return accountsCompanies
      .valueSeq()
      .toArray()
      .filter(obj => obj.get('account_id') === userId && obj.get('role') === 'user')
      .map(obj => companies.get(obj.get('company_id')))
  }
}, {
  method: 'pendingInvitesByCompanyId',
  table: 'invitations',
  lookup: 'company_id',
  filter: {deleted_at: null},
  reject: {status: 'accepted'},
  sortBy: 'updated_at'
}, {
  method: 'accountsByCompanyId',
  table: ['accounts', 'accountsCompanies'],
  lookup(companyId: number, accounts: IMap, accountsCompanies: IMap) {
    return accountsCompanies
      .valueSeq()
      .toArray()
      .filter(join => join.get('company_id') === companyId)
      .map(obj => accounts.get(obj.get('account_id')))
  }
}, {
  method: 'programsByCompanyId',
  table: ['companiesPrograms'],
  lookup(companyId: number, companiesPrograms: IMap) {
    return companiesPrograms
      .valueSeq()
      .toArray()
      .filter(join => join.get('company_id') === companyId)
      .map(obj => programById(obj.get('program_id')))
  }
}, {
  method: 'collectionRowsByName',

  // We never use collectionRowsByName for recommendationCaptionRows...
  // eventually we may need to come up with another pattern here.
  table: _.without(JOB_COLLECTION_TABLES, 'recommendationCaptionRows'),
  lookupRaw(jobId: number, tableName: collectionNameType, state) {
    const method = collectionMethod(tableName)
    return state.fn[method](jobId)
  },
  resolver(jobId: number, tableName: collectionNameType) {
    return `${jobId}:${tableName}`
  }
}]

function collectionMethod(tableName: collectionNameType) {
  switch (tableName) {
    case 'attic':
    case 'dhw':
    case 'door':
    case 'freezer':
    case 'hvac':
    case 'refrigerator':
    case 'vault':
    case 'wall':
    case 'window':
    case 'concern':
      return `${tableName}sByJobId`
    default: return `${tableName}ByJobId`
  }
}

function NOOP() {
  return []
}

const NOT_SET = {
  fn: indexes.reduce((result, val) => {
    result[val.method] = NOOP
    return result
  }, {})
};

const potentiallyChangedTables = _(indexes)
  .flatMap(row => row.table)
  .uniq()
  .value()

function makeMemoFn(state, obj) {
  var memoFn = _.memoize((...args) => {
    const [lookupId] = args
    if (Array.isArray(obj.table)) {
      invariant(
        typeof obj.lookup === 'function' || typeof obj.lookupRaw === 'function',
        'Array is not supported without custom lookup fn: %s',
        obj.method
      )
      if (obj.lookupRaw) {
        return obj.lookupRaw(...args, state)
      }
      return obj.lookup(...args, ...obj.table.map(tbl => state.snugg.get(tbl)))
    }
    if (obj.lookupRaw) {
      return obj.lookupRaw(...args, state)
    }
    if (obj.pk === true) {
      return state.snugg.getIn([obj.table, lookupId])
    }
    let list = state.snugg.get(obj.table, IMap())
      .valueSeq()
      .toArray()

    if (obj.filter) {
      list = list.filter(o => (
        Object.keys(obj.filter).every(k => o.get(k) === obj.filter[k])
      ))
    }
    if (obj.reject) {
      list = list.filter(o => (
        Object.keys(obj.reject).every(k => o.get(k) !== obj.filter[k])
      ))
    }
    if (obj.lookup) {
      list = list.filter(o => o.get(obj.lookup) === lookupId)
    }
    if (obj.sortBy) {
      list = _.sortBy(list, o => o.get(obj.sortBy))
    }
    return list
  }, obj.resolver)
  memoFn.toString = function() {
    return `[Memoized selector fn (rootReducer.js)]`
  }
  return memoFn
}

function addIndexFns(oldState, newState) {
  const changedTables = potentiallyChangedTables.reduce((result, table) => {
    return !oldState.snugg || (oldState.snugg.get(table) !== newState.snugg.get(table))
      ? result.concat(table)
      : result
  }, [])
  if (changedTables.length === 0) return oldState.fn
  return _.reduce(indexes, (result, obj) => {
    const reindex = Array.isArray(obj.table)
      ? obj.table.some(tbl => _.includes(changedTables, tbl))
      : _.includes(changedTables, obj.table)
    result[obj.method] = reindex ? makeMemoFn(newState, obj) : oldState.fn[obj.method]

    // Shorthand for memoized lookup of a row / rows as toJS()
    if (obj.asJS || obj.pk) {
      const jsMethod = obj.method + 'JS'
      result[jsMethod] = reindex ? makeMemoFn(newState, toJSFn(obj)) : oldState.fn[jsMethod]
    }
    return result
  }, {})
}

function toJSFn(obj) {
  return {
    ...obj,
    lookupRaw(...args) {
      const state = args[args.length - 1]
      return state.fn[obj.method](...args.slice(0, -1)).toJS()
    }
  }
}

export default function rootReducer(state = NOT_SET, action) {
  if (action.error) {
    return state
  }
  let newState = {...state}
  if (action.type === 'update' && typeof action.payload === 'function') {
    newState = action.payload(state)
  } else {
    Object.keys(reducers).forEach(key => {
      let reduced = reducers[key](state[key], action)
      if (reduced !== newState[key]) {
        newState[key] = reduced
      }
    })
  }
  newState.fn = addIndexFns(state, newState)
  return newState
}

// Make sure we don't mutate this return value.
function freezeDev(obj) {
  if (process.env.NODE_ENV === 'development') {
    try {
      if (Array.isArray(obj)) {
        return Object.freeze(obj)
      }
      return Object.freeze(_.mapValues(Object.freeze(obj), (val, key) => Object.freeze(val)))
    } catch (e) {
      return obj
    }
  }
  return obj
}
