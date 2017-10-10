import type {fieldDefinitionType} from 'data/flowtypes'
import type {omContextType, dhwType} from './optimiser-types'
import {optimiserCollection} from './optimiser-helpers'

function castNumber(num) {
  return isNaN(+num) ? 0 : +num
}

export default function optimiserDhw(
  context: omContextType,
  dhw: Array<dhwType>,
  fields: Array<fieldDefinitionType>
) {
  let values = {}
  let errors = []

  if (dhw.length === 1) {
    values.BaseDHWPct1 = 100
  } else if (dhw.length > 1) {
    let dhwTotal = 0
    dhw.forEach(d => {
      dhwTotal += castNumber(d.dhw_percent_load)
    })
    if (dhwTotal !== 100) {
      errors.push({
        component: 'PercentDhwTable'
      })
    }
  }
  return optimiserCollection('dhw', context, fields, dhw, {values, errors})
}

