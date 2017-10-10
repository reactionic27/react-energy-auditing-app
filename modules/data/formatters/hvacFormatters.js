import invariant from 'fbjs/lib/invariant'
import _ from 'lodash'
import dedent from 'dedent'
import {Map as IMap} from 'immutable'
import {HVAC_SECTIONS, EQUIPMENT_OPTIONS} from '../../../constants/hvacConstants'
import {fieldByName} from '../definition-helpers'
import type {hvacType} from '../optimiser/optimiser-types'

type hvacInfoType = {
  title: string,
  equipment: ?string,
  action: ?string,
  loads: {
    heat: [?number | string, ?number | string], // the "| string" is for legacy cases here
    cool: [?number | string, ?number | string], // look into removing this.
  },
  details: ?string
};

export function heatingSystems(hvacs: Array<IMap>, improved = false) {
  return hvacs.filter(system => {
    const {isHeat, hasBase, hasImproved} = getInfo(system)
    return (isHeat && improved === 'all' ? true : (improved ? hasImproved : hasBase))
  })
}
export function allHeatingSystems(hvacs) {
  return heatingSystems(hvacs, 'all')
}

export function heatingAndDualSystems(hvacs) {
  return hvacs.filter(system => {
    const {isHeat, isDual} = getInfo(system)
    return isHeat || isDual
  })
}

export function coolingSystems(hvacs, improved = false) {
  return hvacs.filter(system => {
    const {isCool, hasBase, hasImproved} = getInfo(system)
    return (isCool && improved === 'all' ? true : (improved ? hasImproved : hasBase))
  })
}
export function allCoolingSystems(hvacs) {
  return coolingSystems(hvacs, 'all')
}

export function coolingAndDualSystems(hvacs) {
  return hvacs.filter(system => {
    const {isCool, isDual} = getInfo(system)
    return isCool || isDual
  })
}

export function ductedSystems(hvacs: Array<IMap>, improved = false) {
  return hvacs.filter(system => {
    const {hasDucts, hasBase, hasImproved} = getInfo(system)
    return (hasDucts && (improved === 'all' ? true : (improved ? hasImproved : hasBase)))
  })
}
export function allDuctedSystems(hvacs) {
  return ductedSystems(hvacs, 'all')
}

// Strips out all of the unnecessary data based on the action
export function sanitizeHvacSubmit(form: Object) {
  const action = upgradeAction(form)
  const equipment = form.hvac_system_equipment_type
  const availableFields = _.flatMap(HVAC_SECTIONS[equipment], _.identity)

  let validOutput = _.pick(form, 'hvac_system_name', 'hvac_upgrade_action', 'hvac_system_equipment_type')
  let showIfs: Array<[string, Function]> = []

  _.forEach(availableFields, field => {

    const { fixed, showIf, disableKeep, options } = field
    const fieldDefinition = fieldByName(field.field)
    const { outputColumn, options: fdOptions } = fieldDefinition

    const outputColumnImproved = outputColumn + '_improved'

    if (showIf) {
      showIfs.push([outputColumn, showIf])
    }

    function val(column: string) {
      if (fixed) {
        return fixed
      }
      if (options || fdOptions) {
        if (ensureValidOption(form, column, options || fdOptions)) {
          return form[column]
        }
      }
      return form[column]
    }

    // If we're upgrading, both the base & improved are editable,
    // though the improved side still shouldn't be edited most of the time.
    if (action === 'upgrade') {
      validOutput[outputColumn] = val(outputColumn)
      validOutput[outputColumnImproved] = val(outputColumnImproved)
    }

    // "Keeping the same" we only allow certain "keep" fields to be editable
    // other available fields mirror the base.
    if (action === 'keep') {
      validOutput[outputColumn] = val(outputColumn)
      if (disableKeep) {
        validOutput[outputColumnImproved] = validOutput[outputColumn]
      } else {
        validOutput[outputColumnImproved] = val(outputColumnImproved)
      }
    }

    // If we're removing, that means there is no improved side
    if (action === 'remove') {
      validOutput[outputColumn] = val(outputColumn)
    }

    // If we're installing, that means there is no base side.
    if (action === 'install') {
      validOutput[outputColumnImproved] = val(outputColumnImproved)
    }

  })

  showIfs.forEach(([outputColumn, testFn]) => {
    if (!testFn(validOutput, {})) {
      validOutput[outputColumn] = null
    }
    if (!testFn(validOutput, {improved: true})) {
      validOutput[`${outputColumn}_improved`] = null
    }
  })

  return {
    ...validOutput
  }
}

function ensureValidOption(form, column, options) {
  return options.some(o => {
    return o === form[column] || o && o.displayValue === form[column]
  })
}

function falsyToZero(arr) {
  return _.map(arr, item => item ? item : 0)
}

function falsyToNone(val) {
  return val ? val : 'None'
}

function formatLoads(loads) {
  const {heat, cool} = loads
  const hasHeating = heat[0] || heat[1]
  const hasCooling = cool[0] || cool[1]
  const heatLoads = hasHeating ? `Heating: ${falsyToZero(heat).join(' → ')}` : ''
  const coolLoads = hasCooling ? `Cooling: ${falsyToZero(cool).join(' → ')}` : ''
  return heatLoads + (heatLoads && hasCooling ? ', ' : '') + coolLoads
}

function hvacSource(hvac) {
  const baseHeat = hvac.hvac_heating_energy_source
  const improvedHeat = hvac.hvac_heating_energy_source_improved
  const heatSource = baseHeat || improvedHeat ? `${falsyToNone(baseHeat)} → ${falsyToNone(improvedHeat)}` : ''
  return heatSource
}

export function getInfo(system) {
  if (typeof system.toJS === 'function') {
    system = system.toJS()
  }
  const isRemove = isRemoveSystem(system)
  const isInstall = isInstallSystem(system)
  const isKeepOrUpgrade = keepOrUpgrade(system)
  return {
    isRemove,
    isInstall,
    isKeepOrUpgrade,
    hasBase: isRemove || isKeepOrUpgrade,
    hasImproved: isInstall || isKeepOrUpgrade,
    isDual: isDual(system),
    isHeat: isHeat(system),
    isCool: isCool(system),
    isKeep: isKeepSystem(system),
    isUpgrade: isUpgradeSystem(system),
    hasDucts: hasDucts(system)
  }
}

export function getSimpleInfo(hvac: Object, index: number) : hvacInfoType {
  invariant(
    !(hvac instanceof IMap),
    `The hvac needs to be converted toJS before getInfo is called.`
  )
  const loads = {
    heat: [baseHeatLoad(hvac), improvedHeatLoad(hvac)],
    cool: [baseCoolLoad(hvac), improvedCoolLoad(hvac)]
  }
  return {
    title: `System ${index}`,
    name: hvac.hvac_system_name,
    equipment: hvac.hvac_system_equipment_type,
    action: hvac.hvac_upgrade_action,
    heatingEnergySource: hvac.hvac_heating_energy_source,
    loads: loads,
    formattedLoads: formatLoads(loads),
    energySource: hvacSource(hvac)
  }
}

function baseHeatLoad(hvac) {
  return !isInstallSystem(hvac)
    ? hvac.hvac_percent_of_total_heating_load
    : undefined
}
function improvedHeatLoad(hvac) {
  return (keepOrUpgrade(hvac) || isInstallSystem(hvac))
    ? hvac.hvac_percent_of_total_heating_load_improved
    : undefined
}

function baseCoolLoad(hvac) {
  return !isInstallSystem(hvac)
    ? hvac.hvac_percent_of_total_cooling_load
    : undefined
}
function improvedCoolLoad(hvac) {
  return (keepOrUpgrade(hvac) || isInstallSystem(hvac))
    ? hvac.hvac_percent_of_total_cooling_load_improved
    : undefined
}

const DUAL_EQUIPMENT = EQUIPMENT_OPTIONS.find(o => {
  return _.isPlainObject(o) && o['Both Heating & Cooling']
})['Both Heating & Cooling']
const HEATING_EQUIPMENT = EQUIPMENT_OPTIONS.find(o => {
  return _.isPlainObject(o) && o['Heating Only']
})['Heating Only']
const COOLING_EQUIPMENT = EQUIPMENT_OPTIONS.find(o => {
  return _.isPlainObject(o) && o['Cooling Only']
})['Cooling Only']

export function keepOrUpgrade(system) {
  return isUpgradeSystem(system) || isKeepSystem(system)
}
export function isUpgradeSystem({hvac_upgrade_action: a}) {
  return a === 'Replace with a newer model'
}
export function isKeepSystem({hvac_upgrade_action: a}) {
  return a === 'Keep an existing system as is'
}
export function isRemoveSystem({hvac_upgrade_action: a}) {
  return a === 'Remove a system permanently'
}
export function isInstallSystem({hvac_upgrade_action: a}) {
  return a === 'Install a new non-existing system'
}
export function upgradeAction(system) {
  let action
  if (isUpgradeSystem(system)) {
    action = 'upgrade'
  } else if (isKeepSystem(system)) {
    action = 'keep'
  } else if (isRemoveSystem(system)) {
    action = 'remove'
  } else if (isInstallSystem(system)) {
    action = 'install'
  }
  return action
}
export function isDual({hvac_system_equipment_type}) {
  return _.includes(DUAL_EQUIPMENT, hvac_system_equipment_type)
}
export function isHeat({hvac_system_equipment_type}) {
  return _.includes(HEATING_EQUIPMENT, hvac_system_equipment_type)
}
export function isCool({hvac_system_equipment_type}) {
  return _.includes(COOLING_EQUIPMENT, hvac_system_equipment_type)
}
export function hasDucts({hvac_system_equipment_type}) {
  return hvac_system_equipment_type && HVAC_SECTIONS[hvac_system_equipment_type].hasOwnProperty('ducts')
}

export function withIndexes(hvacs: Array<hvacType> | Array<IMap>, errors: ?Array) {
  hvacs = hvacs.map(hvac => IMap.isMap(hvac) ? hvac.toJS() : hvac)

  let percentLoad = {
    heating: {},
    cooling: {}
  }

  function addPercent(system: Object, baseOrImp: 'base' | 'improved', types: Array<string>) {
    types.forEach(type => {
      let key = `hvac_percent_of_total_${type}_load`
      if (baseOrImp === 'improved') key += '_improved'
      const val = parseFloat(system[key])
      if (_.isFinite(val)) {
        percentLoad[type][baseOrImp] = percentLoad[type][baseOrImp] || 0
        percentLoad[type][baseOrImp] += val
      }
    })
  }

  const grid = {
    heat: {
      base: new Array(3), improved: new Array(3)
    },
    cool: {
      base: new Array(3), improved: new Array(3)
    }
  }
  const systems = []

  // Find the first available slot + 1
  function firstIdx(system: hvacType, ...paths: string[]) {
    let passes = 0

    outer: // eslint-disable-line
    while (passes < 3) {
      for (var i = 0; i < paths.length; i++) {
        const path = paths[i]
        if (_.get(grid, `${path}.${passes}`) === undefined) {
          continue;
        }
        passes++
        continue outer; // eslint-disable-line
      }
      return passes + 1
    }

    errors.push({
      message: 'TOO_MANY_HVAC_SYSTEMS',
      section: 'hvac',
      info: paths,
      system
    })

    // True means we couldn't find something that works here.
    return true
  }

  const sortedWithInfo = _.sortBy(_.forEach(hvacs, system => {
    system.optimiserIndexes = {
      ...getInfo(system)
    }
  }), (system) => {
    const {optimiserIndexes} = system
    const {isKeepOrUpgrade, isDual} = optimiserIndexes
    return (isKeepOrUpgrade && isDual) ? 1 : isDual ? 2 : isKeepOrUpgrade ? 3 : 4
  })

  _.forEach(sortedWithInfo, (system) => {
    const {optimiserIndexes: omIdx} = system

    const {isDual, isCool, isHeat, hasBase, hasImproved, hasDucts} = omIdx

    if (isDual) {
      if (hasBase && hasImproved) {
        const idx = firstIdx(
          system, 'heat.base', 'cool.base', 'heat.improved', 'cool.improved'
        )
        if (idx === true) return
        addPercent(system, 'base', ['heating', 'cooling'])
        addPercent(system, 'improved', ['heating', 'cooling'])
        omIdx.improvedHeatIndex = omIdx.baseHeatIndex = idx
        omIdx.improvedCoolIndex = omIdx.baseCoolIndex = idx
        grid.cool.base[idx - 1] = grid.heat.base[idx - 1] = system
        grid.cool.improved[idx - 1] = grid.heat.improved[idx - 1] = system
        if (hasDucts) {
          omIdx.baseDuctType = omIdx.improvedDuctType = 'Heat'
          omIdx.baseDuctIndex = omIdx.improvedDuctIndex = idx
        }
      } else {
        const type = hasBase ? 'base' : 'improved'
        const idx = firstIdx(system, `heat.${type}`, `cool.${type}`)
        if (idx === true) return
        addPercent(system, type, ['heating', 'cooling'])
        grid.cool[type][idx - 1] = grid.heat[type][idx - 1] = system
        omIdx[`${type}HeatIndex`] = omIdx[`${type}CoolIndex`] = idx
        if (hasDucts) {
          omIdx[`${type}DuctType`] = 'Heat'
          omIdx[`${type}DuctIndex`] = idx
        }
      }
    }
    if (isCool) {
      if (hasBase && hasImproved) {
        const idx = omIdx.improvedCoolIndex = omIdx.baseCoolIndex = firstIdx(system, 'cool.base', 'cool.improved')
        if (idx === true) return
        addPercent(system, 'base', ['cooling'])
        addPercent(system, 'improved', ['cooling'])
        grid.cool.base[idx - 1] = grid.cool.improved[idx - 1] = system
        if (hasDucts) {
          omIdx.baseDuctType = omIdx.improvedDuctType = 'Cooling'
          omIdx.baseDuctIndex = omIdx.improvedDuctIndex = idx
        }
      } else {
        const type = hasBase ? 'base' : 'improved'
        addPercent(system, type, ['cooling'])
        const idx = omIdx[`${type}CoolIndex`] = firstIdx(system, `cool.${type}`)
        if (idx === true) return
        grid.cool[type][idx - 1] = system
        if (hasDucts) {
          omIdx[`${type}DuctType`] = 'Cool'
          omIdx[`${type}DuctIndex`] = idx
        }
      }
    }
    if (isHeat) {
      if (hasBase && hasImproved) {
        addPercent(system, 'base', ['heating'])
        addPercent(system, 'improved', ['heating'])
        const idx = omIdx.improvedHeatIndex = omIdx.baseHeatIndex = firstIdx(system, 'heat.base', 'heat.improved')
        if (idx === true) return
        grid.heat.base[idx - 1] = grid.heat.improved[idx - 1] = system
        if (hasDucts) {
          omIdx.baseDuctType = omIdx.improvedDuctType = 'Heat'
          omIdx.baseDuctIndex = omIdx.improvedDuctIndex = idx
        }
      } else {
        const type = hasBase ? 'base' : 'improved'
        addPercent(system, type, ['heating'])
        const idx = omIdx[`${type}HeatIndex`] = firstIdx(system, `heat.${type}`)
        if (idx === true) return
        grid.heat[type][idx - 1] = system
        if (hasDucts) {
          omIdx[`${type}DuctType`] = 'Heat'
          omIdx[`${type}DuctIndex`] = idx
        }
      }
    }

    systems.push(system)
  })
  return {
    baseHeat: grid.heat.base.filter(_.identity).length,
    baseCool: grid.cool.base.filter(_.identity).length,
    improvedHeat: grid.heat.improved.filter(_.identity).length,
    improvedCool: grid.cool.improved.filter(_.identity).length,
    percentLoad,
    systems,
    grid
  }
}

export function canAddHvac(
  hvacs: Array<hvacType | IMap>,
  hvac_system_equipment_type: string,
  hvac_upgrade_action: string
) {
  const fakeTempSystem = IMap({
    hvac_system_equipment_type,
    hvac_upgrade_action,
    job_id: 0,
    uuid: '00000000-0000-0000-0000-000000000000'
  })
  const errors = []
  const idx = withIndexes(hvacs.concat(fakeTempSystem), errors)
  if (errors.length > 0) {
    return new Error(systemCountError(idx, getInfo(fakeTempSystem)))
  }
  return true
}

function systemCountError(idx, info) {
  let {baseCool, baseHeat, improvedCool, improvedHeat} = idx
  const {isCool, isDual, isHeat, hasBase, hasImproved} = info
  if (isCool || isDual) {
    if (hasBase) baseCool++
    if (hasImproved) improvedCool++
  }
  if (isHeat || isDual) {
    if (hasBase) baseHeat++
    if (hasImproved) improvedHeat++
  }
  let excesses = []
  if (baseCool > 3) excesses.push(`${baseCool} base cooling`)
  if (improvedCool > 3) excesses.push(`${improvedCool} improved cooling`)
  if (baseHeat > 3) excesses.push(`${baseHeat} base heating`)
  if (improvedHeat > 3) excesses.push(`${improvedHeat} improved heating`)

  return dedent`
    Snugg supports a maximum of 3 heating and 3 cooling systems
    on both the "base" and "improved" sides.

    Adding this combination will put you over with ${joinMessage(excesses)}.

    You must remove or combine an existing system in order to add another system.
  `
}

function joinMessage(excesses) {
  if (excesses.length === 1) return `${excesses[0]} units`
  if (excesses.length === 2) return `${excesses.join(' and ')} units`
  return `${excesses.slice(0, -1).join(', ')}, and ${excesses.slice(-1)} units`
}
