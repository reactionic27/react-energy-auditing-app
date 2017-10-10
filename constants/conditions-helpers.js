import _ from 'lodash'
import {HVAC_SECTIONS} from './hvacConstants'
import invariant from 'fbjs/lib/invariant'
import {Map as IMap} from 'immutable'
import {upgradeAction} from '../modules/data/formatters/hvacFormatters'

export const and = _.overEvery
export const or = _.overSome
export const equals = a => b => a === b
export const notEquals = a => b => a !== b
export const includes = a => b => _.includes(a, b)
export const isEmpty = a => !Boolean(a)
export const isNotEmpty = a => Boolean(a)
export const isNotZeroOrEmpty = a => Boolean(parseFloat(a))

const hvacFieldNamesByEquipment = _.mapValues(HVAC_SECTIONS, section => {
  return _.flatMap(_.values(section), fields => _.map(fields, 'field'))
})

export function createCondition(path, fn, checkBaseOnly = false) {
  invariant(
    path.length === 3,
    'Currently only supporting createCondition with path.length === 3'
  )

  const [table, pk, column] = path
  const checkJobId = pk === '$jobId'
  const checkUuid = pk === '$uuid'

  function showIfCheck(row, props) {
    const finalColumn = (props.improved && !checkBaseOnly) ? column + '_improved' : column
    return fn(row[finalColumn])
  }

  let lastTable, lastProps, lastValue
  function memoizedCheck(lookupIdent, state, props) {
    const currentTable = state.snugg.get(table)
    if (currentTable && currentTable === lastTable && lastProps === props) {
      return lastValue
    }
    lastTable = currentTable
    lastProps = props
    return (lastValue = showIfCheck((lastTable.get(lookupIdent) || IMap()).toJS(), props))
  }

  return function conditionShowIf(state, props) {
    let lookupIdent

    if (state.fn === undefined) {
      // If state.fn is not defined, it
      // means we're processing an individual "row",
      // from data for the optimiser or csv generation
      return showIfCheck(state, props)
    }

    if (checkJobId) {
      invariant(
        props.jobId,
        `jobId is required for condition: %s, saw %s`,
        path,
        props
      )
      lookupIdent = props.jobId
    }
    if (checkUuid) {
      invariant(
        props.uuid,
        `uuid is required for condition: %s, saw %s`,
        path,
        props
      )
      lookupIdent = props.uuid
    }
    return memoizedCheck(lookupIdent, state, props)
  }
}

export function hvacCondition(config) {
  config = config || {}
  // unless explicitly false, we assume an hvac field is disabled on "keep" action
  const disableKeep = config.hasOwnProperty('disableKeep') ? config.disableKeep : true

  function showIfCheck(hvac, {improved, field}) {
    invariant(
      typeof field === 'string',
      'field (field name string) is field for hvac field props (showIf)'
    )
    const action = upgradeAction(hvac)
    const equipment = hvac.hvac_system_equipment_type
    if (action === 'keep' && improved && disableKeep === true) return false
    if (action === 'install' && !improved) return false
    if (action === 'remove' && improved) return false
    if (!hvacFieldNamesByEquipment[equipment]) return false
    return hvacFieldNamesByEquipment[equipment].indexOf(field) !== -1
  }
  return function hvacShowIf(state, props) {
    invariant(
      typeof props.uuid === 'string',
      'uuid prop is required for hvac fields'
    )
    if (state.fn === undefined) {
      return showIfCheck(state, props)
    }
    return showIfCheck(state.fn.hvacByUuidJS(props.uuid), props)
  }
}

// These are cosmetic (front-end) only, the values for the fields
// handled by the moreThanOne condition are dealt with individually in
// the optimiser build process.
export function moreThanOne(method, ident) {
  return function showIfCheck(state, props) {
    if (state.fn === undefined) {
      return true
    }
    const id = props[ident]
    invariant(
      id,
      `Missing ${ident}`
    )
    return state.fn[method](id).length > 1
  }
}
