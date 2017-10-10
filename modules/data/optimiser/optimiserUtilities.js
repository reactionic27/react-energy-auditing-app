import _ from 'lodash'
import moment from 'moment'
import type {omContextType, utilitiesType} from './optimiser-types'
import {returnContext, omFieldVal} from './optimiser-helpers'

export default function optimiserUtilsFormatter(
  context: omContextType,
  utilities: utilitiesType
) {
  function val(column, fallback) {
    return omFieldVal('utilities', column, utilities)
  }

  let errors = []
  let values = {
    UtilitySupplierElec: val('electric_utility_provider_name') || 'N/A',
    UtilitySupplierFuel: val('fuel_utility_provider_name') || 'N/A',
    UtilityFuelAcctNo: val('fuel_account_number') || 'N/A',
    UtilityElecAcctNo: val('electric_account_number') || 'N/A',
  }

  if (utilities.primary_heating_fuel_type !== 'Electricity') {
    values.A1UtilityFuelType1 = val('primary_heating_fuel_type')
  }

  // Detailed
  if (utilities.bill_entry_type === 'Detailed') {
    values = {
      ...values,
      ...detailedBills(val, errors)
    }
  }

  // Simple
  else if (utilities.bill_entry_type === 'Simple') {
    values = {
      ...values,
      ...simpleBills(val, errors)
    }
  }

  return returnContext('utilities', context, {values, errors})
}

function detailedBills(val, errors: Array) {
  let values = {
    A1UseFullBills: 'TRUE',
    A1ElecBillUnits: val('electric_bill_units') || 'kWh',
  }

  function toOMDate(column) {
    let value = moment.utc(val(column)).format('MM-DD-YYYY')
    if (value === '00-00-0000') {
      console.warn(`Invalid date value 00-00-0000 for ${column}`)
      return null
    }
    return value
  }

  if (_.isDate(val('start_electric_date_1'))) {
    values.A1ElecMonth0Date = toOMDate('start_electric_date_1')
  }

  if (val('primary_heating_fuel_type') !== 'Elec') {
    values.A1FuelBillUnits = val('fuel_bill_units') || 'Therms'
    if (_.isDate(val('start_fuel_date_1'))) {
      values.A1GasMonth0Date = toOMDate('start_fuel_date_1')
    }
  }

  for (var i = 1; i <= 12; i++) {
    if (_.isDate(val(`end_electric_date_${i}`))) {
      values[`A1ElecMonth${i}Date`] = toOMDate(`end_electric_date_${i}`)
      values[`A1ElecMonth${i}Usage`] = val(`end_electric_bill_${i}`)
    }

    const primaryHeatFuel = val('primary_heating_fuel_type')

    if (
      primaryHeatFuel !== 'Elec' && _.isDate(val(`end_fuel_date_${i}`))
    ) {
      values[`A1GasMonth${i}Date`] = toOMDate(`end_fuel_date_${i}`)
      values[`A1GasMonth${i}Usage`] = val(`end_fuel_bill_${i}`)
    }
  }
  return values
}

function simpleBills(val) {
  const result = {
    A1UseFullBills: 'FALSE',
    A1ElecBillUnits: 'Dollars',
    A1MaxCoolBill: val('highest_monthly_summer_electric_bill'),
    A1MinElecBill: val('lowest_monthly_electric_bill'),
  }
  switch (val('primary_heating_fuel_type')) {
    case 'Elec': {
      return {
        ...result,
        A1MaxHeatBillUnits: 'Dollars',
        A1MaxHeatBillPeriod: 'Month',
        A1MaxHeatBill: val('highest_monthly_winter_electric_bill'),
      }
    }
    case 'Gas': {
      return {
        ...result,
        A1MaxHeatBillUnits: 'Dollars',
        A1MaxHeatBillPeriod: 'Month',
        A1MaxHeatBill: val('highest_monthly_winter_natural_gas_bill'),
        A1MinGasBill: val('lowest_monthly_natural_gas_bill'),
      }
    }
    case 'Pellets':
    case 'Wood':
      return {
        ...result,
        A1MaxHeatBillUnits: val('simple_fuel_units') || 'Dollars',
        A1MaxHeatBillPeriod: 'Year',
        A1MaxHeatBill: val('total_simple_fuel_used_in_last_12_months'),
      };
    case 'Fuel Oil':
    case 'Propane': {
      return {
        ...result,
        A1MaxHeatBillUnits: val('simple_fuel_units') || 'Dollars',
        A1MaxHeatBillPeriod: 'Year',
        A1MaxHeatBill: val('total_simple_fuel_used_in_last_12_months'),
      };
    }
  }
}
