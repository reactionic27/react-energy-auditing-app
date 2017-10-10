import type {omContextType, accountType} from './optimiser-types'
import {returnContext} from './optimiser-helpers'

export default function optimiserAccount(
  context: omContextType,
  account: accountType
) : omContextType {

  const firstName = account.first_name ? account.first_name + ' ' : ''

  const values = {
    AuditorEmail: account.email,
    AuditorInspector: `${firstName}${account.last_name}`
  }

  return returnContext('accounts', context, {values})
}
