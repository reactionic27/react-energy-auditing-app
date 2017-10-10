import type {fieldDefinitionType} from 'data/flowtypes'
import type {omContextType, freezerType} from './optimiser-types'
import {optimiserCollection} from './optimiser-helpers'

export default function optimiserFreezer(
  context: omContextType,
  freezer: Array<freezerType>,
  fields: Array<fieldDefinitionType>
) {

  let errors = []
  let freezerCount = freezer.length

  if (freezerCount > 3) {
    errors.push({
      section: 'freezer',
      message: `Freezer count is ${freezerCount}, only the first 3 will be modeled.`,
      type: 'warning'
    })
    freezerCount = 3
    freezer = freezer.slice(0, 3)
  }

  return optimiserCollection('freezer', context, fields, freezer, {
    values: {
      A1BaseFreezerCount: freezerCount
    }
  })
}

