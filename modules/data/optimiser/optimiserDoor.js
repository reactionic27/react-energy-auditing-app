import type {fieldDefinitionType} from 'data/flowtypes'
import type {omContextType, doorType} from './optimiser-types'
import {optimiserCollection} from './optimiser-helpers'

export default function optimiserDoor(
  context: omContextType,
  door: Array<doorType>,
  fields: Array<fieldDefinitionType>
) {
  return optimiserCollection('door', context, fields, door)
}

