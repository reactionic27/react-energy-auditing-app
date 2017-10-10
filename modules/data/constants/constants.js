import _ from 'lodash'
import {Map as IMap} from 'immutable'

// VERSION needs to be a string. We never do math on it and X.0 will return X otherwise
export const VERSION = '5.0'

export const PAGE_SORT = [
  'page_cover',
  'page_concerns',
  'page_solutions',
  'page_upgrade_details',
  'page_health',
  'page_additional_notes',
  'page_rebates',
  'page_financing',
  'page_metrics',
  'page_tech_specs',
  'page_hes',
  'page_coc',
  'page_glossary'
];
export const ELEMENT_SORT = [
  'element_photos',
  'element_homeowner_notes',
  'element_contractor_notes',
  'element_now_and_goal'
];

export const BASE_TABLES = [
  'companies',
  'jobs',
  'programs',
  'accounts',
  'invitations',
  'financingTemplates'
];
export const JOB_COLLECTION_TABLES = [
  'attic',
  'caz',
  'cazSystem',
  'concern',
  'dhw',
  'door',
  'freezer',
  'hvac',
  'refrigerator',
  'vault',
  'wall',
  'window',
  'recommendations',
  'recommendationCaptionRows',
  'jobFinancing',
  'range',
  'oven',
  'clothesDryer',
  'pv',
  'activityFeed',
  'activityTracking'
];
export const JOB_ENTITY_TABLES = [
  'basedata',
  'utilities',
  'health',
  'totals',
  'reports',
  'hesScores'
]
export const TOUCHABLE_TABLES = [
  'attic',
  'dhw',
  'door',
  'freezer',
  'hvac',
  'refrigerator',
  'vault',
  'wall',
  'window',
  'basedata',
  'pv'
]

// Additional Application Constants:

export const PAGINATION_HEIGHT = 624

export const REPORT_PAGE_TOGGLES = [
  'Report: Page Cover',
  'Report: Page Concerns',
  'Report: Page Solutions',
  'Report: Page Upgrade Details',
  'Report: Page Health & Safety',
  'Report: Page Additional Notes',
  'Report: Page Rebates & Incentives',
  'Report: Page Financing',
  'Report: Page Metrics',
  'Report: Page Tech specs',
  'Report: Page HES',
  'Report: Page Certificate of Completion',
  'Report: Page Glossary',
]
export const REPORT_ELEMENT_TOGGLES = [
  'Report: Element Costs',
  'Report: Element Savings',
  'Report: Element SIR',
  'Report: Element Impact of Upgrades',
  'Report: Element Why it Matters',
]
export const REPORT_ELEMENT_DRAGGABLE_TOGGLES = [
  'Report: Element Photo Sets',
  'Report: Element Homeown. Notes',
  'Report: Element Contractor Notes',
  'Report: Element Now & Goal',
]

export const JOBFORM_SECTIONS = [
  {
    label: 'Building',
    recLinks: [
      ['floor', 'Floor Above Garage or Cantilevers']
    ],
    helpLinks: [
      {
        title: 'About floors above garage or cantilevers',
        url: 'https://snuggpro.com/help/article/insulate-floors'
      },
      {
        title: 'Length and width of home',
        url: 'https://snuggpro.com/help/article/length-and-width-of-home'
      }
    ]
  },
  {
    label: 'Concerns'
  },
  {
    label: 'Utility Bills',
    componentName: 'Utility',
    helpLinks: [
      {
        title: 'Utility Bills Training Video',
        url: 'https://snuggpro.com/help/article/utility-bills-training-video'
      },
      {
        title: 'Manual Utility Pricing',
        url: 'https://snuggpro.com/help/article/manual-utility-pricing'
      },
      {
        title: 'Utility Bill Calibration',
        url: 'https://snuggpro.com/help/article/utility-bill-calibration'
      },
      {
        title: 'Simple entry utility bills',
        url: 'https://snuggpro.com/help/article/simple-entry-utility-bills'
      }
    ]
  },
  {
    label: 'Thermostat',
    recLinks: [
      ['thermostat', 'Thermostat']
    ],
    helpLinks: [
      {
        title: 'About thermostat setpoints',
        url: 'https://snuggpro.com/help/article/thermostat-setpoints'
      }
    ]
  },
  {
    label: 'HVAC',
    recLinks: [
      ['heating', 'Heating'],
      ['cooling', 'Cooling'],
      ['duct', 'Duct Work']
    ],
    helpLinks: [
      {
        title: 'Adding / Editing HVAC systems',
        url: 'https://snuggpro.com/help/article/adding-a-new-hvac-system'
      },
      {
        title: 'Heating & Cooling % of load',
        url: 'https://snuggpro.com/help/article/heating-cooling-of-load'
      },
      {
        title: 'HVAC: How to find model year',
        url: 'https://snuggpro.com/help/article/hvac-how-to-find-model-year'
      },
      {
        title: 'Electric Resistance Heaters',
        url: 'https://snuggpro.com/help/article/electric-resistance-heaters'
      },
      {
        title: 'Duct location',
        url: 'https://snuggpro.com/help/article/duct-location-conditioned-or-unconditioned'
      },
      {
        title: 'Duct Insulation / Encapsulated',
        url: 'https://snuggpro.com/help/article/duct-insulation-encapsulated'
      }
    ]
  },
  {
    label: 'Appliances',
    recLinks: [
      ['freezer', 'Freezer'],
      ['dishwasher', 'Dishwasher'],
      ['clotheswasher', 'Clotheswasher']
    ],
    helpLinks: [
      {
        title: 'Appliance Product Finders',
        url: 'https://snuggpro.com/help/article/appliance-product-finders'
      }
    ]
  },
  {
    label: 'Refrigerators',
    recLinks: [
      ['refrigerators', 'Refrigerator']
    ],
  },
  {
    label: 'Lighting',
    recLinks: [
      ['lighting', 'Lighting']
    ],
  },
  {
    label: 'Doors',
    recLinks: [
      ['doors', 'Doors']
    ],
    helpLinks: [
      {
        title: 'Door Types & U Values',
        url: 'https://snuggpro.com/help/article/door-types-u-values'
      }
    ]
  },
  {
    label: 'Walls',
    recLinks: [
      ['wall', 'Walls']
    ],
    helpLinks: [
      {
        title: 'Exterior Wall Systems',
        url: 'https://snuggpro.com/help/article/exterior-wall-systems'
      }
    ]
  },
  {
    label: 'Attic',
    recLinks: [
      ['attic', 'Attic'],
      ['vault', 'Vault']
    ],
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
    label: 'Foundation',
    recLinks: [
      ['crawl', 'Crawl Space'],
      ['basement', 'Basement']
    ],
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
    label: 'Windows',
    recLinks: [
      ['window', 'Windows']
    ],
    helpLinks: [
      {
        title: 'Multiple Window Systems',
        url: 'https://snuggpro.com/help/article/multiple-window-systems'
      },
      {
        title: 'Modeling Windows, Glass Doors, Sky Lights',
        url: 'https://snuggpro.com/help/article/modeling-windows-glass-doors-sky-lights'
      }
    ]
  },
  {
    label: 'Air Leakage',
    componentName: 'Leakage',
    recLinks: [
      ['air_leakage', 'Air Leaks']
    ],
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
    label: 'Hot Water (DHW)',
    componentName: 'Dhw',
    recLinks: [
      ['dhw_temp', 'Water Temp'],
      ['dhw', 'Water Heater']
    ],
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
    label: 'Pools',
    recLinks: [
      ['pool', 'Pools'],
    ]
  },
  {
    label: 'PV',
    recLinks: [
      ['pv', 'PV'],
    ]
  },
  {
    label: 'Health & Safety',
    componentName: 'Health',
    recLinks: [
      ['health', 'Health & Safety'],
    ]
  },
  {
    label: 'CAZ',
    helpLinks: [
      {
        title: 'About Combustion Appliance Zones',
        url: 'https://snuggpro.com/help/article/caz-combustion-appliance-zones'
      }
    ]
  }
].map(obj => {
  obj.componentName = obj.componentName || obj.label
  obj.recLinks = obj.recLinks || []
  obj.helpLinks = obj.helpLinks || []
  return obj
})

export const SORT_LABELS = IMap([
  ['id', 'Job ID'],
  ['updated_at', 'Last Modified'],
  ['service_time', 'Appointment Date'],
  ['account_id', 'User'],
  ['first_name', 'First Name'],
  ['last_name', 'Last Name'],
  ['program_id', 'Program'],
  ['stage_id', 'Stage']
])

export const SORT_STRATEGIES = IMap([
  ['id', 'sort'],
  ['updated_at', 'sortDate'],
  ['service_time', 'sortDate'],
  ['account_id', 'group'],
  ['first_name', 'sort'],
  ['last_name', 'sort'],
  ['program_id', 'group'],
  ['stage_id', 'group']
])

export const REPORT_THEMES = [
  'Classic Green',
  'Winter Green',
  'Artic Blue',
  'Graphite Gray',
  'Subtle Tan'
]

// TOOD: add design load calcs
// the _saved fields are calculated, not returned from OM
export const FIELD_FORMATS = _.transform({
  annual_fuel_therms_used: {fallback: 'N/A †'},
  annual_fuel_therms_improved: {fallback: 'N/A †'},
  annual_fuel_therms_used_saved: {fallback: 'N/A †'},
  annual_electric_kWh_used: {},
  annual_electric_kWh_used_saved: {},
  annual_electric_kWh_improved: {},
  mbtu_base: {d: 2},
  mbtu_base_saved: {d: 2},
  mbtu_improved: {d: 2},
  annual_fuel_dollars_spent: {prefix: '$ '},
  annual_fuel_dollars_spent_saved: {prefix: '$ '},
  annual_fuel_dollars_improved: {prefix: '$ '},
  annual_electric_dollars_spent: {prefix: '$ '},
  annual_electric_dollars_spent_saved: {prefix: '$ '},
  annual_electric_dollars_improved: {prefix: '$ '},
  yearly_energy_cost: {prefix: '$ '},
  yearly_energy_cost_saved: {prefix: '$ '},
  yearly_energy_cost_improved: {prefix: '$ '},
  total_co2_tons_base: {d: 1},
  total_co2_tons_base_saved: {d: 1},
  total_co2_tons: {d: 1},
  payback_years: {},
  saved_mbtu_percent: {suffix: '%'},
  saved_co2_percent: {suffix: '%'},
  sir: {d: 1},
  mirr: {d: 1, suffix: '%'}
}, (result, val, key) => {
  result[key] = {d: 0, fallback: 'N/A', prefix: '', suffix: '', ...val}
})

export const METRICS_PAIRS = [
  ['annual_fuel_therms_used', 'annual_fuel_therms_improved'],
  ['annual_electric_kWh_used', 'annual_electric_kWh_improved'],
  ['mbtu_base', 'mbtu_improved'],
  ['annual_fuel_dollars_spent', 'annual_fuel_dollars_improved'],
  ['annual_electric_dollars_spent', 'annual_electric_dollars_improved'],
  ['yearly_energy_cost', 'yearly_energy_cost_improved'],
  ['total_co2_tons_base', 'total_co2_tons'],
  ['payback_years', null],
  ['saved_mbtu_percent', null],
  ['saved_co2_percent', null],
  ['sir', null],
  ['mirr', null],
]

export const BURNABLE_FUEL_TYPES = ['Natural Gas', 'Fuel Oil', 'Propane']

// == Stages ===================================================================
export const STAGES = [
  [1, 'Lead'],
  [2, 'Audit'],
  [3, 'Bid Proposed'],
  [4, 'Bid Approved'],
  [5, 'Retrofit In Progress'],
  [6, 'Retrofit Complete'],
  [7, 'QA'],
  [8, 'Uncategorized'],
  [9, 'Archived Won'],
  [10, 'Archived Lost']
]

/*
  Mapping between our stages and HPXML: https://docs.google.com/spreadsheets/d/1RvFMUmhMXjFW5ybaKu9gyuGVdl-3MleNazybuDM3Ahk/edit#gid=0
  HPXML files contain 2 'buildings' which is the same building with 2 different stages.
  For HPXML download, we only work with 2 HPXML stage sets:
    Audit file:
      Building1: <EventType>audit</EventType>
      Building2: <EventType>proposed workscope</EventType>
      Snugg Stages '1|2'
    Retrofit file:
      Building1: <EventType>audit</EventType>
      Building2: <EventType>job completion testing/final inspection</EventType>
      Snugg Stages '1|5'
*/
export const HPXML_STAGES = IMap([
  [1, "audit"],
  [2, "proposed workscope"],
  [3, "approved workscope"],
  [4, "construction-period testing/daily test out"],
  [5, "job completion testing/final inspection"],
  [6, "quality assurance/monitoring"]
])

// For HES, we use more HPXML stages than programs need
// Mapping between HPXML & HES stages:
// http://hescore-hpxml.readthedocs.org/en/latest/translation/building_address.html#assessment-type
export const HES_STAGES = IMap([
  [1, "initial"],
  [2, "alternative"],
  [3, "alternative"],
  [4, "test"],
  [5, "final"],
  [6, "qa"]
])

// if hpxml_building_node is 'base', HES will model from the first building node,
// which will use the value of hes_hpxml_event_type_1. A node of 'improved'
// uses hes_hpxml_event_type_2, which means that the unused event type is somewhat
// arbitrary, but I'm putting in reasonable values anyway
export const HPXML_EVENT_OPTIONS = {
  initial: {
    hpxml_building_node: 'base',
    hes_hpxml_event_type_1: 'audit',
    hes_hpxml_event_type_2: 'proposed workscope'
  },
  alternative: {
    hpxml_building_node: 'improved',
    hes_hpxml_event_type_1: 'audit',
    hes_hpxml_event_type_2: 'proposed workscope'
  },
  test: {
    hpxml_building_node: 'improved',
    hes_hpxml_event_type_1: 'audit',
    hes_hpxml_event_type_2: 'construction-period testing/daily test out',
  },
  final: {
    hpxml_building_node: 'improved',
    hes_hpxml_event_type_1: 'audit',
    hes_hpxml_event_type_2: 'job completion testing/final inspection',
  },
  qa: {
    hpxml_building_node: 'improved',
    hes_hpxml_event_type_1: 'audit',
    hes_hpxml_event_type_2: 'quality assurance/monitoring',
  }
}
