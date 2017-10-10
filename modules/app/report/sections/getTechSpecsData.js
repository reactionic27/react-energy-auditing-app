import moment from 'moment'
import {Map as IMap} from 'immutable'
import {getFieldInfo, typeFormatter} from 'data/definition-helpers'
import techSpecSections from '../../../../constants/tech-spec-sections'
import strip from 'util/strip'
import shallowEquals from 'shallow-equals'
import _ from 'lodash'
import * as f from 'data/formatters'
// Dimensions need to be adjusted when the CSS and main pagination is done
const MAX_HEIGHT = 500 // Should be 624 but giving a 2 row buffer for wrapping labels

let lastProps, lastState = {}, lastReturn
export function getTechSpecsData(state, props) {
  if (
    shallowEquals(lastProps, props) &&
    state.snugg.every((val, key) => {
      return key === 'reports' || lastState.snugg.get(key) === val
    })
  ) {
    return lastReturn
  }


  lastProps = props
  lastState = state

  let validSections = []

  techSpecSections.forEach(section => {

    function maybeAddField(props, into: Array) {
      const fieldInfo = getFieldInfo(props)
      let { showIf, lookupPath, definition } = fieldInfo
      if (lookupPath[0] === 'hvac' && definition.name === 'Heating System Efficiency') {
        const row = state.snugg.getIn(lookupPath.slice(0, 2))
        const systemType = row.get('hvac_system_equipment_type')
        if (_.includes(['Central Heat Pump (shared ducts)', 'Ductless Heat Pump'], systemType)) {
          definition = Object.assign({}, definition, {suffix: 'HSPF'})
        }
      }
      if (lookupPath[0] === 'hvac' && definition.name === 'Cooling System Efficiency') {
        const row = state.snugg.getIn(lookupPath.slice(0, 2))
        const systemType = row.get('hvac_system_equipment_type')
        if (_.includes(['Room AC', 'Evaporative Cooler - Direct', 'Evaporative Cooler - Ducted'], systemType)) {
          definition = Object.assign({}, definition, {suffix: 'ERR'})
        }
      }
      if (showIf(state, props)) {
        const val = state.snugg.getIn(lookupPath)
        let label = (definition.label || definition.name) + ': '
        if (props.index) {
          label = label.replace('%{n}', props.index)
        }
        if (!emptyVal(val)) {
          into.push({
            $tag: 'field',
            label,
            value: formatField(val, definition)
          })
        }
      }
    }

    let addedFields = []

    _.forEach(section.fields, (fields, tbl) => {

      if (tbl === 'basedata') {
        fields.forEach(field => {
          maybeAddField({...props, field}, addedFields)
        })
      } else if (tbl === 'utilities') {
        // TODO: add utility bills here
      } else {
        const collectionEntries = state.fn[tbl + 'sByJobId'](props.jobId)
        collectionEntries.forEach((row, index) => {
          let collFields = []
          let uuid = row.get('uuid')
          fields.forEach(field => {
            maybeAddField({...props, field, uuid, index: index + 1}, collFields)
          })
          if (collFields.length > 0) {
            addedFields = addedFields.concat({
              $tag: 'collectionTitle',
              value: tbl,
              index: index + 1
            }).concat(collFields)
          }
        })
      }
    })

    if (addedFields.length > 0) {
      validSections = validSections.concat({$tag: 'title', value: section.label}).concat(addedFields)
    }
  })

  lastReturn = validSections
    .concat(addUtilityBillsInfo(state, props))
    .concat(addContractorInfo(state, props))
    .concat(addAboutInfo(state, props.jobId))

  return lastReturn
}

function addUtilityBillsInfo(state, {jobId}) {
  const utils = state.fn.utilitiesByJobIdJS(jobId)
  const program = state.fn.programByJobId(jobId)
  const exposeAccountNumber = program && program.get('exposeAccountNumber')

  let electricBill = [{
    $tag: 'title',
    value: 'Electric'
  }, {
    $tag: 'field',
    label: 'Electric Utility Provider Name',
    value: utils.electric_utility_provider_name
  }]
  if (exposeAccountNumber) {
    electricBill.push({
      $tag: 'field',
      label: 'Electric Account Number',
      value: utils.electric_account_number
    })
  }
  if (utils.bill_entry_type === 'Detailed') {
    for (let i = 1; i <= 12; i++) {
      const date = utils[`end_electric_date_${i}`]
      const formattedDate = date ? moment(date).format('MM/DD/YYYY') : '--'
      const bill = utils[`end_electric_bill_${i}`]
      electricBill.push({
        $tag: 'field',
        label: `${i}. ${formattedDate}`,
        value: bill ? bill + ' ' + utils.electric_bill_units : '--'
      })
    }
  } else if (utils.bill_entry_type === 'Simple') {
    electricBill = electricBill.concat([
      {
        $tag: 'field',
        label: 'Highest monthly summer electric bill',
        value: f.num.dollars(utils.highest_monthly_summer_electric_bill)
      },
      {
        $tag: 'field',
        label: 'Lowest monthly electric bill',
        value: f.num.dollars(utils.lowest_monthly_electric_bill)
      }
    ])
  }

  let fuelBill = [{
    $tag: 'title',
    value: 'Fuel'
  }, {
    $tag: 'field',
    label: 'Fuel Utility Provider Name',
    value: utils.fuel_utility_provider_name
  }]
  if (exposeAccountNumber) {
    fuelBill.push({
      $tag: 'field',
      label: 'Fuel Account Number',
      value: utils.fuel_account_number
    })
  }
  if (utils.bill_entry_type === 'Detailed') {
    for (let i = 1; i <= 12; i++) {
      const date = utils[`end_fuel_date_${i}`]
      const formattedDate = date ? moment(date).format('MM/DD/YYYY') : '--'
      const bill = utils[`end_fuel_bill_${i}`]
      fuelBill.push({
        $tag: 'field',
        label: `${i}. ${formattedDate}`,
        value: bill ? bill + ' ' + utils.fuel_bill_units : '--'
      })
    }
  } else if (utils.bill_entry_type === 'Simple') {

    switch (utils.primary_heating_fuel_type) {
      case 'Natural Gas':
        fuelBill = fuelBill.concat([
          {
            $tag: 'field',
            label: 'Highest monthly winter natural gas bill',
            value: f.num.dollars(utils.highest_monthly_winter_natural_gas_bill)
          },
          {
            $tag: 'field',
            label: 'Lowest monthly natural gas bill',
            value: f.num.dollars(utils.lowest_monthly_natural_gas_bill)
          }
        ])
        break
      case 'Electricity':
        fuelBill = fuelBill.concat([
          {
            $tag: 'field',
            label: 'Highest monthly winter electric bill',
            value: f.num.dollars(utils.highest_monthly_winter_electric_bill)
          }
        ])
        break
      case 'Fuel Oil':
        fuelBill = fuelBill.concat([
          {
            $tag: 'field',
            label: 'Total oil used in last 12 months',
            value: utils.simple_fuel_units === 'Dollars' ?  f.num.dollars(utils.total_simple_fuel_used_in_last_12_months) : `${utils.total_simple_fuel_used_in_last_12_months} ${utils.simple_fuel_units}`
          }
        ])
        break
      case 'Propane':
        fuelBill = fuelBill.concat([
          {
            $tag: 'field',
            label: 'Total propane used in last 12 months',
            value: utils.simple_fuel_units === 'Dollars' ?  f.num.dollars(utils.total_simple_fuel_used_in_last_12_months) : `${utils.total_simple_fuel_used_in_last_12_months} ${utils.simple_fuel_units}`
          }
        ])
        break
      case 'Wood':
        fuelBill = fuelBill.concat([
          {
            $tag: 'field',
            label: 'Total wood cost in last 12 months',
            value: f.num.dollars(utils.total_simple_fuel_used_in_last_12_months)
          }
        ])
        break
      case 'Pellets':
        fuelBill = fuelBill.concat([
          {
            $tag: 'field',
            label: 'Total pellet cost in last 12 months',
            value: f.num.dollars(utils.total_simple_fuel_used_in_last_12_months)
          }
        ])
        break
      case 'Solar':
        break
      default:
    }

  }

  return [{
    $tag: 'title',
    value: 'Utility Bills'
  }, ...electricBill, ...fuelBill]
}

// ========= Add Contractor information ======================================
function addContractorInfo(state, {jobId}) {
  const account = state.fn.accountByJobId(jobId) || IMap()
  const company = state.fn.companyByJobId(jobId) || IMap()
  const displayTitle = f.accountCompany.displayTitle(state, jobId)
  const displayEmail = f.accountCompany.displayEmail(state, jobId)

  const contractorInfoFields = [
    strip`${account.get('first_name')} ${account.get('last_name')}`,
    displayTitle,
    company.get('name'),
    account.get('certifications'),
    company.get('address_1'),
    company.get('address_2'),
    strip`${company.get('city') ? company.get('city') + ', ' : ''} ${company.get('state')} ${company.get('zip')}`,
    displayEmail
  ].filter(f => f).map(value => {
    return {$tag: 'text', value}
  })
  return [{
    $tag: 'title',
    value: 'Contractor Contact Information'
  }, ...contractorInfoFields]
}

// ========= Add About this report ======================================
function addAboutInfo(state, jobId) {
  const program = state.fn.programByJobId(jobId)
  const hasProgram = program.get('id') && program.get('id') !== 1

  return [
    {$tag: 'title', value: 'About This Report'},
    {$tag: 'text', value: `Report Date: ${moment().format('MMMM D, YYYY')}`},
    {$tag: 'text', value: `Job ID: ${jobId}`},
    hasProgram ? {$tag: 'text', value: `${program.get('name')}`} : {},
    {$tag: 'end'}
  ]
}

function formatField(val, def) {
  val = typeFormatter(val, def)
  if (def.suffix) {
    if (def.suffix === '#') return val
    if (def.suffix === '%') return val + '%'
    val = val + ' ' + def.suffix
  }
  return val
}
function emptyVal(val) {
  return val === '' || val === undefined || val === null
}

export function splitPages(dataRows) {
  let pages = []
  let currentPage = []
  let currentColumn = []
  let currentHeight = 0

  function finishPage() {
    pages.push(currentPage)
    currentPage = []
  }

  function finishColumn(finishing) {
    currentPage.push(currentColumn)
    currentColumn = []
    if (currentPage.length === 3 || finishing) {
      finishPage()
    }
  }

  dataRows.forEach(row => {
    if (row.$tag === 'title') {
      currentHeight += 19
    } else {
      currentHeight += 17
    }
    if (currentHeight > MAX_HEIGHT) {
      currentHeight = 0
      finishColumn()
    }
    currentColumn.push(row)
  })

  finishColumn(true)

  return pages
}
