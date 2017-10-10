import _ from 'lodash'
import invariant from 'fbjs/lib/invariant'
import recDefinitions from '../../constants/rec-definitions'
import showIfConditions from '../../constants/show-if-conditions'
import fieldDefinitions from '../../constants/field-definitions'
import nowAndGoalDefinitions from '../../constants/now-and-goal'
import hesDefinitions from '../../constants/hes'
import * as f from 'data/formatters'

import type {
  fieldDefinitionType, baseTableNameType,
  jobTableNameType, optionsType, collectionNameType
} from 'data/flowtypes'

const fieldsByName = _.keyBy(fieldDefinitions, 'name')
const recDefinitionsById = _.keyBy(recDefinitions, 'id')
const recDefinitionsByType = _.keyBy(recDefinitions, 'type')

export const getNowAndGoalFn = _.memoize((recDefId: number) => {
  let nowAndGoalDefinition = nowAndGoalDefinitions.find(block =>
    block.recommendationDefinitionId === recDefId
  )
  return getFieldFn(nowAndGoalDefinition)
})

export const getHesFn = _.memoize((recDefId: number) => {
  let hesFieldDefinition = hesDefinitions.find(block =>
    block.recommendationDefinitionId === recDefId
  )
  return getFieldFn(hesFieldDefinition)
})

export const getFieldFn = (fieldDefinition) => {
  let relevantKeys
  let fields
  if (fieldDefinition) {
    fields = _(fieldDefinition.fields)
      .map(fieldName => fieldByName(fieldName))
      .groupBy(field => field.collectionName
        ? field.collectionName.replace('v5_', '')
        : 'basedata'
      )
      .value()
    relevantKeys = Object.keys(fields)
  }
  let lastStateValues, lastReturnValue
  return function nowAndGoalFn(state, jobId: number) {
    if (!fields) {
      return []
    }
    const toMemoizeCheck = relevantKeys.map(key => state.snugg.get(key))
    if (lastStateValues && toMemoizeCheck.every((v, i) => lastStateValues[i] === v)) {
      return lastReturnValue
    }
    lastStateValues = toMemoizeCheck
    lastReturnValue = _(fields)
      .map((fields, coll) => {
        if (coll !== 'basedata') {
          let rows = state.fn[coll + 'sByJobId'](jobId)
          if (coll === 'hvac' && fieldDefinition.recommendationType === 'cooling') {
            rows = f.hvac.coolingAndDualSystems(rows)
          } else if (coll === 'hvac' && fieldDefinition.recommendationType === 'heating') {
            rows = f.hvac.heatingAndDualSystems(rows)
          }
          return _.flatMap(rows, (row, rowIndex) => {
            const uuid = row.get('uuid')
            const collectionName = f.collection.collectionName(coll, row, rowIndex)
            let values = []
            if (collectionName) {
              values.push([fields[0], [{
                value: collectionName,
                type: 'collectionName'
              }, {}], rowIndex])
            }
            for (let i = 0; i < fields.length; i++) {
              let field = fields[i]
              if (coll === 'hvac' && fieldDefinition.recommendationType === 'heating' && field.name === 'Heating System Efficiency') {
                const systemType = row.get('hvac_system_equipment_type')
                if (_.includes(['Central Heat Pump (shared ducts)', 'Ductless Heat Pump'], systemType)) {
                  field = Object.assign({}, field, {suffix: 'HSPF'})
                }
              }
              if (coll === 'hvac' && fieldDefinition.recommendationType === 'cooling' && field.name === 'Cooling System Efficiency') {
                const systemType = row.get('hvac_system_equipment_type')
                if (_.includes(['Room AC', 'Evaporative Cooler - Direct', 'Evaporative Cooler - Ducted'], systemType)) {
                  field = Object.assign({}, field, {suffix: 'ERR'})
                }
              }
              values.push([field, [
                {
                  value: getValues(state, {field, jobId, uuid}, rowIndex),
                  touched: row.getIn(['touched_fields', field.outputColumn]),
                  uuid
                },
                {
                  value: getValues(state, {field, jobId, uuid, improved: true}, rowIndex),
                  touched: row.getIn(['touched_fields', field.outputColumn + '_improved']),
                  uuid
                }
              ], rowIndex])
            }
            return values
          })
        }
        const basedata = state.fn.basedataByJobId(jobId)
        return _.map(fields, field => {
          return [field, [
            {
              value: getValues(state, {field, jobId}),
              touched: basedata.getIn(['touched_fields', field.outputColumn]),
            },
            {
              value: getValues(state, {field, jobId, improved: true}),
              touched: basedata.getIn(['touched_fields', field.outputColumn + '_improved']),
            },
          ]]
        })
      })
      .flatten()
      .value()
    return lastReturnValue
  }
}

export function typeFormatter(value, field: Object) {
  switch(field.type) {
    case 'Integer':
    case 'PositiveInteger':
      return parseInt(value)
    case 'Numeric':
    case 'PositiveNumeric':
      return field.decimals ? _.round(value, field.decimals) : value
    default: return value
  }
}

export function getFieldValue(state, props) {
  const {lookupPath} = getFieldInfo(props)
  return state.snugg.getIn(lookupPath)
}

function getValues(state, props, index) {
  const {improved, field} = props
  const {hasImproved, improvedOnly} = field

  if ((improved && (hasImproved || improvedOnly)) || (!improved && !improvedOnly)) {
    const tempProps = {...props, field: props.field.name}
    const {showIf, lookupPath} = getFieldInfo(tempProps)
    if (showIf(state, tempProps)) {
      const value = state.snugg.getIn(lookupPath)
      return typeFormatter(value, field)
    }
  }
}

export function fieldByName(fieldName: string): fieldDefinitionType {
  const definition = fieldsByName[fieldName]
  invariant(
    definition,
    'Missing field definition for %s',
    fieldName
  )
  return definition
}

export function fieldType(type: ?string) {
  switch(type) {
    case 'Year': return 'Year'
    case 'Numeric': return 'Number with an optional decimal'
    case 'PositiveNumeric': return 'Positive number with an optional decimal'
    case 'Integer': return 'Integer'
    case 'PositiveInteger': return 'Positive integer'
    case 'Select': return 'Multiple choice'
    case 'Text': return 'Single line text and/or numbers'
    case 'Percentage': return 'A percentage value between 0 and 100'
    case 'DateField': return 'A valid date in MM/DD/YYYY format'
    case 'DateTimeField': return 'A valid date and time in MM/DD/YYYY HH:MM AM/PM'
    case 'Textarea': return 'Multi-line text'
    case 'Setpoint': return "Either a single positive integer like '75' or a range of numbers like '72-75'"
    case 'Email' : return "Email address"
    case 'Radio': return 'Multiple choice'
    case 'Zip': return '5-digit zip code'
    case 'Telephone': return 'Phone number'
    case 'MultiSelect': return 'One or more choice'
    case 'Password': return null
    case 'CreditCard': return 'Credit card number'
    default: return null
  }
}

export function getRecDefinition(lookup: number | string) {
  if (typeof lookup === 'string') {
    return recDefinitionsByType[lookup]
  }
  return recDefinitionsById[lookup]
}

type fieldInfoPropsType = {
  field: string,
  id: ?number,
  uuid: ?string,
  jobId: ?number,
  improved: ?boolean
};

type fieldInfoReturnType = {
  lookupPath: [collectionNameType, string, string] |
    [(baseTableNameType | jobTableNameType), number, string],
  options: ?Array<optionsType>,
  definition: fieldDefinitionType
};

function defaultShowIf() {
  return true
}

function getShowIf(fieldName: string) {
  if (showIfConditions[fieldName]) {
    return showIfConditions[fieldName]
  }
  return defaultShowIf
}

export function getFieldInfo(props: fieldInfoPropsType): fieldInfoReturnType {
  const {jobId, uuid, id, improved, field} = props
  const fieldDefinition = fieldByName(field)
  const showIf = getShowIf(field)
  const {
    collectionName,
    outputTable,
    hasImproved,
    improvedOnly,
    improvedOptions,
    stateKey,
    tableType
  } = fieldDefinition

  let {
    options: opts,
    outputColumn
  } = fieldDefinition

  const isBaseTable = tableType === 'base'
  const isCollectionTable = tableType === 'jobCollection'
  const isJobEntityTabel = tableType === 'jobEntity'

  if (improved) {
    invariant(
      hasImproved || improvedOnly,
      'Missing defined improved field for table: %s, column: %s',
      outputTable,
      outputColumn
    )
    outputColumn = outputColumn + '_improved'
    if (improvedOptions) {
      opts = improvedOptions
    }
  } else {
    invariant(
      !improvedOnly,
      'Attempting to use a field %s.%s without an improved prop',
      outputTable,
      outputColumn
    )
  }
  invariant(
    !collectionName || uuid,
    'A UUID must be specified as a prop for a collection field, check %s',
    fieldDefinition.name
  )
  invariant(
    !isBaseTable || id,
    'An id must be specified as a prop for a %s field, check %s',
    outputTable,
    fieldDefinition.name
  )
  invariant(
    isBaseTable || collectionName || jobId,
    'A jobId must be specified as a prop for a %s field, check %s',
    outputTable,
    fieldDefinition.name
  )

  let lookupPath

  if (isBaseTable) lookupPath = [stateKey, id, outputColumn]

  if (isCollectionTable) lookupPath = [stateKey, uuid, outputColumn]

  if (isJobEntityTabel) lookupPath = [stateKey, jobId, outputColumn]

  return {
    showIf,
    lookupPath,
    options: opts,
    definition: fieldDefinition
  }
}
