import {size} from 'lodash'
import {NOT_DIGIT_TEST, NUMERIC_CHECK} from './regexTests'

export function restrictInputs(newVal, oldVal, integerOnly, decimalsAllowed) {
  // if it's not an integer or has decimals, just pass it through
  if (!integerOnly && !decimalsAllowed) {
    return newVal
  }
  switch (true) {
    // If deleting content, don't restrict. Otherwise you may not be able to delete invalid input
    case size(newVal) <= size(oldVal):
      return newVal;
    case integerOnly:
      return NOT_DIGIT_TEST.test(newVal) ? oldVal : parseInt(newVal, 10)
    case decimalsAllowed:
      if (newVal.indexOf('.') === 0) {
        return newVal
      }
      if (!NUMERIC_CHECK.test(newVal)) {
        return oldVal
      }
      return parseFloat(newVal)
    default:
      console.log('restrictInputs: we hit an unknown case. Investigate')
      return newVal
  }
}

export function areDecimalsAllowed(props) {
  if (props.fieldDefinition) {
    const decimals = props.fieldDefinition.decimals
    return decimals > 0
  } else {
    return props.__type === 'number'
  }
}

export function isIntegerOnly(props) {
  if (props.fieldDefinition) {
    const decimals = props.fieldDefinition.decimals
    return decimals === 0
  } else {
    const {__type, inputMode} = props
    return __type === 'number' && inputMode !== 'numeric'
  }
}
