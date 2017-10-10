import Immutable, {Map as IMap} from 'immutable'
import moment from 'moment'
import Value from 'util/value'
import _ from 'lodash'


// Utilities
// ----------

export const suffixByType = (utilities: IMap, type: string): string => {
  return utilities.get(`${type}_bill_units`) || 'Choose Units'
}

const utilDateFormat = 'YYYY-MM-DD'
export const minUtilDate = moment('2005-01-01', utilDateFormat).format(utilDateFormat)
export const maxUtilDate = (index: number): string => {
  return moment().format(utilDateFormat)
}


// http://www.convertunits.com/from/therm+[U.S.]/to/gallon+[U.S.]+of+LPG
// http://www.convertunits.com/from/gallon+[U.S.]+of+residual+fuel+oil/to/therm+[U.S.]
// https://snuggpro.com/help/article/fuel-conversion
// TODO: karma tests
// 1 cord of wood: 20,000,000 BTUs
// 100,000 BTUs/therm
// 1 ton of pellets: 16,500,000 BTUs
export function thermConversion(therms: number | string, fuelType: ?string): string {
  const thermNumber = parseFloat(therms)
  if (!_.isNumber(thermNumber)) {
    return 'N/A'
  }
  switch (fuelType) {
    case 'Propane': return new Value(therms * 1.047).d(0).else('N/A').toString()
    case 'Fuel Oil': return new Value(therms * 0.667).d(0).else('N/A').toString()
    case 'Natural Gas': return new Value(therms).d(0).else('N/A').toString()
    case 'Wood': return new Value(therms * 0.00606).d(2).else('N/A').toString()
    case 'Pellets': return new Value(therms * 0.005).d(2).else('N/A').toString()
    case 'Electricity': return ''
    case 'Solar': return ''
    default: return 'N/A'
  }
}


export function fuelUnits(fuelType: ?string): string {
  switch (fuelType) {
    case 'Propane': return 'gallons'
    case 'Fuel Oil': return 'gallons'
    case 'Natural Gas': return 'therms'
    case 'Electricity': return 'kWh'
    case 'Wood': return 'cords'
    case 'Pellets': return 'tons'
    case 'Solar': return ''
    default: return ''
  }
}

export function canConvertFuelToTherms(fuelType: ?string): boolean {
  if (fuelType === 'Natural Gas') {
    return false // fuel already in therms
  }
  return _.includes(['Fuel Oil', 'Propane', 'Wood', 'Pellets'], fuelType)
}


// == Date Difference warnings next to detailed bills ==========================
export function dateDiffMessage(utilities, type) {
  return Immutable.Range(0, 13)
    .map(index => (index === 0) ? `start_${type}_date_1` : `end_${type}_date_${index}`)
    .map(field => moment(utilities.get(field)))
    .reduce(getDateDiffMessage, [])
    .map(o => { return {message: o.message, messageType: o.messageType} })
}

function getDateDiffMessage(acc, mDate, index) {
  if (index === 0) return acc.concat({date: mDate, message: '--', messageType: 'info'})

  // If the previous date isn't valid, we can't show a difference in days
  let prev = acc[index - 1]
  if (!prev.date.isValid()) {
    return acc.concat({date: mDate, message: '--', messageType: 'info'})
  }

  // If date component has no date entered, don't show a warning but let them know
  if (mDate._i === '0000-00-00' || mDate._i === '0000-00-00 00:00:00') {
    return acc.concat({date: mDate, message: '--', messageType: 'info'})
  }

  // If year is out of range
  if (mDate.year() < 2005 || mDate.year() > moment().year()) {
    return acc.concat({date: mDate, message: 'Invalid Year', messageType: 'warning'})
  }

  // If this row's date isn't valid, let the user know.
  if (!mDate.isValid()) {
    return acc.concat({date: mDate, message: 'Invalid Date', messageType: 'warning'})
  }

  // Otherwise, both prev date and this date is valid, so show difference
  let diff = mDate.diff(prev.date, 'days') || '?'
  let messageType = (diff >= 35 || diff <= 25) ? 'warning' : 'info'
  return acc.concat({date: mDate, message: diff + " days", messageType: messageType})
}
