module.exports = [
  {
    recommendation: "Air Leakage",
    recommendationDefinitionId: 1,
    recommendationType: "air_leakage",
    fields: [
      "Blower Door Test Performed",
      "Blower Door Reading",
    ]
  },
  {
    recommendation: "Attic",
    recommendationDefinitionId: 2,
    recommendationType: "attic",
    fields: [
      "Modeled Attic Area",
      "Attic Insulation"
    ]
  },
  {
    recommendation: "Basement",
    recommendationDefinitionId: 3,
    recommendationType: "basement",
    fields: [
      "Modeled Basement Wall Area",
      "Modeled Basement Floor Area",
      "Basement Cavity Insulation",
      "Basement Continuous Insulation",
    ]
  },
  {
    recommendation: "Cooling System",
    recommendationDefinitionId: 4,
    recommendationType: "cooling",
    fields: [
      "System Equipment Type",
      "Upgrade action",
      "% of Total Cooling Load",
      "Cooling System Efficiency",
      "Cooling System Model Year"
    ]
  },
  {
    recommendation: "Crawl Space",
    recommendationDefinitionId: 5,
    recommendationType: "crawl",
    fields: [
      "Crawlspace Type",
      "Modeled Crawl Floor Area",
      "Modeled Crawl Wall Area",
      "Crawl Wall Insulation",
      "Crawl Cavity Insulation",
    ]
  },
  {
    recommendation: "Water Heater",
    recommendationDefinitionId: 6,
    recommendationType: "dhw",
    fields: [
      "DHW Fuel2",
      "DHW Type2",
      "DHW % Load",
      "DHW Energy Factor",
      "DHW Model Year"

    ]
  },
  {
    recommendation: "Hot Water Temperature",
    recommendationDefinitionId: 7,
    recommendationType: "dhw_temp",
    fields: [
      "DHW Temp"
    ]
  },
  {
    recommendation: "Doors",
    recommendationDefinitionId: 8,
    recommendationType: "doors",
    fields: [
      "Door Area",
      "Door Energy Star",
      "Door %{n} U Value"
    ]
  },
  {
    recommendation: "Ducts",
    recommendationDefinitionId: 9,
    recommendationType: "duct",
    fields: [
      "Duct Location",
      "Duct Insulation",
      "Duct Insulation Value",
      "Duct Leakage",
      "Duct Leakage Value",
      "Duct Efficiency",
    ]
  },
  {
    recommendation: "Frame Floor",
    recommendationDefinitionId: 10,
    recommendationType: "floor",
    fields: [
      "Floor Cavity Insulation",
      "Floor Continuous Insulation",
      "Modeled Floor Area"
    ]
  },
  {
    recommendation: "Freezer",
    recommendationDefinitionId: 11,
    recommendationType: "freezer",
    fields: [
      "Freezer Energy Star",
      "Freezer Usage",
      "Freezer Manufacturer",
      "Freezer Model",
      "Freezer Model Year"
    ]
  },
  {
    recommendation: "Heating System",
    recommendationDefinitionId: 12,
    recommendationType: "heating",
    fields: [
      "System Equipment Type",
      "Upgrade action",
      "% of Total Heating Load",
      "Heat Pump Inverter",
      "Heating Energy Source",
      // "Heating Capacity",
      "Heating System Efficiency",
      // "Heating System Manufacturer",
      // "Heating System Model",
      "Heating System Model Year",
    ]
  },
  {
    recommendation: "Lighting",
    recommendationDefinitionId: 13,
    recommendationType: "lighting",
    fields: [
      "# of CFLs installed",
      "# of CFLs or LEDs",
      "# of LEDs",
      "# of Incandescents"
    ]
  },
  {
    recommendation: "Refrigerator",
    recommendationDefinitionId: 14,
    recommendationType: "refrigerators",
    fields: [
      "Refrigerator Energy Star",
      "Refrigerator Usage",
      "Refrigerator Manufacturer",
      "Refrigerator Model",
      "Refrigerator Model Year"
    ]
  },
  {
    recommendation: "Thermostat",
    recommendationDefinitionId: 15,
    recommendationType: "thermostat",
    fields: [
      "Heating Setpoint High",
      "Heating Setpoint Low",
      "Cooling Setpoint High",
      "Cooling Setpoint Low"
    ]
  },
  {
    recommendation: "Walls",
    recommendationDefinitionId: 16,
    recommendationType: "wall",
    fields: [
      "Modeled Wall Area",
      "Exterior Wall Siding",
      "Exterior Wall Construction",
      "Wall Cavity Insulation",
      "Wall Continuous Insulation"
    ]
  },
  {
    recommendation: "Windows",
    recommendationDefinitionId: 17,
    recommendationType: "window",
    fields: [
      // "Window Energy Star",
      "Efficiency",
      "Solar Heat Gain Coefficient",

      "Window: North Area Percent",
      "Window: East Area Percent",
      "Window: South Area Percent",
      "Window: West Area Percent",

      // "Window Area: North",
      // "Window Area: East",
      // "Window Area: South",
      // "Window Area: West",
      // "Exterior Treatment: North",
      // "Exterior Treatment: East",
      // "Exterior Treatment: South",
      // "Exterior Treatment: West"
    ]
  },
  {
    recommendation: "Vaulted Ceiling",
    recommendationDefinitionId: 20,
    recommendationType: "vault",
    fields: [
      "Modeled Vault Area",
      "Vault Cavity Insulation",
      "Vault Continuous Insulation",
      // "Vault Cool Roof?",
      // "Vault Roof Absorptance",
      // "Vault Roof Emissivity"
    ]
  },
  {
    recommendation: "Pool Pumps",
    recommendationDefinitionId: 21,
    recommendationType: "pool",
    fields: [
      "Pool Pump Type",
      "Pool Size",
      "Pool Pump Horsepower",
      "Pool Pump Days Per Year",
      "Pool Pump Hours",
      "Pool Pump Turnover",
      "Pool Pump Manufacturer",
      "Pool Pump Model"
    ]
  },
  {
    recommendation: "Dishwasher",
    recommendationDefinitionId: 22,
    recommendationType: "dishwasher",
    fields: [
      "Dishwasher Installed?",
      "Dishwasher Energy Star",
      "Dishwasher Energy Factor",
      "Dishwasher Model",
      "Dishwasher Manufacturer",
      "Dishwasher Model Year"
    ]
  },
  {
    recommendation: "Clotheswasher",
    recommendationDefinitionId: 23,
    recommendationType: "clotheswasher",
    fields: [
      "Clothes Washer Type",
      "Clothes Washer Energy Star",
      "Clothes Washer MEF",
      "Clothes Washer Manufacturer",
      "Clothes Washer Model",
      "Clothes Washer Model Year"
    ]
  },
  {
    recommendation: "PV Production",
    recommendationDefinitionId: 24,
    recommendationType: "pv",
    fields: [
      "PV",
      "PV Array Size",
      "PV Array Slope",
      "PV Array Orientation",
      "PV Module Year"
    ]
  }
]
