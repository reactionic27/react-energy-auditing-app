import {Map as IMap} from 'immutable'
import _ from 'lodash'

// TODO Server: For program admins, only send jobs to client that belong to the
// the program defined in `accounts.program_id`.
export const isProgramAdmin = (account: IMap) => {
  return _.isNumber(account.get('program_id'))
}

export const isSnuggAdmin = (account: IMap): boolean => {
  return account.get('role') === "snuggadmin"
}

export const isHesAssessor = (account: IMap): boolean => {
  return account.get('doe_assessor_id') !== null && account.get('doe_assessor_id') !== ""
}

export const firstNameLastNameInitial = (account: IMap) => {
  if (!account) {
    return "Unknown user"
  }
  let first = account.get('first_name', '')
  if (first) first = first + ' '
  let last = account.get('last_name', '').charAt(0)
  if (last) last = last + '.'
  return `${first}${last}`
}

export const fullName = (account: IMap) => {
  let first = account.get('first_name', '')
  let last = account.get('last_name', '')
  return `${first} ${last}`
}

export const accountsDropdown = (accounts: Array<IMap>) => {
  return accounts.map(acct => [
    acct.get('id'), `${acct.get('first_name')} ${acct.get('last_name', '')}`
  ])
}

export function canAdminCompany(state, company: IMap) {
  const adminCompanies = state.fn.adminCompaniesByUser(state.fn.loggedInUser())
  // The company map will exist inside this Array if we can admin.
  return adminCompanies.indexOf(company) !== -1
}
