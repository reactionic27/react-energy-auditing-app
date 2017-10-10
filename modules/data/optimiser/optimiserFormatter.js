import _ from 'lodash'
import invariant from 'fbjs/lib/invariant'
import buildOptimiser from './build-optimiser'
import type {omContextType} from './optimiser-types'

export default function optimiserFormatter(state, {accountId, jobId}) : omContextType {
  invariant(
    jobId,
    'A jobId is required when building the optimiser hash on the client'
  )
  const job = state.fn.jobById(jobId)
  const optimiserTables = {
    jobs: job,
    accounts: state.fn.accountById(job.get('account_id')),
    companies: state.fn.companyById(job.get('company_id')),

    basedata: state.fn.basedataByJobId(jobId),

    attic: state.fn.atticsByJobId(jobId),
    dhw: state.fn.dhwsByJobId(jobId),
    door: state.fn.doorsByJobId(jobId),
    freezer: state.fn.freezersByJobId(jobId),
    hvac: state.fn.hvacsByJobId(jobId),
    refrigerator: state.fn.refrigeratorsByJobId(jobId),
    utilities: state.fn.utilitiesByJobId(jobId),
    vault: state.fn.vaultsByJobId(jobId),
    wall: state.fn.wallsByJobId(jobId),
    window: state.fn.windowsByJobId(jobId),

    clothesDryer: state.fn.clothesDryersByJobId(jobId),
    oven: state.fn.ovensByJobId(jobId),
    range: state.fn.rangesByJobId(jobId),
    pv: state.fn.pvsByJobId(jobId),

    // caz: state.fn.cazByJobId(jobId),
    // concern: state.fn.concernsByJobId(jobId),

    recommendations: state.fn.recommendationsByJobId(jobId),
  }
  return buildOptimiser(_.mapValues(optimiserTables, memoToJS))
}

let lastKeys = {}
let lastJS = {}

function memoToJS(val, key) {
  if (lastKeys[key] && lastKeys[key] === val) {
    return lastJS[key]
  }
  lastKeys[key] = val
  lastJS[key] = toJS(val)
  return lastJS[key]
}
function toJS(obj) {
  if (Array.isArray(obj)) return obj.map(toJS)
  return (obj && obj.toJS) ? obj.toJS() : obj
}
