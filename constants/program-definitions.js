import _ from 'lodash'
import {fromJS} from 'immutable'

// Defines all programs

type programDefinitionType = {
  id: number,
  name: ?string,
  phone: ?string,
  website: ?string,
  footerText: ?string,
  paysForJob: boolean,
  // If exposeAccountNumber is set to false, don't ask for any account number fields:
  exposeAccountNumber: boolean,
  billingName: string,
  programHelp: ?string,
  logoPath: ?string,
  rebatesTitle: ?string,
  hasCertificateOfCompletion: ?boolean,
  cocSignatory: ?string,
  signaturePath: ?string,
  // approved measures are using recName
  // they show up in places like the certificate of completion
  approvedMeasures: ?Array
};

function validatePrograms(programs: Array<programDefinitionType>) {
  return fromJS(programs)
}

export default validatePrograms([
  {
    id: 1,
    name: "None",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "None",
    programHelp: null,
    logoPath: null
  },
  {
    id: 2,
    name: "Xcel Energy",
    phone: "(800) 895-4999",
    website: "xcelenergy.com",
    footerText: "Brought to you by",
    paysForJob: true,
    exposeAccountNumber: true,
    billingName: "Xcel",
    programHelp: null,
    logoPath: "/img/programs/xcel/xcelenergy.png",
    rebatesTitle: "Xcel Energy Rebates"
  },
  {
    id: 3,
    name: "APS",
    phone: "(800) 253-9405",
    website: "aps.com",
    footerText: "Brought to you by",
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "APS",
    programHelp: "<p>Using the credentials issued by APS, you can upload the HPXML file by <a href='https://aps.energysavvy.com/optix/' target='_blank'>logging into their contractor portal here.</a></p> <p>You'll also need to upload a PDF of this job's report. APS calls it the Energy Measures Report.</p>",
    logoPath: "/img/programs/aps/aps.png"
  },
  {
    id: 4,
    name: "SRP",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "SRP",
    programHelp: "Using the credentials issued by SRP, you'۪ll need to <a href='https://srp.energysavvy.com/optix/' target='_blank'>log into the contractor portal here.</a>",
    logoPath: "/img/programs/srp/srp.png"
  },
  {
    id: 5,
    name: "NYSERDA",
    phone: "1-866-NYSERDA",
    website: "nyserda.ny.gov",
    footerText: "Brought to you by",
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "NYSERDA",
    programHelp: "<p>Using the credentials issued by NYSERDA, you can upload the HPXML file by <a href='https://nyserda.energysavvy.com/optix/' target='_blank'>logging into their contractor portal here.</a></p><p>You'll also need to upload a PDF of this job's report. NYSERDA calls it the HPwES Comprehensive Home Audit Report </p>",
    logoPath: "/img/programs/nyserda/nyserda.png"
  },
  {
    id: 6,
    name: "ReEnergize Pittsburgh",
    phone: "(412) 361-2099",
    website: "reenergizepgh.org",
    footerText: "Brought to you by",
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "RPGH",
    programHelp: null,
    logoPath: "/img/programs/reenergize_pgh/reenergize_pgh.png"
  },
  {
    id: 7,
    name: "LEAP",
    phone: "(434) 227-4666",
    website: "leap-va.org",
    footerText: "Brought to you by",
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "LEAP",
    programHelp: null,
    logoPath: "/img/programs/leap/leap.png"
  },
  {
    id: 8,
    name: "Greater Cincinnati Energy Alliance",
    phone: "(513) 621-4232",
    website: "greatercea.org",
    footerText: "Brought to you by",
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "GCEA",
    programHelp: null,
    logoPath: "/img/programs/greater_cincinnati_energy_alliance/greater_cincinnati_energy_alliance.png"
  },
  {
    id: 9,
    name: "Efficiency Maine",
    phone: "(866) 376-2463",
    website: "efficiencymaine.com",
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "EM",
    programHelp: null,
    logoPath: "/img/programs/efficiency_maine/efficiency_maine.png"
  },
  {
    id: 10,
    name: "Efficiency Works - Xcel",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: true,
    exposeAccountNumber: true,
    billingName: "EWX",
    programHelp: null,
    logoPath: "/img/programs/efficiency_works/xcel-prpa-logo.jpg",
    rebatesTitle: "Xcel Energy Rebates"
  },
  {
    id: 11,
    name: "Efficiency Works - Electric Only",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "EWE",
    programHelp: null,
    logoPath: null
  },
  {
    id: 12,
    name: "PG&E Home Upgrade",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: false,
    billingName: "euc PG&E",
    programHelp: "<p>Using the credentials issued by PG&E and Build It Green, you can upload the HPXML file by <a href='https://builditgreen-main.secure.force.com/pgeportal' target='_blank'>logging into their contractor portal here.</a></p>",
    logoPath: "/img/programs/euc/euc-cover-logo-color.png"
  },
  {
    id: 13,
    name: "SCE/SoCalGas® Home Upgrade",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: false,
    billingName: "euc SCE_SCG",
    programHelp: null,
    logoPath: "/img/programs/euc/euc-cover-logo-color.png"
  },
  {
    id: 14,
    name: "SoCalGas® Home Upgrade",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: false,
    billingName: "euc SCG",
    programHelp: null,
    logoPath: "/img/programs/euc/euc-cover-logo-color.png"
  },
  {
    id: 15,
    name: "SDG&E Home Upgrade",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: false,
    billingName: "euc SDG&E",
    programHelp: null,
    logoPath: "/img/programs/euc/euc-cover-logo-color.png"
  },
  {
    id: 16,
    name: "Entergy Solutions",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "scs ETG",
    programHelp: null,
    logoPath: "/img/programs/entergy/logo.png"
  },
  {
    id: 17,
    name: "CLECO",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "scs CLECO",
    programHelp: null,
    logoPath: "/img/programs/cleco/logo.png"
  },
  {
    id: 18,
    name: "EnergySmart New Orleans",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "scs ES",
    programHelp: null,
    logoPath: "/img/programs/southcoast-energysmart/logo.png"
  },
  {
    id: 19,
    name: "NYSERDA-NSL",
    phone: "1-866-NYSERDA",
    website: "nyserda.ny.gov",
    footerText: "Brought to you by",
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "NSL NYSERDA",
    programHelp: null,
    logoPath: "/img/programs/nyserda/nyserda.png"
  },
  {
    id: 20,
    name: "INACTIVE PG&E Home Upgrade - EG",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "euc PG&E - EG",
    programHelp: null,
    logoPath: null
  },
  {
    id: 23,
    name: "Focus on Energy",
    phone: "(800) 762-7077",
    website: "focusonenergy.com",
    footerText: null,
    paysForJob: true,
    exposeAccountNumber: true,
    billingName: "FOE",
    programHelp: null,
    logoPath: "/img/programs/foe/logo.png",
    hasCertificateOfCompletion: true,
    cocSignatory: 'Scott Bloedorn',
    signaturePath: '/img/programs/foe/foe-signature.png',
    approvedMeasures: [
      'AirSeal',
      'SealDucts',
      'Attic',
      'Ceiling',
      'Walls',
      'Crawl',
      'BsmtSlab',
      'Floor',
    ]
  },
  {
    id: 24,
    name: "United Cooperative Services",
    phone: null,
    website: null,
    footerText: "Brought to you by United Cooperative Services",
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "UCOOP",
    programHelp: null,
    logoPath: null
  },
  {
    id: 25,
    name: "City of Palo Alto Utililities",
    phone: null,
    website: null,
    footerText: "Brought to you by City of Palo Alto Utilities",
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "CPAU",
    programHelp: null,
    logoPath: "/img/programs/cpau/cpau-logo.png"
  },
  {
    id: 26,
    name: "Kansas City Metro",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "KCM",
    programHelp: null,
    logoPath: null
  },
  {
    id: 27,
    name: "Ameren Illinois Energy Efficiency Program",
    phone: "(866) 838-6918",
    website: "ActOnEnergy.com",
    footerText: "Brought to you by",
    paysForJob: true,
    exposeAccountNumber: false,
    billingName: "AIEEP",
    programHelp: null,
    logoPath: "/img/programs/aieep/aieep-logo.png"
  },
  {
    id: 28,
    name: "ESC - Walking Mountains",
    phone: null,
    website: null,
    footerText: "Brought to you by Holy Cross Energy & Black Hills Energy",
    paysForJob: true,
    exposeAccountNumber: true,
    billingName: "ESC-WM",
    programHelp: null,
    logoPath: "/img/programs/esc-wm/holycross-blackhills.png"
  },
  {
    id: 29,
    name: "SnuggHome program",
    phone: null,
    website: null,
    footerText: "Brought to you by Holy Cross Energy & Black Hills Energy",
    paysForJob: true,
    exposeAccountNumber: true,
    billingName: "SP",
    programHelp: null,
    logoPath: null
  },
  {
    id: 30,
    name: "CARE Lake",
    phone: null,
    website: null,
    footerText: "Brought to you by Cloud City Conservation Center & Energy Outreach Colorado",
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "CARE Lake",
    programHelp: null,
    logoPath: "/img/programs/care-lake/care-lake-logo.png"
  },
  {
    id: 31,
    name: "Grassroots Green Homes",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "GGH",
    programHelp: null,
    logoPath: "/img/programs/ggh/ggh.png"
  },
  {
    id: 32,
    name: "PSEG",
    phone: null,
    website: null,
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "PSEG",
    programHelp: null,
    logoPath: "/img/programs/pseg/logo.png"
  },
  {
    id: 33,
    name: "Sigora Solar",
    phone: "(540) 949-6553",
    website: 'sigorasolar.com',
    footerText: null,
    paysForJob: false,
    exposeAccountNumber: true,
    billingName: "SIGSOL",
    programHelp: null,
    logoPath: "/img/programs/sigora-solar/logo.png"
  },
  // 34 seems to be LIWP-2
  {
    id: 35,
    name: "Direct Energy Assistance Loan",
    phone: "(775) 687-1850 ext. 7310",
    website: 'bit.ly/nv-deal',
    footerText: "Brought to you by the Governor's Office of Energy Direct Energy Assistance Loan (DEAL)",
    paysForJob: true,
    exposeAccountNumber: true,
    billingName: "DEAL",
    programHelp: null,
    logoPath: "/img/programs/deal/logo.jpg"
  }
].map(p => {
  return _.defaults(p, {
    exposeAccountNumber: true,
    hasCertificateOfCompletion: false,
    signaturePath: '',
    cocSignatory: '',
    approvedMeasures: []
  })
}))
