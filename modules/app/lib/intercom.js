import moment from 'moment'
import {browserHistory} from 'react-router'
import * as f from 'data/formatters'

type storeType = {
  getState: Function,
  dispatch: Function
};

export default function intercomAndHeapInit(store: storeType) {
  if (typeof window.Intercom === 'undefined') {
    return
  }

  const state = store.getState()
  const {first_name, last_name, email} = getUserInfo(state)

  if (window.heap && typeof window.heap.identify === 'function') {
    window.heap.identify({name: `${first_name} ${last_name}`, email: email})
  }

  window.heap = window.heap || {identify() {}}

  const intercomSettings = intercomData(state, {})
  window.Intercom('boot', intercomSettings)

  function handleHistoryUpdate(location) {
    const segments = location.pathname.split('/')
    let params = {}
    if (segments[1] === 'joblist') {
      params.companyId = parseInt(segments[2], 10)
    }
    if (segments[1] === 'job') {
      params.jobId = parseInt(segments[2], 10)
    }
    const intercomSettings = intercomData(state, params)
    window.Intercom('update', intercomSettings)
  }

  browserHistory.listen(handleHistoryUpdate)
}

function intercomData(state, params) {
  // Always at least return the app_id so that the user can trigger the intercom window
  let intercomSettings = {
    app_id: INTERCOM_APP_ID
  };

  const {
    id: userId,
    first_name,
    last_name,
    email,
    created_at,
    phone_number,
    source,
    adgroup
  } = getUserInfo(state)

  if (userId) {
    intercomSettings = {
      ...intercomSettings,
      user_id: userId,
      id: userId,
      name: `${first_name} ${last_name}`, // Full name
      phone: phone_number,
      email,
      source,
      adgroup,
      hide_default_launcher: true,
      created_at: moment(created_at).unix(), // Signup date as a Unix timestamp
      // 'user can admin': user.canAdmin(currentCompany),
    }
  }

  const isProgramAdmin = f.account.isProgramAdmin(state.fn.loggedInUser())
  const isSnuggAdmin = f.account.isSnuggAdmin(state.fn.loggedInUser())

  if (params.companyId && !isProgramAdmin && !isSnuggAdmin) {
    const currentCompany = state.fn.companyById(params.companyId)
    intercomSettings.company = getCompanyInfo(currentCompany)
    const programs = state.fn.programsByCompanyId(params.companyId).map((program) => program.get('billingName')).join(', ').substring(0, 253)
    intercomSettings.company.programs = programs
  }


  if (params.jobId) {
    const job = state.fn.jobById(params.jobId)
    intercomSettings.job = getJobInfo(job)
  }
  return intercomSettings
}

function getUserInfo(state) {
  return state.fn.loggedInUser().toJS()
}

function getJobInfo(job) {
  return {}
}

function getCompanyInfo(company) {
  if (!company) {
    return {}
  }
  return {
    // 'card last 4:': company.get('cached_stripe_last4'),
    'card exp date': company.get('cached_stripe_exp'),
    'card declined': company.get('card_declined'),
    // company info
    id: company.get('id'),
    name: company.get('name'),
    plan: company.get('pricing_plan'),
    created_at: company.get('created_at') ? moment(company.get('created_at')).unix() : null, // Signup date as a Unix timestamp
    'website': company.get('website'),
    'company phone': company.get('phone'),
    'hours': company.get('hours_of_operation'),
    'ad address 1': company.get('address_1'),
    'ad address 2': company.get('address_2'),
    'ad city': company.get('city'),
    'ad state': company.get('state'),
    'ad zip': company.get('zip'),
    'offer': company.get('offer'),
    'disabled': company.get('disabled'),
    'demo company' : company.get('demo_company'),
    'has logo': company.get('company_photo_name') ? true : false
  }
}
