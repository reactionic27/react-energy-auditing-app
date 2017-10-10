import type {fieldDefinitionType} from 'data/flowtypes'
import type {omContextType, wallType} from './optimiser-types'
import {optimiserCollection} from './optimiser-helpers'

function castNumber(num) {
  return isNaN(+num) ? 0 : +num
}

export default function optimiserWall(
  context: omContextType,
  wall: Array<wallType>,
  fields: Array<fieldDefinitionType>
) {
  let values = {}
  let errors = []

  if (wall.length === 1) {
    values.A1BaseWallPct1 = 100
  } else if (wall.length > 1) {
    let wallTotal = 0
    wall.forEach(d => {
      wallTotal += castNumber(d.wall_system_percent_of_total)
    })
    if (wallTotal !== 100) {
      errors.push({
        component: 'PercentWallTable'
      })
    }
  }
  return optimiserCollection('wall', context, fields, wall, {values, errors})
}
