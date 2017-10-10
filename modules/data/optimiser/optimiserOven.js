import type {fieldDefinitionType} from 'data/flowtypes'
import type {omContextType, ovenType} from './optimiser-types'
import {optimiserCollection} from './optimiser-helpers'

export default function optimiserOven(
  context: omContextType,
  oven: Array<ovenType>,
  fields: Array<fieldDefinitionType>
) {
  return optimiserCollection('oven', context, fields, oven)
}

