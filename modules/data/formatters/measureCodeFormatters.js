import measureCodes from '../../../constants/custom-program-rec-definitions'
import _ from 'lodash'

export function getMeasureCode(progamId, code) {
  return measureCodes.find(measureCode => measureCode.programId === progamId && measureCode.code === code)
}

export function measureCodeOptions(progamId) {
  let codes = _.sortBy(measureCodes, measureCode => measureCode.title)
               .filter(measureCode => measureCode.programId === progamId)
  return [{value: '', label: ''}].concat(codes.map(measureCode => ({
    value: measureCode.code,
    label: measureCode.title
  })))
}

