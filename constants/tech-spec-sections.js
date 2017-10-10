export default [
  {
    "label":"Property Details",
    "fields":{
      "basedata": [
        "Year Built",
        "Conditioned Area",
        "Includes Basement",
        "Average Wall Height",
        "House Length",
        "House Width",
        "Floors Above Grade",
        "Number of Occupants",
        "Number of Bedrooms",
        "Number of Units",
        "Type of Home",
        "Front of Building Orientation",
        "Shielding",
        "Tuck Under Garage",
        "Garage Size"
      ]
    }
  },
  {
    "label":"Thermostat",
    "fields":{
      "basedata": [
        "Programmable Thermostat Installed",
        "Heating Setpoint High",
        "Heating Setpoint Low",
        "Cooling Setpoint High",
        "Cooling Setpoint Low"
      ]
    }
  },
  {
    "label":"Heating & Cooling",
    "fields":{
      "basedata":["Heating Design Load"],
      "hvac": [
        "System Name",
        "System Equipment Type",
        "Upgrade action",
        "Heat Pump Inverter",

        "Heating Energy Source",
        "% of Total Heating Load",
        "Heating Capacity",
        "Heating System Efficiency",
        "Heating System Manufacturer",
        "Heating System Model",
        "Heating System Model Year",


        "% of Total Cooling Load",
        "Cooling Capacity",
        "Cooling System Efficiency",
        "Cooling System Manufacturer",
        "Cooling System Model",
        "Cooling System Model Year",


        "Duct Location",
        "Duct Insulation",
        "Duct Insulation Value",
        "Duct Leakage",
        "Duct Leakage Value",
        "Duct Efficiency"
      ]
    }
  },
  {
    "label":"Appliances",
    "fields":{
      "range": [
        "Range Fuel Type",
      ],
      "oven": [
        "Oven Fuel Type",
      ],
      "clothesDryer": [
        "Clothes Dryer Fuel Type",
      ]
    }
  },
  {
    "label":"Clothes Washer",
    "fields":{
      "basedata": [
        "Clothes Washer Type",
        "Clothes Washer MEF",
        "Clothes Washer Energy Star",
        "Clothes Washer Manufacturer",
        "Clothes Washer Model",
        "Clothes Washer Model Year",
      ],
    }
  },
  {
    "label":"Dishwasher",
    "fields":{
      "basedata": [
        "Dishwasher Installed?",
        "Dishwasher Energy Factor",
        "Dishwasher Energy Star",
        "Dishwasher Model",
        "Dishwasher Manufacturer",
        "Dishwasher Model Year"
      ],
    }
  },
  {
    "label":"Freezers",
    "fields":{
      "freezer": [
        "Freezer Name",
        "Freezer Usage",
        "Freezer Energy Star",
        "Freezer Manufacturer",
        "Freezer Model",
        "Freezer Model Year"
      ]
    }
  },
  {
    "label":"Refrigerators",
    "fields":{
      "refrigerator": [
        "Refrigerator Name",
        "Refrigerator Age",
        "Refrigerator Size",
        "Refrigerator Energy Star",
        "Refrigerator Usage",
        "Refrigerator Manufacturer",
        "Refrigerator Model",
        "Refrigerator Model Year"
      ]
    }
  },
  {
    "label":"Lighting",
    "fields":{
      "basedata": [
        "% CFLs or LEDs",
        "Total # of Light Bulbs",
        "# of CFLs installed",
        "# of CFLs or LEDs",
        "# of LEDs",
        "# of Incandescents"
      ]
    }
  },
  {
    "label":"Doors",
    "fields":{
      "door": [
        "Door %{n} Type",
        "Door Area",
        "Door Energy Star",
        "Door %{n} U Value"
      ]
    }
  },
  {
    "label":"Exterior Walls",
    "fields":{
      "basedata":[
        "Shared Walls North",
        "Shared Walls East",
        "Shared Walls South",
        "Shared Walls West"
      ],
      "wall": [
        "Modeled Wall Area",
        "Walls Insulated?",
        "Exterior Wall Siding",
        "Exterior Wall Construction",
        "Wall Cavity Insulation",
        "Wall Cavity Insulation Type",
        "Wall Continuous Insulation",
        "Wall Continuous Insulation Type"
      ]
    }
  },

  {
    "label":"Attic & Vaulted Ceiling",
    "fields":{
      "basedata":[
        "% of Ceilings Shared"
      ],
      "attic": [
        "Modeled Attic Area",
        "Insulation Depth",
        "Insulation Type",
        "Attic Insulation",
        "Radiant Barrier?",
        "Has Knee Wall?",
        "Knee Wall Area",
        "Knee Wall Insulation",
        "Knee Wall Insulation Type",
        "Knee Wall Continuous Insulation",
        "Knee Wall Continuous Insulation Type",
        "Attic Cool Roof?",
        "Attic Roof Absorptance",
        "Attic Roof Emissivity"
      ],
      "vault":[
        "Modeled Vault Area",
        "Vault %{n}",
        "Vault Cavity Insulation",
        "Vault Cavity Insulation Type",
        "Vault Continuous Insulation",
        "Vault Continuous Insulation Type",
        "Vault Cool Roof?",
        "Vault Roof Absorptance",
        "Vault Roof Emissivity"
      ]
    }
  },

  {
    "label":"Foundation - General",
    "fields":{
      "basedata": [
        "Foundation: Basement",
        "Foundation: Crawlspace",
        "Foundation: Slab",
        "% of Floors Shared",
        "Foundation Above Grade Height"
      ]
    }
  },
  {
    "label":"Foundation - Basement",
    "fields":{
      "basedata": [
        "Modeled Basement Floor Area",
        "Basement Wall Insulation",
        "Basement Cavity Insulation",
        "Basement Cavity Insulation Type",
        "Basement Continuous Insulation",
        "Basement Continuous Insulation Type",
        "Basement Rim Joist Treatment",
        "Basement Rim Joist Insulation",
        "Basement Rim Joist Insulation Type",
        "Basement Heating",
        "Basement Cooling",
      ]
    }
  },
  {
    "label":"Foundation - Crawlspace",
    "fields":{
      "basedata": [
        "Modeled Crawl Floor Area",
        "Crawlspace Type",
        "Crawlspace Insulation",
        "Crawl Wall Insulation",
        "Crawl Wall Insulation Type",
        "Crawl Cavity Insulation",
        "Crawl Cavity Insulation Type",
        "Crawlspace Rim Joist Treatment",
        "Crawlspace Rim Joist Insulation",
        "Crawlspace Rim Joist Insulation Type"
      ]
    }
  },
  {
    "label":"Frame Floors",
    "fields":{
      "basedata": [
        "Modeled Floor Area",
        "Floor Cavity Insulation",
        "Floor Cavity Insulation Type",
        "Floor Continuous Insulation",
        "Floor Continuous Insulation Type"
      ]
    }
  },
  {
    "label":"Windows",
    "fields":{
      "window": [
        "Window Area: North",
        "Window Area: East",
        "Window Area: South",
        "Window Area: West",
        "Window Type",
        "Window Frame",
        "Window Energy Star",
        "Efficiency",
        "Solar Heat Gain Coefficient",
        "North Overhang Depth",
        "East Overhang Depth",
        "South Overhang Depth",
        "West Overhang Depth",
        "Exterior Treatment: North",
        "Exterior Treatment: East",
        "Exterior Treatment: South",
        "Exterior Treatment: West"
      ]
    }
  },
  {
    "label":"Skylights",
    "fields":{
      "basedata": [
        "Skylight Area"
      ]
    }
  },

  {
    "label":"Air Leakage",
    "fields":{
      "basedata": [
        "Blower Door Reading",
        "Conditioned Air Volume",
        "Wind Zone",
        "N-Factor",
        "Equivalent NACH",
        "Effective Leakage Area",
        "Equivalent ACH50",
        "ASHRAE Kitchen Fan CFM",
        "ASHRAE Bathroom Fan 1 CFM",
        "ASHRAE Bathroom Fan 2 CFM",
        "ASHRAE Bathroom Fan 3 CFM",
        "ASHRAE Bathroom Fan 4 CFM",
        "ASHRAE Required Additional CFM",
      ]
    }
  },

  {
    "label":"Water Heating",
    "fields":{
      "dhw": [
        "DHW % Load",
        "DHW Fuel2",
        "DHW Type2",
        "DHW Age",
        "DHW Location",
        "DHW Temperature Settings",
        "DHW Energy Star",
        "DHW Energy Factor",
        "DHW Manufacturer",
        "DHW Model",
        "DHW Model Year",
      ]
    }
  },
  {
    "label":"Pool & Hot Tub",
    "fields":{
      "basedata": [
        "Pool",
        "Pool Pump Type",
        "Pool Pump Horsepower",
        "Pool Pump Days Per Year",
        "Pool Pump Hours",
        "Pool Pump Turnover",
        "Pool Pump Manufacturer",
        "Pool Pump Model",
        "Hot Tub"
      ]
    }
  },
  {
    "label":"PV",
    "fields":{
      "pv": [
        "PV",
        "PV Array Size",
        "PV Array Slope",
        "PV Array Orientation",
        "PV Module Year",
        "PV Annual Production"
      ]
    }
  },
  {
    "label":"Utilities",
    "fields":{
      "basedata": [
        "Utility Price: Natural Gas",
        "Utility Price: Propane",
        "Utility Price: Fuel Oil",
        "Utility Price: Electricity",
        "Utility Price: Wood",
        "Utility Price: Pellets"
      ]
    }
  }

]
