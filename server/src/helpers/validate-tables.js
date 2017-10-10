import _ from 'lodash'
import knex from '../init/knex-init'
import fieldDefinitions from '../../../constants/field-definitions'
import authenticatedValidations from '../validations/authenticated-validations'

const validationMap = {
  jobs: authenticatedValidations['jobs/save'],
  accounts: authenticatedValidations['accounts/save'],
  companies: authenticatedValidations['companies/save'],
  v5_attic: authenticatedValidations['attic/save'],
  v5_basedata: authenticatedValidations['basedata/save'],
  v5_concern: authenticatedValidations['concern/save'],
  v5_clothes_dryer: authenticatedValidations['clothes_dryer/save'],
  v5_dhw: authenticatedValidations['dhw/save'],
  v5_door: authenticatedValidations['door/save'],
  v5_freezer: authenticatedValidations['freezer/save'],
  v5_health: authenticatedValidations['health/save'],
  v5_hvac: authenticatedValidations['hvac/save'],
  v5_job_financing: authenticatedValidations['job_financing/save'],
  v5_oven: authenticatedValidations['oven/save'],
  v5_range: authenticatedValidations['range/save'],
  v5_refrigerator: authenticatedValidations['refrigerator/save'],
  v5_reports: authenticatedValidations['reports/save'],
  v5_utilities: authenticatedValidations['utilities/save'],
  v5_vault: authenticatedValidations['vault/save'],
  v5_wall: authenticatedValidations['wall/save'],
  v5_window: authenticatedValidations['window/save'],
  v5_caz: authenticatedValidations['caz/save'],
  v5_caz_system: authenticatedValidations['caz_system/save'],
  v5_recommendations: authenticatedValidations['recommendations/save'],
  v5_recommendation_caption_rows: authenticatedValidations['recommendation_caption_rows/save'],
  v5_pv: authenticatedValidations['pv/save']
}

let seenMissing = new Set()

const IGNORE_MISSING_VALIDATION = ['programs', 'v5_hes_scores']
const IGNORE_MISSING_FIELD_BASE = ['companies.name', 'v5_hvac.hvac_age_of_heating_equipment', 'v5_hvac.hvac_age_of_cooling_equipment']

function validateJoi(desc, errors) {
  const {
    outputTable, outputColumn, omDirectSetBase,
    omDirectSetImproved, hasImproved, improvedOnly
  } = desc

  const joi = validationMap[outputTable]
  if (!joi && !seenMissing.has(outputTable)) {
    if (!_.includes(IGNORE_MISSING_VALIDATION, outputTable)) {
      errors.push('Missing entire validation table ' + outputTable)
    }
    seenMissing.add(outputTable)
  } else if (!seenMissing.has(outputTable)) {
    const fields = joi.describe().children
    const touchedFields = (fields.touched_fields || {}).children || {}
    if (!improvedOnly) {
      if (!fields.hasOwnProperty(outputColumn)) {
        if (!_.includes(IGNORE_MISSING_FIELD_BASE, `${outputTable}.${outputColumn}`)) {
          errors.push(`Missing field validation for ${outputTable}.${outputColumn}`)
        }
      }
    }
    if (hasImproved || improvedOnly) {
      if (!fields.hasOwnProperty(outputColumn + '_improved')) {
        errors.push(`Missing field validation for ${outputTable}.${outputColumn}_improved'`)
      }
    }
    if (omDirectSetBase) {
      if (!touchedFields.hasOwnProperty(outputColumn)) {
        errors.push(`Missing touched field validation for ${outputTable}.${outputColumn}`)
      }
    }
    if (omDirectSetImproved) {
      if (!touchedFields.hasOwnProperty(outputColumn + '_improved')) {
        errors.push(`Missing touched field validation for ${outputTable}.${outputColumn}_improved`)
      }
    }
  }
}

function mapRow(row) {
  if (row.column_type.indexOf("enum") === 0) {
    const options = row.column_type.slice(6).slice(0, -2).split("','").map(s => s.replace("''", "'"))
    return {
      ...row,
      options
    }
  }
  return row
}

const SKIP_OPTIONS_TABLES = [
  'accounts',
  'companies',
  'jobs',
  'programs',
  'v5_reports',
  'v5_recommendations',
  'v5_job_financing'
]

let hasValidated = process.env.NODE_ENV === 'test' || false
export default async function validateTables(req: Object, res: Object, next: Function) {
  if (hasValidated) return next()

  let errors = []
  function validateDefinition({outputTable, outputColumn, options}) {
    const field = _.get(tableData, [outputTable, outputColumn])
    if (_.includes(IGNORE_MISSING_FIELD_BASE, `${outputTable}.${outputColumn}`)) {
      return
    }
    if (!field) {
      errors.push(`Missing database field ${outputTable}.${outputColumn}`)
      return
    }
    if (options) {
      options = sanitizeOptions(options)
      if (!_.includes(SKIP_OPTIONS_TABLES, outputTable)) {
        if (!_.isEqual(_.sortBy(options), _.sortBy(field.options))) {
          errors.push(`Invalid options for ${outputTable}.${outputColumn}\nExpected:${options}\nSaw:${field.options}`)
        }
      }
    }
  }

  const tableData = await validateQuery()

  fieldDefinitions.forEach(definition => {

    validateJoi(definition, errors)

    if (!definition.improvedOnly) {
      validateDefinition(definition)
    }
    if (definition.hasImproved || definition.improvedOnly) {
      validateDefinition({
        ...definition,
        outputColumn: definition.outputColumn + '_improved',
        options: definition.improvedOptions || definition.options
      })
    }
  })
  hasValidated = true

  if (errors.length > 0) {
    res.json(errors)
    return
  }
  next()
}

function sanitizeOptions(options) {
  return options.map(o => {
    return typeof o === 'string' ? o : o.displayValue
  })
}

function validateQuery() {
  return knex
    .select('table_name', 'column_name', 'column_type')
    .from('information_schema.columns')
    .where('table_schema', knex.client.connectionSettings.database)
    .andWhere((q) => {
      q.where('table_name', 'like', 'v5_%').orWhere('table_name', 'in', ['accounts', 'companies', 'jobs', 'programs'])
    })
    .then(rows => _.mapValues(_.groupBy(rows, 'table_name'), (rows) => _.keyBy(_.map(rows, mapRow), 'column_name')))
}
