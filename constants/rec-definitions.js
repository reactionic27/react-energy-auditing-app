module.exports = [
  {
    id: 1,
    type: "air_leakage",
    category: "Air Leakage",
    recName: "AirSeal",
    title: "Seal Air Leaks",
    inclusionKey: "AirSeal",
    improvedCostKey: "ImpInfilCost",
    whyItMatters: "Air sealing is typically the most cost effective improvement you can make to your home. To properly seal out air leaks, a large fan called a blower door is used to depressurize your house. This makes air leaks easy to find, so corrective measures can be taken. A good air sealing job will dramatically increase the comfort of your home and help you save significant energy.",
    helpLinks: [
      {
        title: 'Wind Zones & N Factors',
        url: 'https://snuggpro.com/help/article/wind-zones-n-factors'
      },
      {
        title: 'Air Sealing: negative savings',
        url: 'https://snuggpro.com/help/article/air-sealing-negative-savings'
      },
      {
        title: 'ASHRAE 62.2.2013',
        url: 'https://snuggpro.com/help/article/ashrae-62.2.2013'
      }
    ]
  },
  {
    id: 2,
    type: "attic",
    category: "Attic",
    recName: "Attic",
    title: "Insulate Attic",
    inclusionKey: "InsulateAttic",
    improvedCostKey: "ImpAtticCost",
    whyItMatters: "Adding insulation to your attic can lead to a significant reduction in your utility bills. This process is often combined with careful air sealing of the ceiling from the attic side to ensure the new insulation perform at its maximum level.",
    helpLinks: [
      {
        title: 'Attic Insulation Base Values',
        url: 'https://snuggpro.com/help/article/attic-insulation-base-value'
      },
      {
        title: 'Attics, Knee Walls, Vaults',
        url: 'https://snuggpro.com/help/article/knee-walls'
      },
      {
        title: 'Attic to Vault Conversion',
        url: 'https://snuggpro.com/help/article/attic-to-vault-conversion'
      },
      {
        title: 'Cool Roofs',
        url: 'https://snuggpro.com/help/article/cool-roofs'
      }
    ]
  },
  {
    id: 3,
    type: "basement",
    category: "Basement",
    recName: "BsmtSlab",
    title: "Insulate Basement",
    inclusionKey: "InsulateBG",
    improvedCostKey: "ImpBGCost",
    whyItMatters: "Insulating your basement walls will increase the overall temperature of your basement and make the floors above more comfortable. A fiberglass blanket with a vinyl backing can be installed along the basement walls. Or the walls can be framed out, insulated, and finished with drywall to make a \"finished basement\".",
    helpLinks: [
      {
        title: 'About rim joists',
        url: 'https://snuggpro.com/help/article/rim-joists'
      }
    ]
  },
  {
    id: 4,
    type: "cooling",
    category: "Cooling System",
    recName: "Cooling",
    title: "Upgrade Cooling System",
    inclusionKey: "CoolingSystem",
    improvedCostKey: "ImpCoolingCost",
    whyItMatters: "Install a more efficient air conditioner or evaporative cooler. Depending on the age of the unit, substantial savings may be gained by replacing it with an ENERGY STAR rated appliance. If it doesn't quite make sense to replace your air conditioner now, be prepared to choose a high efficiency ENERGY STAR unit (14 SEER or higher) when it finally wears out.",
    helpLinks: [
      {
        title: 'Adding / Editing HVAC systems',
        url: 'https://snuggpro.com/help/article/adding-a-new-hvac-system'
      },
      {
        title: 'HVAC: How to find model year',
        url: 'https://snuggpro.com/help/article/hvac-how-to-find-model-year'
      },
    ]
  },
  {
    id: 5,
    type: "crawl",
    category: "Crawl Space",
    recName: "Crawl",
    title: "Insulate Crawl Space",
    inclusionKey: "InsulateCrawl",
    improvedCostKey: "ImpCrawlCost",
    whyItMatters: "Insulating and \"conditioning\" your crawl space will increase the overall temperature of the space and make the floors above it more comfortable. Crawlspaces can be converted from an unconditioned to a conditioned space which includes sealing off any vents to the outside, insulating the foundation walls, and installing a vapor barrier on top of the dirt floor. It often includes adding a jump vent to the main conditioned space in the house or ducting the furnace and/or A/C into the crawlspace as well.",
    helpLinks: [
      {
        title: 'About crawl spaces',
        url: 'https://snuggpro.com/help/article/conditioning-the-crawl-space'
      },
      {
        title: 'About rim joists',
        url: 'https://snuggpro.com/help/article/rim-joists'
      }
    ]
  },
  {
    id: 6,
    type: "dhw",
    category: "Water Heater",
    recName: "DHW",
    title: "Upgrade Water Heater",
    inclusionKey: "UpgradeDHW",
    improvedCostKey: "ImpDHWCost",
    whyItMatters: "Replace your water heater with a tankless model or a heat pump water heater to save energy and reduce the ability for dangerous Carbon Monoxide to leak into your home.",
    helpLinks: [
      {
        title: 'Water Heater Product Finders',
        url: 'https://snuggpro.com/help/article/water-heater-product-finder'
      },
      {
        title: 'Energy Factors - Electric Water Heaters',
        url: 'https://snuggpro.com/help/article/upgrading-electric-storage-tank-water-heaters'
      },
      {
        title: 'Energy Factors - Gas Water Heaters',
        url: 'https://snuggpro.com/help/article/upgrading-gas-storage-tank-water-heaters'
      },
      {
        title: 'Energy Factors - Calculator for misc tanks',
        url: 'https://snuggpro.com/help/article/energy-factor-calculator-for-dhw-tanks'
      },
    ]
  },
  {
    id: 7,
    type: "dhw_temp",
    category: "Hot Water Temperature",
    recName: "DHWTemp",
    title: "Lower Hot Water Temp",
    inclusionKey: "LowerDHWTemp",
    improvedCostKey: "ImpDHWTempCost1"
  },
  {
    id: 8,
    type: "doors",
    category: "Doors",
    recName: "Door",
    title: "Replace Doors or Add Storm Doors",
    inclusionKey: "NewDoor",
    improvedCostKey: "ImpDoorCost",
    whyItMatters: "Adding storm door(s) or replacing your current exterior door(s) with insulated ones will help save energy and help reduce drafts.",
    helpLinks: [
      {
        title: 'Door Types & U Values',
        url: 'https://snuggpro.com/help/article/door-types-u-values'
      }
    ]
  },
  {
    id: 9,
    type: "duct",
    category: "Ducts",
    recName: "SealDucts",
    title: "Seal Duct Work",
    inclusionKey: "SealDucts",
    improvedCostKey: "ImpDuctCost",
    whyItMatters: "If you have a forced air system for heating or cooling, sealing the connections and penetrations with mastic will ensure that all of the air makes it to where it was designed to go. This increases the efficiency of your heating and cooling system and improves comfort. If you have a boiler system for heating, insulating the pipes will increase the effectiveness of the system.",
    helpLinks: [
      {
        title: 'Duct location',
        url: 'https://snuggpro.com/help/article/duct-insulation-encapsulated'
      },
      {
        title: 'Duct Insulation / Encapsulated',
        url: 'https://snuggpro.com/help/article/duct-insulation-encapsulated'
      }
    ]
  },
  {
    id: 10,
    type: "floor",
    category: "Frame Floor",
    recName: "Floor",
    title: "Insulate Frame Floor",
    inclusionKey: "InsulateFloor",
    improvedCostKey: "ImpFloorCost",
    whyItMatters: "Insulating floors above the garage and cantilevers can dramatically increase the comfort of bedrooms and other living spaces. This is done by drilling holes in the ceiling of the garage or floor of the cantilever and then filling the cavity between the floor joists with blown-in insulation.",
    helpLinks: [
      {
        title: 'Floors above Garage or Cantilevers',
        url: 'https://snuggpro.com/help/article/insulate-floors'
      }
    ]
  },
  {
    id: 11,
    type: "freezer",
    category: "Freezer",
    recName: "Freezer",
    title: "Replace Freezer",
    inclusionKey: "Freezer",
    improvedCostKey: "ImpFreezerCost",
    whyItMatters: "Old freezers can easily cost twice as much to operate as a new freezers. Replace your old freezer with a new ENERGY STAR model and be sure to recycle the old one (keeping it running in your garage or basement will use even more energy).",
    helpLinks: [
      {
        title: 'Appliance Product Finders',
        url: 'https://snuggpro.com/help/article/appliance-product-finders'
      }
    ]
  },
  {
    id: 12,
    type: "heating",
    category: "Heating System",
    recName: "Heating",
    title: "Upgrade Heating System",
    inclusionKey: "HeatingSystem",
    improvedCostKey: "ImpHeatCost",
    whyItMatters: "Install a more efficient furnace, boiler or heat pump. Depending on the age of the unit, substantial savings may be gained by replacing it with an ENERGY STAR rated appliance. If you're heating with gas, look for a sealed combustion unit. They're much safer since the exhaust pathway from the unit is sealed and goes directly outside. If it doesn't quite make sense to replace your heating system now, be prepared to replace it with a high efficiency ENERGY STAR unit when it finally wears out.",
    helpLinks: [
      {
        title: 'Adding / Editing HVAC systems',
        url: 'https://snuggpro.com/help/article/adding-a-new-hvac-system'
      },
      {
        title: 'HVAC: How to find model year',
        url: 'https://snuggpro.com/help/article/hvac-how-to-find-model-year'
      },
    ]
  },
  {
    id: 13,
    type: "lighting",
    category: "Lighting",
    recName: "CFL",
    title: "Upgrade Lighting",
    inclusionKey: "CFL",
    improvedCostKey: "ImpCFLCost"
  },
  {
    id: 14,
    type: "refrigerators",
    category: "Refrigerator",
    recName: "Refrigerator",
    title: "Refrigerator",
    inclusionKey: "Refrigerator",
    improvedCostKey: "ImpRefrigeratorCost",
    whyItMatters: "Old refrigerators can often cost twice as much to operate as a new refrigerator. Replace your old refrigerator with a new ENERGY STAR model and be sure to recycle the old one (keeping it running in your garage or basement will use even more energy).",
    helpLinks: [
      {
        title: 'Appliance Product Finders',
        url: 'https://snuggpro.com/help/article/appliance-product-finders'
      }
    ]
  },
  {
    id: 15,
    type: "thermostat",
    category: "Thermostat",
    recName: "Thermostat",
    title: "Thermostat Set Points",
    inclusionKey: "SetbackThermostat",
    improvedCostKey: "ImpThermostatCost",
    whyItMatters: "Installing a programmable thermostat (or correctly setting the one you currently have) will help you to use less energy when you're not at home or when you're sleeping.",
    helpLinks: [
      {
        title: 'About thermostat setpoints',
        url: 'https://snuggpro.com/help/article/thermostat-setpoints'
      }
    ]
  },
  {
    id: 16,
    type: "wall",
    category: "Walls",
    recName: "Walls",
    title: "Insulate Walls",
    inclusionKey: "InsulateWalls",
    improvedCostKey: "ImpWallCost",
    whyItMatters: "Insulating your walls can lead to a significant reduction in utility bills. The is done by drilling small holes in the wall cavities either from the inside or outside and filling the space with cellulose, fiberglass, or even foam insulation. If it's time to replace your exterior siding, then be sure to ask your contractor about adding a layer of rigid foam underneath the new sheathing of 1\" or more.",
    helpLinks: [
      {
        title: 'Exterior Wall Systems',
        url: 'https://snuggpro.com/help/article/exterior-wall-systems'
      }
    ]
  },
  {
    id: 17,
    type: "window",
    category: "Windows",
    recName: "Windows",
    title: "Upgrade Windows",
    inclusionKey: "Windows",
    improvedCostKey: "ImpWindowCost",
    whyItMatters: "Adding storm windows, solar screens or replacing your current windows can save energy and help reduce drafts or solar gain.",
    helpLinks: [
      {
        title: 'Multiple Window Systems',
        url: 'https://snuggpro.com/help/article/multiple-window-systems'
      },
      {
        title: 'Windows: U Value & SHGC',
        url: 'https://snuggpro.com/help/article/windows-u-value-shgc'
      }
    ]
  },
  {
    id: 18,
    type: "health",
    category: "Health & Safety",
    recName: null,
    title: "Health & Safety",
    inclusionKey: null,
    improvedCostKey: null
  },
  {
    id: 19,
    type: "custom",
    category: "Custom",
    recName: null,
    title: "Custom Recommendation",
    inclusionKey: null,
    improvedCostKey: null
  },
  {
    id: 20,
    type: "vault",
    category: "Vaulted Ceiling",
    recName: "Ceiling",
    title: "Insulate Vault",
    inclusionKey: "InsulateVault",
    improvedCostKey: "ImpCeilingCost",
    whyItMatters: "Vaulted ceilings are almost always poorly insulated. If your roof is in need of replacement, it's a perfect time to also insulate the area between the interior drywall and the roof deck. Dense packing this cavity with blown fiberglass or cellulose will help prevent significant heat loss.",
    helpLinks: [
      {
        title: 'Attics, Knee Walls, Vaults',
        url: 'https://snuggpro.com/help/article/knee-walls'
      },
      {
        title: 'Vault and Slope Calculations',
        url: 'https://snuggpro.com/help/article/calculating-vault-slopes'
      },
      {
        title: 'Attic to Vault Conversion',
        url: 'https://snuggpro.com/help/article/attic-to-vault-conversion'
      }
    ]
  },
  {
    id: 21,
    type: "pool",
    category: "Pool Pumps",
    recName: "Pool",
    title: "Upgrade Pool Pump",
    inclusionKey: "PoolPump",
    improvedCostKey: "ImpPoolPumpCost"
  },
  {
    id: 22,
    type: "dishwasher",
    category: "Dishwasher",
    recName: "Dishwasher",
    title: "Upgrade Dishwasher",
    inclusionKey: "Dishwasher",
    improvedCostKey: "ImpDishWasherCost",
    whyItMatters: "Old dishwashers can be energy and water hogs. When your current dishwasher breaks or otherwise needs to be replaced, be sure to choose an ENERGY STAR model with the highest Energy Factor (EF) that's within your budget. More information is available at http://www.energystar.gov.",
    helpLinks: [
      {
        title: 'Appliance Product Finders',
        url: 'https://snuggpro.com/help/article/appliance-product-finders'
      }
    ]
  },
  {
    id: 23,
    type: "clotheswasher",
    category: "Clotheswasher",
    recName: "ClothesWasher",
    title: "Upgrade Clotheswasher",
    inclusionKey: "ClothesWasher",
    improvedCostKey: "ImpClothesWasherCost",
    whyItMatters: "Old clothes washers can be energy and water hogs. When your current clothes washer breaks or otherwise needs to be replaced, be sure to choose a front loading ENERGY STAR model with the highest Modified Energy Factor (MEF) that's within your budget. More information is available at http://www.energystar.gov.",
    helpLinks: [
      {
        title: 'Appliance Product Finders',
        url: 'https://snuggpro.com/help/article/appliance-product-finders'
      }
    ]
  },
  {
    id: 24,
    type: "pv",
    category: "PV",
    recName: "PVProduction",
    title: "PV Production",
    inclusionKey: "PV",
    improvedCostKey: "ImpPVCost"
  }
].map(obj => {
  obj.helpLinks = obj.helpLinks || []
  return obj
})
