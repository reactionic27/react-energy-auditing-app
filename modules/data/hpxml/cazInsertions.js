import {Map as IMap} from 'immutable'
import type {rootStateType} from '../flowtypes/flowtypes'
import _ from 'lodash'
import {fuelType, booleanType, testResultType} from './hpxmlXsdTypes'
import {BURNABLE_FUEL_TYPES} from 'data/constants'
import {withIndexes} from '../formatters/hvacFormatters'
import {convertXPathToJsPath} from './hpxmlUtils'
import invariant from 'fbjs/lib/invariant'

// HPXML examples and validator:
// https://hpxml.nrel.gov/validator/
// https://github.com/hpxmlwg/hpxml/tree/master/examples
// http://hpxmlwg.github.io/hpxml/schemadoc/hpxml-2.1.0/index.html

// Alternate approaches:
// https://github.com/highsource/jsonix/issues/146#issuecomment-222540851
// * define _.get() and _.set() path on field. 'Building[0].BuildingDetails...'
// * Use array of paths if field needs to show up more than once like fuelType
// https://github.com/kripken/xml.js/issues/8 for validation (designed for browser with emscripten, see issue for multiple xsd)
// https://github.com/libxmljs/libxmljs for validation before sending out: https://github.com/libxmljs/libxmljs/wiki#validating-against-xsd-schema (is this node only?)

type optsType = {
  state: rootStateType,
  job_id: number
};

// == CAZ ======================================================================
export default function cazInsertions(parsedXMLJS: Object, options: optsType) {
  const {job_id, state} = options
  const cazZones = state.fn.cazByJobId(job_id)
  const cazAppliances = state.fn.cazSystemsByJobId(job_id)
  const baseData = state.fn.basedataByJobId(job_id)
  const cazMaxAmbientCODuringAuditBase = baseData.get('caz_max_ambient_co')
  const cazMaxAmbientCODuringAuditImp = baseData.get('caz_max_ambient_co_improved')
  const hvacInfos = withIndexes(state.fn.hvacsByJobId(job_id)).systems

  const hvacXMLSysIds = {
    base: getBaseHvacXMLSysIds(parsedXMLJS),
    improved: getImpHvacXMLSysIds(parsedXMLJS)
  }

  // Tests for the entire CAZ Zone, with nested CombustionApplianceTest
  const zones = _.flatMap(cazZones, (zone, zoneIndex) => {

    let applianceWithinZoneIndex = -1

    const valuesHash = {
      zoneIndex,
      cazMaxAmbientCODuringAuditBase,
      cazMaxAmbientCODuringAuditImp
    }

    const zoneTests = getZoneTests(zone, zoneIndex)

    const hvacNodes = _(cazAppliances.hvac)
      .filter(appliance => appliance.get('caz_uuid') === zone.get('uuid'))
      .map((appliance, applianceIndex) => {
        const hvacInfo = _.find(hvacInfos, (hvacInfo) => hvacInfo.uuid === appliance.get('hvac_uuid'))
        const systemId = {
          base: hvacSystemIdentifier(hvacInfo, hvacXMLSysIds.base),
          improved: hvacSystemIdentifier(hvacInfo, hvacXMLSysIds.improved)
        }
        const fuelTypes = applianceFuelTypeByUUID(state, appliance.get('hvac_uuid'), job_id, 'hvac')
        applianceWithinZoneIndex++
        return applianceTestNodes({...valuesHash, appliance, applianceWithinZoneIndex, systemId, fuelTypes})
      })
      .value()

    const dhwNodes = _(cazAppliances.dhw)
      .filter(appliance => appliance.get('caz_uuid') === zone.get('uuid'))
      .map((appliance, applianceIndex) => {
        const idPathBase = convertXPathToJsPath({xpath: `Building[0]/BuildingDetails/Systems/WaterHeating/WaterHeatingSystem[${applianceIndex}]/SystemIdentifier/$/id`})
        const idPathImp = convertXPathToJsPath({xpath: `Building[1]/BuildingDetails/Systems/WaterHeating/WaterHeatingSystem[${applianceIndex}]/SystemIdentifier/$/id`})
        const systemId = {base: _.get(parsedXMLJS, idPathBase.jspath), improved: _.get(parsedXMLJS, idPathImp.jspath)}
        const fuelTypes = applianceFuelTypeByUUID(state, appliance.get('dhw_uuid'), job_id, 'dhw')
        applianceWithinZoneIndex++
        return applianceTestNodes({...valuesHash, appliance, applianceWithinZoneIndex, systemId, fuelTypes, applianceIndex})
      })
      .value()

    const ovenNodes = _(cazAppliances.oven)
      .filter(appliance => appliance.get('caz_uuid') === zone.get('uuid'))
      .map((appliance, applianceIndex) => {
        const idPathBase = convertXPathToJsPath({xpath: `Building[0]/BuildingDetails/Appliances/Oven[${applianceIndex}]/SystemIdentifier/$/id`})
        const idPathImp = convertXPathToJsPath({xpath: `Building[1]/BuildingDetails/Appliances/Oven[${applianceIndex}]/SystemIdentifier/$/id`})
        const systemId = {base: _.get(parsedXMLJS, idPathBase.jspath), improved: _.get(parsedXMLJS, idPathImp.jspath)}
        const fuelTypes = applianceFuelTypeByUUID(state, appliance.get('oven_uuid'), job_id, 'oven')
        applianceWithinZoneIndex++
        return applianceTestNodes({...valuesHash, appliance, applianceWithinZoneIndex, systemId, fuelTypes})
      })
      .value()

    const rangeNodes = _(cazAppliances.range)
      .filter(appliance => appliance.get('caz_uuid') === zone.get('uuid'))
      .map((appliance, applianceIndex) => {
        const idPathBase = convertXPathToJsPath({xpath: `Building[0]/BuildingDetails/Appliances/CookingRange[${applianceIndex}]/SystemIdentifier/$/id`})
        const idPathImp = convertXPathToJsPath({xpath: `Building[1]/BuildingDetails/Appliances/CookingRange[${applianceIndex}]/SystemIdentifier/$/id`})
        const systemId = {base: _.get(parsedXMLJS, idPathBase.jspath), improved: _.get(parsedXMLJS, idPathImp.jspath)}
        const fuelTypes = applianceFuelTypeByUUID(state, appliance.get('range_uuid'), job_id, 'range')
        applianceWithinZoneIndex++
        return applianceTestNodes({...valuesHash, appliance, applianceWithinZoneIndex, systemId, fuelTypes})
      })
      .value()

    const dryerNodes = _(cazAppliances.clothesDryer)
      .filter(appliance => appliance.get('caz_uuid') === zone.get('uuid'))
      .map((appliance, applianceIndex) => {
        const idPathBase = convertXPathToJsPath({xpath: `Building[0]/BuildingDetails/Appliances/ClothesDryer[${applianceIndex}]/SystemIdentifier/$/id`})
        const idPathImp = convertXPathToJsPath({xpath: `Building[1]/BuildingDetails/Appliances/ClothesDryer[${applianceIndex}]/SystemIdentifier/$/id`})
        const systemId = {base: _.get(parsedXMLJS, idPathBase.jspath), improved: _.get(parsedXMLJS, idPathImp.jspath)}
        const fuelTypes = applianceFuelTypeByUUID(state, appliance.get('clothes_dryer_uuid'), job_id, 'clothesDryer')
        applianceWithinZoneIndex++
        return applianceTestNodes({...valuesHash, appliance, applianceWithinZoneIndex, systemId, fuelTypes})
      })
      .value()

    return _.flatten(zoneTests.concat(hvacNodes, ovenNodes, dhwNodes, rangeNodes, dryerNodes))
  })

  // Zone Notes have to come after appliance tests. Order matters!
  return zones.concat(getZoneNotes(cazZones))
}

function getZoneTests(zone: IMap, zoneIndex: number): Array {
  return [
    // Zone Tests (Test-In)
    {value: `cazzone${zoneIndex + 1}`, xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/SystemIdentifier/$/id`},
    {value: zone.get('caz_poor_case_test'), xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/PoorCaseTest/Pressure`},
    {value: zone.get('caz_ambient_co'), xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/AmountAmbientCOinCAZduringTesting`},

    // Zone Tests (Test-Out)
    {value: `cazzone${zoneIndex + 1}p`, xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/SystemIdentifier/$/id`},
    {value: `cazzone${zoneIndex + 1}`, xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/SystemIdentifier/$/sameas`},
    {value: zone.get('caz_poor_case_test_improved'), xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/PoorCaseTest/Pressure`},
    {value: zone.get('caz_ambient_co_improved'), xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/AmountAmbientCOinCAZduringTesting`},
  ]
}

function getZoneNotes(cazZones: Array): Array {
  return _.flatMap(cazZones, (zone, zoneIndex) => [
    {value: zone.get('caz_notes'), xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/Notes`},
    {value: zone.get('caz_notes_improved'), xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/Notes`},
  ])
}


function applianceTestNodes(valuesHash: Object): Array {
  const {
    zoneIndex,
    cazMaxAmbientCODuringAuditBase,
    cazMaxAmbientCODuringAuditImp,
    appliance,
    applianceWithinZoneIndex,
    systemId,
    fuelTypes,
    applianceIndex
  } = valuesHash

  const useBase = burnsFuel(fuelTypes.base)
  const useImpr = burnsFuel(fuelTypes.improved)

  const refNodes = [
    {value: useBase && systemId.base, xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/CAZAppliance/$/id`},
    {value: useImpr && systemId.improved, xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/CAZAppliance/$/id`},
  ]

  const splillageTest = [
    {value: useBase && appliance.get('caz_appliance_spillage_poor_condition'), xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/SpillageTest/PoorScenario`},
    {value: useImpr && appliance.get('caz_appliance_spillage_poor_condition_improved'), xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/SpillageTest/PoorScenario`},
    {value: useBase && appliance.get('caz_appliance_spillage_current_condition'), xpath: `Building[0]/BuildingDetails[0]/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/SpillageTest/CurrentCondition`},
    {value: useImpr && appliance.get('caz_appliance_spillage_current_condition_improved'), xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/SpillageTest/CurrentCondition`},
    {value: useBase && testResultType(appliance.get('caz_appliance_spillage_test_result')), xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/SpillageTest/TestResult`},
    {value: useImpr && testResultType(appliance.get('caz_appliance_spillage_test_result_improved')), xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/SpillageTest/TestResult`},
  ]

  const carbonMonoxideTest = [
    {value: useBase && appliance.get('caz_appliance_co_poor_scenario'), xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/CarbonMonoxideTest/PoorScenario`},
    {value: useImpr && appliance.get('caz_appliance_co_poor_scenario_improved'), xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/CarbonMonoxideTest/PoorScenario`},
    {value: useBase && appliance.get('caz_appliance_co_current_condition'), xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/CarbonMonoxideTest/CurrentCondition`},
    {value: useImpr && appliance.get('caz_appliance_co_current_condition_improved'), xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/CarbonMonoxideTest/CurrentCondition`},
    {value: useBase && testResultType(appliance.get('caz_appliance_co_test_result')), xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/CarbonMonoxideTest/TestResult`},
    {value: useImpr && testResultType(appliance.get('caz_appliance_co_test_result_improved')), xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/CarbonMonoxideTest/TestResult`},
    {value: useBase && cazMaxAmbientCODuringAuditBase, xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/CarbonMonoxideTest/MaxAmbientCOinLivingSpaceDuringAudit`},
    {value: useImpr && cazMaxAmbientCODuringAuditImp, xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/CarbonMonoxideTest/MaxAmbientCOinLivingSpaceDuringAudit`},
  ]

  const orphanedVentilation = [
    {value: useBase && booleanType(appliance.get('caz_water_heater_orphaned')), xpath: `Building[0]/BuildingDetails/Systems/WaterHeating/WaterHeatingSystem[${applianceIndex}]/CombustionVentilationOrphaned`},
    {value: useImpr && booleanType(appliance.get('caz_water_heater_orphaned_improved')), xpath: `Building[1]/BuildingDetails/Systems/WaterHeating/WaterHeatingSystem[${applianceIndex}]/CombustionVentilationOrphaned`},
  ]

  // This is problematic for a lot of reasons. CombustionVentilationSystem goes between <HVAC> and <WaterHeater>
  // With xml2js these are set as keys on an object, which I can't control in JS.
  // const ventSystemType = [
  //   // {value: useBase && `${systemId.base}vent`, xpath: `Building[0]/BuildingDetails/Systems/WaterHeating/WaterHeatingSystem[${applianceIndex}]/CombustionVentingSystem/$/id`},
  //   // {value: useImpr && `${systemId.improved}vent`, xpath: `Building[1]/BuildingDetails/Systems/WaterHeating/WaterHeatingSystem[${applianceIndex}]/CombustionVentingSystem/$/id`},
  //   {value: useBase && `${systemId.base}vent`, xpath: `Building[0]/BuildingDetails/Systems/CombustionVentilation/CombustionVentilationSystem[${applianceWithinZoneIndex}]/SystemIdentifier/$/id`},
  //   {value: useBase && appliance.get('caz_appliance_vent_system_type'), xpath: `Building[0]/BuildingDetails/Systems/CombustionVentilation/CombustionVentilationSystem[${applianceWithinZoneIndex}]/VentSystemType`},
  //   {value: useImpr && `${systemId.improved}vent`, xpath: `Building[1]/BuildingDetails/Systems/CombustionVentilation/CombustionVentilationSystem[${applianceWithinZoneIndex}]/SystemIdentifier/$/id`},
  //   {value: useImpr && appliance.get('caz_appliance_vent_system_type_improved'), xpath: `Building[1]/BuildingDetails/Systems/CombustionVentilation/CombustionVentilationSystem[${applianceWithinZoneIndex}]/VentSystemType`},
  // ]

  // All values inside FuelLeaks need to exist or else the entire FuelLeaks node can't exist
  const fuelLeaksIdentifiedBase = appliance.get('caz_fuel_leaks_identified')
  const fuelLeaksAddresssedBase = appliance.get('caz_fuel_leaks_addressed')
  const fuelLeaksIdentifiedImp = appliance.get('caz_fuel_leaks_identified_improved')
  const fuelLeaksAddresssedImp = appliance.get('caz_fuel_leaks_addressed_improved')
  const fuelLeaksBase = burnsFuel(fuelTypes.base) && fuelLeaksIdentifiedBase && fuelLeaksAddresssedBase ? [
    {value: fuelType(fuelTypes.base), xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/FuelLeaks/FuelType`},
    {value: booleanType(appliance.get('caz_fuel_leaks_identified')), xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/FuelLeaks/LeaksIdentified`},
    {value: booleanType(appliance.get('caz_fuel_leaks_addressed')), xpath: `Building[0]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/FuelLeaks/LeaksAddressed`},
  ] : []
  const fuelLeaksImp = burnsFuel(fuelTypes.improved) && fuelLeaksIdentifiedImp && fuelLeaksAddresssedImp ? [
    {value: fuelType(fuelTypes.improved), xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/FuelLeaks/FuelType`},
    {value: booleanType(appliance.get('caz_fuel_leaks_identified_improved')), xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/FuelLeaks/LeaksIdentified`},
    {value: booleanType(appliance.get('caz_fuel_leaks_addressed_improved')), xpath: `Building[1]/BuildingDetails/HealthAndSafety/CombustionAppliances/CombustionApplianceZone[${zoneIndex}]/CombustionApplianceTest[${applianceWithinZoneIndex}]/FuelLeaks/LeaksAddressed`},
  ] : []

  return _([])
    .concat(refNodes, splillageTest, carbonMonoxideTest, orphanedVentilation, fuelLeaksBase, fuelLeaksImp)
    .flatten()
    .value()
}

// make sure this returns undefined and not false. False is a legit value & will show up in the xml
function burnsFuel(fuel: string): boolean {
  return _.includes(BURNABLE_FUEL_TYPES, fuel) ? true : undefined
}

function hvacSystemIdentifier(hvacInfo: Object, hvacXMLSysIds: Object): string {
  invariant(
    !_.isEmpty(hvacInfo),
    'hvacInfo argument to hvacSystemIdentifier should not be empty'
  )
  invariant(
    !_.isEmpty(hvacXMLSysIds),
    'hvacXMLSysIds argument to hvacSystemIdentifier should not be empty'
  )
  const {optimiserIndexes: {baseHeatIndex}} = hvacInfo
  const systemIdentifier = _.find(hvacXMLSysIds, sysId => sysId.omSlot === baseHeatIndex)
  return _.isObject(systemIdentifier)
    ? systemIdentifier.id
    : 'ErrorFindingXmlId'
}


function getBaseHvacXMLSysIds(parsedXMLJS: Object): Array {
  return _([0, 1, 2])
    .map(position => {
      const idPath = convertXPathToJsPath({xpath: `Building[0]/BuildingDetails/Systems/HVAC/HVACPlant/HeatingSystem[${position}]/SystemIdentifier/$/id`})
      const id = _.get(parsedXMLJS, idPath.jspath)
      return {
        id: id,
        omSlot: parseInt(String(id).slice(-1), 10)
      }
    })
    .filter(sysId => sysId.omSlot || sysId.omSlot === 0)
    .value()
}

function getImpHvacXMLSysIds(parsedXMLJS: Object): Array {
  return _([0, 1, 2])
    .map(position => {
      const idPath = convertXPathToJsPath({xpath: `Building[1]/BuildingDetails/Systems/HVAC/HVACPlant/HeatingSystem[${position}]/SystemIdentifier/$/id`})
      const sameasPath = convertXPathToJsPath({xpath: `Building[1]/BuildingDetails/Systems/HVAC/HVACPlant/HeatingSystem[${position}]/SystemIdentifier/$/sameas`})
      const id = _.get(parsedXMLJS, idPath.jspath)
      return {
        id: id,
        sameas: _.get(parsedXMLJS, sameasPath.jspath),
        omSlot: parseInt(String(id).slice(-1), 10)
      }
    })
    .filter(sysId => sysId.omSlot || sysId.omSlot === 0)
    .value()
}

/*
Cases for determining system identifiers:
https://docs.google.com/document/d/1H8iWkPZozd3bXoNzMCSWLIPeIQ656BaiAovf4Znczn0/edit

Case 1:
NG furnace in slot 1 with action of replace
building[0]: HVAC SystemIdentifier=BaseHeatingSystem1
building[1]: HVAC SystemIdentifier=ImpHeatingSystem1, sameas=BaseHeatingSystem1

Case 2:
NG furnace in slot 1 with action of keep existing
building[0]: HVAC SystemIdentifier=HeatingSystem1
building[1]: HVAC SystemIdentifier=RepeatHeatingSystem1, sameas=HeatingSystem1

Case 3:
Heat pump in slot 1
NG furnace in slot 2 with an action of replace
building[0]: HVAC SystemIdentifier=BaseHeatingSystem2
building[1]: HVAC SystemIdentifier=ImpHeatingSystem2, sameas=BaseHeatingSystem2

Case 4:
Electric Resistance in slot 1 with action of keep existing
NG furnace in slot 2 with an action of replace
building[0]: HVAC SystemIdentifier=BaseHeatingSystem2
building[1]: HVAC SystemIdentifier=ImpHeatingSystem2, sameas=BaseHeatingSystem2

Case 5:
Electric Resistance in slot 1 with action of remove existing
NG furnace in slot 1 with action of install new
building[1]: HVAC SystemIdentifier=ImpHeatingSystem1, sameas=BaseHeatingSystem2

Case 6:
Electric Resistance in slot 1 with action of remove existing
Heat Pump in slot 1 with action of install new
NG furnace in slot 2 with action of install new
building[1]: HVAC SystemIdentifier=ImpHeatingSystem2

Case 7:
Heat Pump in slot 1 with action of remove existing
Heat Pump in slot 2 with action of remove existing
NG Furnace in slot 1 with action of install new
NG Boiler in slot 2 with action of install new
building[1]: HVAC SystemIdentifier=ImpHeatingSystem1 & HVAC SystemIdentifier=ImpHeatingSystem2

Case 8:
Heat Pump in slot 1 with action of remove existing
NG Furnace in slot 1 with action of install new
NG Direct Heater in slot 2 with action of keep existing
NG Boiler in slot 3 with action of install new
building[0]: HVAC SystemIdentifier=HeatingSystem2
building[1]: HVAC SystemIdentifier=ImpHeatingSystem1 &
HVAC SystemIdentifier=RepeatHeatingSystem2, sameas=HeatingSystem2 &
HVAC SystemIdentifier=ImpHeatingSystem3
*/

// Util for finding the appropriate appliance fuel type

function applianceFuelTypeByUUID(state: Object, uuid: string, job_id: number, table: string): Object {
  switch (table) {
    case 'hvac': {
      const appliances = state.fn.hvacsByJobId(job_id)
      const appliance = _.find(appliances, appliance => appliance.get('uuid') === uuid)
      return {
        base: appliance.get(HVAC_FUEL_TYPE_KEYS.base),
        improved: appliance.get(HVAC_FUEL_TYPE_KEYS.improved)
      }
    }
    case 'dhw': {
      const appliances = state.fn.dhwsByJobId(job_id)
      const appliance = _.find(appliances, appliance => appliance.get('uuid') === uuid)
      return {
        base: appliance.get(DHW_FUEL_TYPE_KEYS.base),
        improved: appliance.get(DHW_FUEL_TYPE_KEYS.improved)
      }
    }

    // We have no way to change the fuel type for the following appliances
    // So we set improved fuel the same as base
    case 'oven': {
      const appliances = state.fn.ovensByJobId(job_id)
      const appliance = _.find(appliances, appliance => appliance.get('uuid') === uuid)
      return {
        base: appliance.get(OVEN_FUEL_TYPE_KEYS.base),
        improved: appliance.get(OVEN_FUEL_TYPE_KEYS.base)
      }
    }
    case 'range': {
      const appliances = state.fn.rangesByJobId(job_id)
      const appliance = _.find(appliances, appliance => appliance.get('uuid') === uuid)
      return {
        base: appliance.get(RANGE_FUEL_TYPE_KEYS.base),
        improved: appliance.get(RANGE_FUEL_TYPE_KEYS.base)
      }
    }
    case 'clothesDryer': {
      const appliances = state.fn.clothesDryersByJobId(job_id)
      const appliance = _.find(appliances, appliance => appliance.get('uuid') === uuid)
      return {
        base: appliance.get(DRYER_FUEL_TYPE_KEYS.base),
        improved: appliance.get(DRYER_FUEL_TYPE_KEYS.base)
      }
    }
  }
}

const HVAC_FUEL_TYPE_KEYS = {
  base: 'hvac_heating_energy_source',
  improved: 'hvac_heating_energy_source_improved'
}
const DHW_FUEL_TYPE_KEYS = {
  base: 'dhw_fuel_2',
  improved: 'dhw_fuel_2_improved'
}
const OVEN_FUEL_TYPE_KEYS = {
  base: 'oven_fuel_type',
  improved: 'oven_fuel_type_improved'
}
const RANGE_FUEL_TYPE_KEYS = {
  base: 'range_fuel_type',
  improved: 'range_fuel_type_improved'
}
const DRYER_FUEL_TYPE_KEYS = {
  base: 'clothes_dryer_fuel_type',
  improved: 'clothes_dryer_fuel_type_improved'
}
