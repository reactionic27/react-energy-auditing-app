import firstChild from './firstChild'
import moment from 'moment'
import {INTEGER_TEST, POSITIVE_INTEGERS_ONLY} from './regexTests'
import _ from 'lodash'

// These must return true, otherwise they're considered failing
let VALIDATION_RULES = {
  required(v) {
    return Boolean(v)
  },
  decimals(v, digits) {
    return decimalsWithinLimits(v, digits)
  },
  lte(v, lte) {
    return parseFloat(v) <= parseFloat(lte)
  },
  gte(v, gte) {
    return parseFloat(v) >= parseFloat(gte)
  },
  integer(v) {
    return INTEGER_TEST.test(v)
  },
  maxLength(v, len) {
    return String(v).length <= len
  },
  minLength(v, len) {
    return String(v).length >= len
  },
  minDate(v, min) {
    if (v === '0000-00-00') return false
    return !moment(v).isBefore(min)
  },
  maxDate(v, max) {
    if (v === '0000-00-00') return false
    return !moment(v).isAfter(max)
  },
  setpoints(val) {
    val = parseInt(val, 10)
    if (_.isNaN(val)) {
      return true
    }
    return val >= 50 && val <= 90
  }
}

let VALIDATE_MESSAGES = {
  integer: 'should be an integer',
  decimals: 'should be a number with up to %s decimal places',
  lte: 'should be less than or equal to %s',
  gte: 'should be greater than or equal to %s',
  maxLength: 'should be at most %s characters',
  minLength: 'should be at least %s characters',
  minDate: 'should be at least %s',
  maxDate: 'should be at most %s',
  setpoints: 'should be between 50 and 90 degrees',
  required: 'is required'
}

export function decimalsWithinLimits(val, allowedDecimals) {
  // Integers pass because decimals aren't required. Handle cases like 0.5 with min/max
  if (INTEGER_TEST.test(val)) {
    return true
  }
  if (String(val).indexOf('.') !== -1) {
    const enteredDecimals = String(val).split('.')[1].length
    return enteredDecimals > allowedDecimals ? false : true
  } else {
    return false
  }
}

export default function simpleValidator(label, validate: string, value: any) {
  const rules = validate.split('|')
  if (isEmptyVal(value) && !_.includes(rules, 'required')) return;
  const errorItems = rules
    .map(rule => {
      let argIndex = 0, [ruleFn, ...rest] = rule.split(':')
      if (VALIDATION_RULES[ruleFn]) {
        if (!VALIDATION_RULES[ruleFn](value, ...rest)) {
          return VALIDATE_MESSAGES[ruleFn].replace(/%s/g, function() { return rest[argIndex++]; })
        }
      } else {
        console.warn(`Missing rule ${rule} for field ${label}`)
      }
    })
    .filter(f => f)
  if (errorItems.length > 0) {
    return `${formatLabel(label)} ${errorItems[0]}.`
  }
}

function isEmptyVal(value) {
  return value === '' || value === null || value === undefined
}

function formatLabel(label) {
  if (typeof label === 'string') return label
  if (typeof label === 'object') return firstChild(label.props)
  return 'this'
}
