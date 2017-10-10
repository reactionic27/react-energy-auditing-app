import type {fieldDefinitionType} from 'data/flowtypes'
import type {omContextType, windowType} from './optimiser-types'
import {optimiserCollection} from './optimiser-helpers'
import _ from 'lodash'
import {sidesExceedingAreaPercent, getSidesString} from '../formatters/windowFormatters'

function isGetterThanZero(value) {
  return parseInt(value) > 0
}

function getErrorMessage(sides) {
  const sidesString = getSidesString(sides)
  return `The combined window area should not exceed 100% for any given wall. You are exceeding 100% on the ${sidesString} wall(s)`
}

export default function optimiserWindow(
  context: omContextType,
  win: Array<windowType>,
  fields: Array<fieldDefinitionType>,
  basedata
) {
  let values = {}
  let errors = []
  const homeType = basedata.type_of_home
  if (homeType !== 'Single Family Detached' && homeType !== 'Single Family Attached') {
    win.forEach(function(winItem, index) {
      const sides = _.compact(['north', 'east', 'west', 'south'].map(function(side) {
        return (basedata[`shared_walls_${side}`] === 100) && isGetterThanZero(winItem[`window_${side}_area_percent`]) ? side : ''
      }))
      if (sides.length > 0) {
        errors.push({
          component: 'WindowTable',
          uuid: winItem.uuid,
          collectionIndex: index
        })
      }
    })
  }

  const sides = sidesExceedingAreaPercent(win)
  if (sides.length > 0) {
    errors.push({
      component: 'WindowAreaTable',
      message: getErrorMessage(sides)
    })
  }
  return optimiserCollection('window', context, fields, win, {values, errors})
}
