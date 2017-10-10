export default [
  {
    name: "DHW Fuel",
    label: "Fuel Type",
    outputTable: "v5_dhw",
    outputColumn: "dhw_fuel",
    collectionName: "dhw",
    isSelect: true,
    type: "Select",
    description: "Select the type of energy source used to provide domestic hot water for the home. Domestic hot water is typically the hot water that comes from the faucets, showers, bathtubs, washing machines and dishwashers in the home. If more than one type of energy source is used to provide hot water, select the type that provides the most gallons of hot water.",
    omA1BaseKey: "A1BaseDHWFuel%{n}",
    options: [
      "",
      {
        displayValue: "Electricity",
        omValue: "Elec"
      },
      {
        displayValue: "Natural Gas",
        omValue: "Gas"
      },
      {
        displayValue: "Fuel Oil",
        omValue: "Oil"
      },
      "Propane",
      "Solar",
      "None",
      "Don't Know"
    ],
    csv: "DHW > %{n} Fuel"
  },
  {
    name: "DHW Type",
    label: "System Type",
    outputTable: "v5_dhw",
    outputColumn: "dhw_type",
    collectionName: "dhw",
    isSelect: true,
    type: "Select",
    description: "Select the type of the hot water system that stores or delivers the domestic hot water for the home. If more than two type of system is used for hot water in the home, select the type for the one that delivers the most gallons of hot water to the home.<br><br>\n\n<strong>Note</strong>: If you have an Sidearm Tank to a Boiler (Indirect Tank), you will need to manually set the EF on the Water Heater Details. Please refer to the EF Calculator that's available in the knowledge base to determine the EF of the total system.",
    omA1BaseKey: "A1BaseDHWType%{n}",
    options: [
      "",
      {
        displayValue: "Standard tank",
        omValue: "Standard"
      },
      {
        displayValue: "Tank with extra insulation",
        omValue: "Well Insulated"
      },
      {
        displayValue: "Heat Pump",
        omValue: "Heat pump"
      },
      {
        displayValue: "Tankless (on-demand)",
        omValue: "Tankless"
      },
      {
        displayValue: "Sidearm Tank (set EF manually)",
        omValue: "Standard"
      },
      "Don't Know"
    ],
    csv: "DHW > %{n} Type"
  },
  {
    name: "DHW Age",
    label: "Age",
    outputTable: "v5_dhw",
    outputColumn: "dhw_age",
    collectionName: "dhw",
    isSelect: true,
    type: "Select",
    description: "Select the age in years of the hot water system that stores or delivers the domestic hot water for the home. If more than one type of system is used for hot water in the home, select the age for the one that delivers the most gallons of hot water to the home.",
    omA1BaseKey: "A1BaseDHWAge%{n}",
    options: [
      "",
      "0-5",
      "6-10",
      "11-15",
      "16-20",
      "21-25",
      "26-30",
      "31-35",
      "36+"
    ],
    csv: "DHW > %{n} Age Range"
  },
  {
    name: "DHW Location",
    label: "Location",
    outputTable: "v5_dhw",
    outputColumn: "dhw_location",
    collectionName: "dhw",
    isSelect: true,
    type: "Select",
    description: "Select the where the hot water system that stores or delivers the domestic hot water for the home is located. If more than one type of system is used for hot water in the home, select the location for the one that delivers the most gallons of hot water to the home.",
    omA1BaseKey: "A1BaseDHWLocation%{n}",
    options: [
      "",
      {
        displayValue: "Indoors and within heated area",
        omValue: "Indoors"
      },
      {
        displayValue: "Garage or Unconditioned Space",
        omValue: "Garage"
      },
      "Outbuilding",
      "Don't Know"
    ],
    csv: "DHW > %{n} Location"
  },
  {
    name: "DHW Temperature Settings",
    label: "Temperature Settings",
    outputTable: "v5_dhw",
    outputColumn: "dhw_temperature_settings",
    collectionName: "dhw",
    isSelect: true,
    type: "Select",
    description: "Select the temperature setting for the hot water system that stores or delivers the domestic hot water for the home. If more than one type of system is used for hot water in the home, select the temperature setting for the one that delivers the most gallons of hot water to the home.",
    omA1BaseKey: "A1BaseDHWTemp%{n}",
    options: [
      "",
      {
        displayValue: "Low (120-130 F)",
        omValue: "120-130"
      },
      {
        displayValue: "Medium (130-140 F)",
        omValue: "130-140"
      },
      {
        displayValue: "High (140-150 F)",
        omValue: "140-150"
      },
      {
        displayValue: "Very High (150+ F)",
        omValue: "150+"
      },
      "Don't Know"
    ],
    csv: "DHW > %{n} Temperature"
  },
  {
    name: "DHW Energy Factor",
    label: "Energy Factor",
    outputTable: "v5_dhw",
    outputColumn: "dhw_energy_factor",
    collectionName: "dhw",
    hasImproved: true,
    description: "Enter the rated Energy Factor of the water heater without a decimal. Sometimes, the Energy Factor of a water heater is expressed as 0.56 or 0.82. Enter it here as 56 or 82. The Min and Max values change based on the type of water heater. Energy Factors for most equipment can be found at ahridirectory.org.",
    suffix: "EF",
    examples: "56,82,220",
    min: 1,
    max: 100,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseDHWEff%{n}",
    omDirectSetImproved: "ImpDHWEff%{n}",
    csv: "DHW > %{n} Energy Factor"
  },
  {
    name: "DHW Temp",
    label: "Temp",
    outputTable: "v5_dhw",
    outputColumn: "dhw_temp",
    collectionName: "dhw",
    hasImproved: true,
    description: "Enter the temperature of the water produced by the water heating system.",
    suffix: "°F",
    min: 100,
    max: 200,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseDHWTemp%{n}",
    omDirectSetImproved: "ImpDHWTemp%{n}",
    csv: "DHW > %{n} Temperature Range"
  },
  {
    name: "DHW Manufacturer",
    label: "Manufacturer",
    outputTable: "v5_dhw",
    outputColumn: "dhw_manufacturer",
    collectionName: "dhw",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Enter the Manufacturer of the water heater.",
    omDirectSetBase: "DHWBrand%{?n}",
    omDirectSetImproved: "ImpDHWBrand%{n}",
    options: [
      "",
      "Unknown",
      "A.O. Smith",
      "American",
      "Bosch",
      "Bradford White",
      "Bryant",
      "Comfort Maker",
      "GE",
      "Navien",
      "Noritz",
      "Rinnai",
      "Sears",
      "Rheem",
      "State Industries",
      "Stiebel Eltron",
      "Takaji",
      "Triangle Tube",
      "Other"
    ],
    csv: "DHW > %{n} Manufacturer"
  },
  {
    name: "DHW Model",
    label: "Model",
    outputTable: "v5_dhw",
    outputColumn: "dhw_model",
    collectionName: "dhw",
    hasImproved: true,
    description: "Enter the Model number of the water heater.",
    omDirectSetBase: "DHWModelNum%{?n}",
    omDirectSetImproved: "ImpDHWModelNum%{n}",
    csv: "DHW > %{n} Model"
  },
  {
    name: "DHW Model Year",
    label: "Model Year",
    outputTable: "v5_dhw",
    outputColumn: "dhw_model_year",
    collectionName: "dhw",
    hasImproved: true,
    description: "Enter the model year of the water heater.",
    examples: "1998,2014",
    min: 1900,
    max: 2030,
    decimals: 0,
    type: "Year",
    omDirectSetBase: "DHWMfgDate%{?n}",
    omDirectSetImproved: "ImpDHWYear%{n}",
    csv: "DHW > %{n} Model Year"
  },
  {
    name: "DHW Type2",
    label: "Type",
    outputTable: "v5_dhw",
    outputColumn: "dhw_type_2",
    collectionName: "dhw",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Enter the type of water heater installed (BASE) or to be installed (IMPROVED).<br><br>\n\n<strong>Note</strong>: If you have an Sidearm Tank to a Boiler (Indirect Tank), you will need to choose \"Standard tank\" as the DHW type and manually set the EF on for Base and Improved. Please refer to the EF Calculator that's available in the knowledge base to determine the EF of the total system.",
    omDirectSetBase: "BaseDHWType%{n}",
    omDirectSetImproved: "ImpDHWType%{n}",
    options: [
      "",
      "Tank Water Heater",
      "Tankless Water Heater",
      {
        displayValue: "Heat Pump",
        omValue: "Heat Pump (Integrated)"
      }
    ],
    csv: "DHW > %{n} Type"
  },
  {
    name: "DHW % Load",
    label: "% of Total DWH Load",
    outputTable: "v5_dhw",
    outputColumn: "dhw_percent_load",
    collectionName: "dhw",
    hasImproved: true,
    description: "Percent of the annual DHW load met by this system. Both systems must add up to 100%.",
    suffix: "%",
    examples: "40,80",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omDirectSetBase: "BaseDHWPct%{n}",
    omDirectSetImproved: "ImpDHWPct%{n}",
    csv: "DHW > %{n} % of Load"
  },
  {
    name: "DHW Energy Star",
    label: "ENERGY STAR",
    outputTable: "v5_dhw",
    outputColumn: "dhw_energy_star",
    collectionName: "dhw",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "Select Yes if this Water Heater is ENERGY STAR Certified.",
    omDirectSetImproved: "ImpDHWEStar%{n}",
    yesNo: true,
    csv: "DHW > %{n} ENERGY STAR"
  },
  {
    name: "DHW Heating Capacity",
    label: "Heating Capacity",
    outputTable: "v5_dhw",
    outputColumn: "dhw_heating_capacity",
    collectionName: "dhw",
    hasImproved: true,
    description: "Enter the rated input capacity of the water heater in BTU/hr.",
    suffix: "BTU/hr",
    examples: "36000,54000",
    min: 1,
    max: 9999999,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseDHWSize%{n}/value",
    omDirectSetImproved: "ImpDHWSize%{n}/value",
    csv: "DHW > %{n} Heating Capacity"
  },
  {
    name: "DHW Tank Size",
    label: "Tank Size",
    outputTable: "v5_dhw",
    outputColumn: "dhw_tank_size",
    collectionName: "dhw",
    hasImproved: true,
    description: "Enter the tank size the water heater in gallons.",
    suffix: "Gallons",
    examples: "40,50",
    min: 1,
    max: 120,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseDHWGallons%{n}",
    omDirectSetImproved: "ImpDHWGallons%{n}",
    csv: "DHW > %{n} Tank Size"
  },
  {
    name: "DHW Recovery Efficiency",
    label: "Recovery Efficiency",
    outputTable: "v5_dhw",
    outputColumn: "dhw_recovery_efficiency",
    collectionName: "dhw",
    hasImproved: true,
    description: "Enter the system recovery efficiency of the water heater. This field is optional for modeling but is required for some utility programs such as NYSERDA.",
    suffix: "%",
    examples: "62,78",
    min: 1,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omDirectSetBase: "BaseDHWRecoveryEff%{n}",
    omDirectSetImproved: "ImpDHWRecoveryEff%{n}",
    csv: "DHW > %{n} Recovery Efficiency"
  },
  {
    name: "DHW Fuel2",
    label: "Fuel",
    outputTable: "v5_dhw",
    outputColumn: "dhw_fuel_2",
    collectionName: "dhw",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of energy source used to provide domestic hot water for the home. Domestic hot water is typically the hot water that comes from the faucets, showers, bathtubs, washing machines and dishwashers in the home. If more than one type of energy source is used to provide hot water, select the type that provides the most gallons of hot water.",
    omDirectSetBase: "BaseDHWFuel%{n}",
    omDirectSetImproved: "ImpDHWFuel%{n}",
    options: [
      "",
      {
        displayValue: "Electricity",
        omValue: "Elec"
      },
      {
        displayValue: "Natural Gas",
        omValue: "Gas"
      },
      {
        displayValue: "Fuel Oil",
        omValue: "Oil"
      },
      "Propane",
      "Solar",
      "None"
    ],
    csv: "DHW > %{n} Fuel"
  }
].map(obj => {
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
