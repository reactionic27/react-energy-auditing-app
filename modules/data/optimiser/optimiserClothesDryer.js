import type {fieldDefinitionType} from 'data/flowtypes'
import type {omContextType, clothesDryerType} from './optimiser-types'
import {optimiserCollection} from './optimiser-helpers'

export default function optimiserClothesDryer(
  context: omContextType,
  clothesDryer: Array<clothesDryerType>,
  fields: Array<fieldDefinitionType>
) {
  return optimiserCollection('clothes_dryer', context, fields, clothesDryer)
}

