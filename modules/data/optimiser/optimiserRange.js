import type {fieldDefinitionType} from 'data/flowtypes'
import type {omContextType, rangeType} from './optimiser-types'
import {optimiserCollection} from './optimiser-helpers'

export default function optimiserRange(
  context: omContextType,
  range: Array<rangeType>,
  fields: Array<fieldDefinitionType>
) {
  return optimiserCollection('range', context, fields, range)
}

