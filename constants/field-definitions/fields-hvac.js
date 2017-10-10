export const UPGRADE_ACTIONS = [
  "",
  "Replace with a newer model",
  "Keep an existing system as is",
  "Remove a system permanently",
  "Install a new non-existing system"
]
export const IMPROVED_DUCK_LEAKAGE_OPTIONS = [
  "",
  {
    displayValue: "No Improvement",
    omValue: "No Improvement",
    // omDval: "186999999999"
  },
  {
    displayValue: "50% Reduction",
    omValue: "50% Reduction",
    // omDval: "202799999999"
  },
  {
    displayValue: "Seal to 15% Leakage",
    omValue: "Seal to 15% Leakage",
    // omDval: "23071C7J-D5FC-PHE4"
  },
  {
    displayValue: "Seal to 6% Leakage",
    omValue: "Seal to 6% Leakage",
    // omDval: "196799999999"
  },
  {
    displayValue: "6% - Well sealed",
    omValue: "6% - Well sealed",
    // omDval: "23071C7J-D5FC-PHE4"
  },
  {
    displayValue: "3% - Very tight",
    omValue: "3% - Very tight",
    // omDval: "196799999999"
  },
  {
    displayValue: "Measured (cfm25) - add cost manually",
    omValue: "Measured (cfm25)",
    // omDval: "211399999999"
  }
]

const EQUIPMENT_TYPE_OPTIONS = [
  "",
  // Heating
  "Boiler",
  {
    displayValue: "Furnace with standalone ducts",
    omValue: "Furnace"
  },
  {
    displayValue: "Electric Resistance",
    omValue: "Electric Baseboard"
  },
  "Direct Heater",
  {
    displayValue: "Stove or Insert",
    omValue: "Stove",
  },
  "Solar Thermal",

  // Cooling
  {
    displayValue: "Central AC with standalone ducts",
    omValue: "Central Air Conditioner"
  },
  {
    displayValue: "Room AC",
    omValue: "Room Air Conditioner"
  },
  {
    displayValue: "Evaporative Cooler - Direct",
    omValue: "Evaporative Cooler, Direct"
  },
  {
    displayValue: "Evaporative Cooler - Ducted",
    omValue: "Evaporative Cooler, Ducted"
  },

  // Heating & Cooling
  {
    displayValue: "Ductless Heat Pump",
    omValue: "Room Heat Pump"
  },
  {
    displayValue: "Central Heat Pump (shared ducts)",
    omValue: "Central Heat Pump, Ducted"
  },
  "Furnace / Central AC (shared ducts)"
]

export default [
  {
    name: "System Name",
    outputTable: "v5_hvac",
    outputColumn: "hvac_system_name",
    collectionName: "hvac",
    description: "Give this system a name that you can use to easily differentiate it from the others like: Old Heat Pump or Basement Furnace.",
    csv: "HVAC > System %{n} Name",
    affectsModeling: false,
    type: "Text",
    maxLength: 255
  },
  {
    name: "System Equipment Type",
    label: "Equipment Type",
    outputTable: "v5_hvac",
    outputColumn: "hvac_system_equipment_type",
    collectionName: "hvac",
    isSelect: true,
    type: "Select",
    description: "Select which type of HVAC system you'd like to describe. This list shows every possible type of heating or cooling system (or combination thereof) that is available in our software. Pay attention to the “shared ducts” vs. “standalone ducts” component. Note: this is very similar to the “Both” option that was available in version 4.",
    options: EQUIPMENT_TYPE_OPTIONS
  },
  {
    name: "Upgrade action",
    outputTable: "v5_hvac",
    outputColumn: "hvac_upgrade_action",
    collectionName: "hvac",
    isSelect: true,
    type: "Select",
    description: "Choose an action that you plan to take for this HVAC system.<strong>Replace with a newer model:</strong><br>Replace the existing equipment with a new version of the same thing. Eg. replace a 78 AFUE furnace with a new 98 AFUE furnace<br><strong>Keep an existing system as is:</strong><br>Do nothing to a system or just change the percent of total load that that old system covers in the house.<br><strong>Remove a system permanently:</strong><br>Rip out an entire system and replace it with something completely new, like going from a direct heater and room AC to a central heat pump. In this instance you will have a system that is described on the base side, and the improved side will be blank. <br><strong>Install a new existing system:</strong><br>A brand new system that replaces the system that was removed when you chose: Remove a system permanently.",
    options: UPGRADE_ACTIONS
  },
  {
    name: "Heating Energy Source",
    outputTable: "v5_hvac",
    outputColumn: "hvac_heating_energy_source",
    collectionName: "hvac",
    hvacGroup: 'heat',
    isSelect: true,
    type: 'Select',
    hasImproved: true,
    description: "This is the primary fuel source. It is used to set prices and energy content.",
    omA1BaseKey: "A1BaseHeatFuel%{heatingIndex}",
    omDirectSetImproved: "ImpHeatFuel%{heatingIndex}",
    options: [
      "",
      "None",
      {
        displayValue: "Electricity",
        omValue: "Elec"
      },
      {
        displayValue: "Natural Gas",
        omValue: "Gas"
      },
      "Propane",
      {
        displayValue: "Fuel Oil",
        omValue: "Oil"
      },
      "Pellets",
      "Wood",
      "Solar",
      "Don't Know"
    ],
    csv: "HVAC > Heating System %{n} Fuel"
  },
  {
    name: "Age of Heating Equipment",
    outputTable: "v5_hvac",
    outputColumn: "hvac_age_of_heating_equipment",
    collectionName: "hvac",
    hvacGroup: 'heat',
    isSelect: true,
    type: "Select",
    description: "Select the age range of the heating or cooling equipment.",
    omA1BaseKey: "A1BaseHeatAge%{heatingIndex}",
    options: [
      "",
      "0-5",
      "6-15",
      "16-40",
      "41+",
      "Don't Know"
    ],
    csv: "HVAC > Heating System %{n} Age"
  },
  {
    name: "% of Total Heating Load",
    outputTable: "v5_hvac",
    outputColumn: "hvac_percent_of_total_heating_load",
    collectionName: "hvac",
    hvacGroup: 'heat',
    hasImproved: true,
    description: "Enter the proportion of the total load for heating or cooling that this system represents. The combined heating load percentage for all heating systems specified must add up to 100%.",
    suffix: "%",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1BaseHeatPct%{heatingIndex}",
    omDirectSetImproved: "ImpHeatPct%{heatingIndex}",
    csv: "HVAC > Heating System %{n} % of Load"
  },
  {
    name: "Heating Capacity",
    outputTable: "v5_hvac",
    outputColumn: "hvac_heating_capacity",
    collectionName: "hvac",
    hvacGroup: 'heat',
    hasImproved: true,
    description: "Enter the output capacity of the heating equipment in (Btu/hr). <br><br><strong>NOTE:</strong> This has changed since v3 of Snugg Pro. v4 and later requires the number be in Btu/hr, not kBtu/hr. All v3 jobs that were migrated to v4 have been converted to the proper number by multiplying it by 1000.",
    suffix: "BTU/h",
    examples: "48000,100000",
    min: 1000,
    max: 1000000,
    checkit: ['range:1000:1000000'],
    decimals: 0,
    type: 'PositiveInteger',
    omDirectSetBase: "BaseHeatSize%{heatingIndex}",
    omDirectSetImproved: "ImpHeatSize%{heatingIndex}",
    csv: "HVAC > Heating System %{n} Capacity"
  },
  {
    name: "Duct Location",
    outputTable: "v5_hvac",
    outputColumn: "hvac_duct_location",
    collectionName: "hvac",
    hvacGroup: 'duct',
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the location of the duct work for this system.",
    omDirectSetBase: "Base%{__duct_type__}Delivery%{n}/value",
    omDirectSetImproved: "Imp%{__duct_type__}Delivery%{n}/value",
    options: [
      "",
      {
        displayValue: "Intentionally Conditioned Space",
        omValue: "2"
      },
      {
        displayValue: "Attic (unconditioned)",
        omValue: "1"
      },
      {
        displayValue: "Basement (unconditioned)",
        omValue: "3"
      },
      {
        displayValue: "Crawlspace (unconditioned)",
        omValue: "4"
      },
      {
        displayValue: "50/50 Attic - Basement (both unconditioned)",
        omValue: "5"
      },
      {
        displayValue: "50/50 Attic (unconditioned) - Conditioned Space",
        omValue: "6"
      },
      {
        displayValue: "50/50 Attic - Crawlspace (both unconditioned)",
        omValue: "7"
      },
      {
        displayValue: "50/50 Basement (unconditioned) - Conditioned Space",
        omValue: "8"
      },
      {
        displayValue: "50/50 Crawlspace (unconditioned) - Conditioned Space",
        omValue: "9"
      },
      {
        displayValue: "70/30 Conditioned Space - Garage (unconditioned)",
        omValue: "10"
      }
    ],
    csv: "HVAC > Duct System %{n} Location"
  },
  {
    name: "Duct Insulation",
    outputTable: "v5_hvac",
    outputColumn: "hvac_duct_insulation",
    collectionName: "hvac",
    hvacGroup: 'duct',
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of insulation installed over the duct work for this system. Note: If ducts are covered wholly or partially by incidental insulation present in the cavity in which they are installed, then select the insulation type that most closely matches the average R-value of the insulation. If you know the actual duct insulation R-value, choose Measured (R-Value) and enter the data in the field below.",
    omDirectSetBase: "Base%{__duct_type__}DuctInsul%{n}/value",
    omDirectSetImproved: "Imp%{__duct_type__}DuctInsul%{n}/controlvalue",
    options: [
      "",
      {
        displayValue: "No Insulation",
        omValue: "195999999999"
      },
      {
        displayValue: "Duct Board 1\"",
        omValue: "196099999999"
      },
      {
        displayValue: "Duct Board 1.5\"",
        omValue: "196199999999"
      },
      {
        displayValue: "Duct Board 2\"",
        omValue: "196299999999"
      },
      {
        displayValue: "Fiberglass 1.25\"",
        omValue: "196399999999"
      },
      {
        displayValue: "Fiberglass 2\"",
        omValue: "196499999999"
      },
      {
        displayValue: "Fiberglass 2.5\"",
        omValue: "196599999999"
      },
      {
        displayValue: "Reflective bubble wrap",
        omValue: "196699999999"
      },
      {
        displayValue: "Measured (R Value)",
        omValue: "239699999999"
      }
    ],
    improvedOptions: [
      "",
      {
        displayValue: "No Insulation Improvement",
        omValue: "No Improvement",
        // omDval: "186799999999"
      },
      {
        displayValue: "R-6 Duct Insulation",
        omValue: "R-6 Duct Insulation"
        // omValue: "200999999999"
      },
      {
        displayValue: "R-8 Duct Insulation",
        omValue: "R-8 Duct Insulation"
        // omValue: "201099999999"
      },
      {
        displayValue: "Measured (R Value) - add cost manually",
        omValue: "Other"
        // omValue: "211299999999"
      }
    ],
    csv: "HVAC > Duct System %{n} Insulation"
  },
  {
    name: "Duct Leakage Value",
    outputTable: "v5_hvac",
    outputColumn: "hvac_duct_leakage_value",
    collectionName: "hvac",
    hvacGroup: 'duct',
    hasImproved: true,
    description: "If you perform a duct blaster test, please enter the tested leakage to outside at 25 Pa per RESNET Standard Section 803.7.",
    suffix: "CFM25",
    min: 0,
    max: 9999,
    checkit: ['range:0:9999'],
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "Base%{__duct_type__}DuctLeakage%{n}",
    omDirectSetImproved: "Imp%{__duct_type__}DuctLeakage%{n}",
    csv: "HVAC > Duct System %{n} Leakage Value"
  },
  {
    name: "Duct Efficiency",
    outputTable: "v5_hvac",
    outputColumn: "hvac_duct_efficiency",
    collectionName: "hvac",
    hvacGroup: 'duct',
    hasImproved: true,
    decimals: 2,
    description: "This is the overall delivery system efficiency for this distribution system. It is calculated based on the above duct leakage, location, and insulation values and is not editable. If you have chosen Intentionally Conditioned Space for the Duct Location, then the Duct Efficiency will always be 100% as the lost energy from the ducts is only lost into the building envelope and not to the outside.<br><br>\n\nAlso, if you have set the % of Total Load for this heating or cooling system to 0% (necessary when creating a brand new heating or cooling system or removing one), you will see the Duct Efficiency at 100%, since there is zero loss on a system that doesn't exist. ",
    suffix: "%",
    type: "Percentage",
    omDirectSetBase: "Base%{?__duct_type__}DuctEff%{n}",
    omDirectSetImproved: "Imp%{?__duct_type__}DuctEff%{n}",
    csv: "HVAC > Duct System %{n} Efficiency"
  },
  {
    name: "Age of Cooling Equipment",
    outputTable: "v5_hvac",
    outputColumn: "hvac_age_of_cooling_equipment",
    collectionName: "hvac",
    hvacGroup: 'cool',
    isSelect: true,
    type: "Select",
    description: "Select the age range of the heating or cooling equipment.",
    omA1BaseKey: "A1BaseCoolingYear%{coolingIndex}",
    options: [
      "",
      "0-5",
      "6-10",
      "11-15",
      "16-20",
      "21-25",
      "26-30",
      "31-35",
      "36+",
      "Don't Know"
    ],
    csv: "HVAC > Cooling System %{n} Age"
  },
  {
    name: "% of Total Cooling Load",
    outputTable: "v5_hvac",
    outputColumn: "hvac_percent_of_total_cooling_load",
    collectionName: "hvac",
    hvacGroup: 'cool',
    hasImproved: true,
    description: "Enter the proportion of the total load for heating or cooling that this system represents. The combined cooling load percentage for all cooling systems specified DOES NOT need to add up to 100%. If you set the cooling load to 70% and don't add any other cooling system, then the model assumes you're not conditioning 30% of the home's cooling load.",
    suffix: "%",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omDirectSetBase: "BaseCoolingPct%{coolingIndex}",
    omDirectSetImproved: "ImpCoolingPct%{coolingIndex}",
    csv: "HVAC > Cooling System %{n} % of Load"
  },
  {
    name: "Cooling Capacity",
    outputTable: "v5_hvac",
    outputColumn: "hvac_cooling_capacity",
    collectionName: "hvac",
    hvacGroup: 'cool',
    hasImproved: true,
    description: "Enter the output capacity of the cooling equipment in (Btu/hr). <br><br>Reminder: cooling systems are often rated in tons. 1 ton = 12,000 Btu/hr.<br><br><strong>NOTE:</strong> This has changed since v3 of Snugg Pro. v4 and later requires the number be in Btu/hr, not kBtu/hr. All v3 jobs that were migrated to v4 have been converted to the proper number by multiplying it by 1000.",
    suffix: "BTU/h",
    examples: "24000,48000",
    min: 1000,
    max: 1000000,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseCoolingSize%{coolingIndex}",
    omDirectSetImproved: "ImpCoolingSize%{coolingIndex}",
    csv: "HVAC > Cooling System %{n} Capacity"
  },
  {
    name: "Cooling System Efficiency",
    outputTable: "v5_hvac",
    outputColumn: "hvac_cooling_system_efficiency",
    collectionName: "hvac",
    hvacGroup: 'cool',
    hasImproved: true,
    description: "The Seasonal Energy Efficiency Ratio (SEER) is the average annual cooling efficiency of an air-conditioning or heat pump system as a weighted average of EERs over a range of rate outside air conditions following a standard test method. It includes energy of auxiliary systems such as the indoor and outdoor fans. Units: Btu/Wh. <br><br>\n\nThe Energy Efficiency Ratio (EER) is the measurement of the cooling capacity for a unit (in Btu/hour) divided by electrical energy it uses (in watts) at a specific temperature of 95ºF. Units: Btu/Wh. EER is only used for Room AC units.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "SEER",
    min: 1,
    max: 100,
    decimals: 1,
    type: "Numeric",
    omDirectSetBase: "BaseCoolingEff%{coolingIndex}/controlvalue",
    omDirectSetImproved: "ImpCoolingEff%{coolingIndex}/controlvalue",
    csv: "HVAC > Cooling System %{n} Efficiency"
  },
  {
    name: "Heating System Efficiency",
    outputTable: "v5_hvac",
    outputColumn: "hvac_heating_system_efficiency",
    collectionName: "hvac",
    hvacGroup: 'heat',
    hasImproved: true,
    description: "Annual Fuel Utilization Efficiency (AFUE) is a percentage representing the ratio of heat energy units provided to the total energy value of fuel consumed in identical units. It is most commonly used for combustion based heating as well as electric resistance heating.<br><br>\n\nHeating Seasonal Performance Factor (HSPF) is the ratio of Btus of heat energy provided to the watt-hours of electricity consumed. It is most commonly used for air and ground source heat pumps.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "AFUE",
    examples: "78,95",
    min: 0,
    max: 500,
    decimals: 1,
    type: "Numeric",
    omDirectSetBase: "BaseHeatEff%{heatingIndex}/controlvalue",
    omDirectSetImproved: "ImpHeatEff%{heatingIndex}/controlvalue",
    csv: "HVAC > Heating System %{n} Efficiency"
  },
  {
    name: "Duct Leakage",
    outputTable: "v5_hvac",
    outputColumn: "hvac_duct_leakage",
    collectionName: "hvac",
    hvacGroup: 'duct',
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Choose the estimated leakage to the outside through the duct system as a percentage of the total air handler flow. If you actually performed a duct blaster test, choose Measured (CFM25) and enter a value in the field below.",
    omDirectSetBase: "Base%{__duct_type__}DuctSealing%{n}/value",
    omDirectSetImproved: "Imp%{__duct_type__}DuctSealing%{n}/controlvalue",
    options: [
      "",
      {
        displayValue: "30% - Very leaky",
        omValue: "30"
      },
      {
        displayValue: "15% - Somewhat leaky",
        omValue: "15"
      },
      {
        displayValue: "6% - Well sealed",
        omValue: "6"
      },
      {
        displayValue: "3% - Very tight",
        omValue: "3"
      },
      {
        displayValue: "Measured (CFM25)",
        omValue: "Measured"
      }
    ],
    improvedOptions: IMPROVED_DUCK_LEAKAGE_OPTIONS,
    csv: "HVAC > Duct System %{n} Leakage "
  },
  {
    name: "Cooling System Manufacturer",
    outputTable: "v5_hvac",
    outputColumn: "hvac_cooling_system_manufacturer",
    collectionName: "hvac",
    hvacGroup: 'cool',
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Enter the Manufacturer of the Cooling Equipment.",
    omDirectSetBase: "ACCondBrand%{?coolingIndex}",
    omDirectSetImproved: "ImpACCondBrand%{coolingIndex}",
    options: [
      "",
      "Unknown",
      "AirEase",
      "Amana",
      "American Standard",
      "Bosch",
      "Bryant",
      "Carrier",
      "Coleman",
      "Comfort Maker",
      "Coolerado",
      "Daikin",
      "Day & Night",
      "Fridgidaire",
      "Fujitsu",
      "General Electric",
      "Goodman",
      "Janitrol",
      "Lennox",
      "LG",
      "Luxaire",
      "Mitsubishi",
      "Panasonic",
      "Payne",
      "Peerless",
      "Rheem",
      "RUUD",
      "Samsung",
      "Sears Kenmore",
      "Tappan",
      "Trane",
      "Utica",
      "York",
      "Other"
    ],
    csv: "HVAC > Cooling System %{n} Manufacturer"
  },
  {
    name: "Cooling System Model",
    outputTable: "v5_hvac",
    outputColumn: "hvac_cooling_system_model",
    collectionName: "hvac",
    type: "Text",
    maxLength: 255,
    hvacGroup: 'cool',
    hasImproved: true,
    description: "Enter the Model # of the Cooling Equipment.<br><br>\n\n<strong>Pro-tip</strong>: Always capture an image of the nameplate on the existing equipment and store it in the photos section for future reference. ",
    omDirectSetBase: "ACCondModelNum%{?coolingIndex}",
    omDirectSetImproved: "ImpACCondModelNum%{coolingIndex}",
    csv: "HVAC > Cooling System %{n} Model"
  },
  {
    name: "Cooling System Model Year",
    outputTable: "v5_hvac",
    outputColumn: "hvac_cooling_system_model_year",
    collectionName: "hvac",
    suffix: '#',
    hvacGroup: 'cool',
    hasImproved: true,
    description: "Enter the Year the Cooling Equipment was built.",
    examples: "1995,2014",
    min: 1900,
    max: 2030,
    decimals: 0,
    type: "Year",
    omDirectSetBase: "ACCondMfgDate%{?coolingIndex}",
    omDirectSetImproved: "ImpACCondYear%{coolingIndex}",
    csv: "HVAC > Cooling System %{n} Model Year"
  },
  {
    name: "Heating System Manufacturer",
    outputTable: "v5_hvac",
    outputColumn: "hvac_heating_system_manufacturer",
    collectionName: "hvac",
    hvacGroup: 'heat',
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Enter the Manufacturer of the Heating Equipment.",
    omDirectSetBase: "HeaterBrand%{?heatingIndex}",
    omDirectSetImproved: "ImpHeaterBrand%{heatingIndex}",
    options: [
      "",
      "Unknown",
      "AirEase",
      "Amana",
      "American Standard",
      "Bosch",
      "Bryant",
      "Carrier",
      "Coleman",
      "Comfort Master",
      "Daikin",
      "Day & Night",
      "Fujitsu",
      "General Electric",
      "Goodman",
      "Janitrol",
      "Lennox",
      "LG",
      "Luxaire",
      "Mitsubishi",
      "Payne",
      "Panasonic",
      "Peerless",
      "Rheem",
      "RUUD",
      "Samsung",
      "Sears Kenmore",
      "Tappan",
      "Trane",
      "Utica",
      "York",
      "Other"
    ],
    csv: "HVAC > Heating System %{n} Manufacturer"
  },
  {
    name: "Heating System Model Year",
    outputTable: "v5_hvac",
    outputColumn: "hvac_heating_system_model_year",
    collectionName: "hvac",
    hvacGroup: 'heat',
    hasImproved: true,
    description: "Enter the Year the Heating Equipment was built.",
    examples: "1998,2014",
    min: 1900,
    max: 2030,
    suffix: '#',
    decimals: 0,
    type: "Year",
    omDirectSetBase: "HeaterMfgDate%{?heatingIndex}",
    omDirectSetImproved: "ImpHeaterYear%{heatingIndex}",
    csv: "HVAC > Heating System %{n} Model Year"
  },
  {
    name: "Heating System Model",
    outputTable: "v5_hvac",
    outputColumn: "hvac_heating_system_model",
    collectionName: "hvac",
    hvacGroup: 'heat',
    type: "Text",
    maxLength: 255,
    hasImproved: true,
    description: "Enter the Model # of the Heating Equipment.<br><br>\n\n<strong>Pro-tip</strong>: Always capture an image of the nameplate on the existing equipment and store it in the photos section for future reference. ",
    omDirectSetBase: "HeaterModelNum%{?heatingIndex}",
    omDirectSetImproved: "ImpHeaterModelNum%{heatingIndex}",
    csv: "HVAC > Heating System %{n} Model"
  },
  {
    name: "Duct Insulation Value",
    outputTable: "v5_hvac",
    outputColumn: "hvac_duct_insulation_value",
    collectionName: "hvac",
    hvacGroup: 'duct',
    hasImproved: true,
    description: "If you know the actual R-value of the duct insulation, you may enter it here.",
    suffix: "R Value",
    min: 0,
    max: 100,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "Base%{__duct_type__}DuctInsulR%{n}",
    omDirectSetImproved: "Imp%{__duct_type__}DuctInsulR%{n}",
    csv: "HVAC > Duct System %{n} Insulation Value "
  },
  {
    name: "Heat Pump Inverter",
    outputTable: "v5_hvac",
    outputColumn: "hvac_heat_pump_inverter",
    collectionName: "hvac",
    hvacGroup: 'heat',
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "Select Yes if this heat pump has a variable speed or Inverter driven compressor. These extremely high efficiency units perform to much lower outside air temperatures than single speed units and require much less or no electric resistance backup heat.",
    omDirectSetBase: "BaseHeatInverter%{heatingIndex}",
    omDirectSetImproved: "ImpHeatInverter%{heatingIndex}",
    yesNo: true,
    csv: "HVAC > Heating System %{n} Heat Pump Inverter"
  },
].map(obj => {
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
