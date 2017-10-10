import _ from 'lodash'
import {Map as IMap} from 'immutable'
import type {rootStateType} from '../flowtypes/flowtypes'
import {BURNABLE_FUEL_TYPES} from 'data/constants'

const potentialBurnableKeys = [
  'hvac_heating_energy_source',
  'hvac_heating_energy_source_improved',
  'dhw_fuel',
  'dhw_fuel_2',
  'dhw_fuel_2_improved',
  'oven_fuel_type',
  'oven_fuel_type_improved',
  'clothes_dryer_fuel_type',
  'clothes_dryer_fuel_type_improved',
  'range_fuel_type',
  'range_fuel_type_improved',
]

export function burnsFuel(appliance: IMap): boolean {
  return _.some(potentialBurnableKeys, (key) => _.includes(BURNABLE_FUEL_TYPES, appliance.get(key)))
}

export function cazSystemName(state: rootStateType, uuid: string) {
  if (!uuid) {
    return ''
  }

  const system = state.fn.cazSystemByUuid(uuid)

  let targetUuid
  const type = _.find(['dhw', 'hvac', 'range', 'oven', 'clothesDryer'], (type) => {
    targetUuid = system.get(`${_.snakeCase(type)}_uuid`)
    return Boolean(targetUuid)
  })

  return cazTargetName(state, system.get('job_id'), type, targetUuid)
}

export function cazTargetName(state: rootStateType, jobId: number, type: string, targetUuid: string) {

  if (!targetUuid) {
    return ''
  }

  if (type === 'hvac') {
    const hvac = state.fn.hvacByUuid(targetUuid)
    return hvac.get('hvac_system_name')
  }

  const items = state.fn[`${type}sByJobId`](jobId)

  const idx = _.findIndex(items, (item: IMap) => {
    return item.get('uuid') === targetUuid
  })

  const title = _(type).snakeCase().split('_').map(_.upperFirst).join(' ')

  if (type === 'hvac' || type === 'dhw') {
    return title + ' ' + (idx + 1)
  }

  return title
}

