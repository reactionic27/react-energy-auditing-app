import type {
  basedataType,
  omContextType
} from './optimiser-types'
import {
  optimiserFields
} from './optimiser-helpers'

function castNumber(num) {
  return isNaN(+num) ? 0 : +num
}

function areAllEmpty(...values) {
  return values.every(values => (
    values === null || values === undefined || values === ''
  ))
}
function addsTo100(...values) {
  if (areAllEmpty(...values)) return true
  const sum = values.reduce((result, val) => result + castNumber(val), 0)
  return sum === 100 ? true : sum
}

export default function optimiserBasedata(
  context: omContextType,
  basedata: basedataType,
  groupedFields: Array,
) {
  const values = {}
  const errors = []

  const yearBuilt = basedata.year_built
  const nextYear = new Date().getFullYear() + 1
  if (!yearBuilt || yearBuilt < 1800 || yearBuilt > nextYear) {
    context.errors.push({field: 'Year Built', message: 'Year Built is required and must be between 1800 and ' + nextYear})
  }

  const {foundation_basement, foundation_crawlspace, foundation_slab, percent_of_floors_shared} = basedata

  // TODO: This needs to be done for all things that add up to 100%:
  // Attics & Vaults, Walls, DHW, Foundation.
  // It's breaking OM where people don't set it correctly.
  // See ticket https://github.com/SnuggHome/4SnuggPro/issues/226
  const foundation = addsTo100(foundation_basement, foundation_crawlspace, foundation_slab)

  if (percent_of_floors_shared < 100 && foundation !== true) {
    errors.push({
      component: 'FoundationTable'
    })
  }

  return optimiserFields('basedata', context, groupedFields, basedata, {values, errors})
}
