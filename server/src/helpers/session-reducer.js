import _ from 'lodash'
import {fromJS, Map as IMap} from 'immutable'
import {camelCase} from 'lodash'
import * as c from '../constants'
import xss from 'xss'

function getKey(obj) {
  switch (obj.tableName) {
    case 'companies_programs': return IMap({company_id: obj.get('company_id'), program_id: obj.get('program_id')})
    case 'accounts_companies': return IMap({account_id: obj.get('account_id'), company_id: obj.get('company_id')})
  }
  return obj.id
}

export default function reducer(state = IMap(), obj) {
  if (arguments.length === 1) {
    return reducer(undefined, state)
  }
  if (Array.isArray(obj)) {
    return obj.reduce(reducer, state)
  }
  if (obj === undefined || obj === null) return state;
  const tableName = camelCase((_.result(obj, 'tableName') || '').replace('v4_', '').replace('v5_', ''))
  if (obj.pivot) {
    state = reducer(state, obj.pivot)
  }
  if (tableName === 'reports') {
    obj.attributes = parseJSON(obj.attributes)
  }
  if (obj.attributes && Object.keys(obj.attributes).length > 0) {
    if (_.includes(c.TOUCHABLE_TABLES, tableName)) {
      obj.attributes.touched_fields = obj.attributes.touched_fields
        ? parseTouched(obj.attributes.touched_fields)
        : {}
    }
    state = state.updateIn([tableName, getKey(obj)], (current = IMap()) => {
      const serialized = fromJS(_.omit(obj.attributes, obj.hidden || []))
      return serialized.reduce((map, v, k) => {
        // Strip out some sensitive stuff on the way to the client.
        if (k === 'stripe_id') v = Boolean(v)
        if (k === 'password') v = undefined
        return current.get(k) === v ? map : map.set(k, sanitized(v))
      }, current)
    })
    return Object.keys(obj.relations).map(k => obj.relations[k]).reduce(reducer, state)
  }
  else if (obj.models) {
    return obj.reduce(reducer, state)
  }
  return state;
}

function sanitized(val) {
  return typeof val === 'string' ? xss(val, {
    stripIgnoreTagBody: ['script']
  }) : val
}

function parseJSON(attributes) {
  try {
    if (attributes.element_sort_order) {
      attributes.element_sort_order = JSON.parse(attributes.element_sort_order)
    }
    if (attributes.page_sort_order) {
      attributes.page_sort_order = JSON.parse(attributes.page_sort_order)
    }
  } catch (e) {
    console.error(e.stack)
  }
  return attributes
}

function parseTouched(touched_fields) {
  try {
    return JSON.parse(touched_fields)
  } catch (e) {
    console.error(e.stack)
  }
  return {}
}
