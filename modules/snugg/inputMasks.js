//import createNumberMask from 'text-mask-addons/dist/createNumberMask.js'
import createNumberMask from 'snugg/createNumberMask'
export const integerMask = createNumberMask({prefix: '', suffix: '', allowNegative: true})

export const positiveIntegerMask = createNumberMask({prefix: '', suffix: '', allowNegative: false})

// Allow numeric inputs (including decimals) and bring up correct keyboard
export const numericMask = createNumberMask({prefix: '', suffix: '', allowDecimal: true, allowNegative: true})
export const createNumericMask = (decimalLimit) => {
  return createNumberMask({
    decimalLimit: decimalLimit || 2,
    prefix: '', suffix: '', allowDecimal: true, allowNegative: true
  })
}

export const positiveNumericMask = createNumberMask({prefix: '', suffix: '', allowDecimal: true, allowNegative: false})
export const createPositiveNumericMask = (decimalLimit) => {
  return createNumberMask({
    decimalLimit: decimalLimit || 2,
    prefix: '', suffix: '', allowDecimal: true, allowNegative: false
  })
}

export function setpointMask(rawValue) {
  if (rawValue.length <= 2) {
    return [/\d/, /\d/]
  } else {
    return [/\d/, /\d/, '-', /\d/, /\d/]
  }
}
export const zipMask = [/\d/, /\d/, /\d/, /\d/, /\d/]

export const telephoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

export const yearMask = [/\d/, /\d/, /\d/, /\d/]

export const percentageMask = [/\d/, /\d/, /\d/]

export emailMask from 'text-mask-addons/dist/emailMask.js'
