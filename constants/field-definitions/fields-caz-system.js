import hpxmlOptions from '../hpxml-options'

const TestResultType = [
  "Passed",
  "Fail",
  "Not Tested",
].map(hpxmlOptions)

const VentSystem = [
  "",
  "Atmospheric",
  "Induced Draft",
  "Power Vented (at unit)",
  "Power Vented (at exterior)",
  "Direct Vented",
  "Sealed Combustion",
].map(hpxmlOptions)

export default [
  {
    name: "CAZ Uuid",
    label: "CAZ Uuid",
    outputColumn: 'caz_uuid'
  },
  {
    name: "CAZ Appliance CO Current Condition",
    label: "CO Current Condition",
    outputColumn: "caz_appliance_co_current_condition",
    description: "CAZ Appliance CO Current Condition",
    suffix: "PPM",
    decimals: 0,
    type: "PositiveInteger",
    hasImproved: true,
    csv: "CAZ > %{n} Appliance CO Current Condition"
  },
  {
    name: "CAZ Appliance CO Poor Scenario",
    label: "CO Poor Scenario",
    outputColumn: "caz_appliance_co_poor_scenario",
    description: "CAZ Appliance CO Poor Scenario",
    suffix: "PPM",
    decimals: 0,
    type: "PositiveInteger",
    hasImproved: true,
    csv: "CAZ > %{n} Appliance CO Poor Scenario"
  },
  {
    name: "CAZ Appliance CO Test Result",
    label: "CO Test Result",
    outputColumn: "caz_appliance_co_test_result",
    isSelect: true,
    hasImproved: true,
    type: "Radio",
    description: "CAZ Appliance CO Test Results: Passed or Failed",
    options: TestResultType,
    csv: "CAZ > %{n} Appliance CO Test Result"
  },
  {
    name: "CAZ Appliance Spillage Current Condition",
    label: "Spillage Current Condition",
    outputColumn: "caz_appliance_spillage_current_condition",
    description: "CAZ Appliance Spillage Test in Seconds",
    suffix: "Seconds",
    hasImproved: true,
    decimals: 0,
    type: "PositiveInteger",
    csv: "CAZ > %{n} Appliance Spillage Current Condition"
  },
  {
    name: "CAZ Appliance Spillage Poor Condition",
    label: "Spillage Poor Condition",
    outputColumn: "caz_appliance_spillage_poor_condition",
    description: "CAZ Appliance Spillage Test Poor Condition in Seconds",
    suffix: "Seconds",
    hasImproved: true,
    decimals: 0,
    type: "PositiveInteger",
    csv: "CAZ > %{n} Appliance Spillage Poor Condition"
  },
  {
    name: "CAZ Appliance Spillage Test Result",
    label: "Spillage Test Result",
    outputColumn: "caz_appliance_spillage_test_result",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "CAZ Appliance Spillage Test Results: Passed or Failed",
    options: TestResultType,
    csv: "CAZ > %{n} Appliance Spillage Test Result"
  },
  {
    name: "CAZ Appliance Vent System Type",
    label: "Vent System Type",
    outputColumn: "caz_appliance_vent_system_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "CAZ Appliance Vent System Type\t",
    options: VentSystem,
    csv: "CAZ > %{n} Appliance Vent System Type"
  },
  {
    name: "CAZ Water Heater Orphaned",
    label: "Water Heater Orphaned",
    outputColumn: "caz_water_heater_orphaned",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "Water Heater Combustion Ventilation Orphaned",
    yesNo: true,
    csv: "CAZ > %{n} Water Heater Orphaned"
  },
  {
    name: "CAZ Fuel Leaks Identified",
    label: "Fuel Leaks Identified",
    outputColumn: "caz_fuel_leaks_identified",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "Fuel Leaks Identified",
    yesNo: true,
    csv: "CAZ > %{n} Fuel Leaks Identified"
  },
  {
    name: "CAZ Fuel Leaks Addressed",
    label: "Fuel Leaks Addressed",
    outputColumn: "caz_fuel_leaks_addressed",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "Fuel Leaks Addressed",
    yesNo: true,
    csv: "CAZ > %{n} Fuel Leaks Addressed"
  }
].map(obj => {
  obj.label = obj.label || obj.name.slice(4)
  obj.outputTable = 'v5_caz_system'
  obj.collectionName = 'cazSystem'
  if (!obj.affectsModeling) {
    obj.affectsModeling = true
  }
  return obj
})
