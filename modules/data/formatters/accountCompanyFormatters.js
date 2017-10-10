import {Map as IMap} from 'immutable'


export const getAccountCompany = (state: Object, jobId: number): ?IMap => {
  const account = state.fn.accountByJobId(jobId) || IMap()
  const company = state.fn.companyByJobId(jobId) || IMap()
  const accountsCompanies = state.fn.accountsCompaniesByUser(account)

  if (account.isEmpty() || company.isEmpty()) {
    return IMap()
  }
  return accountsCompanies.find(
    accountCompany => accountCompany.get('account_id') === account.get('id') &&
                      accountCompany.get('company_id') === company.get('id')
  )
}

export const displayTitle = (state: Object, jobId: number): string => {
  const account = state.fn.accountByJobId(jobId) || IMap()
  const accountCompany = getAccountCompany(state, jobId) || IMap()

  return accountCompany.get('display_title') || account.get('title') || ''
}

export const displayEmail = (state: Object, jobId: number): string  => {
  const account = state.fn.accountByJobId(jobId) || IMap()
  const accountCompany = getAccountCompany(state, jobId) || IMap()

  return accountCompany.get('display_email') || account.get('email') || ''
}
