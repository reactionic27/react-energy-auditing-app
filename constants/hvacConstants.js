import _ from 'lodash'
import {IMPROVED_DUCK_LEAKAGE_OPTIONS} from './field-definitions/fields-hvac'

export const EQUIPMENT_OPTIONS = [
  '',
  {'Heating Only': [
    'Boiler',
    'Furnace with standalone ducts',
    'Electric Resistance',
    'Direct Heater',
    'Stove or Insert',
    'Solar Thermal',
  ]},
  {'Cooling Only': [
    'Central AC with standalone ducts',
    'Room AC',
    'Evaporative Cooler - Direct',
    'Evaporative Cooler - Ducted',
  ]},
  {'Both Heating & Cooling': [
    'Ductless Heat Pump',
    'Central Heat Pump (shared ducts)',
    'Furnace / Central AC (shared ducts)',
  ]}
]

export const initialFields = [{
  field: 'System Name',
  placeholder: 'Name this system',
  size: 5
}, {
  field: 'System Equipment Type',
  options: EQUIPMENT_OPTIONS,
  size: 5,
  type: 'Select'
}, {
  field: 'Upgrade action',
  size: 6,
  type: 'Select'
}]

const INVERTER = [{
  field: 'Heat Pump Inverter',
  label: 'Has Inverter or Variable Speed Drive?',
  type: 'Radio',
  mirrorUpgrade: true
}]

// Start out with all of the fields that can potentially exist for HVACS
// and any default / fixed values.
const HEATING_FIELDS = [{
  label: 'Fuel Type',
  field: 'Heating Energy Source',
  type: 'Select',
  mirrorUpgrade: true,
  options: [
    "",
    "None",
    "Electricity",
    "Natural Gas",
    "Propane",
    "Fuel Oil",
    "Pellets",
    "Wood",
    "Solar",
    "Don't Know"
  ]
}, {
  field: '% of Total Heating Load',
  label: 'Load Percentage',
  mirrorUpgrade: true,
}, {
  label: 'Model Year',
  field: 'Heating System Model Year'
}, {
  label: 'System Efficiency',
  field: 'Heating System Efficiency',
  lockMessage: 'This field is calculated when the job is modeled, only edit this field if you know what you\'re doing',
  suffix: 'AFUE',
  validate: 'gte:1|lte:500'
}, {
  field: 'Heating Capacity',
  label: 'Output Capacity',
  suffix: 'BTU/h',
}, {
  label: 'Manufacturer',
  field: 'Heating System Manufacturer'
}, {
  label: 'Model #',
  field: 'Heating System Model',
}]

const COOLING_FIELDS = [{
  field: '% of Total Cooling Load',
  label: 'Load Percentage',
}, {
  field: 'Cooling System Model Year',
  label: 'Model Year',
}, {
  label: 'System Efficiency',
  field: 'Cooling System Efficiency',
  lockMessage: 'This field is calculated when the job is modeled, only edit this field if you know what you\'re doing',
  suffix: 'SEER'
}, {
  field: 'Cooling Capacity',
  label: 'Cooling Capacity',
}, {
  field: 'Cooling System Manufacturer',
  label: 'Manufacturer'
}, {
  field: 'Cooling System Model',
  label: 'Model #'
}]

const NON_MEASURED = IMPROVED_DUCK_LEAKAGE_OPTIONS.filter(f => f.displayValue !== "50% Reduction")

const DUCTS = [{
  label: 'Duct Location',
  field: 'Duct Location'
}, {
  label: 'Leakage',
  field: 'Duct Leakage',
  mirrorUpgrade: true,
  improvedOptions(state, props) {
    const hvac = state.fn.hvacByUuidJS(props.uuid)
    if (hvac.hvac_duct_leakage === 'Measured (CFM25)') {
      return IMPROVED_DUCK_LEAKAGE_OPTIONS
    }
    return NON_MEASURED
  }
}, {
  label: 'Leakage Value',
  field: 'Duct Leakage Value',
}, {
  label: 'Insulation',
  field: 'Duct Insulation',
}, {
  label: 'Insulation Value',
  field: 'Duct Insulation Value'
}, {
  label: 'Duct Efficiency',
  field: 'Duct Efficiency',
  disabled: true
}]

export const HVAC_SECTIONS = {
  'Boiler': {
    heating: HEATING_FIELDS.map(fuelTypes(f => f !== 'Electricity'))
  },
  'Furnace with standalone ducts': {
    heating: HEATING_FIELDS,
    ducts: DUCTS
  },
  'Electric Resistance': {
    heating: HEATING_FIELDS.filter(removeHeatSource)
  },
  'Direct Heater': {
    heating: HEATING_FIELDS.map(fuelTypes(['', 'Natural Gas', 'Propane', 'Electricity']))
  },
  'Stove or Insert': {
    heating: HEATING_FIELDS.map(fuelTypes(['', 'Wood', 'Pellets']))
  },
  'Solar Thermal': {
    heating: HEATING_FIELDS.filter(f => {
      return !_.includes(['Heating System Efficiency', 'Heating Energy Source'], f.field)
    })
  },
  'Room AC': {
    cooling: COOLING_FIELDS.map(eerSuffix)
  },
  'Evaporative Cooler - Direct': {
    cooling: COOLING_FIELDS.map(eerSuffix)
  },
  'Central AC with standalone ducts': {
    cooling: COOLING_FIELDS,
    ducts: DUCTS
  },
  'Evaporative Cooler - Ducted': {
    cooling: COOLING_FIELDS.map(eerSuffix),
    ducts: DUCTS
  },
  'Furnace / Central AC (shared ducts)': {
    heating: HEATING_FIELDS,
    cooling: COOLING_FIELDS,
    ducts: DUCTS
  },
  'Central Heat Pump (shared ducts)': {
    heating: INVERTER.concat(HEATING_FIELDS).filter(removeHeatSource).map(hspfSuffix),
    cooling: COOLING_FIELDS.filter(removeSystemInfo),
    ducts: DUCTS
  },
  'Ductless Heat Pump': {
    heating: INVERTER.concat(HEATING_FIELDS).filter(removeHeatSource).map(hspfSuffix),
    cooling: COOLING_FIELDS.filter(removeSystemInfo)
  }
}

function removeHeatSource(f) { return f.field !== 'Heating Energy Source' }

export const ALL_FIELDS = INVERTER
  .concat(HEATING_FIELDS)
  .concat(COOLING_FIELDS)
  .concat(DUCTS)

function removeSystemInfo(entry) {
  const systemInfoFields = [
    'Cooling System Manufacturer',
    'Cooling System Model',
    'Cooling System Model Year'
  ]
  if (systemInfoFields.indexOf(entry.field) !== -1) {
    return false
  }
  return true
}

// Helpers to modify the hvac constants as necessary.

function hspfSuffix(entry) {
  if (entry.field === 'Heating System Efficiency') {
    return {
      ...entry,
      suffix: 'HSPF',
      validate: 'gte:1|lte:25'
    }
  }
  return entry
}
function eerSuffix(entry) {
  if (entry.field === 'Cooling System Efficiency') {
    return {
      ...entry,
      suffix: 'EER'
    }
  }
  return entry
}
function fuelTypes(options: Function | Array<string>) {
  return function(entry) {
    if (entry.field !== 'Heating Energy Source') {
      return entry
    }
    if (typeof options === 'function') {
      return {
        ...entry,
        options: entry.options.filter(options)
      }
    }
    return {
      ...entry,
      options
    }
  }
}
