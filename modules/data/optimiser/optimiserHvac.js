import _ from 'lodash'
import checkit from 'checkit'
import type {hvacType, omContextType} from './optimiser-types'
import {
  returnContext,
  omFieldVal,
  processField
} from './optimiser-helpers'
import {withIndexes, upgradeAction} from '../formatters/hvacFormatters'

const validator = checkit()
  .maybe({
    hvac_duct_leakage_value: {
      rule: 'required',
      message: 'A base leakage measurement value is required when leakage is Measured',
    }
  }, (target) => target.hvac_duct_leakage === 'Measured (CFM25)')
  .maybe({
    hvac_duct_leakage_value_improved: {
      rule: 'required',
      message: 'An improved leakage measurement value is required when leakage is Measured',
    }
  }, (target) => target.hvac_duct_leakage_improved === 'Measured (cfm25) - add cost manually')
  .maybe({
    hvac_duct_insulation_value: {
      rule: 'required',
      message: 'An insulation measurement value is required when insulation is Measured',
    }
  }, (target) => target.hvac_duct_insulation === 'Measured (R Value)')
  .maybe({
    hvac_duct_insulation_value_improved: {
      rule: 'required',
      message: 'An improved insulation measurement value is required when insulation is Measured',
    }
  }, (target) => target.hvac_duct_insulation_improved === 'Measured (R Value) - add cost manually')

// "No improvement" constants sent to optimiser when system type is not changed
const KEEP_SYSTEM_CONSTANTS = {
  'Boiler': 180799999999,
  'Furnace with standalone ducts': 180799999999,
  'Electric Resistance': 180799999999,
  'Direct Heater': 180799999999,
  'Stove or Insert': 180799999999,
  'Solar Thermal': 180799999999,
  'Central AC with standalone ducts': 187299999999,
  'Room AC': 187499999999,
  'Evaporative Cooler - Direct': 180299999999,
  'Evaporative Cooler - Ducted': 180699999999,
  'Ductless Heat Pump': 180799999999,
  'Central Heat Pump (shared ducts)': 180799999999,
  'Furnace / Central AC (shared ducts)': 180799999999,
}

const keyToField = {
  hvac_duct_leakage_value: 'Duct Leakage Value',
  hvac_duct_leakage_value_improved: 'Duct Leakage Value',
  hvac_duct_insulation_value: 'Duct Insulation Value',
  hvac_duct_insulation_value_improved: 'Duct Insulation Value'
}

/*
Split the "hvac" into

          Base                      Imp
   Heat    |     Cool       Heat     |    Cool
  ------        ------     ------        ------
*/
export default function optimiserHvacFormatter(
  context: omContextType,
  hvacs: Array<hvacType>,
  fields: Array
) : omContextType {
  let errors = []
  let values = {}
  const {
    baseHeat,
    baseCool,
    improvedHeat,
    improvedCool,
    percentLoad,
    systems,
    grid
  } = withIndexes(hvacs, errors)

  // Build & return all of the OM specific values for this HVAC row
  const finalData = _.map(systems, s => formatHvac(context, s, fields)).filter(_.identity)

  // Log errors for all of the invalid scenarios
  if (baseHeat > 3) errors.push({message: 'TOO_MANY_BASE_HEAT', section: 'hvac'})
  if (baseCool > 3) errors.push({message: 'TOO_MANY_BASE_COOL', section: 'hvac'})
  if (improvedHeat > 3) errors.push({message: 'TOO_MANY_IMP_HEAT', section: 'hvac'})
  if (improvedCool > 3) errors.push({message: 'TOO_MANY_IMP_COOL', section: 'hvac'})

  if (systems.length === 0) {
    errors.push({message: 'NO_HVAC_SYSTEMS', section: 'hvac'})
  } else {
    if (!baseHeat && !baseCool) errors.push({message: 'NO_HVAC_BASE_SYSTEMS', section: 'hvac'})
    if (!improvedHeat && !improvedCool) errors.push({message: 'NO_HVAC_IMPROVED_SYSTEMS', section: 'hvac'})
  }
  _.forEach(percentLoad, (val, heatOrCool: 'heating' | 'cooling') => {
    _.forEach(val, (num, baseOrImp: 'base' | 'improved') => {
      if ((heatOrCool === 'cooling' && num > 100) || (heatOrCool === 'heating' && num !== 100)) {
        const improved = baseOrImp === 'improved'
        errors.push({
          improved,
          component: 'PercentLoadTable',
          type: _.capitalize(heatOrCool),
          section: 'hvac'
        })
      }
    })
  })

  // Fill in any uneven systems with a load % set to 0
  for (var i = 0, l = 3; i < l; i++) {
    if (grid.heat.base[i] && !grid.heat.improved[i]) {
      values[`ImpHeatPct${i + 1}`] = 0
    }
    if (!grid.heat.base[i] && grid.heat.improved[i]) {
      values[`A1BaseHeatPct${i + 1}`] = 0
    }
    if (grid.cool.base[i] && !grid.cool.improved[i]) {
      values[`ImpCoolingPct${i + 1}`] = 0
    }
    if (!grid.cool.base[i] && grid.cool.improved[i]) {
      values[`BaseCoolingPct${i + 1}`] = 0
    }
  }

  return returnContext('hvac', context, finalData, {values, errors})
}

// isImprovedKey is passed from processField, and determines whether the
//
function prepKey(omIdx: Object, key: string, isImprovedKey = false) {
  if (omIdx.improved && !isImprovedKey) return
  if (isImprovedKey && !omIdx.improved) return
  const finalHeatingIndex = omIdx.improved ? omIdx.improvedHeatIndex : omIdx.baseHeatIndex
  const finalCoolingIndex = omIdx.improved ? omIdx.improvedCoolIndex : omIdx.baseCoolIndex
  const finalDuctTypeValue = omIdx.improved ? omIdx.improvedDuctType : omIdx.baseDuctType
  const finalDuctIndex = omIdx.improved ? omIdx.improvedDuctIndex : omIdx.baseDuctIndex
  return key ? key
    .replace(`%{heatingIndex}`, finalHeatingIndex)
    .replace(`%{?heatingIndex}`, finalHeatingIndex === 1 ? '' : finalHeatingIndex)
    .replace(`%{coolingIndex}`, finalCoolingIndex)
    .replace(`%{?coolingIndex}`, finalCoolingIndex === 1 ? '' : finalCoolingIndex)
    .replace(`%{?__duct_type__}`, finalDuctTypeValue === 'Heat' ? '' : 'Cooling')
    .replace('%{__duct_type__}', finalDuctTypeValue === 'Heat' ? 'Heat' : 'Cooling')
    .replace('%{n}', finalDuctIndex)
    .replace('%{?n}', finalDuctIndex === 1 ? '' : finalDuctIndex) : key
}

function merger(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue).sort();
  }
}

function shouldSkipField(field, action, indexes) {
  const {
    hasDucts,
    isHeat,
    isCool,
    isRemove,
    isInstall,
    improved
  } = indexes

  // If we're removing the system, only include fields on the base side
  if (isRemove && improved) return true

  // Likewise, if we're installing a system, only include fields on the improved side
  if (isInstall && !improved) return true

  // Otherwise, check whether the field makes sense in the current section
  switch (field.hvacGroup) {
    case 'heat':
      if (isCool) {
        return true
      }
      break;
    case 'cool':
      if (isHeat) {
        return true
      }
      break;
    case 'duct':
      if (!hasDucts) {
        return true
      }
      break;
  }
  return false
}

// Strips out all of the unnecessary data based on the action
function formatHvac(context: omContextType, system: Object, fields: Array) {
  const {optimiserIndexes: omIdx} = system

  // upgrade | keep | remove | install
  const action = upgradeAction(system)
  const equipment = system.hvac_system_equipment_type
  let localContext = {
    values: {},
    returning: [],
    returningInto: {},
    errors: []
  }
  // base fields
  fields.forEach(field => {
    if (shouldSkipField(field, action, omIdx)) {
      return
    }
    localContext = _.mergeWith(
      processField(field, system, _.partial(prepKey, omIdx)),
      localContext,
      merger
    )
  })
  // improved fields
  fields.forEach(field => {
    const improvedIndexes = {...omIdx, improved: true}
    if (shouldSkipField(field, action, improvedIndexes)) {
      return
    }
    localContext = _.mergeWith(
      processField(field, system, _.partial(prepKey, improvedIndexes)),
      localContext,
      merger
    )
  })

  let values = localContext.values

  // Equipment specific
  if (system.hvac_system_equipment_type !== 'Solar Thermal') {
    if (action !== 'install') {
      if (omIdx.baseHeatIndex) values['BaseHeatType' + omIdx.baseHeatIndex] = hvacSystemVal('heat')
      if (omIdx.baseCoolIndex) values['BaseCoolingType' + omIdx.baseCoolIndex] = hvacSystemVal('cool')
    }
    if (action !== 'replace') {
      if (omIdx.improvedHeatIndex) values['ImpHeatType' + omIdx.improvedHeatIndex] = hvacSystemVal('heat')
      if (omIdx.improvedCoolIndex) values['ImpCoolingType' + omIdx.improvedCoolIndex] = hvacSystemVal('cool')
    }

    // Add duct linkage
    if (omIdx.baseDuctIndex && omIdx.baseCoolIndex) {
      if (omIdx.baseHeatIndex) {
        values[`BaseCoolingDuctLink` + omIdx.baseCoolIndex] = omIdx.baseHeatIndex
      } else {
        values[`BaseCoolingDuctLink` + omIdx.baseCoolIndex] = 0
      }
    }
    if (omIdx.improvedDuctIndex && omIdx.improvedCoolIndex) {
      if (omIdx.improvedHeatIndex) {
        values[`ImpCoolingDuctLink` + omIdx.improvedCoolIndex] = omIdx.improvedHeatIndex
      } else {
        values[`ImpCoolingDuctLink` + omIdx.improvedCoolIndex] = 0
      }
    }
  }

  if (action === 'keep') {
    const ductKey = omIdx.baseHeatIndex ? `ImpHeatSystem${omIdx.baseHeatIndex}` : `ImpCoolingSystem${omIdx.baseCoolIndex}`
    values[ductKey] = KEEP_SYSTEM_CONSTANTS[equipment]
    if (equipment === 'Furnace / Central AC (shared ducts)') {
      values[`ImpCoolingSystem${omIdx.baseCoolIndex}`] = 187299999999
    }
  }

  function hvacSystemVal(heatOrCool: 'heat' | 'cool') {
    if (system.hvac_system_equipment_type === 'Furnace / Central AC (shared ducts)') {
      if (heatOrCool === 'heat') {
        return 'Furnace'
      } else {
        return 'Central Air Conditioner'
      }
    }
    return omFieldVal('hvac', 'hvac_system_equipment_type', system)
  }

  addYears(system, omIdx, values)

  addFixed(system, omIdx, values)

  return validateSystem(system, fields, omIdx, localContext)
}

// Validate everything about the system is good to go before submitting.
function validateSystem(system, fields, indexes, localContext) {
  const {hasBase, hasDucts, hasImproved} = indexes
  const {uuid} = system

  if (hasDucts) {
    let ductError = {
      component: 'DuctsValidation',
      uuid
    }
    let messages = []

    if (
      hasBase && !allOrNoDucts(system, 'base') ||
      hasImproved && !allOrNoDucts(system, 'improved')
    ) {
      messages.push('All duct fields must be filled out or all of them must be left blank')
    }

    const [err] = validator.runSync(system)
    if (err) {
      _.forEach(err.errors, (e, key) => {
        messages.push(e.message)
      })
    }

    if (messages.length > 0) {
      ductError.message = messages.join(', ')
      localContext.errors.push(ductError)
    }
  }
  return localContext
}

function allOrNoDucts(system, baseOrImp: 'base' | 'improved') {
  const suffix = baseOrImp === 'improved' ? '_improved' : ''
  return _.uniq(_.map(['hvac_duct_location', 'hvac_duct_leakage', 'hvac_duct_insulation'], (item) => {
    return isBlank(system[`${item}${suffix}`])
  })).length === 1
}

function isBlank(val) {
  return val === undefined || val === '' || val === null
}

function addYears(system, {baseHeatIndex, baseCoolIndex}, values) {
  if (baseHeatIndex) {
    if (system.hvac_heating_system_model_year) {
      const age = getYearDiff(system.hvac_heating_system_model_year)
      if (_.isNumber(age)) {
        values[`A1BaseHeatAge${baseHeatIndex}`] = age
      } else {
        values[`A1BaseHeatAge${baseHeatIndex}`] = "Don't Know"
      }
    }
  }
  if (baseCoolIndex) {
    if (system.hvac_cooling_system_model_year) {
      const age = getYearDiff(system.hvac_cooling_system_model_year)
      if (_.isNumber(age)) {
        values[`A1BaseCoolingYear${baseCoolIndex}`] = age
      } else {
        values[`A1BaseCoolingYear${baseCoolIndex}`] = "Don't Know"
      }
    }
  }
}

function addFixed(system, omIdx, values) {
  switch (system.hvac_system_equipment_type) {
    case 'Solar Thermal': {
      if (omIdx.hasBase) values[`A1BaseHeatFuel${omIdx.baseHeatIndex}`] = 'Solar'
      if (omIdx.hasImproved) values[`ImpHeatFuel${omIdx.improvedHeatIndex}`] = 'Solar'
      break;
    }
    case 'Ductless Heat Pump':
    case 'Electric Resistance':
    case 'Central Heat Pump (shared ducts)': {
      if (omIdx.hasBase) values[`A1BaseHeatFuel${omIdx.baseHeatIndex}`] = 'Elec'
      if (omIdx.hasImproved) values[`ImpHeatFuel${omIdx.improvedHeatIndex}`] = 'Elec'
      break;
    }
  }
}

function getYearDiff(age) {
  if (!age) return
  age = _.isNumber(age) ? age : parseInt(age, 10)
  if (!_.isNaN(age) && age > 1900) {
    return new Date().getFullYear() - age
  }
}
