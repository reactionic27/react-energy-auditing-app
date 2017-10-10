import type {omContextType, companyType} from './optimiser-types'
import {returnContext} from './optimiser-helpers'

export default function optimiserCompany(context: omContextType, company: companyType) {
  const values = {
    CompanyName: company.name,
  }
  return returnContext('companies', context, {values})
}
