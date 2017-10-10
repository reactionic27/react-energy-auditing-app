import _ from 'lodash'
import invariant from 'fbjs/lib/invariant'
import type {omContextType} from './optimiser-types'
import type {tableNameType, fieldDefinitionType} from '../flowtypes/flowtypes'
import * as fieldDefinitions from '../../../constants/field-definitions'
import showIfConditions from '../../../constants/show-if-conditions'

const indexedDefinitions = _.mapValues(fieldDefinitions, (val) => {
  return _.keyBy(val, 'outputColumn')
})

export function stripSlashValue(str) {
  if (typeof str === 'string') {
    return str.replace('/value', '')
  }
  return str
}

export function returnContext(table: tableNameType, context: omContextType, next: Object, withContext?: Object | Array) {
  if (!Array.isArray(next)) {
    next = [next]
  }
  if (withContext) {
    next = next.concat(withContext)
  }
  next.forEach(row => {
    if (row.values) row.values = filterInvalid(row.values)
  })
  return _.mergeWith(context, ...next.concat({sections: {[table]: next}}, merger))
}

function filterInvalid(obj: Object) {
  return _.transform(obj, (result, val, key) => {
    val = typeof val === 'number' ? `${val}` : val
    if (isValidForOM(val)) {
      result[key] = val
        .replace('&', '&amp;', 'g')
        .replace('<', '&lt;', 'g')
        .replace('>', '&gt;', 'g')
    }
  })
}

function isValidForOM(val) {
  return val !== '' &&
    val !== undefined &&
    val !== null &&
    !_.isNaN(val);
}

export function omVal(field: fieldDefinitionType, row: Object, improved: bool = false) {
  const {options, improvedOptions, outputTable, outputColumn} = field
  let column = outputColumn
  if (improved) {
    column = column + '_improved'
  }

  let value = row[column]
  const opts = (improved && improvedOptions) ? improvedOptions : options
  if (opts) {
    let searching
    _.forEach(opts, (o) => {
      if (o === value) searching = false;
      if (o.displayValue === value) {
        value = o.omValue
        searching = false
      }
      return searching
    })
    if (value !== null && searching !== false) {
      console.warn(`Missing valid value for ${outputTable}.${column}, saw ${value}`)
      return
    }
  }
  return value
}

export function omFieldVal(table: tableNameType, column: string, row: Object, improved: bool = false) {
  const fieldDef = indexedDefinitions[table][column]
  if (!fieldDef) {
    console.error(`Missing field ${table}.${column}`)
    return null
  }
  return omVal(fieldDef, row, improved)
}

export function makeReturningPath(field: fieldDefinitionType, row: Object, improved: bool = false) {
  let {outputColumn, outputTable} = field
  const pk = row.uuid || row.job_id
  if (improved) {
    outputColumn = outputColumn + '_improved'
  }
  invariant(
    pk,
    'Missing pk for %s.%s',
    outputTable,
    outputColumn
  )
  return [outputTable, pk, outputColumn]
}

export function hasTouched(
  row: Object,
  outputColumn: string,
  improved: bool = false
) {
  if (improved) {
    outputColumn = outputColumn + '_improved'
  }
  return row.touched_fields ? row.touched_fields[outputColumn] : true
}

function merger(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue).sort();
  }
}

export function optimiserCollection(
  table: tableNameType,
  context: omContextType,
  groupedFields: Array,
  rows: Array,
  withContext: ?Object | ?Array
): omContextType {

  let nextContext = _.map(rows, (row, index) => {
    let localContext = {
      values: {},
      returningInto: {},
      returning: []
    }
    groupedFields.forEach(field => {
      localContext = _.mergeWith(
        processField(field, row, _.partial(withIndex, index)),
        localContext,
        merger
      )
    })
    return localContext
  })

  return returnContext(table, context, nextContext, withContext)
}

export function optimiserFields(
  table: tableNameType,
  context: omContextType,
  groupedFields: Array,
  row: Object,
  withContext: ?Object
): omContextType {
  let localContext = {
    values: {},
    returningInto: {},
    returning: []
  }
  groupedFields.forEach(field => {
    localContext = _.mergeWith(processField(field, row), localContext, merger)
  })
  return returnContext(table, context, localContext, withContext)
}

export function processField(field, row, transformKey = _.identity) {
  const returning = []
  const returningInto = {}
  const values = {}
  const errors = []

  function checkError(improved = false) {
    let val = improved ? row[`${field.outputColumn}_improved`] : row[field.outputColumn]
    const [err] = field.checkit(val)
    if (err) {
      let errVal = row.uuid ? {uuid: row.uuid, improved} : {improved}
      errVal.field = field.name
      errVal.message = err.message
      errors.push(errVal)
    }
  }

  let {omA1BaseKey, omDirectSetImproved, omDirectSetBase, name} = field
  const {outputColumn} = field
  const showIf = showIfConditions[name]

  omA1BaseKey = omA1BaseKey && transformKey(omA1BaseKey)
  omDirectSetBase = omDirectSetBase && transformKey(omDirectSetBase)
  omDirectSetImproved = omDirectSetImproved && transformKey(omDirectSetImproved, true)

  let showIfProps = showIf ? {
    jobId: row.job_id,
    uuid: row.uuid,
    id: row.id,
    field: field.name
  } : {}

  const hasOptimiserBase = (omA1BaseKey || omDirectSetBase) && (!showIf || showIf(row, showIfProps))
  const hasOptimiserImp = omDirectSetImproved && (!showIf || showIf(row, {...showIfProps, improved: true}))

  if (_.isFunction(field.checkit)) {
    if (hasOptimiserBase) checkError()
    if (hasOptimiserImp) checkError(true)
  }

  if (hasOptimiserBase) {
    if (omDirectSetBase) {
      if (hasTouched(row, outputColumn)) {
        values[stripSlashValue(omDirectSetBase)] = omVal(field, row)
      }
    } else {
      values[stripSlashValue(omA1BaseKey)] = omVal(field, row)
    }
  }
  if (hasOptimiserImp) {
    if (hasTouched(row, outputColumn, true)) {
      values[stripSlashValue(omDirectSetImproved)] = omVal(field, row, true)
    }
  }

  if (omDirectSetBase) {
    returning.push(omDirectSetBase)
    returningInto[omDirectSetBase] = makeReturningPath(field, row)
  }
  if (omDirectSetImproved) {
    returning.push(omDirectSetImproved)
    returningInto[omDirectSetImproved] = makeReturningPath(field, row, true)
  }
  return {returning, returningInto, values, errors}
}

function withIndex(index, key) {
  return key ? key
    .replace('%{n}', index + 1)
    .replace('%{?n}', index === 0 ? '' : index + 1) : key
}

