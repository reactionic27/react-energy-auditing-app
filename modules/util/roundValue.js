import _ from 'lodash'

// Used in several places, ensures a value is rounded to the appropriate
// decimals. Also if the string is numeric, or numeric like we round that too.
export default function roundValue(value, decimals) {
  if (_.isNumber(decimals)) {
    if (!value && !_.isNumber(value)) {
      return null
    }
    if (_.isString(value) && value.indexOf(',') !== -1) {
      value = value.replace(',', '', 'g')
    }
    value = _.round(value, decimals)
    if (_.isNaN(value)) {
      return null
    }
  }
  return value
}
