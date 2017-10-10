import {validateGroup, flattenAllGroups} from './validate-field-definitions'

import atticFields from './fields-attic'
import dhwFields from './fields-dhw'
import doorFields from './fields-door'
import freezerFields from './fields-freezer'
import hvacFields from './fields-hvac'
import hesScoresFields from './fields-hes-scores'
import refrigeratorFields from './fields-refrigerator'
import vaultFields from './fields-vault'
import wallFields from './fields-wall'
import windowFields from './fields-window'
import cazFields from './fields-caz'
import cazSystemFields from './fields-caz-system'
import basedataFields from './fields-basedata'
import accountFields from './fields-account'
import healthFields from './fields-health'
import utilitiesFields from './fields-utilities'
import concernFields from './fields-concern'
import jobFields from './fields-job'
import reportFields from './fields-report'
import companyFields from './fields-company'
import programFields from './fields-program'
import recommendationFields from './fields-recommendation'
import recommendationCaptionFields from './fields-recommendation-caption'
import jobFinancingFields from './fields-job-financing'
import clothesDryerFields from './fields-clothes-dryer'
import ovenFields from './fields-oven'
import rangeFields from './fields-range'
import pvFields from './fields-pv'

export const attic = validateGroup(atticFields);
export const dhw = validateGroup(dhwFields);
export const door = validateGroup(doorFields);
export const freezer = validateGroup(freezerFields);
export const hvac = validateGroup(hvacFields);
export const refrigerator = validateGroup(refrigeratorFields);
export const vault = validateGroup(vaultFields);
export const wall = validateGroup(wallFields);
export const window = validateGroup(windowFields);
export const caz = validateGroup(cazFields);
export const cazSystem = validateGroup(cazSystemFields);
export const basedata = validateGroup(basedataFields);
export const account = validateGroup(accountFields);
export const health = validateGroup(healthFields);
export const utilities = validateGroup(utilitiesFields);
export const concern = validateGroup(concernFields);
export const company = validateGroup(companyFields);
export const program = validateGroup(programFields);
export const report = validateGroup(reportFields);
export const job = validateGroup(jobFields);
export const recommendation = validateGroup(recommendationFields);
export const recommendationCaption = validateGroup(recommendationCaptionFields);
export const jobFinancing = validateGroup(jobFinancingFields);
export const clothesDryer = validateGroup(clothesDryerFields);
export const oven = validateGroup(ovenFields);
export const range = validateGroup(rangeFields);
export const hesScores = validateGroup(hesScoresFields)
export const pv = validateGroup(pvFields)

export default flattenAllGroups([
  attic,
  dhw,
  door,
  freezer,
  hvac,
  refrigerator,
  vault,
  wall,
  window,
  caz,
  hesScores,
  cazSystem,
  basedata,
  account,
  health,
  utilities,
  concern,
  company,
  program,
  report,
  job,
  recommendation,
  recommendationCaption,
  jobFinancing,
  clothesDryer,
  oven,
  range,
  pv
])

