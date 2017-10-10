import _ from 'lodash'
import invariant from 'fbjs/lib/invariant'
import checkit from 'checkit'
import type { fieldDefinitionType } from 'data/flowtypes'
import {BASE_TABLES, JOB_COLLECTION_TABLES, JOB_ENTITY_TABLES} from '../../modules/data/constants/constants'

const validKeys = [
  'name',
  'outputTable',
  'outputColumn',
  'description',
  'isSelect',
  'hasImproved',
  'min',
  'max',
  'decimals',
  'suffix',
  'examples',
  'omA1BaseKey',
  'omDirectSetBase',
  'omDirectSetImproved',
  'options',
  'improvedOptions',
  'type',
  'improvedType',
  'collectionName',
  'csv',
  'migrateV4Column',
  'defaultValue',
  'label',
  'placeholder',
  'nullable',
  'improvedOnly',
  'yesNo',
  'hvacGroup',
  'checkit',
  'affectsModeling',
  'maxLength',

  'stateKey', // camel-cased table name, with v5_ stripped
  'tableType' // base, jobCollection, jobEntity
]

function prepField(field) {
  if (field.stateKey) {
    throw new Error(`stateKey field property must be set dynamically, saw ${field.stateKey}`)
  }
  const stateKey = field.stateKey = _.camelCase(field.outputTable.replace('v5_', ''))

  if (_.includes(BASE_TABLES, stateKey)) {
    field.tableType = 'base'
  }
  else if (_.includes(JOB_COLLECTION_TABLES, stateKey)) {
    field.tableType = 'jobCollection'
  }
  else if (_.includes(JOB_ENTITY_TABLES, stateKey)) {
    field.tableType = 'jobEntity'
  }
  else {
    throw new Error(`Unknown Job table type for ${stateKey}`)
  }

  if (!field.type) {
    field.type === 'Input'
  }
  if (!field.hasOwnProperty('nullable')) {
    field.nullable = true
  }
  if (field.yesNo) {
    field.options = [{
      displayValue: 'Yes',
      omValue: 'True',
      hpxmlValue: 1
    }, {
      displayValue: 'No',
      omValue: 'False',
      hpxmlValue: 0
    }]
  }
  if (!field.label) {
    field.label = field.name
  }
  if (field.checkit) {
    field.checkit = checkit.singleSync(field.outputColumn, field.checkit, {labels: {[field.outputColumn]: field.label}})
  }
  return field
}

let distinctFields

function validateField(field: fieldDefinitionType) {
  Object.keys(field).forEach(f => {
    invariant(
      _.includes(validKeys, f),
      'Invalid key %s specified in field definition %s.%s',
      f,
      field.outputTable,
      field.outputColumn
    )
  })
  distinctFields = distinctFields || new Set()

  if (distinctFields.has(field.name)) {
    throw new Error(`Saw ${field.name} defined more than once`)
  }
  distinctFields.add(field.name)

  Object.defineProperty(field, '__validated', {
    value: true
  })
  try {
    return require('deep-freeze')(field)
  } catch (e) {
    return field
  }
}

function ensureValidated(field) {
  if (field.__validated !== true) {
    throw new Error(`${field.name} was not validated by validateGroup`)
  }
  return field
}

export function validateGroup(fieldDefGroup: Array<Object>) {
  return fieldDefGroup.map(field => {
    field = prepField(field)
    if (process.env.NODE_ENV === 'development') {
      try {
        return validateField(field)
      } catch (e) {
        console.log(field)
        throw e
      }
    }
    return field
  })
}

// If we're in development, deep freeze arrays & object
export function flattenAllGroups(fieldLists: Array) {
  if (process.env.NODE_ENV === 'development') {
    fieldLists = fieldLists.map(fieldList => Object.freeze(fieldList.map(ensureValidated)))
  }
  return _.flatMap(fieldLists)
}
