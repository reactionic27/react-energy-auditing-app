import type {omContextType, basedataType} from './optimiser-types'
import {optimiserCollection} from './optimiser-helpers'

export default function optimiserAtticVault(
  context: omContextType,
  basedata: basedataType,
  {attic, vault},
  {atticFields, vaultFields}
) {

  let validate = true
  let atticValues = {}
  let vaultValues = {}
  let atticTotal = 0
  let vaultTotal = 0

  // If there is no attic, but one vault,
  // then we need to send A1BaseVaultPct1=100 and A1BaseAtticPct1=0.
  if (attic.length === 0 && vault.length === 1) {
    validate = false
    vaultValues.A1BaseVaultPct1 = 100
    atticValues.A1BaseAtticPct1 = 0
  }

  // If there is one attic, and no vault,
  // then we need to send A1BaseVaultPct1=0 and A1BaseAtticPct1=100.
  if (attic.length === 1 && vault.length === 0) {
    validate = false
    vaultValues.A1BaseVaultPct1 = 0
    atticValues.A1BaseAtticPct1 = 100
  }

  attic.forEach((a, i) => {
    if (validate) {
      atticTotal += isNaN(+a.attic_percent) ? 0 : +a.attic_percent
    }
    if (a.attic_has_knee_wall === 'No') {
      atticValues[`KneeArea${i + 1}`] = '0'
    }
    if (a.attic_has_knee_wall_improved === 'No') {
      atticValues[`ImpKneeArea${i + 1}`] = '0'
    }
  })

  if (validate) {
    vault.forEach(v => {
      vaultTotal += isNaN(+v.vault_percent) ? 0 : +v.vault_percent
    })
  }

  if (validate && ((atticTotal + vaultTotal) !== 100) && basedata.percent_of_ceilings_shared < 100) {
    context.errors.push({
      component: 'AtticVaultTotalTable'
    })
  }

  context = optimiserCollection('vault', context, vaultFields, vault, {
    values: vaultValues,
  })
  context = optimiserCollection('attic', context, atticFields, attic, {
    values: atticValues
  })

  return context
}
