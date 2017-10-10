import _ from 'lodash'
import {Map as IMap, List as IList} from 'immutable'
import Value from '../../util/value'
import {PAGE_SORT} from 'data/constants'
import programs from '../../../constants/program-definitions'
import { calculatedMetrics } from './totalFormatters'
import { recTotalCost } from './recommendationFormatters'
import { costDisplayType } from './reportFormatters'

export function programById(programId:number) {
  const id = programId || 1
  return programs.find((program) => id === program.get('id'))
}

// Always make sure there is a 'None' program available.
export const programsDropdown = (programs: Array<IMap>) => state => {
  let options = programs.length === 0
    ? [[1, 'None']]
    : programs.map(p => [p.get('id'), p.get('name')])
  return [['', '']].concat(options)
}


// == EUC incentive calculations ===============================================
//  See ticket https://github.com/SnuggHome/4SnuggPro/issues/64 for calculations
// Round down to nearest 5%. Anything less than 10%, they get no money.
// Anything greater than 45% cap it at 45%.
/*
12 PG&E: reduced percentage incentive, kwh & therms incentive cannot be negative
13 SCE/SoCalGas, 14 SoCalGas: normal percentage incentive, kwh & therms can be negative
15 SDG&E: normal percentage incentive, kwh & therms cannot be negative
*/
function calculatePercentIncentive(percent: number): number {
  if (percent < 10) return 0
  if (percent > 45) return 45 * 100
  return (Math.floor(percent / 5) * 5) * 100    // Rounds down to the nearest 5%
}

function calculatePercentIncentivesSceScg(percent: number): number {
  if (percent < 10) return 0
  return Math.floor(percent) * 130    // Rounds down to the nearest 5%

}

function calculatePercentIncentiveReduced(percent: number): number {
  switch (true) {
    case percent < 10: return 0
    case percent < 15: return 550
    case percent < 20: return 850
    case percent < 25: return 1150
    case percent < 30: return 1450
    case percent < 35: return 2500
    case percent < 40: return 3000
    case percent < 45: return 3500
    case percent >= 45: return 4000
  }
}

// $0.75 per kWh on top of base incentive
function calculateKwhIncentive(kwh: number): number {
  return kwh > 0 ? kwh * 0.75 : 0
}

function calculateKwhIncentiveAllowNegative(kwh: number): number {
  return kwh * 0.75
}

// $2 per Therm on top of base incentive
function calculateThermIncentive(therms: number): number {
  return therms > 0 ? therms * 2 : 0
}

function calculateThermIncentiveAllowNegative(therms: number): number {
  return therms * 2
}

function programPercentIncentive(percent: number, programId: number): number {
  switch (programId) {
    case 12: return calculatePercentIncentiveReduced(percent)
    case 13: return calculatePercentIncentivesSceScg(percent)
    default: return calculatePercentIncentive(percent)
  }
}

function programThermIncentive(therms: number, programId: number, percent: number): number {
  if (programPercentIncentive(percent, programId) < 10) {
    return 0
  }
  switch (programId) {
    case 13: return 0
    case 14: return calculateThermIncentiveAllowNegative(therms)
    default: return calculateThermIncentive(therms)
  }
}

function programKwhIncentive(therms: number, programId: number, percent: number) {
  if (programPercentIncentive(percent, programId) < 10) {
    return 0
  }
  switch (programId) {
    case 13: return 0
    case 14: return calculateKwhIncentiveAllowNegative(therms)
    default: return calculateKwhIncentive(therms)
  }
}

function calculatedTotalIncentive(
  programId: number,
  percentIncentive: number,
  kwhIncentive: number,
  thermIncentive: number,
  cost: number) {
  const unboundTotal = (percentIncentive || 0) + (kwhIncentive || 0) + (thermIncentive || 0)
  switch (programId) {
    case 13: return unboundTotal > (cost / 2) ? (cost / 2) : unboundTotal
    default: return unboundTotal
  }
}

const EUC_PROGRAM_IDS = [12, 13, 14, 15, 20]

const XCEL_PROGRAM_IDS = [2, 10]

export function eucIncentivesCSV(state: Object) {
  const {program, totals, recommendations} = state
  if (!_.includes(EUC_PROGRAM_IDS, program.id)) {
    return {}
  }
  return eucIncentives(program.id, calculatedMetrics(IMap(totals)), recTotalCost(recommendations), 'exact')
}

export function xcelIncentivesCSV(state: Object) {
  const {job, basedata: {conditioned_area, blower_door_reading, floors_above_grade}} = state
  if (!_.includes(XCEL_PROGRAM_IDS, job.program_id)) {
    return {}
  }
  return xcelIncentives(job.zip, conditioned_area, blower_door_reading, floors_above_grade)
}

export const eucIncentives = (programId: number, metrics: Object, cost: number, costDisplayType: string) => {
  const percentIncentive = programPercentIncentive(metrics.saved_mbtu_percent, programId)
  const kwhIncentive = programKwhIncentive(metrics.annual_electric_kWh_used_saved, programId, metrics.saved_mbtu_percent)
  const thermIncentive = programThermIncentive(metrics.annual_fuel_therms_used_saved, programId, metrics.saved_mbtu_percent)
  const totalIncentive = calculatedTotalIncentive(programId, percentIncentive, kwhIncentive, thermIncentive, cost)
  const netCost = costDisplayType === 'exact'
    ? (cost - totalIncentive)
    : new Value(cost).specialCeil().d(0).toNumber() - totalIncentive
  return {
    percentIncentive,
    kwhIncentive,
    thermIncentive,
    totalIncentive,
    netCost,
    formattedPercentIncentive: new Value(percentIncentive).d(0).prefix('$ ').toString(),
    formattedNetCost: new Value(netCost).d(0).prefix('$ ').toString(),
    formattedElectricIncentive: (kwhIncentive > 0) ? new Value(kwhIncentive).d(0).prefix('$ ').toString() : '$ 0',
    formattedThermIncentive: (thermIncentive > 0) ? new Value(thermIncentive).d(0).prefix('$ ').toString() : '$ 0',
    formattedTotalIncentive: (totalIncentive > 0) ? new Value(totalIncentive).d(0).prefix('$ ').toString() : '$ 0',
    incentivesDescription: programId === 13 ? "Maximum 50% of project cost" : "",
    showElectricIncentive: programId === 13 ? false : true,
    showThermIncentive: programId === 13 ? false : true
  }
}

// == Xcel incentive calculations ==============================================
// This calculation and the following numbers was given to us by Xcel engineers.
export const xcelIncentives = (zipCode: string, conditionedArea, blowerDoorReading, floorsAboveGrade): Object => {

  const area = parseInt(conditionedArea, 10)
  const leakage = parseInt(blowerDoorReading, 10)
  const zone = getXcelZone(zipCode)
  const floors = floorsAboveGrade > 3 ? 3 : Math.round(floorsAboveGrade)

  // Return early with error if some items are not included
  let errors = [];
  if (!area) errors.push('Conditioned Area');
  if (!leakage) errors.push('Blower Door Reading');
  if (!floorsAboveGrade) errors.push('Floors Above Grade');
  if (!zone) errors.push('Xcel territory zip code');

  let value = null
  let eligible = false
  let validation = 'Not Calculated'

  if (errors.length > 0) {
    return {
      eligible: false,
      validation: `requires valid ${errors.join(', ')}`
    }
  }

  // I don't know what it's calculating. Need to ask Adam
  let calculatedVal;
  try {
    calculatedVal = (leakage / xcelNFactors[floors - 1][zone - 1] * 60) / (area * 8)
  } catch (e) {
    calculatedVal = null
  }

  if (calculatedVal) {
    eligible = calculatedVal > 0.50 ? true : false
    value = new Value(calculatedVal).d(2).toNumber()
    validation = eligible ? 'Yes' : 'No'
  }

  return {
    value,
    eligible,
    validation
  }
}

const xcelNFactors = [[14.328, 16.021, 15.318], [11.282, 12.405, 11.520], [9.713, 10.577, 9.730]];
const xcelZones = {'80420': 3, '80421': 3, '80422': 1, '80423': 3, '80424': 3, '80425': 1, '80426': 3, '80427': 1, '80428': 3, '80429': 3, '80430': 3, '80432': 3, '80433': 1, '80434': 3, '80435': 3, '80436': 3, '80437': 1, '80438': 3, '80439': 1, '80440': 3, '80442': 3, '80443': 3, '80444': 3, '80446': 3, '80447': 3, '80448': 3, '80449': 3, '80451': 3, '80452': 3, '80453': 1, '80454': 1, '80455': 1, '80456': 3, '80457': 1, '80459': 3, '80461': 3, '80463': 3, '80465': 1, '80466': 1, '80467': 3, '80468': 3, '80469': 3, '80470': 1, '80471': 1, '80473': 3, '80474': 1, '80475': 3, '80476': 3, '80477': 3, '80478': 3, '80479': 3, '80480': 3, '80481': 1, '80482': 3, '80483': 3, '80487': 3, '80488': 3, '80497': 3, '80498': 3, '80820': 3, '80821': 1, '80822': 1, '80823': 1, '80824': 1, '80825': 1, '80826': 1, '80827': 3, '81101': 3, '81102': 3, '81120': 3, '81121': 3, '81122': 2, '81123': 3, '81124': 3, '81125': 3, '81126': 3, '81127': 3, '81128': 3, '81129': 3, '81130': 3, '81131': 3, '81132': 3, '81133': 3, '81134': 3, '81135': 3, '81136': 3, '81137': 2, '81138': 3, '81140': 3, '81141': 3, '81143': 3, '81144': 3, '81146': 3, '81147': 3, '81148': 3, '81149': 3, '81151': 3, '81152': 3, '81153': 3, '81154': 3, '81155': 3, '81157': 3, '81201': 3, '81210': 3, '81211': 3, '81212': 1, '81215': 1, '81220': 2, '81221': 1, '81222': 1, '81223': 1, '81224': 3, '81225': 3, '81226': 1, '81227': 3, '81228': 3, '81230': 3, '81231': 3, '81232': 1, '81233': 1, '81235': 3, '81236': 3, '81237': 3, '81239': 3, '81240': 1, '81241': 3, '81242': 3, '81243': 3, '81244': 1, '81246': 1, '81247': 3, '81248': 3, '81251': 3, '81252': 3, '81253': 3, '81290': 1, '81301': 2, '81302': 2, '81320': 2, '81321': 2, '81323': 2, '81324': 2, '81325': 3, '81326': 2, '81327': 2, '81328': 2, '81329': 2, '81330': 2, '81331': 2, '81332': 2, '81334': 2, '81335': 2, '81401': 2, '81402': 2, '81410': 2, '81411': 2, '81413': 2, '81414': 2, '81415': 2, '81416': 2, '81418': 2, '81419': 2, '81420': 2, '81421': 2, '81422': 2, '81423': 3, '81424': 2, '81425': 2, '81426': 3, '81427': 3, '81428': 2, '81429': 2, '81430': 3, '81431': 2, '81432': 3, '81433': 3, '81434': 3, '81435': 3, '81501': 2, '81502': 2, '81503': 2, '81504': 2, '81505': 2, '81506': 2, '81520': 2, '81521': 2, '81522': 2, '81523': 2, '81524': 2, '81525': 2, '81526': 2, '81527': 2, '81601': 2, '81602': 2, '81610': 3, '81611': 3, '81612': 3, '81615': 3, '81620': 3, '81621': 3, '81623': 2, '81624': 2, '81625': 3, '81626': 3, '81630': 2, '81631': 3, '81632': 3, '81633': 3, '81635': 2, '81636': 2, '81637': 3, '81638': 3, '81639': 3, '81640': 3, '81641': 2, '81642': 3, '81643': 2, '81645': 3, '81646': 2, '81647': 2, '81648': 2, '81649': 3, '81650': 2, '81652': 2, '81653': 3, '81654': 3, '81655': 3, '81656': 3, '81657': 3, '81658': 3}

function getXcelZone(zip) {
  zip = parseInt(zip, 10)
  try {
    if (zip >= 80001 && zip <= 80419) {
      return 1
    }
    if (zip >= 80501 && zip <= 80819) {
      return 1
    }
    if (zip >= 80828 && zip <= 81092) {
      return 1
    } else {
      return xcelZones[zip];
    }
  } catch (e) {
    console.error('Error: requires valid Xcel-territory zip code for Xcel Air Sealing rebate')
  }
}



// == Program Report Branding ==================================================
// TODO: This is being run for every page on the report. Run it once and pass it down
// TODO: Break this out into it's own page away from the xcel rebate logic.
// TOOD: Remove all of the React warnings in the program page
// paths removed from the db (but may be needed:
// /img/programs/efficiency_works/xcel-prpa-logo.jpg
// /img/programs/srp/srp.png

// Programs have needs that diverge from our default report template. For example,
// "Brought to you by [program logo]" may not be appropriate on the financing page.
// This allows us to override the default branding on a page-by-page basis.

// Merge program overrides into the default map of logo location and paths
export const makeProgramBranding = _.memoize((program) => {
  const defaultLogoPath = program.get('logoPath')

  const defaultFooterText = program.get('footerText')
  const snuggBranding = false
  const defaultBranding = getDefaultBranding(PAGE_SORT, defaultLogoPath, defaultFooterText, snuggBranding, program)
  const programOverride = programOverrides(program.get('id'), defaultLogoPath, defaultFooterText, snuggBranding)
  const programDetails = IMap({
    programName: program.get('name'),
    programPhone: program.get('phone'),
    programWebsite:  program.get('website'),
  })
  return defaultBranding.merge(programOverride).merge(programDetails).toJS()
})

// Build a skeleton object with every combination of pageName, footer and header
function getDefaultBranding(pages, defaultLogoPath, defaultFooterText, snuggBranding, program) {
  return IList(pages)
    .reduce((acc, page) => {
      const pageName = page.slice(5)
      if (pageName === 'cover') {
        return acc.merge({
          [`${pageName}HeaderLogo`]: defaultLogoPath,
          [`${pageName}FooterLogo`]: false,
          [`${pageName}FooterText`]: false,
          [`${pageName}SnuggBranding`]: true,
          [`${pageName}Title`] : program.get(`${pageName}Title`)
        })
      }
      if (pageName === 'rebates') {
        return acc.merge({
          [`${pageName}HeaderLogo`]: defaultLogoPath,
          [`${pageName}FooterLogo`]: defaultLogoPath,
          [`${pageName}FooterText`]: defaultFooterText,
          [`${pageName}SnuggBranding`]: false,
          [`${pageName}Title`] : program.get(`${pageName}Title`)
        })
      }
      return acc.merge({
        [`${pageName}HeaderLogo`]: false,
        [`${pageName}FooterLogo`]: defaultLogoPath,
        [`${pageName}FooterText`]: defaultFooterText,
        [`${pageName}SnuggBranding`]: false,
        [`${pageName}Title`] : program.get(`${pageName}Title`)
      })
    }, IMap())
}

const turnOffAllHeaderLogos = _.transform(PAGE_SORT, (result, pageName) => {
  result[`${pageName.slice(5)}HeaderLogo`] = false
  return result
}, {})

const turnOffAllFooterLogos = _.transform(PAGE_SORT, (result, pageName) => {
  result[`${pageName.slice(5)}FooterLogo`] = false
  return result
}, {})

const turnOffAllText = _.transform(PAGE_SORT, (result, pageName) => {
  result[`${pageName.slice(5)}FooterText`] = false
  return result
}, {})

const turnOffAllLogos = {...turnOffAllHeaderLogos, ...turnOffAllFooterLogos}

// For overriding an logo or text item, you have three choices:
// 1. Set to false to not show it
// 2. Logo: Set it to a image path (either defaultLogoPath or custom)
// 3. Text: Set it to defaultFooterText or your own text string
function programOverrides(id, defaultLogoPath, defaultFooterText) {
  const overrides = {

    // SRP: Only show logo on rebate page in the custom content area, which can be
    // hard coded in the custom content area
    4: {...turnOffAllLogos, ...turnOffAllText, rebatesHeaderLogo: defaultLogoPath},
    9: {...turnOffAllLogos, ...turnOffAllText},
    10: {...turnOffAllLogos, ...turnOffAllText, coverHeaderLogo: defaultLogoPath, headerLogoStyle: {height: 40}},
    11: {...turnOffAllLogos, ...turnOffAllText},
    12: {...turnOffAllLogos, ...turnOffAllText, coverHeaderLogo: defaultLogoPath, rebatesHeaderLogo: defaultLogoPath},
    13: {...turnOffAllLogos, ...turnOffAllText, coverHeaderLogo: defaultLogoPath, rebatesHeaderLogo: defaultLogoPath},
    14: {...turnOffAllLogos, ...turnOffAllText, coverHeaderLogo: defaultLogoPath, rebatesHeaderLogo: defaultLogoPath},
    15: {...turnOffAllLogos, ...turnOffAllText, coverHeaderLogo: defaultLogoPath, rebatesHeaderLogo: defaultLogoPath},
    // FOE:
    23: {financingFooterLogo: false, financingFooterText: false},
    // United Coop:
    24: {...turnOffAllLogos},
    // City of Palo Alto Utilities:
    25: {...turnOffAllLogos, coverHeaderLogo: defaultLogoPath, headerLogoStyle: {height: 38}, coverSnuggBranding: false},
    26: {...turnOffAllLogos, ...turnOffAllText},
    27: {footerLogoStyle: {maxHeight: 30, marginTop: -5}},
    28: {...turnOffAllFooterLogos, headerLogoStyle: {height: 38}},
    30: {...turnOffAllFooterLogos},
    // DEAL NV:
    35: {...turnOffAllFooterLogos}
  }
  return overrides[id]
}
