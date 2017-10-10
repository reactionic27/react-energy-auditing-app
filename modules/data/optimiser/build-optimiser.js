import _ from 'lodash'
import fieldDefinitions from '../../../constants/field-definitions'

import optimiserJob from './optimiserJob'
import optimiserAccount from './optimiserAccount'
import optimiserCompany from './optimiserCompany'

import optimiserBasedata from './optimiserBasedata'
import optimiserAtticVault from './optimiserAtticVault'
import optimiserDoor from './optimiserDoor'
import optimiserFreezer from './optimiserFreezer'
import optimiserConstants from './optimiserConstants'
import optimiserHvac from './optimiserHvac'
import optimiserDhw from './optimiserDhw'
import optimiserRefrigerator from './optimiserRefrigerator'
import optimiserUtilities from './optimiserUtilities'
import optimiserRecommendations from './optimiserRecommendations'
import optimiserWindow from './optimiserWindow'
import optimiserWall from './optimiserWall'
import optimiserOven from './optimiserOven'
import optimiserRange from './optimiserRange'
import optimiserPv from './optimiserPv'
import optimiserClothesDryer from './optimiserClothesDryer'

const groupedDefinitions = _.groupBy(_.filter(fieldDefinitions, row => {
  return row.omA1BaseKey || row.omDirectSetBase || row.omDirectSetImproved
}), row => row.outputTable.replace('v5_', ''))

import type {
  omContextType,
  optimiserTablesType
} from './optimiser-types'

export default function buildOptimiser(
  optimiserTables: optimiserTablesType
): omContextType {
  const defs = groupedDefinitions
  function fields(type) {
    return _.get(defs, type, [])
  }
  const {
    jobs: job,
    accounts: account,
    companies: company,
    window: win,
    basedata,
    utilities,
    dhw, door, freezer, hvac,
    refrigerator, wall, oven,
    range, clothesDryer, pv,
    // caz,
    // concern,
    recommendations
  } = optimiserTables

  let context = {
    payload: optimiserTables,
    errors: [],
    values: {
      ...optimiserConstants,
    },
    returning: [],
    returningInto: {},
    sections: {}
  }

  context = optimiserJob(context, job)
  context = optimiserAccount(context, account)
  context = optimiserCompany(context, company)
  context = optimiserRecommendations(context, recommendations)
  context = optimiserUtilities(context, utilities)
  context = optimiserBasedata(context, basedata, fields('basedata'))
  // context = optimiserConcern(context, fields('concern'))
  // context = optimiserCaz(context, fields('caz'))

  // Generic Job Form Collections
  context = optimiserDhw(context, dhw, fields('dhw'))
  context = optimiserDoor(context, door, fields('door'))
  context = optimiserFreezer(context, freezer, fields('freezer'))
  context = optimiserHvac(context, hvac, fields('hvac'))
  context = optimiserRefrigerator(context, refrigerator, fields('refrigerator'))
  context = optimiserWall(context, wall, fields('wall'))
  context = optimiserOven(context, oven, fields('oven'))
  context = optimiserRange(context, range, fields('range'))
  context = optimiserPv(context, pv, fields('pv'))
  context = optimiserClothesDryer(context, clothesDryer, fields('clothes_dryer'))
  context = optimiserAtticVault(context, basedata, {
    attic: optimiserTables.attic,
    vault: optimiserTables.vault,
  }, {
    atticFields: fields('attic'),
    vaultFields: fields('vault')
  })
  context = optimiserWindow(context, win, fields('window'), basedata)
  return context;
}
