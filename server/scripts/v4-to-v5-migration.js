import _ from 'lodash'
import Promise from 'bluebird'
import knex from '../src/init/knex-init'
import Joi from 'joi'
import UUID from 'node-uuid'
import { health, utilities } from '../../constants/field-definitions'
import { TOUCHABLE_TABLES } from '../src/constants'
import { sanitizeHvacSubmit } from '../../modules/data/formatters/hvacFormatters'
import { fieldByName } from '../../modules/data/definition-helpers'
import authenticatedValidations from '../src/validations/authenticated-validations'
import roundValue from 'util/roundValue'

const keyedUtils = _.keyBy(utilities, (row) => row.migrateV4Column || row.outputColumn)
const keyedHealth = _.keyBy(health, (row) => row.migrateV4Column || row.outputColumn)

const validations = {
  v5_attic: Joi.array().items(authenticatedValidations['attic/save']),
  v5_basedata: authenticatedValidations['basedata/save'],
  v5_concern: Joi.array().items(authenticatedValidations['concern/save']),
  v5_dhw: Joi.array().items(authenticatedValidations['dhw/save']),
  v5_door: Joi.array().items(authenticatedValidations['door/save']),
  v5_freezer: Joi.array().items(authenticatedValidations['freezer/save']),
  v5_health: authenticatedValidations['health/save'],
  v5_hvac: Joi.array().items(authenticatedValidations['hvac/save']),
  v5_job_financing: Joi.array().items(authenticatedValidations['job_financing/save']),
  v5_refrigerator: Joi.array().items(authenticatedValidations['refrigerator/save']),
  v5_reports: authenticatedValidations['reports/save'],
  v5_utilities: authenticatedValidations['utilities/save'],
  v5_vault: Joi.array().items(authenticatedValidations['vault/save']),
  v5_wall: Joi.array().items(authenticatedValidations['wall/save']),
  v5_window: Joi.array().items(authenticatedValidations['window/save']),
  v5_recommendations: Joi.array().items(authenticatedValidations['recommendations/save']),
  v5_recommendation_caption_rows: Joi.array().items(authenticatedValidations['recommendation_caption_rows/save']),

  v5_oven: authenticatedValidations['oven/save'], // converting from 1 -> collection
  v5_range: authenticatedValidations['range/save'], // converting from 1 -> collection
  v5_clothes_dryer: authenticatedValidations['clothes_dryer/save'], // converting from 1 -> collection
  v5_caz: Joi.array().items(authenticatedValidations['caz/save'])
}

function getField(row) {
  const field = fieldByName(row.fieldName)
  if (!field) {
    throw new Error('Missing field ' + row.fieldName)
  }
  return field
}

const SKIPPED_HVAC_FIELDS = ['System %{n} Type', 'Dual Equipment', 'Heating Equipment', 'Cooling Equipment']

async function _v4ToV5(job_id, trx) {
  const [{version, has_calculated}] = await trx.select('*').from('jobs').where({id: job_id})
  if (version !== 4) {
    return;
  }
  let [rows] = await trx.raw(mainDataSQL, {job_id})
  let [[utils]] = await trx.raw(utilsSelectSQL, {job_id})
  let [v4JobFinancing] = await trx.raw(financingSQL, {job_id})
  let [uuids] = await trx.raw(uuidsSql, {job_id})

  let concern = _.map(await trx.select('*').from('v4_concerns').where({job_id, deleted_at: null}), (row, i) => {
    return _.transform(row, (result, val, key) => {
      if (key === 'summary' || key === 'detail') {
        result['concern_' + key] = val
      }
    }, {job_id, uuid: UUID.v4(), order: i})
  })

  let healthRow = await trx.select('*').from('v4_health').where({job_id}).first()
  let totalsRow = await trx.select('job_id').from('v5_totals').where({job_id})
  let reportRow = await trx.select('job_id').from('v5_reports').where({job_id})

  const {inserts, hvacNotes} = buildMigrationInsertData(
    {job_id, has_calculated}, rows, uuids, (healthRow || {}), (utils || {})
  )

  const finalInserts = {
    v5_job_financing: makeJobFinancing(v4JobFinancing),
    ...inserts,
    ...makeRecommendations(...await Promise.all([
      await trx.select('*').from('v4_recommendations').where({job_id, deleted_at: null}).orderBy('order'),
      await trx.select('*').from('v4_recommendation_caption_rows').where({deleted_at: null}).whereIn('recommendation_id', (q) => {
        q.select('id').from('v4_recommendations').where({job_id, deleted_at: null})
      }).orderBy(['order', 'id'])
    ])),
    v5_concern: concern,
  }

  if (totalsRow.length === 0) {
    finalInserts.v5_totals = {
      job_id,
      ..._.omit(await knex.select('*').from('v4_totals').where({job_id}).first(), 'id', 'created_at')
    }
  }
  if (reportRow.length === 0) {
    finalInserts.v5_reports = {
      job_id,
      ..._.omit(await knex.select('*').from('v4_reports').where({job_id}).first(), 'id', 'created_at', 'element_rounded_costs')
    }
  }

  await trx('jobs').update({
    version: 5,
    stage_id: 8,
    upgrade_notes_hvac: hvacNotes.join('\n')
  }).where({id: job_id})

  return await Promise.each(_.toPairs(finalInserts), ([key, val]) => {
    val = Array.isArray(val) ? val.map(stringifyTouched) : stringifyTouched(val)
    return trx.insert(val).into(key).catch(e => {
      console.log([key, val])
      throw e
    })
  })
}

type mainRowDataType = {
  fieldName: string,
  hasBaseOption: 0 | 1,
  base_value_option: ?number,
  hasImpOption: 0 | 1,
  improved_value_option: ?number,
  base: ?string,
  improved: ?string,
  touched_base: 0 | 1,
  touched_improved: 0 | 1,
  uuid: ?string,
  o: ?number
};
type uuidRowType = {
  uuid: string,
  collectionName: string
};
type jobInfoType = {
  job_id: number,
  has_calculated: 0 | 1 | true | false,
};

export function buildMigrationInsertData(
  jobInfo: jobInfoType,
  rowDataFromDb: Array<mainRowDataType>,
  uuidDataFromDb: Array<uuidRowType>,
  healthRow: Object,
  utilsRow: Object
) {
  let errors = []

  const {job_id, has_calculated} = jobInfo

  let inserts = {
    v5_basedata: {
      job_id,
      touched_fields: {}
    },
    v5_utilities: {
      job_id
    },
    v5_health: {
      job_id
    },
    v5_range: {
      job_id,
      uuid: UUID.v4(),
      order: 0
    },
    v5_clothes_dryer: {
      job_id,
      uuid: UUID.v4(),
      order: 0
    },
    v5_oven: {
      job_id,
      uuid: UUID.v4(),
      order: 0
    },
  }

  const rows = _.mapValues(_.groupBy(rowDataFromDb, 'collectionName'), (val, key) => {
    return key === 'basedata' ? val : _.sortBy(_.values(_.groupBy(val, 'uuid')), (rows) => rows[0].o)
  })
  const basedata = rows.basedata || []
  const collections = _.omit(rows, 'basedata')

  let oldSystemTypes = {}

  basedata.forEach(row => {
    if (row.fieldName === 'Electrical') {
      healthRow.electrical = row.base
      return
    }
    if (row.fieldName === 'Range Fuel Type') {
      inserts.v5_range.range_fuel_type =
      inserts.v5_oven.oven_fuel_type = row.base
      return
    }
    if (row.fieldName === 'Dryer Fuel Type') {
      inserts.v5_clothes_dryer.clothes_dryer_fuel_type = row.base
      return
    }
    setRow(inserts.v5_basedata, row)
  })

  healthRow = _.mapValues(healthRow, (val, key) => {
    switch (val) {
      case 163: return 'Passed'
      case 164: return 'Failed'
      case 165: return 'Warning'
      case 166: return 'Not Tested'
    }
    return typeof val === 'string' ? val : null
  })

  _.forEach(collections, (blocks: Array, table: string) => {
    if (table === 'caz') {
      return
    }
    if (table === 'null') {
      if (blocks[0] && blocks[0].hasOwnProperty('programmable_thermostat_installed')) {
        inserts.v5_basedata.programmable_thermostat_installed = blocks[0].programmable_thermostat_installed
      }
      return
    }
    blocks.forEach((fields: Array, index: number) => {
      fields.forEach(row => {
        fixEnum(row)
        const originalTable = table
        if (table === 'attic' && row.fieldName === 'Vault Cool Roof?') {
          table = 'vault'
        }
        inserts['v5_' + table] = inserts['v5_' + table] || {}
        inserts['v5_' + table][row.uuid] = inserts['v5_' + table][row.uuid] || {job_id, uuid: row.uuid, order: index}
        if (_.includes(TOUCHABLE_TABLES, table)) {
          inserts['v5_' + table][row.uuid].touched_fields = inserts['v5_' + table][row.uuid].touched_fields || {}
        }
        if (table === 'hvac' && _.includes(SKIPPED_HVAC_FIELDS, row.fieldName)) {
          oldSystemTypes[row.uuid] = oldSystemTypes[row.uuid] || {}
          oldSystemTypes[row.uuid][row.fieldName] = row.base
          oldSystemTypes[row.uuid][row.fieldName + '_improved'] = row.improved
          return
        }
        setRow(inserts['v5_' + table][row.uuid], row)
        table = originalTable
      })
    })
  })

  // Ensure we migrate the old collections that aren't filled in, e.g. doors
  _.forEach(uuidDataFromDb, (row: uuidRowType) => {
    const {uuid, collectionName} = row
    const coll = inserts['v5_' + collectionName] = (inserts['v5_' + collectionName] || {})
    if (!coll[uuid]) {
      coll[uuid] = {
        job_id,
        uuid: uuid,
        order: _.size(coll)
      }
    }
  });

  _.forEach([
    'v5_attic',
    'v5_hvac',
    'v5_dhw',
    'v5_door',
    'v5_freezer',
    'v5_refrigerator',
    'v5_vault',
    'v5_wall',
    'v5_window',
    'v5_caz',
  ], collectionTable => {
    if (inserts[collectionTable]) {
      inserts[collectionTable] = _.values(inserts[collectionTable])
    }
  })

  if (_.get(inserts, 'v5_basedata.pool_pump_type_improved') === '1') {
    inserts.v5_basedata.pool_pump_type_improved = inserts.v5_basedata.pool_pump_type
  }
  if (_.get(inserts, 'v5_basedata.pool_pump_horsepower_improved') === '0') {
    inserts.v5_basedata.pool_pump_horsepower_improved = null
  }
  if (_.get(inserts, 'v5_basedata.dishwasher_installed') === '0.4') {
    inserts.v5_basedata.dishwasher_installed = 'Yes'
  }
  if (_.get(inserts, 'v5_basedata.clothes_washer_type') === '0.6') {
    inserts.v5_basedata.clothes_washer_type = 'Top Load'
  }
  if (_.get(inserts, 'v5_basedata.dishwasher_installed_improved') === '100') {
    inserts.v5_basedata.dishwasher_installed_improved = 'No Improvement'
  }
  if (_.get(inserts, 'v5_basedata.clothes_washer_type_improved') === '100') {
    inserts.v5_basedata.clothes_washer_type_improved = 'No Improvement'
  }

  let hvacNotes = []

  if (collections.hvac) {
    inserts.v5_hvac = prepareHvacs(has_calculated, oldSystemTypes, inserts.v5_hvac, collections.hvac, hvacNotes)
  }

  inserts.v5_hvac = inserts.v5_hvac ? inserts.v5_hvac.filter(hvac => (hvac.hvac_upgrade_action && hvac.hvac_system_equipment_type)) : []

  _.forEach(utilsRow, (val, col) => {
    const fieldDef = keyedUtils[col]
    if (!fieldDef) {
      if (!allowedMissing(col)) errors.push('Utils: Missing field for ' + col)
      return
    }
    if (col === 'fuel_detailed_units' && val === 'Propane') {
      return
    }
    if (val === '0000-00-00') {
      val = null
    }
    if ((col === 'primary_heating_fuel_type' || col === 'fuel_primary_type') && val === 'None') {
      val = ""
    }
    setRow(inserts.v5_utilities, {base: val, fieldName: fieldDef.name})
  })

  _.forEach(healthRow, (val, col) => {
    const fieldDef = keyedHealth[col]
    if (!fieldDef) {
      if (!allowedMissing(col)) errors.push('Health: Missing field for ' + col)
      return
    }
    setRow(inserts.v5_health, {base: val, fieldName: fieldDef.name})
  })

  function setRow(ctx, row) {
    const {
      improvedOnly, hasImproved, outputColumn, decimals,
      omDirectSetBase, omDirectSetImproved
    } = getField(row)
    const improvedColumn = outputColumn + '_improved'
    if (!improvedOnly) {
      ctx[outputColumn] = roundValue(row.base, decimals)
    }
    if (omDirectSetBase && row.touched_base) {
      _.merge(ctx, {touched_fields: {[outputColumn]: true}})
    }
    if (omDirectSetImproved && row.touched_improved) {
      _.merge(ctx, {touched_fields: {[improvedColumn]: true}})
    }
    if (hasImproved) {
      ctx[improvedColumn] = roundValue(row.improved, decimals)
    }
    if (outputColumn === 'attic_has_knee_wall') {
      ctx.attic_has_knee_wall_improved = ctx[outputColumn]
    }
    if (outputColumn === 'attic_cool_roof') {
      ctx.attic_cool_roof_improved = ctx[outputColumn]
    }
    if (outputColumn === 'vault_cool_roof') {
      ctx.vault_cool_roof_improved = ctx[outputColumn]
    }
  }

  // const V5_TABLES = (add V5_TABLES)
  _.forEach([
    'attic',
    'concern',
    'dhw',
    'door',
    'oven',
    'clothes_dryer',
    'range',
    'refrigerator',
    'wall',
    'window'
  ], tbl => {
    if (!inserts[`v5_${tbl}`] || inserts[`v5_${tbl}`].length === 0) {
      inserts[`v5_${tbl}`] = [{
        job_id,
        order: 0,
        uuid: UUID.v4()
      }]
    }
  })

  if (inserts.v5_door.length < 2) {
    inserts.v5_door.push({
      job_id,
      order: 1,
      uuid: UUID.v4()
    })
  }

  _.forEach(inserts, (data, key) => {

    if (key === 'v5_totals' || key === 'v5_reports') {
      return
    }

    if (key === 'v5_null') {
      console.log(data)
    }

    if (!validations[key]) {
      errors.push('Missing Validation for ' + key)
      return
    }

    let result = Joi.validate(data, validations[key], {abortEarly: false})

    if (result.error) {
      result.error.details = result.error.details.filter(filterErrors).map(d => {
        d.SAW = _.get(data, d.path)
        d.section = [key, {job_id}]
        return d
      })
      if (result.error.details.length > 0) {
        errors = errors.concat(result.error.details)
      }
    }
  })

  if (!inserts.v5_utilities.electric_bill_units) {
    inserts.v5_utilities.electric_bill_units = 'kWh'
  }
  if (!inserts.v5_utilities.simple_fuel_units) {
    inserts.v5_utilities.simple_fuel_units = 'Dollars'
  }
  if (!inserts.v5_utilities.fuel_bill_units) {
    inserts.v5_utilities.fuel_bill_units = 'Therms'
  }

  if (errors.length > 0) {

    const e = new Error('ERROR_MIGRATING')

    e.errors = errors

    throw e

  }

  return {hvacNotes, inserts}
}


export default async function v4ToV5Migration(job_id: number, trx) {
  if (trx) {
    return _v4ToV5(job_id, trx)
  }
  return knex.transaction(async (trx) => _v4ToV5(job_id, trx))
}

function stringifyTouched(val) {
  if (val.touched_fields) {
    val.touched_fields = JSON.stringify(val.touched_fields)
  }
  return val
}

function fixEnum(row) {
  if (typeof row.base === 'string') {
    row.base = row.base.replace('R-6 Duct Insulation ', 'R-6 Duct Insulation')
  }
  if (typeof row.improved === 'string') {
    row.improved = row.improved.replace('R-6 Duct Insulation ', 'R-6 Duct Insulation')
  }
}

function filterErrors(error) {
  return !_.includes(ALLOWED_ERROR, _.get(error, 'context.key'))
}

const ALLOWED_MISSING = ['id', 'job_id', 'created_at', 'updated_at', 'v4_uuid']

const ALLOWED_ERROR = ALLOWED_MISSING.concat(
  'contact_info', 'description', 'eligibility', 'touched_cost',
  'rec_definition_id', 'savings', 'sir',
  'min_cash_down', 'cash_down', 'term', 'recommendation_uuid',
  'status'
)

function allowedMissing(val) {
  return _.includes(ALLOWED_MISSING, val)
}

const financingSQL = `select
  jf.id,
  jf.job_id,
  ft.id as parent_id,
  jf.total_cost,
  jf.cash_down,
  jf.is_shown,
  fp.title,
  fp.rate,
  fp.closing_cost,
  fp.term,
  fp.min_fico_score,
  fp.min_cash_down,
  fp.min_purchase,
  fp.max_purchase,
  fp.eligibility,
  fp.description,
  fp.contact_info,
  jf.created_at,
  jf.updated_at,
  fp.deleted_at
  from v4_job_financing as jf
inner join v4_financing_products as fp
  on jf.financing_product_id = fp.id
left outer join v5_financing_templates as ft
  on ft.id = jf.financing_product_id
  where jf.job_id = :job_id`

const mainDataSQL =
`select
  v4_fields.label as fieldName,
  IF(v4_fields.base_optiongroup_id, true, false) as hasBaseOption,
  v4_outputs.base_value_option,
  IF(v4_fields.imp_optiongroup_id, true, false) as hasImpOption,
  v4_outputs.improved_value_option,
  IF(v4_outputs.base_value_option, baseOpt.display_value, v4_outputs.base_value) as base,
  IF(v4_outputs.improved_value_option, impOpt.display_value, v4_outputs.improved_value) as improved,
  v4_outputs.touched_base,
  v4_outputs.touched_improved,
  'basedata' as collectionName,
  null as uuid,
  null as o
from v4_outputs
inner join v4_fields
  on v4_fields.id = v4_outputs.field_id
left outer join v4_options as baseOpt
  on baseOpt.id = v4_outputs.base_value_option
left outer join v4_options as impOpt
  on impOpt.id = v4_outputs.improved_value_option
where job_id = :job_id

union all

select
  v4_fields.label as fieldName,
  IF(v4_fields.base_optiongroup_id, true, false) as hasBaseOption,
  v4_outputs_collection.base_value_option,
  IF(v4_fields.imp_optiongroup_id, true, false) as hasImpOption,
  v4_outputs_collection.improved_value_option,
  IF(v4_outputs_collection.base_value_option, baseOpt.display_value, v4_outputs_collection.base_value) as base,
  IF(v4_outputs_collection.improved_value_option, impOpt.display_value, v4_outputs_collection.improved_value) as improved,
  v4_outputs_collection.touched_base,
  v4_outputs_collection.touched_improved,
  v4_collection_definitions.name as collectionName,
  v4_outputs_collection.uuid as uuid,
  v4_uuids.id as o
from v4_outputs_collection
inner join v4_fields
  on v4_fields.id = v4_outputs_collection.field_id
inner join v4_uuids
  on v4_uuids.uuid = v4_outputs_collection.uuid
left outer join v4_collection_definitions
    on v4_collection_definitions.id = v4_fields.collection_definition_id
left outer join v4_options as baseOpt
  on baseOpt.id = v4_outputs_collection.base_value_option
left outer join v4_options as impOpt
  on impOpt.id = v4_outputs_collection.improved_value_option
where
  v4_outputs_collection.job_id = :job_id
  and v4_uuids.job_id = :job_id
  and v4_uuids.deleted_at is null
`

const utilsSelectSQL =
`select
  v4_utilities.*,
  bill_entry_type_opt.display_value as bill_entry_type,
  electric_detailed_units_opt.display_value as electric_detailed_units,
  fuel_primary_type.display_value as fuel_primary_type,
  simple_fuel_units_opt.display_value as simple_fuel_units,
  fuel_detailed_units_opt.display_value as fuel_detailed_units
from v4_utilities
left outer join v4_options as bill_entry_type_opt
  on bill_entry_type_opt.id = v4_utilities.bill_entry_type
left outer join v4_options as electric_detailed_units_opt
  on electric_detailed_units_opt.id = v4_utilities.electric_detailed_units
left outer join v4_options as fuel_primary_type
  on fuel_primary_type.id = v4_utilities.fuel_primary_type
left outer join v4_options as simple_fuel_units_opt
  on simple_fuel_units_opt.id = v4_utilities.simple_fuel_units
left outer join v4_options as fuel_detailed_units_opt
  on fuel_detailed_units_opt.id = v4_utilities.fuel_detailed_units
where job_id = :job_id
`

const uuidsSql = `
SELECT
  v4_uuids.uuid,
  v4_collection_definitions.name as collectionName
FROM v4_uuids
INNER JOIN v4_collection_definitions
  ON v4_collection_definitions.id = v4_uuids.collection_id
WHERE v4_uuids.deleted_at IS NULL
  AND v4_uuids.job_id = :job_id
ORDER BY v4_uuids.id
`

function remapDualCool(type) {
  return type === 'Furnace / Central AC' ? 'Central AC' : type
}
function remapDualHeat(type) {
  return type === 'Furnace / Central AC' ? 'Furnace' : type
}

function prepareHvacs(hasModeled, oldSystemTypes, hvacInserts, hvacs: Array, notes: Array) {

  let orphanCount = 0

  const orphanedHeatPumps = {
    heat: {
      base: [],
      improved: []
    },
    cool: {
      base: [],
      improved: []
    }
  }

  const finalInserts = []

  function addNote(row, msg: string) {
    notes.push(`${row.uuid} - ${msg}`)
  }
  function addSystem(row, system) {
    if (system) {
      finalInserts.push({...system, uuid: UUID.v4(), v4_uuid: row.uuid})
    } else {
      addNote(row, 'missing system data: ' + JSON.stringify(oldSystemTypes[row.uuid], null, 2))
    }
  }
  function replaceRow(row, systemName) {
    addSystem(row, {...row, hvac_upgrade_action: 'Replace with a newer model', hvac_system_equipment_type: getSystem(systemName, row)})
  }
  function removeRow(row, systemName, source: string) {
    if (inLoop && (source === 'heat' || source === 'cool') && /Heat\ Pump/.test(systemName)) {
      addNote(row, `Detected potential orphan heat pump from ${source}`)
      orphanCount++
      orphanedHeatPumps[source].base.push([systemName, row])
    } else {
      addSystem(row, {...row, hvac_upgrade_action: 'Remove a system permanently', hvac_system_equipment_type: getSystem(systemName, row)})
    }
  }
  function installRow(row, systemName, source: string) {
    if (inLoop && (source === 'heat' || source === 'cool') && /Heat\ Pump/.test(systemName)) {
      addNote(row, `Detected potential orphan heat pump from ${source}`)
      orphanCount++
      orphanedHeatPumps[source].improved.push([systemName, row])
    } else {
      addSystem(row, {...row, hvac_upgrade_action: 'Install a new non-existing system', hvac_system_equipment_type: getSystem(systemName, row)})
    }
  }
  let inLoop = true
  for (let i = 0; i < hvacInserts.length; i++) {
    const row = hvacInserts[i]
    const replace = _.partial(replaceRow, row)
    const remove = _.partial(removeRow, row)
    const install = _.partial(installRow, row)
    const note = _.partial(addNote, row)

    note('entering system')

    const data = oldSystemTypes[row.uuid]
    if (!data) {
      continue;
    }
    const legacySystemType = data['System %{n} Type']
    const legacyDualEquipment = data['Dual Equipment']
    let legacyCoolingEquipment, legacyCoolingEquipmentImproved,
      legacyHeatingEquipment, legacyHeatingEquipmentImproved

    const isDual = legacySystemType === 'Both'
    const isCool = legacySystemType === 'Cooling'
    const isHeat = legacySystemType === 'Heating'

    if (!legacySystemType) {
      note(`Warn: No system type defined, skipping.`)
      continue
    }

    if (isDual) {
      legacyCoolingEquipment = remapDualCool(legacyDualEquipment)
      legacyHeatingEquipment = remapDualHeat(legacyDualEquipment)
    }
    if (isCool || isDual) {
      if (!isDual) legacyCoolingEquipment = data['Cooling Equipment']
      legacyCoolingEquipmentImproved = data['Cooling Equipment_improved']
    }
    if (isHeat || isDual) {
      if (!isDual) legacyHeatingEquipment = data['Heating Equipment']
      legacyHeatingEquipmentImproved = data['Heating Equipment_improved']
    }

    note(JSON.stringify(data, null, 2))

    if (
      (isCool && !legacyCoolingEquipment) ||
      (isDual && !legacyDualEquipment) ||
      (isHeat && !legacyHeatingEquipment)
    ) {
      continue
    }

    if (row.hvac_cooling_system_manufacturer === 'Sears') {
      row.hvac_cooling_system_manufacturer = 'Sears Kenmore'
    }
    if (row.hvac_cooling_system_manufacturer_improved === 'Sears') {
      row.hvac_cooling_system_manufacturer_improved = 'Sears Kenmore'
    }

    if (row.hvac_duct_insulation && !row.hvac_duct_insulation_improved) {
      row.hvac_duct_insulation_improved = 'No Insulation Improvement'
    }

    const baseHeatZero = row.hvac_percent_of_total_heating_load === 0
    const baseCoolZero = row.hvac_percent_of_total_cooling_load === 0 || (isCool && legacyCoolingEquipment === 'None')
    const impHeatZero = row.hvac_percent_of_total_heating_load_improved === 0
    const impCoolZero = row.hvac_percent_of_total_cooling_load_improved === 0 || legacyCoolingEquipmentImproved === 'None'

    const year = new Date().getFullYear()

    if (!row.hvac_cooling_system_model_year && row.hvac_age_of_cooling_equipment) {
      _.set(row, 'touched_fields.hvac_cooling_system_model_year', true)
      switch (row.hvac_age_of_cooling_equipment) {
        case "0-5": row.hvac_cooling_system_model_year = year - 3; break;
        case "6-10": row.hvac_cooling_system_model_year = year - 8; break;
        case "11-15": row.hvac_cooling_system_model_year = year - 13; break;
        case "16-20": row.hvac_cooling_system_model_year = year - 18; break;
        case "21-25": row.hvac_cooling_system_model_year = year - 23; break;
        case "26-30": row.hvac_cooling_system_model_year = year - 28; break;
        case "31-35": row.hvac_cooling_system_model_year = year - 33; break;
        case "36+" : row.hvac_cooling_system_model_year = year - 36; break;
      }
    }
    if (!row.hvac_heating_system_model_year && row.hvac_age_of_heating_equipment) {
      _.set(row, 'touched_fields.hvac_heating_system_model_year', true)
      switch (row.hvac_age_of_heating_equipment) {
        case "0-5": row.hvac_heating_system_model_year = year - 3; break;
        case "6-15": row.hvac_heating_system_model_year = year - 11; break;
        case "16-40": row.hvac_heating_system_model_year = year - 28; break;
        case "41+": row.hvac_heating_system_model_year = year - 41; break;
      }
    }

    // In V4, a "Dual" system referred to "Central Heat Pump"
    // or "Furnace / Central AC", now it refers to those + "Ductless Heat Pump",
    // as the ducts are only a secondary piece of the equation.
    if (isDual) {
      if (!legacyDualEquipment) {
        note(`Warn: No dual equipment type defined, skipping.`)
        continue
      }
      const hasZeroLoad = baseHeatZero || baseCoolZero || impHeatZero || impCoolZero

      if (hasZeroLoad) {

        if (baseHeatZero || baseCoolZero) {
          if (baseHeatZero && baseCoolZero) {
            install(legacyDualEquipment, 'dual')
            continue
          } else {
            note(`Unable to interpret dual system with half of base set to zero, skipping.`)
            continue
          }
        }

        note('Removing dual equipment ' + legacyDualEquipment)

        // Remove the system if either of the improved items are zero'ed
        remove(legacyDualEquipment, 'dual')

        if (!impHeatZero) {
          note('Saw improved heat set to 0%')
          const heat = legacyDualEquipment === 'Furnace / Central AC' ? 'Furnace' : 'Central Heat Pump (shared ducts)'
          note(`Adding heat, from dual: ${legacyDualEquipment} -> ${heat}`)
          install(heat, 'dual')
        }
        if (!impCoolZero) {
          note('Saw improved cool set to 0% or None')
          const cool = legacyDualEquipment === 'Furnace / Central AC' ? 'Central AC' : 'Central Heat Pump (shared ducts)'
          note(`Adding cool, from dual: ${legacyCoolingEquipment} -> ${cool}`)
          install(cool, 'dual')
        }
        continue
      }

      if (
        (legacyDualEquipment === 'Furnace / Central AC' && (
          (!legacyHeatingEquipmentImproved || legacyHeatingEquipmentImproved === 'Furnace') &&
          (!legacyCoolingEquipmentImproved || legacyCoolingEquipmentImproved === 'Central AC')
        )) ||
        (legacyDualEquipment === 'Central Heat Pump' && (
          (!legacyHeatingEquipmentImproved || legacyHeatingEquipmentImproved === 'Central Heat Pump') &&
          (!legacyCoolingEquipmentImproved || legacyCoolingEquipmentImproved === 'Central Heat Pump')
        ))
      ) {
        note(`Upgrading Existing dual ${legacyDualEquipment}`)
        replace(legacyDualEquipment, 'dual')
        continue
      }

      if (
        legacyCoolingEquipmentImproved === legacyHeatingEquipmentImproved
      ) {
        note(`removing dual ${legacyDualEquipment}`)
        remove(legacyDualEquipment, 'dual')
        note(`installing dual`)
        install(legacyCoolingEquipmentImproved, 'dual')
        continue
      }

      if (
        (legacyCoolingEquipmentImproved === 'Central AC') &&
        (legacyHeatingEquipmentImproved === 'Furnace')
      ) {
        note(`removing dual ${legacyDualEquipment}`)
        remove(legacyDualEquipment, 'dual')
        note(`installing dual`)
        install('Furnace / Central AC (shared ducts)', 'dual')
        continue
      }

      if (
        legacyDualEquipment === 'Central Heat Pump' && (
          legacyCoolingEquipmentImproved === 'Central Heat Pump' ||
          legacyHeatingEquipmentImproved === 'Central Heat Pump'
        )
      ) {
        note(`Error: Need to account for this case: \n ${JSON.stringify({data}, null, 2)}`);
      }
      continue
    }

    // In V4, the "Ductless Heat Pump" / "Central Heat Pump"
    // showed up under both heating & cooling as an option, so we
    // need to look for that and split off into new systems as necessary.
    if (isCool) {
      const hasZeroLoad = baseCoolZero || impCoolZero

      if (baseCoolZero && impCoolZero) {
        continue
      }

      if (hasZeroLoad) {
        if (baseCoolZero) {
          note(`Installing cool, from cool (zero) ${legacyCoolingEquipmentImproved}`)
          install(legacyCoolingEquipmentImproved, 'cool')
        } else {
          note(`Removing cool, from cool (zero) ${legacyCoolingEquipment}`)
          remove(legacyCoolingEquipment, 'cool')
        }
        continue
      }
      if (
        legacyCoolingEquipment && legacyCoolingEquipmentImproved && (
          legacyCoolingEquipment !== legacyCoolingEquipmentImproved
        )
      ) {
        note(`Removing cool, from cool ${legacyCoolingEquipment}`)
        remove(legacyCoolingEquipment, 'cool')
        note(`Installing cool, from cool ${legacyCoolingEquipmentImproved}`)
        install(legacyCoolingEquipmentImproved, 'cool')
        continue
      }
      if (legacyCoolingEquipmentImproved || !hasModeled) {
        note(`Keeping Existing cool ${legacyCoolingEquipment}`)
        replace(legacyCoolingEquipment, 'cool')
        continue
      }
      if (legacyCoolingEquipment) {
        note(`Removing cool, from cool (last) ${legacyCoolingEquipment}`)
        remove(legacyCoolingEquipment, 'cool')
        continue
      }
    }

    if (isHeat) {
      const hasZeroLoad = baseHeatZero || impHeatZero
      if (hasZeroLoad) {
        if (baseHeatZero) {
          note(`Installing heat, from heat (zero) ${legacyHeatingEquipmentImproved}`)
          install(legacyHeatingEquipmentImproved, 'heat')
        } else {
          note(`Removing heat, from heat (zero) ${legacyHeatingEquipment}`)
          remove(legacyHeatingEquipment, 'heat')
        }
        continue
      }
      if (legacyHeatingEquipment && legacyHeatingEquipmentImproved && (legacyHeatingEquipment !== legacyHeatingEquipmentImproved)) {
        note(`Removing heat, from heat ${legacyHeatingEquipment}`)
        remove(legacyHeatingEquipment, 'heat')
        note(`Installing heat, from heat ${legacyHeatingEquipmentImproved}`)
        install(legacyHeatingEquipmentImproved, 'heat')
        continue
      }
      if (legacyHeatingEquipmentImproved || !hasModeled) {
        note(`Upgrading Existing heat ${legacyHeatingEquipment}`)
        replace(legacyHeatingEquipment)
        continue
      }
      if (legacyHeatingEquipment) {
        note(`Removing heat, from heat (last) ${legacyHeatingEquipment}`)
        remove(legacyHeatingEquipment, 'heat')
        continue
      }
    }
  }
  inLoop = false

  if (orphanCount > 0) {
    const ohp = orphanedHeatPumps
    if (ohp.heat.base.length || ohp.cool.base.length) {
      const [lhs, rhs] = ohp.heat.base.length > ohp.cool.base.length ? ['heat', 'cool'] : ['cool', 'heat']
      const iter = ohp[lhs].base
      const pair = ohp[rhs].base
      for (let i = 0; i < iter.length; i++) {
        const maybeLeft = iter[i]
        const maybeRight = pair[i]
        if (maybeLeft && maybeRight) {
          const [nameA, left] = maybeLeft
          const [nameB, right] = maybeRight
          const merged = _.mergeWith(left, right, makeMerger(lhs))
          removeRow(merged, nameA.length > nameB.length ? nameA : nameB, '')
        } else if (maybeLeft) {
          removeRow(maybeLeft[1], maybeLeft[0], '')
        } else {
          removeRow(maybeRight[1], maybeRight[0], '')
        }
      }
    }

    if (ohp.heat.improved.length || ohp.cool.improved.length) {
      const [lhs, rhs] = ohp.heat.improved.length > ohp.cool.improved.length ? ['heat', 'cool'] : ['cool', 'heat']
      const iter = ohp[lhs].improved
      const pair = ohp[rhs].improved
      for (let i = 0; i < iter.length; i++) {
        const maybeLeft = iter[i]
        const maybeRight = pair[i]
        if (maybeLeft && maybeRight) {
          const [nameA, left] = maybeLeft
          const [nameB, right] = maybeRight
          const merged = _.mergeWith(left, right, makeMerger(lhs))
          installRow(merged, nameA.length > nameB.length ? nameA : nameB, '')
        } else if (maybeLeft) {
          installRow(maybeLeft[1], maybeLeft[0], '')
        } else {
          installRow(maybeRight[1], maybeRight[0], '')
        }
      }
    }
  }

  return finalInserts.map((s, i) => {
    const sanitizedData = sanitizeHvacSubmit(s)
    const sanitizedKeys = Object.keys(sanitizedData)

    sanitizedData.touched_fields = _.pickBy((s.touched_fields || {}), (val, key) => _.includes(sanitizedKeys, key))

    return _.omit({
      ...sanitizedData,
      order: i,
      uuid: s.uuid,
      v4_uuid: s.v4_uuid,
      job_id: s.job_id,
      hvac_system_name: s.hvac_system_name || `System ${i + 1}`,
      touched_fields: getHvacTouchedFields(s.v4_uuid, sanitizedData, hvacs),
    }, 'hvac_age_of_heating_equipment', 'hvac_age_of_cooling_equipment', 'hvac_age_of_heating_equipment_improved', 'hvac_age_of_cooling_equipment_improved')
  })
}

function makeMerger(firstSide) {
  return function(objValue, srcValue, key, object, source, stack) {
    if (key === 'touched_fields') {
      return _.merge(objValue, srcValue)
    }
    if (objValue !== srcValue) {
      if (key.includes(firstSide)) {
        return objValue
      }
      return srcValue || objValue
    }
  }
}

function getHvacTouchedFields(uuid: string, sanitizedData, hvacs: Array) {
  let touched_fields = sanitizedData.touched_fields || {}
  const fields = hvacs.find(rows => rows[0].uuid === uuid)
  if (!fields) return {}
  fields.forEach(row => {
    if (_.includes(SKIPPED_HVAC_FIELDS, row.fieldName)) {
      return
    }
    const {
      outputColumn, omDirectSetBase, omDirectSetImproved
    } = getField(row)
    const improvedColumn = outputColumn + '_improved'
    if (omDirectSetBase && row.touched_base) {
      if (sanitizedData[outputColumn] != null) {
        touched_fields[outputColumn] = true
      }
    }
    if (omDirectSetImproved && row.touched_improved) {
      if (sanitizedData[improvedColumn] != null) {
        touched_fields[improvedColumn] = true
      }
    }
  })
  return touched_fields
}

// First, run through and group all of the hvac contents by UUID:

const OLD_TO_NEW_SYSTEMS_MAP = {
  'Boiler': 'Boiler',
  'Furnace': 'Furnace with standalone ducts',
  'Electric Resistance': 'Electric Resistance',
  'Direct Heater': 'Direct Heater',
  'Stove or Insert': 'Stove or Insert',
  'Solar': 'Solar Thermal',
  'Central AC with standalone ducts': 'Central AC with standalone ducts',
  'Central AC': 'Central AC with standalone ducts',
  'Room AC': 'Room AC',
  'Evaporative Cooler (direct)': 'Evaporative Cooler - Direct',
  'Evaporative Cooler (ducted)': 'Evaporative Cooler - Ducted',
  'Ductless Heat Pump': 'Ductless Heat Pump',
  'Central Heat Pump': 'Central Heat Pump (shared ducts)',
  'Furnace / Central AC': 'Furnace / Central AC (shared ducts)',
  'Central Heat Pump (shared ducts)': 'Central Heat Pump (shared ducts)',
  'Furnace / Central AC (shared ducts)': 'Furnace / Central AC (shared ducts)'
}

function getSystem(equipment: ?string, row) {
  if (equipment === null || equipment === undefined || equipment === '') {
    return
  }
  if (!OLD_TO_NEW_SYSTEMS_MAP[equipment]) {
    throw new Error(`Missing ${equipment}` + JSON.stringify(row, null, 2))
  }
  return OLD_TO_NEW_SYSTEMS_MAP[equipment]
}

function makeJobFinancing(rows) {
  return rows.map((row, i) => {
    row.uuid = UUID.v4()
    row.order = i
    if (!row.deleted_at && row.parent_id) {
      row.from_financing_template_id = row.parent_id
    } else {
      row.from_financing_template_id = null
    }
    if (!row.title) {
      row.title = 'Financing Product'
    }
    return _.omit(row, 'id', 'deleted_at', 'parent_id')
  })
}

function makeRecommendations(recs, recCaptions) {
  let v5_recommendations = []
  let v5_recommendation_caption_rows = []

  const indexedCaptions = _.groupBy(recCaptions, 'recommendation_id')

  recs.forEach((rec, i) => {
    const recommendation_uuid = UUID.v4()
    v5_recommendations.push(_.omit({
      ...rec,
      uuid: recommendation_uuid,
      order: i,
      cost: getCost(rec.cost),
    }, 'measure_code', 'id'))

    if (indexedCaptions[rec.id]) {
      indexedCaptions[rec.id].forEach((cap, i) => {
        const caption_uuid = UUID.v4()
        v5_recommendation_caption_rows.push(_.omit({
          ...cap,
          order: i,
          job_id: rec.job_id,
          uuid: caption_uuid,
          recommendation_uuid,
        }, 'id', 'recommendation_id'))
      })
    }
  })

  return {
    v5_recommendations,
    v5_recommendation_caption_rows
  }
}


function getCost(cost) {
  if (cost === null || cost === undefined) {
    return null
  }
  let number = cost.replace(/[^0-9.]/g, '').replace('..', '.')
  if (number === '0') {
    number = '0.00'
  }
  let finalNumber = _.round(number, 2)
  if (_.isNaN(finalNumber)) {
    // debugger
    return null
  }
  return finalNumber
}
