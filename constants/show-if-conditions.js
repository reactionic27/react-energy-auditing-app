import _ from 'lodash'
import {
  and,
  or,
  equals,
  notEquals,
  includes,
  isEmpty,
  isNotEmpty,
  isNotZeroOrEmpty,
  createCondition,
  hvacCondition,
  moreThanOne
} from './conditions-helpers'

export const hasFrameFloor = createCondition(
  ['basedata', '$jobId', 'modeled_floor_area'],
  isNotZeroOrEmpty,
  true
)
export const hasBasement = createCondition(
  ['basedata', '$jobId', 'foundation_basement'],
  isNotZeroOrEmpty,
  true
)
export const basementHasFraming = createCondition(
  ['basedata', '$jobId', 'basement_wall_insulation'],
(val) => _.includes(["Finished wall without Insulation", "Finished wall with Insulation", "Unfinished frame wall with fiberglass batts"], val),
  true
)
export const basementDoesNotHaveFraming = createCondition(
  ['basedata', '$jobId', 'basement_wall_insulation'],
  (val) => _.includes(["None or Bare Walls", "Fiberglass blanket", "Don't Know"], val),
  true
)
export const hasCrawlspace = createCondition(
  ['basedata', '$jobId', 'foundation_crawlspace'],
  isNotZeroOrEmpty,
  true
)
export const isMultiFamily = createCondition(
  ['basedata', '$jobId', 'type_of_home'],
  (val) => _.includes(["Apartment", "Condominium", "Single Family Attached"], val)
)
export const hasPool = createCondition(
  ['basedata', '$jobId', 'pool'],
  equals('Yes'),
  true
)
export const variableSpeedPoolPump = createCondition(
  ['basedata', '$jobId', 'pool_pump_type'],
  equals('Variable Speed')
)
export const notVariableSpeedPoolPump = createCondition(
  ['basedata', '$jobId', 'pool_pump_type'],
  (val) => _.includes(["Single Speed", "Two Speed"], val)
)
const hasGarage = createCondition(
  ['basedata', '$jobId', 'tuck_under_garage'],
  equals('Yes')
)
const atticCool = createCondition(
  ['attic', '$uuid', 'attic_cool_roof'],
  equals('Yes')
)
const vaultCool = createCondition(
  ['vault', '$uuid', 'vault_cool_roof'],
  equals('Yes')
)
const hasKneeWall = createCondition(
  ['attic', '$uuid', 'attic_has_knee_wall'],
  equals('Yes')
)
const notConditionedCrawl = createCondition(
  ['basedata', '$jobId', 'crawlspace_type'],
  (val) => val !== 'Conditioned Crawl'
)
const isConditionedCrawl = createCondition(
  ['basedata', '$jobId', 'crawlspace_type'],
  equals('Conditioned Crawl')
)
const separateTreatment = createCondition(
  ['basedata', '$jobId', 'crawlspace_rim_joist_treatment'],
  equals('Separately')
)
const separateTreatmentBasement = createCondition(
  ['basedata', '$jobId', 'basement_rim_joist_treatment'],
  equals('Separately')
)
const hasDishwasher = createCondition(
  ['basedata', '$jobId', 'dishwasher_installed'],
  equals('Yes')
)
const topOrFrontLoadWasher = createCondition(
  ['basedata', '$jobId', 'clothes_washer_type'],
  includes(['Top Load', 'Front Load'])
)
const ductLeakageIsMeasured = createCondition(
  ['hvac', '$uuid', 'hvac_duct_leakage'],
  includes(['Measured (CFM25)', 'Measured (cfm25) - add cost manually'])
)
const ductInsulationIsMeasured = createCondition(
  ['hvac', '$uuid', 'hvac_duct_insulation'],
  includes(['Measured (R Value)', 'Measured (R Value) - add cost manually'])
)
const notSolarThermal = createCondition(
  ['hvac', '$uuid', 'hvac_system_equipment_type'],
  notEquals('Solar Thermal')
)
const isAtmospheric = createCondition(
  ['cazSystem', '$uuid', 'caz_appliance_vent_system_type'],
  equals('Atmospheric')
)
const isNotTankless = createCondition(
  ['dhw', '$uuid', 'dhw_type_2'],
  notEquals('Tankless Water Heater')
)
const dhwFuelIsSolarOrNone = createCondition(
  ['dhw', '$uuid', 'dhw_fuel_2'],
  and(notEquals('Solar'), notEquals('None'))
)
const isDwhCaz = createCondition(
  ['cazSystem', '$uuid', 'dhw_uuid'],
  isNotEmpty,
  true
)
const isNotOvenCaz = createCondition(
  ['cazSystem', '$uuid', 'oven_uuid'],
  isEmpty,
  true
)
const isOvenCaz = createCondition(
  ['cazSystem', '$uuid', 'oven_uuid'],
  isNotEmpty,
  true
)
const isNotRangeCaz = createCondition(
  ['cazSystem', '$uuid', 'range_uuid'],
  isEmpty,
  true
)
const isRangeCaz = createCondition(
  ['cazSystem', '$uuid', 'range_uuid'],
  isNotEmpty,
  true
)
const isNotDryerCaz = createCondition(
  ['cazSystem', '$uuid', 'clothes_dryer_uuid'],
  isEmpty,
  true
)
const isDryerCaz = createCondition(
  ['cazSystem', '$uuid', 'clothes_dryer_uuid'],
  isNotEmpty,
  true
)
const isASHRAE622 = createCondition(
  ['basedata', '$jobId', 'ashrae_62_2'],
  equals('Yes'),
  true
)
const oneBathroom = createCondition(
  ['basedata', '$jobId', 'ashrae_number_of_bathrooms'],
  equals('1'),
  true
)
const twoBathrooms = createCondition(
  ['basedata', '$jobId', 'ashrae_number_of_bathrooms'],
  equals('2'),
  true
)
const threeBathrooms = createCondition(
  ['basedata', '$jobId', 'ashrae_number_of_bathrooms'],
  equals('3'),
  true
)
const fourBathrooms = createCondition(
  ['basedata', '$jobId', 'ashrae_number_of_bathrooms'],
  equals('4'),
  true
)
const hasPV = createCondition(
  ['pv', '$uuid', 'pv'],
  includes(['Yes', 'New System'])
)
const hasWindowImprovements = createCondition(
  ['window', '$uuid', 'window_improvements'],
  includes(['Yes', ''])
)
export const hasContinuousWallInsulation = createCondition(
  ['wall', '$uuid', 'wall_continuous_insulation'],
  isNotZeroOrEmpty
)
export const hasWallCavityInsulation = createCondition(
  ['wall', '$uuid', 'wall_cavity_insulation'],
  isNotZeroOrEmpty
)
export const hasContinuousKneeWallInsulation = createCondition(
  ['attic', '$uuid', 'attic_knee_wall_continuous_insulation'],
  isNotZeroOrEmpty
)
export const hasKneeWallCavityInsulation = createCondition(
  ['attic', '$uuid', 'attic_knee_wall_insulation'],
  isNotZeroOrEmpty
)
export const hasContinuousVaultInsulation = createCondition(
  ['vault', '$uuid', 'vault_continuous_insulation'],
  isNotZeroOrEmpty
)
export const hasVaultCavityInsulation = createCondition(
  ['vault', '$uuid', 'vault_cavity_insulation'],
  isNotZeroOrEmpty
)
export const hasContinuousFrameFloorInsulation = createCondition(
  ['basedata', '$jobId', 'floor_continuous_insulation'],
  isNotZeroOrEmpty
)
export const hasFrameFloorCavityInsulation = createCondition(
  ['basedata', '$jobId', 'floor_cavity_insulation'],
  isNotZeroOrEmpty
)
export const hasCrawlWallInsulation = createCondition(
  ['basedata', '$jobId', 'crawl_wall_insulation'],
  isNotZeroOrEmpty
)
export const hasCrawlCavityInsulation = createCondition(
  ['basedata', '$jobId', 'crawl_cavity_insulation'],
  isNotZeroOrEmpty
)
export const hasCrawlRimJoistInsulation = createCondition(
  ['basedata', '$jobId', 'crawlspace_rim_joist_insulation'],
  isNotZeroOrEmpty
)
export const hasBasementContinuousInsulation = createCondition(
  ['basedata', '$jobId', 'basement_continuous_insulation'],
  isNotZeroOrEmpty
)
export const hasBasementCavityInsulation = createCondition(
  ['basedata', '$jobId', 'basement_cavity_insulation'],
  isNotZeroOrEmpty
)
export const hasBasementRimJoistInsulation = createCondition(
  ['basedata', '$jobId', 'basement_rim_joist_insulation'],
  isNotZeroOrEmpty
)

const showIfConditions = {

  'Number of Units': isMultiFamily,
  '% of Ceilings Shared': isMultiFamily,
  '% of Floors Shared': isMultiFamily,
  'Shared Walls North': isMultiFamily,
  'Shared Walls East': isMultiFamily,
  'Shared Walls South': isMultiFamily,
  'Shared Walls West': isMultiFamily,

  'Garage Size': hasGarage,

  'Pool Size': hasPool,
  'Pool Pump Type': hasPool,
  'Pool Pump Horsepower': hasPool,
  'Pool Pump Turnover': hasPool,
  'Pool Pump Hours': hasPool,
  'Pool Pump Model': hasPool,
  'Pool Pump Days Per Year': hasPool,
  'Pool Pump Manufacturer': hasPool,

  'Attic Roof Absorptance': atticCool,
  'Attic Roof Emissivity': atticCool,

  'Vault Roof Absorptance': vaultCool,
  'Vault Roof Emissivity': vaultCool,

  'Knee Wall Area': hasKneeWall,
  'Knee Wall Insulation': hasKneeWall,
  'Knee Wall Insulation Type': and(hasKneeWall, hasKneeWallCavityInsulation),
  'Knee Wall Continuous Insulation': hasKneeWall,
  'Knee Wall Continuous Insulation Type': and(hasKneeWall, hasContinuousKneeWallInsulation),

  'Clothes Washer MEF': topOrFrontLoadWasher,
  'Clothes Washer Energy Usage': topOrFrontLoadWasher,
  'Clothes Washer Water Usage': topOrFrontLoadWasher,
  'Clothes Washer Energy Star': topOrFrontLoadWasher,
  'Clothes Washer Manufacturer': topOrFrontLoadWasher,
  'Clothes Washer Model': topOrFrontLoadWasher,
  'Clothes Washer Model Year': topOrFrontLoadWasher,

  'Dishwasher Energy Star': hasDishwasher,
  'Dishwasher Energy Factor': hasDishwasher,
  'Dishwasher Energy Usage': hasDishwasher,
  'Dishwasher Water Usage': hasDishwasher,
  'Dishwasher Manufacturer': hasDishwasher,
  'Dishwasher Model': hasDishwasher,
  'Dishwasher Model Year': hasDishwasher,

  'DHW % Load': moreThanOne('dhwsByJobId', 'jobId'),
  'Wall System % of Total': moreThanOne('wallsByJobId', 'jobId'),

  'Crawl Wall Insulation': and(hasCrawlspace, isConditionedCrawl),
  'Crawl Wall Insulation Type': and(hasCrawlspace, isConditionedCrawl, hasCrawlWallInsulation),
  'Crawl Cavity Insulation': and(hasCrawlspace, notConditionedCrawl),
  'Crawl Cavity Insulation Type': and(hasCrawlspace, notConditionedCrawl, hasCrawlCavityInsulation),
  'Crawlspace Insulation': hasCrawlspace,
  'Crawlspace Type': hasCrawlspace,
  'Modeled Crawl Wall Area': hasCrawlspace,
  'Modeled Crawl Floor Area': hasCrawlspace,
  'Crawlspace Rim Joist Length': hasCrawlspace,
  'Crawlspace Rim Joist Treatment': and(hasCrawlspace, isConditionedCrawl),
  'Crawlspace Rim Joist Insulation': and(hasCrawlspace, isConditionedCrawl, separateTreatment),
  'Crawlspace Rim Joist Insulation Type': and(hasCrawlspace, isConditionedCrawl, separateTreatment, hasCrawlRimJoistInsulation),
  'Basement Rim Joist Treatment': hasBasement,
  'Basement Rim Joist Insulation': and(hasBasement, separateTreatmentBasement),
  'Basement Rim Joist Insulation Type': and(hasBasement, separateTreatmentBasement, hasBasementRimJoistInsulation),
  'Basement Rim Joist Length': hasBasement,

  'Foundation Above Grade Height': or(hasBasement, hasCrawlspace),
  'Basement Wall Insulation': hasBasement,
  'Basement Heating': hasBasement,
  'Basement Cooling': hasBasement,

  'Basement Cavity Insulation': and(hasBasement),
  'Basement Cavity Insulation Type': and(hasBasement, hasBasementCavityInsulation),
  'Basement Continuous Insulation': hasBasement,
  'Basement Continuous Insulation Type': and(hasBasement, hasBasementContinuousInsulation),
  'Modeled Basement Wall Area': hasBasement,
  'Modeled Basement Perimeter': hasBasement,
  'Modeled Basement Floor Area': hasBasement,

  'Floor Cavity Insulation': hasFrameFloor,
  'Floor Continuous Insulation': hasFrameFloor,
  'Floor Cavity Insulation Type': and(hasFrameFloor, hasFrameFloorCavityInsulation),
  'Floor Continuous Insulation Type': and(hasFrameFloor, hasContinuousFrameFloorInsulation),

  'Heat Pump Inverter': hvacCondition(),
  'Heating Energy Source': hvacCondition(),

  '% of Total Heating Load': hvacCondition({disableKeep: false}),
  'Heating System Model Year': hvacCondition(),
  'Heating System Efficiency': and(hvacCondition(), notSolarThermal),
  'Heating Capacity': hvacCondition(),
  'Heating System Manufacturer': hvacCondition(),
  'Heating System Model': hvacCondition(),

  '% of Total Cooling Load': hvacCondition({disableKeep: false}),
  'Cooling System Efficiency': hvacCondition(),
  'Cooling Capacity': hvacCondition(),
  'Cooling System Model Year': hvacCondition(),
  'Cooling System Manufacturer': hvacCondition(),
  'Cooling System Model': hvacCondition(),

  'Duct Location': hvacCondition({disableKeep: false}),
  'Duct Leakage': hvacCondition({disableKeep: false}),
  'Duct Leakage Value': and(hvacCondition({disableKeep: false}), ductLeakageIsMeasured),
  'Duct Insulation': hvacCondition({disableKeep: false}),
  'Duct Insulation Value': and(hvacCondition({disableKeep: false}), ductInsulationIsMeasured),
  'Duct Efficiency': hvacCondition({disableKeep: false}),

  'DHW Type2': dhwFuelIsSolarOrNone,
  'DHW Energy Factor': dhwFuelIsSolarOrNone,
  'DHW Tank Size': and(isNotTankless, dhwFuelIsSolarOrNone),
  'DHW Recovery Efficiency': and(isNotTankless, dhwFuelIsSolarOrNone),
  'DHW Heating Capacity': dhwFuelIsSolarOrNone,
  'DHW Energy Star': dhwFuelIsSolarOrNone,

  'CAZ Appliance Vent System Type': and(isNotOvenCaz, isNotDryerCaz, isNotRangeCaz),
  'CAZ Appliance CO Current Condition': or(isAtmospheric, isOvenCaz, isRangeCaz, isDryerCaz),
  'CAZ Appliance CO Poor Scenario': and(isAtmospheric, isNotOvenCaz, isNotRangeCaz, isNotDryerCaz),
  'CAZ Appliance CO Test Result': or(isAtmospheric, isOvenCaz, isRangeCaz, isDryerCaz),
  'CAZ Appliance Spillage Current Condition': and(isAtmospheric, isNotOvenCaz, isNotRangeCaz, isNotDryerCaz),
  'CAZ Appliance Spillage Poor Condition': and(isAtmospheric, isNotOvenCaz, isNotRangeCaz, isNotDryerCaz),
  'CAZ Appliance Spillage Test Result': and(isAtmospheric, isNotOvenCaz, isNotRangeCaz, isNotDryerCaz),
  'CAZ Water Heater Orphaned': isDwhCaz,

  'ASHRAE Kitchen Fan CFM': isASHRAE622,
  'ASHRAE Kitchen Window': isASHRAE622,
  'ASHRAE Number of Bathrooms': isASHRAE622,
  'ASHRAE Bathroom Fan 1 CFM': and(isASHRAE622, or(oneBathroom, twoBathrooms, threeBathrooms, fourBathrooms)),
  'ASHRAE Bathroom 1 Window': and(isASHRAE622, or(oneBathroom, twoBathrooms, threeBathrooms, fourBathrooms)),
  'ASHRAE Bathroom Fan 2 CFM': and(isASHRAE622, or(twoBathrooms, threeBathrooms, fourBathrooms)),
  'ASHRAE Bathroom 2 Window': and(isASHRAE622, or(twoBathrooms, threeBathrooms, fourBathrooms)),
  'ASHRAE Bathroom Fan 3 CFM': and(isASHRAE622, or(threeBathrooms, fourBathrooms)),
  'ASHRAE Bathroom 3 Window': and(isASHRAE622, or(threeBathrooms, fourBathrooms)),
  'ASHRAE Bathroom Fan 4 CFM': and(isASHRAE622, fourBathrooms),
  'ASHRAE Bathroom 4 Window': and(isASHRAE622, fourBathrooms),
  'ASHRAE Required Additional CFM': isASHRAE622,
  'ASHRAE Minimum CFM50': isASHRAE622,

  'PV Array Size': hasPV,
  'PV Array Slope': hasPV,
  'PV Array Orientation': hasPV,
  'PV Module Year': hasPV,
  'PV Annual Production': hasPV,

  'Efficiency': hasWindowImprovements,
  'Solar Heat Gain Coefficient': hasWindowImprovements,
  'Window Energy Star': hasWindowImprovements,

  'Wall Continuous Insulation Type': hasContinuousWallInsulation,
  'Wall Cavity Insulation Type': hasWallCavityInsulation,
  'Vault Continuous Insulation Type': hasContinuousVaultInsulation,
  'Vault Cavity Insulation Type': hasVaultCavityInsulation,
}

export default showIfConditions
