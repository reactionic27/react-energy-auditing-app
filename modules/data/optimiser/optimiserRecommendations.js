import _ from 'lodash'
import {getRecDefinition} from '../definition-helpers'
import type {
  recDefinitionType,
  recommendationType,
  omContextType
} from './optimiser-types'
import {returnContext} from './optimiser-helpers'
import {getMeasureCode} from '../formatters/measureCodeFormatters'

export default function optimiserRecommendations(
  context: omContextType,
  recommendations: Array<recommendationType>
) {
  let customRecIndex = 0
  const values = _.reduce(recommendations, (result: Object, rec: recommendationType) => {
    const definition: recDefinitionType = getRecDefinition(rec.rec_definition_id)

    // A rec is considered "included" if it has a status of 1, or if we haven't
    // calculated the job yet and the status is 0
    const included = rec.status === 1

    if (definition.inclusionKey) {
      if (rec.status !== 0) {
        const prefix = included ? 'A1Include' : 'A1Exclude'
        result[`${prefix}${definition.inclusionKey}`] = 'TRUE'
      }
    }

    if (definition.improvedCostKey && rec.touched_cost) {
      result[definition.improvedCostKey] = getCost(rec.cost)
    }

    if (definition.type === 'custom' && included) {
      const measureCode = rec.measure_code ? getMeasureCode(context.payload.jobs.program_id, rec.measure_code) : null
      result[`SelectionCustomTableGroup|ID*CustomUpgrades${++customRecIndex}|Description`] = rec.measure_code ? measureCode.title : `${rec.title || 'No Title'}`
      result[`SelectionCustomTableGroup|ID*CustomUpgrades${customRecIndex}|CostUSD`] = getCost(rec.cost)
      result[`SelectionCustomTableGroup|ID*CustomUpgrades${customRecIndex}|MeasureCode`] = rec.measure_code || "other"
      result[`ChkSpecialUpgrade${customRecIndex}`] = "TRUE"
    }
    return result
  }, {})

  return returnContext('recommendations', context, {values})
}

function getCost(cost) {
  if (cost === null || cost === undefined) return
  let number = `${cost}`.replace(/[^0-9.]/g, '')
  if (number === '0') number = '0.00'
  return _.round(number, 2)
}
