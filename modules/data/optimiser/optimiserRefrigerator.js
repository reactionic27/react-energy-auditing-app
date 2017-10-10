import type {fieldDefinitionType} from 'data/flowtypes'
import type {omContextType, refrigeratorType} from './optimiser-types'
import {optimiserCollection} from './optimiser-helpers'

export default function optimiserRefrigerator(
  context: omContextType,
  refrigerator: Array<refrigeratorType>,
  fields: Array<fieldDefinitionType>
) {
  return optimiserCollection('refrigerator', context, fields, refrigerator)
}

