// == HPXML Type Mappings ======================================================
// See HPXML data types: http://hpxmlwg.github.io/hpxml/schemadoc/hpxml-2.1.0/index.html
// These are mappings between our values and expected HPXML values
import {lowerCase} from 'lodash'
import isTruthyFalseOrZero from 'util/isTruthyFalseOrZero'

export function booleanType(val) {
  if (!isTruthyFalseOrZero(val)) return val;
  switch (lowerCase(val)) {
    case true:
    case 'true':
    case 'yes': return 'true'
    case false:
    case 'false':
    case 'no': return 'false'
    default: return alertSentryOfBadXMLTypes(val)
  }
}

export function testResultType(val) {
  if (!isTruthyFalseOrZero(val)) return val;
  switch (lowerCase(val)) {
    case 'passed': return 'passed'
    case 'fail': return 'failed'
    case 'not tested': return 'not tested'
    default: return alertSentryOfBadXMLTypes(val)
  }
}

export function fuelType(val) {
  if (!isTruthyFalseOrZero(val)) return val;
  switch (lowerCase(val)) {
    case 'electricity': return 'electricity'
    case 'natural gas': return 'natural gas'
    case 'fuel oil': return 'fuel oil'
    case 'solar hot water': return 'solar hot water'
    case 'propane': return 'propane'
    case 'wood': return 'wood'
    case 'wood pellets': return 'wood pellets'
    default: return alertSentryOfBadXMLTypes(val)
  }
}

function alertSentryOfBadXMLTypes(val) {
  console.log('TODO: Alert Sentry')
  return null
}
