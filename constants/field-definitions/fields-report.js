const ON_OFF = [[1, 'On'], [0, 'Off']]

export default [
  {
    name: 'Report: Cover Title',
    outputColumn: 'title_cover',
    type: "Text",
    maxLength: 32
  },
  {
    name: 'Report: Concerns Title',
    outputColumn: 'title_concerns',
    type: "Text",
    maxLength: 32
  },
  {
    name: 'Report: Concerns Sidebar',
    outputColumn: 'concerns_sidebar',
    type: "Text",
    maxLength: 32
  },
  {
    name: 'Report: Title Solutions',
    outputColumn: 'title_solutions',
    type: "Text",
    maxLength: 32
  },
  {
    name: 'Report: Financing Title',
    outputColumn: 'title_financing',
    type: "Text",
    maxLength: 32
  },
  {
    name: 'Report: Additional Notes Overview Title',
    outputColumn: 'additional_notes_overview_title',
    type: "Text",
    maxLength: 32
  },
  {
    name: 'Report: Additional Notes Overview',
    outputColumn: 'additional_notes_overview',
    type: "Text"
  },
  {
    name: 'Report: Rebates Title',
    outputColumn: 'title_rebates',
    type: "Text",
    maxLength: 32
  },
  {
    name: 'Report: Tech Specs Title',
    outputColumn: 'title_tech_specs',
    type: "Text",
    maxLength: 32
  },
  {
    name: 'Report: Metrics Title',
    outputColumn: 'title_metrics',
    type: "Text",
    maxLength: 32
  },
  {
    name: 'Report: Glossary Title',
    outputColumn: 'title_glossary',
    type: "Text",
    maxLength: 32
  },
  {
    name: 'Report: HES Title',
    outputColumn: 'title_hes',
    type: "Text",
    maxLength: 32
  },
  {
    name: 'Report: Certificate of Completion Title',
    outputColumn: 'title_coc',
    type: "Text",
    maxLength: 32
  },
  {
    name: 'Report: Service Date Title',
    outputColumn: 'service_date_title',
    type: "Text",
    maxLength: 255
  },
  {
    name: 'Report: Serviced By Title',
    outputColumn: 'serviced_by_title',
    type: "Text",
    maxLength: 255
  },
  {
    name: 'Report: Solutions Title',
    outputColumn: 'solutions_title',
    type: "Text"
  },
  {
    name: 'Report: Cover Textarea',
    outputColumn: 'cover_text_area',
    type: "Editable"
  },
  {
    name: 'Report: Element Costs',
    outputColumn: 'element_costs',
    options: [
      [2, 'Exact'],
      [1, 'Rounded'],
      [0, 'Off']
    ]
  },
  {
    name: 'Report: Element Savings',
    outputColumn: 'element_savings',
    // [from Jeff] We will implement Net and Icon savings view after launch.
    // All code is hooked up, just don't let them choose these options.
    options: [
      [1, 'Detailed'],
      // [2, 'Bars'],
      // [3, 'Stars'],
      [4, 'Global'],
      [0, 'Off'],
    ]
  },
  {
    name: 'Report: Element SIR',
    outputColumn: 'element_sir',
    options: [
      [1, 'Detailed'],
      // [2, '✓'],
      [3, 'Global'],
      [0, 'Off'],
    ]
  },
  {
    name: 'Report: Element Impact of Upgrades',
    outputColumn: 'element_co2'
  },
  {
    name: 'Report: Element Why it Matters',
    outputColumn: 'element_why_it_matters'
  },
  {
    name: 'Report: Element Photo Sets',
    outputColumn: 'element_photos'
  },
  {
    name: 'Report: Element Homeown. Notes',
    outputColumn: 'element_homeowner_notes'
  },
  {
    name: 'Report: Element Contractor Notes',
    outputColumn: 'element_contractor_notes'
  },
  {
    name: 'Report: Element Now & Goal',
    outputColumn: 'element_now_and_goal'
  },
  {
    name: 'Report: Page Cover',
    outputColumn: 'page_cover'
  },
  {
    name: 'Report: Page Concerns',
    outputColumn: 'page_concerns'
  },
  {
    name: 'Report: Page Solutions',
    outputColumn: 'page_solutions'
  },
  {
    name: 'Report: Page Upgrade Details',
    outputColumn: 'page_upgrade_details'
  },
  {
    name: 'Report: Page Health & Safety',
    outputColumn: 'page_health'
  },
  {
    name: 'Report: Page Additional Notes',
    outputColumn: 'page_additional_notes'
  },
  {
    name: 'Report: Page Rebates & Incentives',
    outputColumn: 'page_rebates'
  },
  {
    name: 'Report: Page Financing',
    outputColumn: 'page_financing'
  },
  {
    name: 'Report: Page Metrics',
    outputColumn: 'page_metrics'
  },
  {
    name: 'Report: Page Tech specs',
    outputColumn: 'page_tech_specs'
  },
  {
    name: 'Report: Page HES',
    outputColumn: 'page_hes'
  },
  {
    name: 'Report: Page Certificate of Completion',
    outputColumn: 'page_coc'
  },
  {
    name: 'Report: Page Glossary',
    outputColumn: 'page_glossary'
  },
  {
    name: 'Report: Safety Overview',
    outputColumn: 'safety_overview',
    type: "Editable"
  }
].map(obj => {
  if (obj.name.indexOf('Report: Element ') === 0) {
    obj.label = obj.name.slice(16)
    obj.options = obj.options || ON_OFF
    obj.type = "Radio"
  }
  if (obj.name.indexOf('Report: Page ') === 0) {
    obj.label = obj.name.slice(13)
    obj.options = ON_OFF
    obj.type = "Radio"
  }
  obj.outputTable = 'v5_reports'
  return obj
})
