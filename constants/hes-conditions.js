import * as f from 'data/formatters'
import _ from 'lodash'

function getFieldName(name, improved) {
  return `${name}${improved ? '_improved' : ''}`
}

function filterErrors(errors) {
  return _.uniqBy(errors.filter(error => error && error.message), (error) => error.message)
}

function getField(data, name, improved) {
  const fieldName = getFieldName(name, improved)
  return {
    value: data.get(fieldName),
    touched: data.getIn(['touched_fields', fieldName])
  }
}

function isTouchedField(field) {
  return field.touched && field.value
}

function isValidPercent(field) {
  const value = parseInt(field.value)
  return value >= 0 && value <= 100
}

export function basedataCondition(basedata) {
  return function(state, {jobId}) {
    return filterErrors(basedata.map(([field, [base, improved], index]) => {
      let message
      if (field.outputColumn === 'type_of_home') {
        if (base.value === 'Apartment' || base.value === 'Condominium' || base.value === 'Mobile Home') {
          message = `Type of Home > ${base.value}: HEScore does not support this home type.`
        } else {
          message = base.value ? null : 'Type of Home: Make a selection in the building section of the input screen.'
        }
      }
      if (field.outputColumn === 'percent_of_ceilings_shared') {
        message = base.value > 0 ?
        'Attic > % of Ceiling Shared: The Home Energy Score does not support homes that have other units above them. You cannot get a score for this house.' : null
      }
      if (field.outputColumn === 'percent_of_floors_shared') {
        message = base.value > 0 ?
        'Foundation > % of Floors Shared: The Home Energy Score does not support home that have other units below them. You cannot get a score for this house.' : null
      }
      if (field.outputColumn === 'wall_exterior_wall_construction') {
        message = base.value === 'Log' ? 'Walls > Construction: The Home Energy Score does not support log homes. You cannot get a score for this house.' : null
      }
      if (field.outputColumn === 'year_built') {
        message = base.value ? null : 'Year Built: Enter a value in the building section of the input screen.'
      }
      if (field.outputColumn === 'conditioned_area') {
        message = base.value ? null : 'Conditioned Area: Enter a value in the building section of the input screen.'
      }
      if (field.outputColumn === 'average_wall_height') {
        message = base.value ? null : 'Average Wall Height: Enter a value in the building section of the input screen.'
      }
      if (field.outputColumn === 'floors_above_grade') {
        message = base.value ? null : 'Floors Above Grade: Enter a value in the building section of the input screen.'
      }
      if (field.outputColumn === 'front_of_building_orientation') {
        message = base.value ? null : 'Front of Building Orientation: Make a selection in the building section of the input screen.'
      }
      if (field.outputColumn === 'number_of_bedrooms') {
        message = base.value ? null : 'Number of Bedrooms: Enter a value in the building section of the input screen.'
      }
      return message ? {field, message, jobId} : null
    }))
  }
}

export function foundationCondition() {
  return function(state, {jobId}) {
    const basedata =  state.fn.basedataByJobId(jobId)
    const message = 'Foundation: You must indicate the foundation makeup before you can apply for a HEScore (crawl space, basement and/or slab).'
    if (basedata.get('foundation_basement') || basedata.get('foundation_crawlspace') || basedata.get('foundation_slab')) {
      return []
    }
    return [{message, jobId, component: 'FoundationTable'}]
  }
}


export function basementCondition(basement, improvedActive, declined) {
  return function(state, {jobId}) {
    return filterErrors(basement.map(([field, [base, improved], index]) => {
      const basedata =  state.fn.basedataByJobId(jobId)
      const onlyImproved = improvedActive && !declined && field.outputColumn !== 'modeled_basement_floor_area'
      let message = null
      const cavityField = getField(basedata, 'basement_cavity_insulation', onlyImproved)
      const continuousField = getField(basedata, 'basement_continuous_insulation', onlyImproved)
      if (basedata.get('foundation_basement') > 0) {
        if (field.outputColumn === 'basement_cavity_insulation' || field.outputColumn === 'basement_continuous_insulation') {
          message = isTouchedField(cavityField) || isTouchedField(continuousField) ? null : 'Basement: You must specify the R-value of either the basement cavity or its continuous insulation.'
        }
      }
      return message ? {message, improved: onlyImproved, uuid: base.uuid, component: 'Basement'} : null
    }))
  }
}

export function crawlspaceCondition(crawlspace, improvedActive, declined) {
  return function(state, {jobId}) {
    return filterErrors(crawlspace.map(([field, [base, improved], index]) => {
      const basedata =  state.fn.basedataByJobId(jobId)
      const onlyImproved = improvedActive && !declined && field.outputColumn !== 'modeled_crawl_floor_area'
      let message = null
      const cavityField = getField(basedata, 'crawl_cavity_insulation', onlyImproved)
      const wallField = getField(basedata, 'crawl_wall_insulation', onlyImproved)
      if (basedata.get('foundation_crawlspace') > 0) {
        if (field.outputColumn === 'crawl_cavity_insulation' ||
            field.outputColumn === 'crawl_wall_insulation') {
          message = isTouchedField(wallField) || isTouchedField(cavityField) ? null : "Crawl space: You must specify the R-value of the crawl space's cavity or walls."

        }
      }
      return message ? {message, improved: onlyImproved, uuid: base.uuid, component: 'Crawlspace'} : null
    }))
  }
}


export function heatingCondition(hvacs, improvedActive, declined) {
  return function(state, {jobId}) {
    return filterErrors(hvacs.map(([field, [base, improved], index]) => {
      if (base.type === 'collectionName') { return }
      const hvac = state.fn.hvacByUuid(base.uuid)
      const name = f.collection.collectionName('hvac', hvac, index)
      let onlyImproved = improvedActive && !declined
      if (field.outputColumn !== 'hvac_percent_of_total_heating_load') {
        onlyImproved = onlyImproved && (hvac.get('hvac_upgrade_action') !== 'Keep an existing system as is')
      }
      const heatingLoadField = getField(hvac, 'hvac_percent_of_total_heating_load', onlyImproved)
      const {touched, value} = (onlyImproved ? improved : base)
      if (hvac.get('hvac_upgrade_action') === 'Remove a system permanently') {
        return null
      }
      if (hvac.get('hvac_upgrade_action') === 'Install a new non-existing system' && !onlyImproved) {
        return null
      }
      let message
      if ((field.outputColumn === 'hvac_system_equipment_type') &&
          (hvac.get('hvac_system_equipment_type') === 'Direct Heater') &&
          (hvac.get('hvac_heating_energy_source') === 'Propane')) {
        message = `Heating > ${name}: The Home Energy Score does not support a fuel type of Propane for a Direct Heater. You can switch to natural gas, model the job and then apply for the HEScore. You can switch back to propane and remodel once you’ve obtained the HEScore.`
      } else if (field.outputColumn === 'hvac_percent_of_total_heating_load') {
        message = value ? null : `Heating > ${name}: Enter the percentage of total heating load.`
      } else if (field.outputColumn === 'hvac_heating_system_efficiency' &&  heatingLoadField.value > 0) {
        message = touched && value ? null : `Heating > ${name}: Enter this heating system's efficiency.`
      }
      return {message, jobId, index, uuid: base.uuid, component: 'Hvac'}
    }))
  }
}

export function coolingCondition(hvacs, improvedActive, declined) {
  return function(state, {jobId}) {
    return filterErrors(hvacs.map(([field, [base, improved], index]) => {
      if (base.type === 'collectionName') { return }
      const hvac = state.fn.hvacByUuid(base.uuid)
      const name = f.collection.collectionName('hvac', hvac, index)
      let onlyImproved = improvedActive && !declined
      if (field.outputColumn !== 'hvac_percent_of_total_cooling_load') {
        onlyImproved = onlyImproved && (hvac.get('hvac_upgrade_action') !== 'Keep an existing system as is')
      }
      const { touched, value } = onlyImproved ? improved : base
      const coolingLoadField = getField(hvac, 'hvac_percent_of_total_cooling_load', onlyImproved)
      if (hvac.get('hvac_upgrade_action') === 'Remove a system permanently') {
        return null
      }
      if (hvac.get('hvac_upgrade_action') === 'Install a new non-existing system' && !onlyImproved) {
        return null
      }
      let message
      if (field.outputColumn === 'hvac_percent_of_total_cooling_load') {
        message = `Cooling > ${name}: Enter the percentage of total cooling load.`
      } else if (field.outputColumn === 'hvac_cooling_system_efficiency' &&  coolingLoadField.value > 0) {
        message = `Cooling > ${name}: Enter this cooling system's efficiency.`
      }
      return (touched && value) ? null : {message, jobId, index, uuid: base.uuid, component: 'Hvac'}

    }))
  }
}

export function atticCondition(attics, improvedActive, declined) {
  return function(state) {
    return filterErrors(attics.map(([field, [base, improved], index]) => {
      if (base.type === 'collectionName') { return }
      const attic = state.fn.atticByUuid(base.uuid)
      const name = f.collection.collectionName('attic', attic, index)
      let message
      if (field.outputColumn === 'attic_insulation') {
        message = `${name}: Specify this attic insulation's R-value.`
      }
      let onlyImproved = improvedActive && !declined
      const {touched, value} = onlyImproved ? improved : base
      return touched && value ? null : {message, improved: onlyImproved, uuid: base.uuid, field}
    }))
  }
}

export function vaultCondition(fields, improvedActive, declined) {
  return function(state) {
    return filterErrors(fields.map(([field, [base, improved], index]) => {
      if (base.type === 'collectionName') { return }
      const vault = state.fn.vaultByUuid(base.uuid)
      const name = f.collection.collectionName('vault', vault, index)
      const onlyImproved = improvedActive && !declined
      let message
      if (field.outputColumn === 'vault_cavity_insulation' || field.outputColumn === 'vault_continuous_insulation') {
        const cavityField = getField(vault, 'vault_cavity_insulation', onlyImproved)
        const continuousField = getField(vault, 'vault_continuous_insulation', onlyImproved)
        message = isTouchedField(cavityField) || isTouchedField(continuousField) ? null : `
        ${name}: Specify the R-value of cavity insulation or the continuous insulation.`
      }
      return message ? {message, improved: onlyImproved, uuid: base.uuid, component: 'Vault'} : null
    }))
  }
}

export function wallCondition(fields, improvedActive, declined) {
  return function(state) {
    return filterErrors(fields.map(([field, [base, improved], index]) => {
      if (base.type === 'collectionName') { return }
      const wall = state.fn.wallByUuid(base.uuid)
      const name = f.collection.collectionName('wall', wall, index)
      const onlyImproved = improvedActive && !declined
      let message
      if (field.outputColumn === 'wall_cavity_insulation' || field.outputColumn === 'wall_continuous_insulation') {
        const cavityField = getField(wall, 'wall_cavity_insulation', onlyImproved)
        const continuousField = getField(wall, 'wall_continuous_insulation', onlyImproved)
        message = isTouchedField(cavityField) || isTouchedField(continuousField) ? null : `
        ${name}: Wall cavity or continuous insulation R-value must be specified`
      }
      return message ? {message, improved: onlyImproved, uuid: base.uuid, component: 'Wall'} : null
    }))
  }
}

function getWindowArea(win, side, improved) {
  const field = getField(win, `window_area_${side}`, improved)
  return isTouchedField(field)
}

export function windowCondition(fields, improvedActive, declined) {
  return function(state) {
    return filterErrors(fields.map(([field, [base, improved], index]) => {
      const win = state.fn.windowByUuid(base.uuid)
      const name = f.collection.collectionName('window', win, index)
      const onlyImproved = improvedActive && !declined
      if (field.outputColumn === 'window_north_area_percent' ||
          field.outputColumn === 'window_south_area_percent' ||
          field.outputColumn === 'window_east_area_percent' ||
          field.outputColumn === 'window_west_area_percent') {
        const side = field.outputColumn.split('_')[1]
        const message =  `${name} ${_.capitalize(side)}: The % of the window area or the ${onlyImproved ? 'improved' : 'base'} square footage must be manually specified.`
        return isValidPercent(base) || getWindowArea(win, side, onlyImproved) ? null : {message, side, component: 'WindowArea', uuid: base.uuid}
      }
    }))
  }
}

export function pvCondition(fields, improvedActive, declined) {
  return function(state) {
    const onlyImproved = improvedActive && !declined
    const hasPvField = fields.find(([field]) => field.outputColumn === 'pv')
    const hasPV = onlyImproved ? hasPvField[1][1].value : hasPvField[1][0].value
    if ((onlyImproved && hasPV !== 'New System') ||
        (!onlyImproved && hasPV !== 'Yes')
        ) {
      return {}
    }
    return filterErrors(fields.map(([field, [base, improved], index]) => {
      if (field.outputColumn === 'pv') {return null}
      if (onlyImproved && field.outputColumn === 'pv_module_year') {return null}
      const {touched, value} = (onlyImproved ? improved : base)
      const message = `${field.name} must be manually specified`
      return touched && value ? null : {message, improved: onlyImproved, uuid: base.uuid, field}
    }))
  }
}
