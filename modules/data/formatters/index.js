import { Map as IMap } from 'immutable'

export * as num from './numberFormatters'
export * as str from './stringFormatters'
export * as account from './accountFormatters'
export * as accountCompany from './accountCompanyFormatters'
export * as billing from './billingFormatters'
export * as basedata from './basedataFormatters'
export * as company from './companyFormatters'
export * as job from './jobFormatters'
export * as jobFinancing from './jobFinancingFormatters'
export * as hvac from './hvacFormatters'
export * as program from './programFormatters'
export * as captionRow from './recCaptionRowFormatters'
export * as recs from './recommendationFormatters'
export * as report from './reportFormatters'
export * as totals from './totalFormatters'
export * as utilities from './utilitiesFormatters'
export * as stages from './stageFormatters'
export * as caz from './cazFormatters'
export * as hes from './hesFormatters'
export * as collection from './collectionFormatters'
export * as window from './windowFormatters'
export * as activityFeed from './activityFeedFormatters'
export * as measureCode from './measureCodeFormatters'
export * as  context from './contextFormatters'
export * as type from './typeFormatters'

export function dropdown(items: Array<IMap>, kv: Array<string, string>, withEmpty: boolean = true) {
  items = items.map(item => kv.map(key => item.get(key)))
  if (withEmpty) {
    return [[null, '']].concat(items)
  }
  return items
}
