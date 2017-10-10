import _ from 'lodash'

export default function calculateTotals(parsedData: Object) {
  return _.transform(TOTALS_DICTIONARY, (acc, path, key) => {
    var responseVal = parseFloat(_.get(parsedData, path));
    if (_.isNaN(responseVal)) responseVal = null;
    if (key.indexOf('percent') !== -1) responseVal = responseVal * 100;
    acc[key] = responseVal
  });
}

// The paths to lookup each of the "totals" values.
const TOTALS_DICTIONARY = {
  total_savings: ['SelectionTableGroup', 'Selected', 'SavedUSD'],
  installed_costs: ['SelectionTableGroup', 'Selected', 'CostUSD'],
  sir: ['SelectionTableGroup', 'Selected', 'SIRNet'],
  mirr: ['SelectionTableGroup', 'Selected', 'MIRR3Net'],
  payback_years: ['SelectionTableGroup', 'Selected', 'PaybackYrs'],
  total_co2_tons_base: ['SelectionTableGroup', 'Current', 'TotalCO2T'],
  total_co2_tons: ['SelectionTableGroup', 'Selected', 'TotalCO2T'],
  saved_kwh: ['SelectionTableGroup', 'Selected', 'SavedkWh'],
  saved_kwh_percent: ['SelectionTableGroup', 'Selected', 'SavedKWhPct'],
  saved_co2_tons: ['SelectionTableGroup', 'Selected', 'SavedCO2T'],
  saved_co2_percent: ['SelectionTableGroup', 'Selected', 'SavedCO2Pct'],
  saved_mbtu: ['SelectionTableGroup', 'Selected', 'SavedMBtu'],
  mbtu_base: ['SelectionTableGroup', 'Current', 'TotalMBtu'],
  mbtu_improved: ['SelectionTableGroup', 'Selected', 'TotalMBtu'],
  saved_mbtu_percent: ['SelectionTableGroup', 'Selected', 'SavedMBtuPct'],
  yearly_energy_cost: ['SelectionTableGroup', 'Current', 'TotalUSD'],
  yearly_energy_cost_improved: ['SelectionTableGroup', 'Selected', 'TotalUSD'],
  annual_electric_kWh_used: ['SelectionTableGroup', 'Current', 'EleckWh'],
  annual_electric_kWh_improved: ['SelectionTableGroup', 'Selected', 'EleckWh'],
  annual_electric_dollars_spent: ['SelectionTableGroup', 'Current', 'ElecUSD'],
  annual_electric_dollars_improved: ['SelectionTableGroup', 'Selected', 'ElecUSD'],
  annual_fuel_therms_used: ['SelectionTableGroup', 'Current', 'FuelTherms'],
  annual_fuel_therms_improved: ['SelectionTableGroup', 'Selected', 'FuelTherms'],
  annual_fuel_therms_saved: ['SelectionTableGroup', 'Selected', 'SavedTherms'],
  annual_fuel_dollars_spent: ['SelectionTableGroup', 'Current', 'FuelUSD'],
  annual_fuel_dollars_improved: ['SelectionTableGroup', 'Selected', 'FuelUSD']
};

