import _ from 'lodash'
import moment from 'moment'
import {eucIncentivesCSV, xcelIncentivesCSV} from '../../../modules/data/formatters/programFormatters'
import {STAGES} from 'data/constants'

// This is the map of CSV columns -> Field Names

// Editing the left hand side will change the field name in the csv,
// the right hand side should either be a function or a field name

module.exports = Object.freeze({

  'Job > ID'({job}) {
    return job.id
  },

  'Program > Name': 'Program Name',

  // Job Info
  'Job > First Name': 'Job First name',
  'Job > Last Name': 'Job Last name',
  'Job > Address 1': 'Job Address 1',
  'Job > Address 2': 'Job Address 2',
  'Job > City': 'Job City',
  'Job > State': 'Job State',
  'Job > Zip': 'Job Zip',
  'Job > Phone': 'Job Phone',
  'Job > Email': 'Job Email',
  'Job > Renter or Own': 'Job Rent or own',
  'Job > Service Date & Time': 'Appointment Date & Time',
  'Job > Creation Date'({job}) {
    return moment(job.created_at).format('MM/DD/YYYY')
  },
  'Job > Updated Date'({job}) {
    return moment(job.updated_at).format('MM/DD/YYYY')
  },
  'Job > Stage'({job}) {
    const stage = STAGES.find(s => s[0] === job.stage_id)
    return stage ? stage[1] : 'Uncategorized';
  },
  'Job > Has Unmodeled Changes?'({job}) {
    if (job.has_unmodeled_changes === 1) {
      return 'Yes'
    }
    return 'No'
  },

  'Contractor > Company': 'Company Name',
  'Contractor > Name'({account}) {
    return account ? `${account.first_name || ''} ${account.last_name}` : 'Not found'
  },
  'Contractor > Email': 'Account: Email',
  'Contractor > Phone': 'Account: Personal Phone',
  'Contractor > Title': 'Account: Title',
  'Contractor > Certifications': 'Account: Certifications',

  // Basedata
  'Building > Year Built': 'Year Built',
  'Building > Conditioned Area': 'Conditioned Area',
  'Building > Conditioned Area Includes Basement': 'Includes Basement',
  'Building > Average Wall Height': 'Average Wall Height',
  'Building > House Length': 'House Length',
  'Building > House Width': 'House Width',
  'Building > Floors Above Grade': 'Floors Above Grade',
  'Building > Number Of Occupants': 'Number of Occupants',
  'Building > Number Of Bedrooms': 'Number of Bedrooms',
  'Building > Type Of Home': 'Type of Home',
  'Building > Orientation': 'Front of Building Orientation',
  'Building > Shielding': 'Shielding',
  'Building > Tuck Under Garage': 'Tuck Under Garage',
  'Building > Garage Size': 'Garage Size',

  'Multi-Family > Number of Units In Building': 'Number of Units',
  'MultiFamily > % of North Walls Shared': 'Shared Walls North',
  'MultiFamily > % of East Walls Shared': 'Shared Walls East',
  'MultiFamily > % of South Walls Shared': 'Shared Walls South',
  'MultiFamily > % of West Walls Shared': 'Shared Walls West',
  'MultiFamily > % of Ceilings Shared': '% of Ceilings Shared',
  'MultiFamily > % of Floors Shared': '% of Floors Shared',

  // Frame Floors
  'Frame Floor > Modeled Floor Area': 'Modeled Floor Area',
  'Frame Floor > Cavity Insulation R-Value Base': 'Floor Cavity Insulation',
  'Frame Floor > Cavity Insulation Type Base': 'Floor Cavity Insulation Type',
  'Frame Floor > Continuous Insulation R-Value Base': 'Floor Continuous Insulation',
  'Frame Floor > Continuous Insulation Type Base': 'Floor Continuous Insulation Type',
  'Frame Floor > Cavity Insulation R-Value Improved': 'Floor Cavity Insulation Improved',
  'Frame Floor > Cavity Insulation Type Improved': 'Floor Cavity Insulation Type Improved',
  'Frame Floor > Continuous Insulation R-Value Improved': 'Floor Continuous Insulation Improved',
  'Frame Floor > Continuous Insulation Type Improved': 'Floor Continuous Insulation Type Improved',

  concern: {
    'Concerns > Summary': 'Summary',
    'Concerns > Detail': 'Detail',
  },

  // Utilities
  'Utilities > Electric Provider Name': 'Electric Utility Provider Name',
  'Utilities > Electric Account Number': 'Electric Account Number',
  'Utilities > Fuel Provider Name': 'Fuel Utility Provider Name',
  'Utilities > Fuel Account Number': 'Fuel Account Number',
  'Utilities > Primary Heating Fuel Type': 'Primary Heating Fuel Type',
  'Utilities > Bill Entry Type': 'Bill Entry Type',
  'Utilities Detailed > Electric Bill Units': 'Electric Bill Units',
  'Utilities Detailed > Start Electric Date 1': 'Start Electric Date 1',
  'Utilities Detailed > End Electric Date 1': 'End Electric Date 1',
  'Utilities Detailed > End Electric Bill 1': 'End Electric Bill 1',
  'Utilities Detailed > End Electric Date 2': 'End Electric Date 2',
  'Utilities Detailed > End Electric Bill 2': 'End Electric Bill 2',
  'Utilities Detailed > End Electric Date 3': 'End Electric Date 3',
  'Utilities Detailed > End Electric Bill 3': 'End Electric Bill 3',
  'Utilities Detailed > End Electric Date 4': 'End Electric Date 4',
  'Utilities Detailed > End Electric Bill 4': 'End Electric Bill 4',
  'Utilities Detailed > End Electric Date 5': 'End Electric Date 5',
  'Utilities Detailed > End Electric Bill 5': 'End Electric Bill 5',
  'Utilities Detailed > End Electric Date 6': 'End Electric Date 6',
  'Utilities Detailed > End Electric Bill 6': 'End Electric Bill 6',
  'Utilities Detailed > End Electric Date 7': 'End Electric Date 7',
  'Utilities Detailed > End Electric Bill 7': 'End Electric Bill 7',
  'Utilities Detailed > End Electric Date 8': 'End Electric Date 8',
  'Utilities Detailed > End Electric Bill 8': 'End Electric Bill 8',
  'Utilities Detailed > End Electric Date 9': 'End Electric Date 9',
  'Utilities Detailed > End Electric Bill 9': 'End Electric Bill 9',
  'Utilities Detailed > End Electric Date 10': 'End Electric Date 10',
  'Utilities Detailed > End Electric Bill 10': 'End Electric Bill 10',
  'Utilities Detailed > End Electric Date 11': 'End Electric Date 11',
  'Utilities Detailed > End Electric Bill 11': 'End Electric Bill 11',
  'Utilities Detailed > End Electric Date 12': 'End Electric Date 12',
  'Utilities Detailed > End Electric Bill 12': 'End Electric Bill 12',
  'Utilities Detailed > Fuel Bill Units': 'Fuel Bill Units',
  'Utilities Detailed > Start Fuel Date 1': 'Start Fuel Date 1',
  'Utilities Detailed > End Fuel Date 1': 'End Fuel Date 1',
  'Utilities Detailed > End Fuel Bill 1': 'End Fuel Bill 1',
  'Utilities Detailed > End Fuel Date 2': 'End Fuel Date 2',
  'Utilities Detailed > End Fuel Bill 2': 'End Fuel Bill 2',
  'Utilities Detailed > End Fuel Date 3': 'End Fuel Date 3',
  'Utilities Detailed > End Fuel Bill 3': 'End Fuel Bill 3',
  'Utilities Detailed > End Fuel Date 4': 'End Fuel Date 4',
  'Utilities Detailed > End Fuel Bill 4': 'End Fuel Bill 4',
  'Utilities Detailed > End Fuel Date 5': 'End Fuel Date 5',
  'Utilities Detailed > End Fuel Bill 5': 'End Fuel Bill 5',
  'Utilities Detailed > End Fuel Date 6': 'End Fuel Date 6',
  'Utilities Detailed > End Fuel Bill 6': 'End Fuel Bill 6',
  'Utilities Detailed > End Fuel Date 7': 'End Fuel Date 7',
  'Utilities Detailed > End Fuel Bill 7': 'End Fuel Bill 7',
  'Utilities Detailed > End Fuel Date 8': 'End Fuel Date 8',
  'Utilities Detailed > End Fuel Bill 8': 'End Fuel Bill 8',
  'Utilities Detailed > End Fuel Date 9': 'End Fuel Date 9',
  'Utilities Detailed > End Fuel Bill 9': 'End Fuel Bill 9',
  'Utilities Detailed > End Fuel Date 10': 'End Fuel Date 10',
  'Utilities Detailed > End Fuel Bill 10': 'End Fuel Bill 10',
  'Utilities Detailed > End Fuel Date 11': 'End Fuel Date 11',
  'Utilities Detailed > End Fuel Bill 11': 'End Fuel Bill 11',
  'Utilities Detailed > End Fuel Date 12': 'End Fuel Date 12',
  'Utilities Detailed > End Fuel Bill 12': 'End Fuel Bill 12',

  'Utilities Simple > Highest Monthly Summer Electric Bill': 'Highest monthly summer electric bill',
  'Utilities Simple > Lowest Monthly Electric Bill': 'Lowest monthly electric bill',
  'Utilities Simple > Highest Monthly Winter Electric Bill': 'Highest monthly winter electric bill',
  'Utilities Simple > Highest Monthly Winter Natural Gas Bill': 'Highest monthly winter natural gas bill',
  'Utilities Simple > Lowest monthly Natural Gas Bill': 'Lowest monthly natural gas bill',
  'Utilities Simple > Fuel Units': 'Simple Fuel Units',
  'Utilities Simple > Total Fuel Used In Last 12 Months': 'Total %{type} Used in last 12 Months',

  'Utility Price > Natural Gas': 'Utility Price: Natural Gas',
  'Utility Price > Propane': 'Utility Price: Propane',
  'Utility Price > Fuel Oil': 'Utility Price: Fuel Oil',
  'Utility Price > Electricity': 'Utility Price: Electricity',
  'Utility Price > Wood': 'Utility Price: Wood',
  'Utility Price > Pellets': 'Utility Price: Pellets',


  'Thermostat > Programmable Thermostat Installed': 'Programmable Thermostat Installed',
  'Thermostat > Heating Setpoint High Base': 'Heating Setpoint High',
  'Thermostat > Heating Setpoint Low Base': 'Heating Setpoint Low',
  'Thermostat > Cooling Setpoint High Base': 'Cooling Setpoint High',
  'Thermostat > Cooling Setpoint Low Base': 'Cooling Setpoint Low',
  'Thermostat > Heating Setpoint High Improved': 'Heating Setpoint High Improved',
  'Thermostat > Heating Setpoint Low Improved': 'Heating Setpoint Low Improved',
  'Thermostat > Cooling Setpoint High Improved': 'Cooling Setpoint High Improved',
  'Thermostat > Cooling Setpoint Low Improved': 'Cooling Setpoint Low Improved',

  // Hvacs:
  hvac: {
    'HVAC $n > System Name': 'System Name',
    'HVAC $n > System Equipment Type': 'System Equipment Type',
    'HVAC $n > Upgrade Action': 'Upgrade action',

    'HVAC $n > Heating Energy Source Base': 'Heating Energy Source',
    'HVAC $n > Heat Pump Inverter Base': 'Heat Pump Inverter',
    'HVAC $n > % of Total Heating Load Base': '% of Total Heating Load',
    'HVAC $n > Heating System Model Year Base': 'Heating System Model Year',
    'HVAC $n > Heating System Efficiency Base': 'Heating System Efficiency',
    'HVAC $n > Heating Capacity Base': 'Heating Capacity',
    'HVAC $n > Heating System Manufacturer Base': 'Heating System Manufacturer',
    'HVAC $n > Heating System Model Base': 'Heating System Model',
    'HVAC $n > % of Total Cooling Load Base': '% of Total Cooling Load',
    'HVAC $n > Cooling System Model Year Base': 'Cooling System Model Year',
    'HVAC $n > Cooling System Efficiency Base': 'Cooling System Efficiency',
    'HVAC $n > Cooling Capacity Base': 'Cooling Capacity',
    'HVAC $n > Cooling System Manufacturer Base': 'Cooling System Manufacturer',
    'HVAC $n > Cooling System Model Base': 'Cooling System Model',
    'HVAC $n > Duct Location Base': 'Duct Location',
    'HVAC $n > Duct Leakage Base': 'Duct Leakage',
    'HVAC $n > Duct Leakage Value Base': 'Duct Leakage Value',
    'HVAC $n > Duct Insulation Base': 'Duct Insulation',
    'HVAC $n > Duct Insulation Value Base': 'Duct Insulation Value',
    'HVAC $n > Duct Efficiency Base': 'Duct Efficiency',

    'HVAC $n > Heating Energy Source Improved': 'Heating Energy Source Improved',
    'HVAC $n > Heat Pump Inverter Improved': 'Heat Pump Inverter Improved',
    'HVAC $n > % of Total Heating Load Improved': '% of Total Heating Load Improved',
    'HVAC $n > Heating System Model Year Improved': 'Heating System Model Year Improved',
    'HVAC $n > Heating System Efficiency Improved': 'Heating System Efficiency Improved',
    'HVAC $n > Heating Capacity Improved': 'Heating Capacity Improved',
    'HVAC $n > Heating System Manufacturer Improved': 'Heating System Manufacturer Improved',
    'HVAC $n > Heating System Model Improved': 'Heating System Model Improved',
    'HVAC $n > % of Total Cooling Load Improved': '% of Total Cooling Load Improved',
    'HVAC $n > Cooling System Model Year Improved': 'Cooling System Model Year Improved',
    'HVAC $n > Cooling System Efficiency Improved': 'Cooling System Efficiency Improved',
    'HVAC $n > Cooling Capacity Improved': 'Cooling Capacity Improved',
    'HVAC $n > Cooling System Manufacturer Improved': 'Cooling System Manufacturer Improved',
    'HVAC $n > Cooling System Model Improved': 'Cooling System Model Improved',
    'HVAC $n > Duct Location Improved': 'Duct Location Improved',
    'HVAC $n > Duct Leakage Improved': 'Duct Leakage Improved',
    'HVAC $n > Duct Leakage Value Improved': 'Duct Leakage Value Improved',
    'HVAC $n > Duct Insulation Improved': 'Duct Insulation Improved',
    'HVAC $n > Duct Insulation Value Improved': 'Duct Insulation Value Improved',
    'HVAC $n > Duct Efficiency Improved': 'Duct Efficiency Improved',
  },

  //Applianecs
  range: {
    'Appliances > Range Fuel Type': 'Range Fuel Type'
  },
  oven: {
    'Appliances > Oven Fuel Type': 'Oven Fuel Type',
  },
  clothesDryer: {
    'Appliances > Clothes Dryer Fuel Type': 'Clothes Dryer Fuel Type',
  },
  'Clothes Washer > Type Base': 'Clothes Washer Type',
  'Clothes Washer > IMEF Base': 'Clothes Washer MEF',
  'Clothes Washer > ENERGY STAR Base': 'Clothes Washer Energy Star',
  'Clothes Washer > Manufacturer Base': 'Clothes Washer Manufacturer',
  'Clothes Washer > Model Base': 'Clothes Washer Model',
  'Clothes Washer > Model Year Base': 'Clothes Washer Model Year',
  'Clothes Washer > Type Improved': 'Clothes Washer Type Improved',
  'Clothes Washer > IMEF Improved': 'Clothes Washer MEF Improved',
  'Clothes Washer > Energy Usage Improved': 'Clothes Washer Energy Usage Improved',
  'Clothes Washer > Water Usage Improved': 'Clothes Washer Water Usage Improved',
  'Clothes Washer > ENERGY STAR Improved': 'Clothes Washer Energy Star Improved',
  'Clothes Washer > Manufacturer Improved': 'Clothes Washer Manufacturer Improved',
  'Clothes Washer > Model Improved': 'Clothes Washer Model Improved',
  'Clothes Washer > Model Year Improved': 'Clothes Washer Model Year Improved',

  'Dishwasher > Has Dishwasher Base': 'Dishwasher Installed?',
  'Dishwasher > ENERGY STAR Base': 'Dishwasher Energy Star',
  'Dishwasher > Energy Factor Base': 'Dishwasher Energy Factor',
  'Dishwasher > Manufacturer Base': 'Dishwasher Manufacturer',
  'Dishwasher > Model Base': 'Dishwasher Model',
  'Dishwasher > Model Year Base': 'Dishwasher Model Year',
  'Dishwasher > Has Dishwasher Improved': 'Dishwasher Installed? Improved',
  'Dishwasher > ENERGY STAR Improved': 'Dishwasher Energy Star Improved',
  'Dishwasher > Energy Factor Improved': 'Dishwasher Energy Factor Improved',
  'Dishwasher > Energy Usage Improved': 'Dishwasher Energy Usage Improved',
  'Dishwasher > Water Usage Improved': 'Dishwasher Water Usage Improved',
  'Dishwasher > Manufacturer Improved': 'Dishwasher Manufacturer Improved',
  'Dishwasher > Model Improved': 'Dishwasher Model Improved',
  'Dishwasher > Model Year Improved': 'Dishwasher Model Year Improved',

  // Freezers:
  freezer: {
    'Freezer $n > Name': 'Freezer Name',
    'Freezer $n > Usage Base': 'Freezer Usage',
    'Freezer $n > Energy Star Base': 'Freezer Energy Star',
    'Freezer $n > Manufacturer Base': 'Freezer Manufacturer',
    'Freezer $n > Model Base': 'Freezer Model',
    'Freezer $n > Model Year Base': 'Freezer Model Year',
    'Freezer $n > Usage Improved': 'Freezer Usage Improved',
    'Freezer $n > Energy Star Improved': 'Freezer Energy Star Improved',
    'Freezer $n > Manufacturer Improved': 'Freezer Manufacturer Improved',
    'Freezer $n > Model Improved': 'Freezer Model Improved',
    'Freezer $n > Model Year Improved': 'Freezer Model Year Improved',
  },

  // Refrigerators
  refrigerator: {
    'Refrigerator $n > Name': 'Refrigerator Name',
    'Refrigerator $n > Age': 'Refrigerator Age',
    'Refrigerator $n > Size': 'Refrigerator Size',
    'Refrigerator $n > Energy Star Base': 'Refrigerator Energy Star',
    'Refrigerator $n > Usage Base': 'Refrigerator Usage',
    'Refrigerator $n > Manufacturer Base': 'Refrigerator Manufacturer',
    'Refrigerator $n > Model Base': 'Refrigerator Model',
    'Refrigerator $n > Model Year Base': 'Refrigerator Model Year',
    'Refrigerator $n > Energy Star Improved': 'Refrigerator Energy Star Improved',
    'Refrigerator $n > Usage Improved': 'Refrigerator Usage Improved',
    'Refrigerator $n > Manufacturer Improved': 'Refrigerator Manufacturer Improved',
    'Refrigerator $n > Model Improved': 'Refrigerator Model Improved',
    'Refrigerator $n > Model Year Improved': 'Refrigerator Model Year Improved',
  },

  // Lighting
  'Lighting > % CFL or LED': '% CFL or LED',
  'Lighting > % CFL or LED Range': '% CFLs or LEDs',
  'Lighting > CFL Count Base': '# of CFLs or LEDs',
  'Lighting > LED Count Base': '# of LEDs',
  'Lighting > Incandescent Count Base': '# of Incandescents',
  'Lighting > Total Bulb Count Base': 'Total # of Light Bulbs',
  'Lighting > CFL Count Improved': '# of CFLs or LEDs Improved',
  'Lighting > LED Count Improved': '# of LEDs Improved',
  'Lighting > Incandescent Count Improved': '# of Incandescents Improved',
  'Lighting > Total Bulb Count Improved': 'Total # of Light Bulbs Improved',

  // Doors:
  door: {
    'Door $n > Type': 'Door %{n} Type',
    'Door $n > U Value Base': 'Door %{n} U Value',
    'Door $n > Area Base': 'Door Area',
    'Door $n > Energy Star Base': 'Door Energy Star',
    'Door $n > U Value Improved': 'Door %{n} U Value Improved',
    'Door $n > Area Improved': 'Door Area Improved',
    'Door $n > Energy Star Improved': 'Door Energy Star Improved',
  },

  // Walls:
  wall: {
    'Wall $n > Exterior Siding': 'Exterior Wall Siding',
    'Wall $n > Exterior Construction': 'Exterior Wall Construction',
    'Wall $n > Insulated?': 'Walls Insulated?',
    'Wall $n > System % of Total': 'Wall System % of Total',
    'Wall $n > Modeled Area Base': 'Modeled Wall Area',
    'Wall $n > Cavity Insulation R-Value Base': 'Wall Cavity Insulation',
    'Wall $n > Cavity Insulation Type Base': 'Wall Cavity Insulation Type',
    'Wall $n > Continuous Insulation R-Value Base': 'Wall Continuous Insulation',
    'Wall $n > Continuous Insulation Type Base': 'Wall Continuous Insulation Type',
    'Wall $n > Modeled Area Improved': 'Modeled Wall Area Improved',
    'Wall $n > Cavity Insulation R-Value Improved': 'Wall Cavity Insulation Improved',
    'Wall $n > Cavity Insulation Type Improved': 'Wall Cavity Insulation Type Improved',
    'Wall $n > Continuous Insulation R-Value Improved': 'Wall Continuous Insulation Improved',
    'Wall $n > Continuous Insulation Type Improved': 'Wall Continuous Insulation Type Improved',
  },

  // Attics
  attic: {
    'Attic $n > Percent of Footprint': 'Attic Percent',
    'Attic $n > Insulation Depth': 'Insulation Depth',
    'Attic $n > Insulation Type Base': 'Insulation Type',
    'Attic $n > Modeled Area Base': 'Modeled Attic Area',
    'Attic $n > Insulation R-Value Base': 'Attic Insulation',
    'Attic $n > Radiant Barrier? Base': 'Radiant Barrier?',
    'Attic $n > Has Knee Wall? Base': 'Has Knee Wall?',
    'Attic $n > Knee Wall Area Base': 'Knee Wall Area',
    'Attic $n > Knee Wall Insulation R-Value Base': 'Knee Wall Insulation',
    'Attic $n > Knee Wall Insulation Type Base': 'Knee Wall Insulation Type',
    'Attic $n > Knee Wall Continuous Insulation R-Value Base': 'Knee Wall Continuous Insulation',
    'Attic $n > Knee Wall Continuous Insulation Type Base': 'Knee Wall Continuous Insulation Type',
    'Attic $n > Cool Roof Base': 'Attic Cool Roof?',
    'Attic $n > Roof Absorptance Base': 'Attic Roof Absorptance',
    'Attic $n > Roof Emissivity Base': 'Attic Roof Emissivity',
    'Attic $n > Insulation Type Improved': 'Insulation Type Improved',
    'Attic $n > Modeled Area Improved': 'Modeled Attic Area Improved',
    'Attic $n > Insulation R-Value Improved': 'Attic Insulation Improved',
    'Attic $n > Radiant Barrier? Improved': 'Radiant Barrier? Improved',
    'Attic $n > Has Knee Wall? Improved': 'Has Knee Wall? Improved',
    'Attic $n > Knee Wall Area Improved': 'Knee Wall Area Improved',
    'Attic $n > Knee Wall Insulation R-Value Improved': 'Knee Wall Insulation Improved',
    'Attic $n > Knee Wall Insulation Type Improved': 'Knee Wall Insulation Type Improved',
    'Attic $n > Knee Wall Continuous Insulation R-Value Improved': 'Knee Wall Continuous Insulation Improved',
    'Attic $n > Knee Wall Continuous Insulation Type Improved': 'Knee Wall Continuous Insulation Type Improved',
    'Attic $n > Cool Roof Improved': 'Attic Cool Roof? Improved',
    'Attic $n > Roof Absorptance Improved': 'Attic Roof Absorptance Improved',
    'Attic $n > Roof Emissivity Improved': 'Attic Roof Emissivity Improved',
  },

  // Vaults
  vault: {
    'Vault $n > Percent of Footprint': 'Vault Percent',
    'Vault $n > Insulated?': 'Vault %{n}',

    'Vault $n > Modeled Area Base': 'Modeled Vault Area',
    'Vault $n > Cavity Insulation R-Value Base': 'Vault Cavity Insulation',
    'Vault $n > Cavity Insulation Type Base': 'Vault Cavity Insulation Type',
    'Vault $n > Continuous Insulation R-Value Base': 'Vault Continuous Insulation',
    'Vault $n > Continuous Insulation Type Base': 'Vault Continuous Insulation Type',
    'Vault $n > Cool Roof Base': 'Vault Cool Roof?',
    'Vault $n > Roof Absorptance Base': 'Vault Roof Absorptance',
    'Vault $n > Roof Emissivity Base': 'Vault Roof Emissivity',
    'Vault $n > Modeled Area Improved': 'Modeled Vault Area Improved',
    'Vault $n > Cavity Insulation R-Value Improved': 'Vault Cavity Insulation Improved',
    'Vault $n > Cavity Insulation Type Improved': 'Vault Cavity Insulation Type Improved',
    'Vault $n > Continuous Insulation R-Value Improved': 'Vault Continuous Insulation Improved',
    'Vault $n > Continuous Insulation Type Improved': 'Vault Continuous Insulation Type Improved',
    'Vault $n > Cool Roof Improved': 'Vault Cool Roof? Improved',
    'Vault $n > Roof Absorptance Improved': 'Vault Roof Absorptance Improved',
    'Vault $n > Roof Emissivity Improved': 'Vault Roof Emissivity Improved',
  },

  // Foundation:
  'Foundation > % Basement': 'Foundation: Basement',
  'Foundation > % Crawlspace': 'Foundation: Crawlspace',
  'Foundation > % Slab': 'Foundation: Slab',
  'Foundation > Above Grade Height': 'Foundation Above Grade Height',

  'Basement > Wall Insulation Type': 'Basement Wall Insulation',
  'Basement > Conditioning for Heating': 'Basement Heating',
  'Basement > Conditioning for Cooling': 'Basement Cooling',

  'Basement > Cavity Insulation R-Value Base': 'Basement Cavity Insulation',
  'Basement > Cavity Insulation Type Base': 'Basement Cavity Insulation Type',
  'Basement > Continuous Insulation R-Value Base': 'Basement Continuous Insulation',
  'Basement > Continuous Insulation Type Base': 'Basement Continuous Insulation Type',
  'Basement > Modeled Floor Area': 'Modeled Basement Floor Area',
  'Basement > Modeled Perimeter': 'Modeled Basement Perimeter',
  'Basement > Modeled Wall Area': 'Modeled Basement Wall Area',
  'Basement > Rim Joist Length': 'Basement Rim Joist Length',
  'Basement > Rim Joist Treatment Base': 'Basement Rim Joist Treatment',
  'Basement > Rim Joist Insulation R-Value Base': 'Basement Rim Joist Insulation',
  'Basement > Rim Joist Insulation Type Base': 'Basement Rim Joist Insulation Type',
  'Basement > Cavity Insulation R-Value Improved': 'Basement Cavity Insulation Improved',
  'Basement > Cavity Insulation Type Improved': 'Basement Cavity Insulation Type Improved',
  'Basement > Continuous Insulation R-Value Improved': 'Basement Continuous Insulation Improved',
  'Basement > Continuous Insulation Type Improved': 'Basement Continuous Insulation Type Improved',
  'Basement > Rim Joist Treatment Improved': 'Basement Rim Joist Treatment Improved',
  'Basement > Rim Joist Insulation R-Value Improved': 'Basement Rim Joist Insulation Improved',
  'Basement > Rim Joist Insulation Type Improved': 'Basement Rim Joist Insulation Type Improved',

  'Crawlspace > Insulation Type': 'Crawlspace Insulation',

  'Crawlspace > Type Base': 'Crawlspace Type',
  'Crawlspace > Wall Insulation R-Value Base': 'Crawl Wall Insulation',
  'Crawlspace > Wall Insulation Type Base': 'Crawl Wall Insulation Type',
  'Crawlspace > Floor Cavity Insulation R-Value Base': 'Crawl Cavity Insulation',
  'Crawlspace > Floor Cavity Insulation Type Base': 'Crawl Cavity Insulation Type',
  'Crawlspace > Modeled Wall Area': 'Modeled Crawl Wall Area',
  'Crawlspace > Modeled Floor Area': 'Modeled Crawl Floor Area',
  'Crawlspace > Rim Joist Length': 'Crawlspace Rim Joist Length',
  'Crawlspace > Rim Joist Treatment Base': 'Crawlspace Rim Joist Treatment',
  'Crawlspace > Rim Joist Insulation R-Value Base': 'Crawlspace Rim Joist Insulation',
  'Crawlspace > Rim Joist Insulation Type Base': 'Crawlspace Rim Joist Insulation Type',
  'Crawlspace > Type Improved': 'Crawlspace Type Improved',
  'Crawlspace > Wall Insulation R-Value Improved': 'Crawl Wall Insulation Improved',
  'Crawlspace > Wall Insulation Type Improved': 'Crawl Wall Insulation Type Improved',
  'Crawlspace > Floor Cavity Insulation R-Value Improved': 'Crawl Cavity Insulation Improved',
  'Crawlspace > Floor Cavity Insulation Type Improved': 'Crawl Cavity Insulation Type Improved',
  'Crawlspace > Rim Joist Treatment Improved': 'Crawlspace Rim Joist Treatment Improved',
  'Crawlspace > Rim Joist Insulation R-Value Improved': 'Crawlspace Rim Joist Insulation Improved',
  'Crawlspace > Rim Joist Insulation Type Improved': 'Crawlspace Rim Joist Insulation Type Improved',

  // Windows
  'Windows > Skylight Area': 'Skylight Area',
  'Windows > Window Venting Used Base': 'Window Venting Used',
  'Windows > Window Venting Used Improved': 'Window Venting Used Improved',

  window: {
    'Window $n > Window Type': 'Window Type',
    'Window $n > Window Frame': 'Window Frame',
    'Window $n > Window: North Area Percent': 'Window: North Area Percent',
    'Window $n > Window: East Area Percent': 'Window: East Area Percent',
    'Window $n > Window: South Area Percent': 'Window: South Area Percent',
    'Window $n > Window: West Area Percent': 'Window: West Area Percent',
    'Window $n > North Overhang Depth': 'North Overhang Depth',
    'Window $n > East Overhang Depth': 'East Overhang Depth',
    'Window $n > South Overhang Depth': 'South Overhang Depth',
    'Window $n > West Overhang Depth': 'West Overhang Depth',

    'Window $n > Efficiency Base': 'Efficiency',
    'Window $n > Solar Heat Gain Coefficient Base': 'Solar Heat Gain Coefficient',
    'Window $n > Window Energy Star Base': 'Window Energy Star',
    'Window $n > Window Area: North Base': 'Window Area: North',
    'Window $n > Window Area: East Base': 'Window Area: East',
    'Window $n > Window Area: South Base': 'Window Area: South',
    'Window $n > Window Area: West Base': 'Window Area: West',
    'Window $n > Exterior Treatment: North Base': 'Exterior Treatment: North',
    'Window $n > Exterior Treatment: East Base': 'Exterior Treatment: East',
    'Window $n > Exterior Treatment: South Base': 'Exterior Treatment: South',
    'Window $n > Exterior Treatment: West Base': 'Exterior Treatment: West',
    'Window $n > Efficiency Improved': 'Efficiency Improved',
    'Window $n > Solar Heat Gain Coefficient Improved': 'Solar Heat Gain Coefficient Improved',
    'Window $n > Window Energy Star Improved': 'Window Energy Star Improved',
    'Window $n > Window Area: North Improved': 'Window Area: North Improved',
    'Window $n > Window Area: East Improved': 'Window Area: East Improved',
    'Window $n > Window Area: South Improved': 'Window Area: South Improved',
    'Window $n > Window Area: West Improved': 'Window Area: West Improved',
    'Window $n > Exterior Treatment: North Improved': 'Exterior Treatment: North Improved',
    'Window $n > Exterior Treatment: East Improved': 'Exterior Treatment: East Improved',
    'Window $n > Exterior Treatment: South Improved': 'Exterior Treatment: South Improved',
    'Window $n > Exterior Treatment: West Improved': 'Exterior Treatment: West Improved',
  },

  // Air Leakage
  'Air Leakage > Blower Door Test Performed Base': 'Blower Door Test Performed',
  'Air Leakage > Blower Door Reading Base': 'Blower Door Reading',
  'Air Leakage > Conditioned Air Volume': 'Conditioned Air Volume',
  'Air Leakage > BPI Wind Zone': 'Wind Zone',
  'Air Leakage > BPI N-Factor': 'N-Factor',
  'Air Leakage > NACH Base': 'Equivalent NACH',
  'Air Leakage > ACH50 Base': 'Equivalent ACH50',
  'Air Leakage > Effective Leakage Area Base': 'Effective Leakage Area',
  'ASHRAE > 62.2': 'ASHRAE 62.2',
  'ASHRAE > Required Additional CFM Base': 'ASHRAE Required Additional CFM',
  'ASHRAE > Kitchen Fan CFM Base': 'ASHRAE Kitchen Fan CFM',
  'ASHRAE > Kitchen Window Base': 'ASHRAE Kitchen Window',
  'ASHRAE > Number of Bathrooms': 'ASHRAE Number of Bathrooms',
  'ASHRAE > Bathroom Fan 1 CFM Base': 'ASHRAE Bathroom Fan 1 CFM',
  'ASHRAE > Bathroom 1 Window Base': 'ASHRAE Bathroom 1 Window',
  'ASHRAE > Bathroom Fan 2 CFM Base': 'ASHRAE Bathroom Fan 2 CFM',
  'ASHRAE > Bathroom 2 Window Base': 'ASHRAE Bathroom 2 Window',
  'ASHRAE > Bathroom Fan 3 CFM Base': 'ASHRAE Bathroom Fan 3 CFM',
  'ASHRAE > Bathroom 3 Window Base': 'ASHRAE Bathroom 3 Window',
  'ASHRAE > Bathroom Fan 4 CFM Base': 'ASHRAE Bathroom Fan 4 CFM',
  'ASHRAE > Bathroom 4 Window Base': 'ASHRAE Bathroom 4 Window',
  'Air Leakage > Blower Door Test Performed Improved': 'Blower Door Test Performed Improved',
  'Air Leakage > Blower Door Reading Improved': 'Blower Door Reading Improved',
  'Air Leakage > NACH Improved': 'Equivalent NACH Improved',
  'Air Leakage > ACH50 Improved': 'Equivalent ACH50 Improved',
  'Air Leakage > Effective Leakage Area Improved': 'Effective Leakage Area Improved',
  'ASHRAE > Required Additional CFM Improved': 'ASHRAE Required Additional CFM Improved',
  'ASHRAE > Minium CFM50 Improved': 'ASHRAE Minimum CFM50 Improved',
  'ASHRAE > Kitchen Fan CFM Improved': 'ASHRAE Kitchen Fan CFM Improved',
  'ASHRAE > Kitchen Window Improved': 'ASHRAE Kitchen Window Improved',
  'ASHRAE > Bathroom Fan 1 CFM Improved': 'ASHRAE Bathroom Fan 1 CFM Improved',
  'ASHRAE > Bathroom 1 Window Improved': 'ASHRAE Bathroom 1 Window Improved',
  'ASHRAE > Bathroom Fan 2 CFM Improved': 'ASHRAE Bathroom Fan 2 CFM Improved',
  'ASHRAE > Bathroom 2 Window Improved': 'ASHRAE Bathroom 2 Window Improved',
  'ASHRAE > Bathroom Fan 3 CFM Improved': 'ASHRAE Bathroom Fan 3 CFM Improved',
  'ASHRAE > Bathroom 3 Window Improved': 'ASHRAE Bathroom 3 Window Improved',
  'ASHRAE > Bathroom Fan 4 CFM Improved': 'ASHRAE Bathroom Fan 4 CFM Improved',
  'ASHRAE > Bathroom 4 Window Improved': 'ASHRAE Bathroom 4 Window Improved',

  // DHW
  dhw: {
    'DHW $n > Age': 'DHW Age',
    'DHW $n > Location': 'DHW Location',
    'DHW $n > Temperature Settings': 'DHW Temperature Settings',

    'DHW Temp $n > Temp Base': 'DHW Temp',
    'DHW Temp $n > Temp Improved': 'DHW Temp Improved',

    'DHW $n > % Load Base': 'DHW % Load',
    'DHW $n > Fuel Base': 'DHW Fuel',
    'DHW $n > Type Base': 'DHW Type',
    'DHW $n > Energy Factor Base': 'DHW Energy Factor',
    'DHW $n > Recovery Efficiency Base': 'DHW Recovery Efficiency',
    'DHW $n > Tank Size Base': 'DHW Tank Size',
    'DHW $n > Heating Capacity Base': 'DHW Heating Capacity',
    'DHW $n > Energy Star Base': 'DHW Energy Star',
    'DHW $n > Manufacturer Base': 'DHW Manufacturer',
    'DHW $n > Model Base': 'DHW Model',
    'DHW $n > Model Year Base': 'DHW Model Year',
    'DHW $n > % Load Improved': 'DHW % Load Improved',
    'DHW $n > Fuel Improved': 'DHW Fuel2 Improved',
    'DHW $n > Type Improved': 'DHW Type2 Improved',
    'DHW $n > Energy Factor Improved': 'DHW Energy Factor Improved',
    'DHW $n > Recovery Efficiency Improved': 'DHW Recovery Efficiency Improved',
    'DHW $n > Tank Size Improved': 'DHW Tank Size Improved',
    'DHW $n > Heating Capacity Improved': 'DHW Heating Capacity Improved',
    'DHW $n > Energy Star Improved': 'DHW Energy Star Improved',
    'DHW $n > Manufacturer Improved': 'DHW Manufacturer Improved',
    'DHW $n > Model Improved': 'DHW Model Improved',
    'DHW $n > Model Year Improved': 'DHW Model Year Improved',
  },

  'Pool > Existing': 'Pool',
  'Hot Tub > Existing': 'Hot Tub',
  'Pool > Size Base': 'Pool Size',
  'Pool > Pump Type Base': 'Pool Pump Type',
  'Pool > Pump Horsepower Base': 'Pool Pump Horsepower',
  'Pool > Pump Days Per Year Base': 'Pool Pump Days Per Year',
  'Pool > Pump Hours Base': 'Pool Pump Hours',
  'Pool > Pump Turnover Base': 'Pool Pump Turnover',
  'Pool > Pump Manufacturer Base': 'Pool Pump Manufacturer',
  'Pool > Pump Model Base': 'Pool Pump Model',
  'Pool > Pump Type Improved': 'Pool Pump Type Improved',
  'Pool > Pump Horsepower Improved': 'Pool Pump Horsepower Improved',
  'Pool > Pump Days Per Year Improved': 'Pool Pump Days Per Year Improved',
  'Pool > Pump Hours Improved': 'Pool Pump Hours Improved',
  'Pool > Pump Turnover Improved': 'Pool Pump Turnover Improved',
  'Pool > Pump Manufacturer Improved': 'Pool Pump Manufacturer Improved',
  'Pool > Pump Model Improved': 'Pool Pump Model Improved',

  // PV
  pv: {
    'PV $n > Has PV? Base': 'PV',
    'PV $n > Array Size Base': 'PV Array Size',
    'PV $n > Array Slope Base': 'PV Array Slope',
    'PV $n > Array Orientation Base': 'PV Array Orientation',
    'PV $n > Module Year Base': 'PV Module Year',
    'PV $n > Annual Production Base': 'PV Annual Production',
    'PV $n > Has PV? Improved': 'PV Improved',
    'PV $n > Array Size Improved': 'PV Array Size Improved',
    'PV $n > Array Slope Improved': 'PV Array Slope Improved',
    'PV $n > Array Orientation Improved': 'PV Array Orientation Improved',
    'PV $n > Annual Production Improved': 'PV Annual Production Improved',
  },

  // Health & Safety
  'Health & Safety > Ambient Carbon Monoxide': 'Ambient Carbon Monoxide',
  'Health & Safety > Natural Condition Spillage': 'Natural Condition Spillage',
  'Health & Safety > Worst Case Depressurization': 'Worst Case Depressurization',
  'Health & Safety > Worst Case Spillage': 'Worst Case Spillage',
  'Health & Safety > Undiluted Flue CO': 'Undiluted Flue CO',
  'Health & Safety > Draft Pressure': 'Draft Pressure',
  'Health & Safety > Gas Leak': 'Gas Leak',
  'Health & Safety > Venting': 'Venting',
  'Health & Safety > Mold & Moisture': 'Mold & Moisture',
  'Health & Safety > Radon': 'Radon',
  'Health & Safety > Asbestos': 'Asbestos',
  'Health & Safety > Lead': 'Lead',
  'Health & Safety > Electrical': 'Electrical',


  // Caz
  'CAZ > Max Ambient CO Base': 'CAZ Max Ambient CO',
  'CAZ > Max Ambient CO Improved': 'CAZ Max Ambient CO Improved',

  caz: {
    'CAZ Zone $n > Name': 'CAZ Name',
    'CAZ Zone $n > Ambient CO Base': 'CAZ Ambient CO',
    'CAZ Zone $n > Poor Case Test Base': 'CAZ Poor Case Test',
    'CAZ Zone $n > Notes Base': 'CAZ Notes',
    'CAZ Zone $n > Ambient CO Improved': 'CAZ Ambient CO Improved',
    'CAZ Zone $n > Poor Case Test Improved': 'CAZ Poor Case Test Improved',
  },

  // Caz Systems
  cazSystem: {
    'CAZ Appliance $n > Zone Number'(row, state) {
      return _.findIndex(state.caz, caz => caz.uuid === row.caz_uuid) + 1
    },
    'CAZ Appliance $n > Equipment Name'(row, state) {
      if (row.hvac_uuid) {
        return _.get(state.hvac.find(hvac => hvac.uuid === row.hvac_uuid), 'hvac_system_name')
      }
      if (row.dhw_uuid) {
        return 'Dhw ' + (_.findIndex(state.dhw, dhw => dhw.uuid === row.dhw_uuid) + 1)
      }
      if (row.oven_uuid) return 'Oven'
      if (row.range_uuid) return 'Range'
      if (row.clothes_dryer_uuid) return 'Clothes Dryer'
    },
    'CAZ Appliance $n > Appliance Vent System Type Base': 'CAZ Appliance Vent System Type',
    'CAZ Appliance $n > Appliance CO Current Condition Base': 'CAZ Appliance CO Current Condition',
    'CAZ Appliance $n > Appliance CO Poor Scenario Base': 'CAZ Appliance CO Poor Scenario',
    'CAZ Appliance $n > Appliance CO Test Result Base': 'CAZ Appliance CO Test Result',
    'CAZ Appliance $n > Appliance Spillage Current Condition Base': 'CAZ Appliance Spillage Current Condition',
    'CAZ Appliance $n > Appliance Spillage Poor Condition Base': 'CAZ Appliance Spillage Poor Condition',
    'CAZ Appliance $n > Appliance Spillage Test Result Base': 'CAZ Appliance Spillage Test Result',
    'CAZ Appliance $n > Fuel Leaks Identified Base': 'CAZ Fuel Leaks Identified',
    'CAZ Appliance $n > Fuel Leaks Addressed Base': 'CAZ Fuel Leaks Addressed',
    'CAZ Appliance $n > Water Heater Orphaned Base': 'CAZ Water Heater Orphaned',
    'CAZ Appliance $n > Appliance Vent System Type Improved': 'CAZ Appliance Vent System Type Improved',
    'CAZ Appliance $n > Appliance CO Current Condition Improved': 'CAZ Appliance CO Current Condition Improved',
    'CAZ Appliance $n > Appliance CO Poor Scenario Improved': 'CAZ Appliance CO Poor Scenario Improved',
    'CAZ Appliance $n > Appliance CO Test Result Improved': 'CAZ Appliance CO Test Result Improved',
    'CAZ Appliance $n > Appliance Spillage Current Condition Improved': 'CAZ Appliance Spillage Current Condition Improved',
    'CAZ Appliance $n > Appliance Spillage Poor Condition Improved': 'CAZ Appliance Spillage Poor Condition Improved',
    'CAZ Appliance $n > Appliance Spillage Test Result Improved': 'CAZ Appliance Spillage Test Result Improved',
    'CAZ Appliance $n > Fuel Leaks Identified Improved': 'CAZ Fuel Leaks Identified Improved',
    'CAZ Appliance $n > Fuel Leaks Addressed Improved': 'CAZ Fuel Leaks Addressed Improved',
    'CAZ Appliance $n > Water Heater Orphaned Improved': 'CAZ Water Heater Orphaned Improved',
  },

  // Recommendations
  'Recommendation > Frame Floor': recFn('floor'),
  'Recommendation > Frame Floor Cost': recFn('floor', 'cost'),
  'Recommendation > Frame Floor Savings': recFn('floor', 'savings'),
  'Recommendation > Frame Floor SIR': recFn('floor', 'sir'),

  'Recommendation > Thermostat': recFn('thermostat'),
  'Recommendation > Thermostat Savings': recFn('thermostat', 'savings'),
  'Recommendation > Thermostat SIR': recFn('thermostat', 'sir'),
  'Recommendation > Thermostat Cost': recFn('thermostat', 'cost'),

  'Recommendation > Heating': recFn('heating'),
  'Recommendation > Heating Cost': recFn('heating', 'cost'),
  'Recommendation > Heating Savings': recFn('heating', 'savings'),
  'Recommendation > Heating SIR': recFn('heating', 'sir'),

  'Recommendation > Cooling': recFn('cooling'),
  'Recommendation > Cooling Cost': recFn('cooling', 'cost'),
  'Recommendation > Cooling Savings': recFn('cooling', 'savings'),
  'Recommendation > Cooling SIR': recFn('cooling', 'sir'),

  'Recommendation > Duct Work': recFn('duct'),
  'Recommendation > Duct Work Cost': recFn('duct', 'cost'),
  'Recommendation > Duct Work Savings': recFn('duct', 'savings'),
  'Recommendation > Duct Work SIR': recFn('duct', 'sir'),

  'Recommendation > Freezer': recFn('freezer'),
  'Recommendation > Freezer Cost': recFn('freezer', 'cost'),
  'Recommendation > Freezer Savings': recFn('freezer', 'savings'),
  'Recommendation > Freezer SIR': recFn('freezer', 'sir'),

  'Recommendation > Dishwasher': recFn('dishwasher'),
  'Recommendation > Dishwasher Cost': recFn('dishwasher', 'cost'),
  'Recommendation > Dishwasher Savings': recFn('dishwasher', 'savings'),
  'Recommendation > Dishwasher SIR': recFn('dishwasher', 'sir'),

  'Recommendation > Clothes Washer': recFn('clotheswasher'),
  'Recommendation > Clothes Washer Cost': recFn('clotheswasher', 'cost'),
  'Recommendation > Clothes Washer Savings': recFn('clotheswasher', 'savings'),
  'Recommendation > Clothes Washer SIR': recFn('clotheswasher', 'sir'),

  'Recommendation > Refrigerator': recFn('refrigerators'),
  'Recommendation > Refrigerator Savings': recFn('refrigerators', 'savings'),
  'Recommendation > Refrigerator SIR': recFn('refrigerators', 'sir'),
  'Recommendation > Refrigerator Cost': recFn('refrigerators', 'cost'),

  'Recommendation > Lighting': recFn('lighting'),
  'Recommendation > Lighting Cost': recFn('lighting', 'cost'),
  'Recommendation > Lighting Savings': recFn('lighting', 'savings'),
  'Recommendation > Lighting SIR': recFn('lighting', 'sir'),

  'Recommendation > Doors': recFn('doors'),
  'Recommendation > Doors Cost': recFn('doors', 'cost'),
  'Recommendation > Doors Savings': recFn('doors', 'savings'),
  'Recommendation > Doors SIR': recFn('doors', 'sir'),

  'Recommendation > Wall': recFn('wall'),
  'Recommendation > Wall Cost': recFn('wall', 'cost'),
  'Recommendation > Wall Savings': recFn('wall', 'savings'),
  'Recommendation > Wall SIR': recFn('wall', 'sir'),

  'Recommendation > Attic': recFn('attic'),
  'Recommendation > Attic Cost': recFn('attic', 'cost'),
  'Recommendation > Attic Savings': recFn('attic', 'savings'),
  'Recommendation > Attic SIR': recFn('attic', 'sir'),

  'Recommendation > Vault': recFn('vault'),
  'Recommendation > Vault Cost': recFn('vault', 'cost'),
  'Recommendation > Vault Savings': recFn('vault', 'savings'),
  'Recommendation > Vault SIR': recFn('vault', 'sir'),

  'Recommendation > Crawlspace': recFn('crawl'),
  'Recommendation > Crawlspace Cost': recFn('crawl', 'cost'),
  'Recommendation > Crawlspace Savings': recFn('crawl', 'savings'),
  'Recommendation > Crawlspace SIR': recFn('crawl', 'sir'),

  'Recommendation > Basement': recFn('basement'),
  'Recommendation > Basement Cost': recFn('basement', 'cost'),
  'Recommendation > Basement Savings': recFn('basement', 'savings'),
  'Recommendation > Basement SIR': recFn('basement', 'sir'),

  'Recommendation > Window': recFn('window'),
  'Recommendation > Window Cost': recFn('window', 'cost'),
  'Recommendation > Window Savings': recFn('window', 'savings'),
  'Recommendation > Window SIR': recFn('window', 'sir'),

  'Recommendation > Air Sealing': recFn('air_leakage'),
  'Recommendation > Air Sealing Cost': recFn('air_leakage', 'cost'),
  'Recommendation > Air Sealing Savings': recFn('air_leakage', 'savings'),
  'Recommendation > Air Sealing SIR': recFn('air_leakage', 'sir'),

  'Recommendation > DHW Temp': recFn('dhw_temp'),
  'Recommendation > DHW Temp Cost': recFn('dhw_temp', 'cost'),
  'Recommendation > DHW Temp Savings': recFn('dhw_temp', 'savings'),
  'Recommendation > DHW Temp SIR': recFn('dhw_temp', 'sir'),

  'Recommendation > DHW': recFn('dhw'),
  'Recommendation > DHW Cost': recFn('dhw', 'cost'),
  'Recommendation > DHW Savings': recFn('dhw', 'savings'),
  'Recommendation > DHW SIR': recFn('dhw', 'sir'),

  'Recommendation > Pool Pump': recFn('pool'),
  'Recommendation > Pool Pump Cost': recFn('pool', 'cost'),
  'Recommendation > Pool Pump Savings': recFn('pool', 'savings'),
  'Recommendation > Pool Pump SIR': recFn('pool', 'sir'),

  'Recommendation > PV': recFn('pv'),
  'Recommendation > PV Cost': recFn('pv', 'cost'),
  'Recommendation > PV Savings': recFn('pv', 'savings'),
  'Recommendation > PV SIR': recFn('pv', 'sir'),


  customRecommendations: {
    'Custom Recommendation Title'(rec, {job}) {
      if (job.has_calculated) {
        return rec.title
      }
    },
    'Custom Recommendation Cost'(rec, {job}) {
      if (job.has_calculated) {
        return rec.cost
      }
    }
  },

  // Metrics:
  'Metrics > Fuel Energy Usage Base (therms/yr)': totalsFn('annual_fuel_therms_used'),
  'Metrics > Fuel Energy Usage Improved (therms/yr)': totalsFn('annual_fuel_therms_improved'),
  'Metrics > Fuel Energy Usage Saved (therms/yr)': totalsFn('annual_fuel_therms_saved'),
  'Metrics > Electric Energy Usage Base (kWh/yr)': totalsFn('annual_electric_kWh_used'),
  'Metrics > Electric Energy Usage Improved (kWh/yr)': totalsFn('annual_electric_kWh_improved'),
  'Metrics > Electric Energy Usage Saved (kWh/yr)': totalsFn('saved_kwh'),
  'Metrics > Total Energy Usage Base (MMBtu/yr)': totalsFn('mbtu_base'),
  'Metrics > Total Energy Usage Improved (MMBtu/yr)': totalsFn('mbtu_improved'),
  'Metrics > Total Energy Usage Saved (MMBtu/yr)': totalsFn('saved_mbtu'),
  'Metrics > Fuel Energy Cost Base ($/yr)': totalsFn('annual_fuel_dollars_spent'),
  'Metrics > Fuel Energy Cost Improved ($/yr)': totalsFn('annual_fuel_dollars_improved'),

  // TODO: get metricsFn working
  'Metrics > Fuel Energy Cost Saved ($/yr)': metricsFn('annual_fuel_dollars_spent_saved'),
  'Metrics > Electric Energy Cost Base ($/yr)': totalsFn('annual_electric_dollars_spent'),
  'Metrics > Electric Energy Cost Improved ($/yr)': totalsFn('annual_electric_dollars_improved'),
  'Metrics > Electric Energy Cost Saved ($/yr)': metricsFn('annual_electric_dollars_spent_saved'),
  'Metrics > Total Energy Cost Base ($/yr)': totalsFn('yearly_energy_cost'),
  'Metrics > Total Energy Cost Improved ($/yr)': totalsFn('yearly_energy_cost_improved'),
  'Metrics > Total Energy Cost Saved ($/yr)': totalsFn('total_savings'),
  'Metrics > CO2 Production Base (Tons/yr)': totalsFn('total_co2_tons_base'),
  'Metrics > CO2 Production Improved (Tons/yr)': totalsFn('total_co2_tons'),
  'Metrics > CO2 Production Saved (Tons/yr)': totalsFn('saved_co2_tons'),

  'Metrics > Total Job Costs': totalsFn('installed_costs'),
  'Metrics > Total Job Savings': totalsFn('total_savings'),
  'Metrics > Total Energy Savings %': totalsFn('saved_mbtu_percent'),
  'Metrics > Total Carbon Savings %': totalsFn('saved_co2_percent'),
  'Metrics > Payback (years)': totalsFn('payback_years'),
  'Metrics > Savings to Investment Ratio (SIR)': totalsFn('sir'),
  'Metrics > Net Annualized Return (MIRR %)': totalsFn('mirr'),

  'Metrics > Heating Design Load Base (Btu/hr)': 'Heating Design Load',
  'Metrics > Heating Design Load Improved (Btu/hr)': 'Heating Design Load Improved',
  'Metrics > Cooling Sensible Design Load Base (Btu/hr)': 'Cooling Sensible Design Load',
  'Metrics > Cooling Sensible Design Load Improved (Btu/hr)': 'Cooling Sensible Design Load Improved',
  'Metrics > Cooling Latent Design Load Base (Btu/hr)': 'Cooling Latent Design Load',
  'Metrics > Cooling Latent Design Load Improved (Btu/hr)': 'Cooling Latent Design Load Improved',
  'Metrics > Winter Outdoor Design Temp (ºF)': 'Design Temp: Winter Outdoor',
  'Metrics > Summer Outdoor Design Temp (ºF)': 'Design Temp: Summer Outdoor',
  'Metrics > Winter Indoor Design Temp (ºF)': 'Design Temp: Winter Indoor',
  'Metrics > Summer Indoor Design Temp (ºF)': 'Design Temp: Summer Indoor',



  // Hes Scores
  'HES > Initial > Base Score': hesScore('initial', 'hes_base_score'),
  'HES > Initial > Label Number': hesScore('initial', 'hes_label_number'),
  'HES > Initial > HESCORE Version': hesScore('initial', 'hes_hescore_version'),
  'HES > Initial > Source Energy Total Base': hesScore('initial', 'hes_source_energy_total_base'),
  'HES > Initial > Source Energy Asset Base': hesScore('initial', 'hes_source_energy_asset_base'),
  'HES > Initial > Building ID': hesScore('initial', 'hes_building_id'),

  'HES > Alternative > Base Score': hesScore('alternative', 'hes_base_score'),
  'HES > Alternative > Label Number': hesScore('alternative', 'hes_label_number'),
  'HES > Alternative > HESCORE Version': hesScore('alternative', 'hes_hescore_version'),
  'HES > Alternative > Source Energy Total Base': hesScore('alternative', 'hes_source_energy_total_base'),
  'HES > Alternative > Source Energy Asset Base': hesScore('alternative', 'hes_source_energy_asset_base'),
  'HES > Alternative > Building ID': hesScore('alternative', 'hes_building_id'),

  'HES > Final > Base Score': hesScore('final', 'hes_base_score'),
  'HES > Final > Label Number': hesScore('final', 'hes_label_number'),
  'HES > Final > HESCORE Version': hesScore('final', 'hes_hescore_version'),
  'HES > Final > Source Energy Total Base': hesScore('final', 'hes_source_energy_total_base'),
  'HES > Final > Source Energy Asset Base': hesScore('final', 'hes_source_energy_asset_base'),
  'HES > Final > Building ID': hesScore('final', 'hes_building_id'),

  'CA Only > Demand kW': 'Demand kW',
  'CA Only > Demand kW Savings': 'Demand kW Savings',
  'Xcel Energy > Air Sealing Rebate': xcelFn('eligible'),
  'EUC > Total Incentive ($)': eucFn('totalIncentive'),
})

function hesScore(type, column) {
  return function(state) {
    const obj = state[`hes_score_${type}`]
    if (obj) {
      return obj[column]
    }
  }
}

function xcelFn(column) {
  return function(state) {
    const val = xcelIncentivesCSV(state)
    return val[column]
  }
}

function eucFn(column) {
  return function(state) {
    const val = eucIncentivesCSV(state)
    return val[column]
  }
}

function totalsFn(column) {
  return function({totals, job}) {
    if (job.has_calculated && totals && totals[column]) {
      return totals[column]
    }
    return null
  }
}

function metricsFn(column) {
  return function({metrics, job}) {
    if (job.has_calculated && metrics && metrics[column]) {
      return metrics[column]
    }
    return null
  }
}

function recFn(recType, column) {
  return function({recs, job}) {
    if (recs[recType] && job.has_calculated) {
      if (column) {
        if (statusMap[recs[recType].status] === 'Recommended') {
          return recs[recType][column]
        }
        return null
      }
      return statusMap[recs[recType].status]
    }
  }
}

const statusMap = {
  0: 'Recommended',
  1: 'Recommended',
  2: 'Notes',
  3: 'Declined',
}
