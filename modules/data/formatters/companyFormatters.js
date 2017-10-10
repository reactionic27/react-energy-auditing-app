import _ from 'lodash'
import {Map as IMap} from 'immutable'

export function companiesDropdown(companies: Array<IMap>) {
  return companies.map(c => [c.get('id'), c.get('name')])
}

export function hasCompanyProfile(company: IMap): boolean {
  const criteria = ['phone', 'address_1', 'city', 'zip', 'state', 'website']
  const missingInfo = criteria.reduce((missing, criterion) => {
    return company.get(criterion) ? missing : missing + 1
  }, 0)
  if (missingInfo < 1 && company.get('company_photo_name')) {
    return true
  }
  return false
}

export const selectedJobNames = _.flow(
  _.over(
    _.flow(
      arr => _.take(arr, 3),
      arr => _.map(arr, job => `${job.get('first_name', '')} ${job.get('last_name', '')}`),
      arr => arr.join(', '),
    ),
    arr => arr.length
  ),
  ([message, count]) => {
    if (count > 3) {
      count = count - 3
      message += ` and ${count} ${count === 4 ? 'other' : 'others'}`
    }
    return message
  }
)

export function makeCompanyOptions(companies: Array<IMap>) {
  return [
    [null, ''],
    ['personal', 'Only Me']
  ].concat(companies.map(c => [c.get('id'), c.get('name')]))
}
