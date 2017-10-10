import Value from 'util/value'
import Immutable from 'immutable'
import moment from 'moment'
import _ from 'lodash'

// ========= Utility bills ==============================
// TODO:
// job 5 has fuel_detailed_units:  201, which in the options table is Propane
// Is this something I did previously with that override/hack?
// console.log('fuel_detailed_units: ', util.get('fuel_detailed_units'))
// console.log('detailedFuelSuffix: ', util.detailedFuelSuffix())
function addUtilityBillData(component) {
  var util = component.state.utilities
  var primaryFuel = util.getDisplayValue('fuel_primary_type')
  var electricLabel = Immutable.Map({blockLabel: 'Electricity'})
  var fuelLabel = Immutable.Map({blockLabel: 'Primary Fuel' + (primaryFuel && `: ${primaryFuel}`)})
  var electricRows = Immutable.List()
  var fuelRows = Immutable.List()

  if (util.get('electric_name')) {
    electricRows = electricRows.push({label: 'Provider', value: util.get('electric_name')})
  }
  if (util.get('electric_account_number')) {
    electricRows = electricRows.push({label: 'Account Number', value: util.get('electric_account_number')})
  }
  if (util.get('fuel_name')) {
    fuelRows = fuelRows.push({label: 'Provider', value: util.get('fuel_name')})
  }
  if (util.get('fuel_account_number')) {
    fuelRows = fuelRows.push({label: 'Account Number', value: util.get('fuel_account_number')})
  }

  if (util.isDetailed()) {
    electricRows = electricRows.push(addDetailedBills(util, 'electric')).flatten()
    fuelRows = fuelRows.push(addDetailedBills(util, 'fuel')).flatten()
  }
  if (util.isSimple()) {
    electricRows = electricRows.push(addSimpleElectric(util)).flatten()
    fuelRows = fuelRows.push(addSimpleFuel(util)).flatten()
  }
  var electric = electricRows.size > 0 ? electricLabel.set('rows', electricRows).toJS() : null
  var fuel = fuelRows.size > 0 ? fuelLabel.set('rows', fuelRows).toJS() : null
  return Immutable.List.of(electric, fuel)
}

function addDetailedBills(util, type) {
  var rows = Immutable.List()
  Immutable.Range(1, 13).forEach(index => {
    var label = util.get(`${type}_date_${index}`)
    var value = util.get(`${type}_value_${index}`)
    if (label || value) {
      rows = rows.push({
        label: formatDate(label),
        value: value + `<small> ${util.detailedSuffix(type)}</small>`
      })
    }
  })
  return rows
}

function addSimpleElectric(util) {
  var rows = Immutable.List()
  var high = util.get('simple_electric_high')
  var low = util.get('simple_electric_low')
  if (high) {
    rows = rows.push({label: 'Highest monthly summer electric bill', value: high})
  }
  if (low) {
    rows = rows.push({label: 'Lowest monthly electric bill', value: low})
  }
  if (util.fuelIsElectric()) {rows = rows.push({label: 'Highest monthly winter electric bill', value: util.get('simple_electric_winter')}) }
  return rows
}

function addSimpleFuel(util) {
  var rows = Immutable.List()
  var simpleSuffix = util.simpleSuffix()
  simpleSuffix = simpleSuffix ? `<small>${simpleSuffix}</small>` : ''
  if (util.fuelIsOil()) {
    var oil = util.get('simple_fuel_total_12')
    if (oil) {rows = rows.push({label: 'Total oil used in last 12 months', value: `${oil} ${simpleSuffix}`})}
  }
  if (util.fuelIsNaturalGas()) {
    var high = util.get('simple_fuel_gas_high')
    var low = util.get('simple_fuel_gas_low')
    if (high) {rows = rows.push({label: 'Highest monthly winter natural gas bill', value: `${high} ${simpleSuffix}`})}
    if (low)  {rows = rows.push({label: 'Lowest monthly natural gas bill', value: `${low} ${simpleSuffix}`})}
  }
  if (util.fuelIsPropane()) {
    var propane = util.get('simple_fuel_total_12')
    if (propane)  {rows = rows.push({label: 'Total propane used in last 12 months', value: `${propane} ${simpleSuffix}`})}
  }
  return rows
}


// ========= Helper function ===================================================
function formatLineLabel(label, index) {
  return label.replace(/%{n}/, index)
}

function formatValue(val, field) {
  if (unformattedValues.contains(field.get('label'))) return val
  var decimals = field.get('decimals')
  var suffix = field.get('suffix')
  if (!decimals && !suffix) return val
  suffix = suffix === '#' ? '' : ` <small>${suffix}</small>`
  return new Value(val).d(decimals).suffix(suffix).toString()
}

function formatDate(val) {
  if (_.isDate(val)) {
    return moment(val).format('MMM DD, YYYY')
  } else {
    return '-'
  }
}
