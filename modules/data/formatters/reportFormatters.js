import React from 'react'
import _ from 'lodash'
import shallowEquals from 'shallow-equals'
import { PAGE_SORT } from 'data/constants'
import {Map as IMap} from 'immutable'
import {report as reportFields} from '../../../constants/field-definitions'
import Value from 'util/value'
import strip from 'util/strip'
import {List} from 'immutable'

const reportFieldByColumn = _.keyBy(reportFields, 'outputColumn')

// Reports
// ----------
export const getPageBranding = (pageName, program) => {
  return {}
}

export const formattedAddressWithBreaks = (job: IMap) => {
  let {is_template, last_name, address_1, address_2, city, state, zip} = job.toJS()
  if (is_template) return last_name;
  return (
    <span>
      {address_1}
      {address_1 && address_2 ? <br/> : null }
      {address_2}
      {city || state || zip ? <br/> : null}
      {city ? `${city}, ` : null}
      {state ? `${state} ` : null}
      {zip ? zip : null}
    </span>
  )
}

export const formattedName = (job: IMap) => {
  let {first_name, last_name} = job.toJS()
  return <span>{strip`${first_name} ${last_name}`}</span>
}

export const pageSortOrder = (report) => {
  let pageSortOrder = report.get('page_sort_order') || List(PAGE_SORT)
  pageSortOrder = pageSortOrder.includes('page_hes') ? pageSortOrder : pageSortOrder.push('page_hes')
  pageSortOrder = pageSortOrder.includes('page_coc') ? pageSortOrder : pageSortOrder.push('page_coc')

  return pageSortOrder
}

let lastReport, lastProgramId, lastVisibleSections = []
export function visibleSections(report: IMap, programId: number = 1): Array<Object> {
  if (lastReport && lastReport === report && lastProgramId === programId) {
    return lastVisibleSections
  }
  lastReport = report
  lastProgramId = programId

  const sections = (pageSortOrder(report)).reduce((result: Array, pageToggleColumn: string) => {
    if (pageToggleColumn === 'page_rebates' && programId === 1) return result
    if (report.get(pageToggleColumn) === 1) {
      return result.concat(reportFieldByColumn[pageToggleColumn])
    }
    return result
  }, [])

  if (!shallowEquals(sections, lastVisibleSections)) {
    lastVisibleSections = sections
  }
  return lastVisibleSections
}

export const costDisplayType = (report: IMap | Object) => {
  const costDisplay = IMap.isMap(report) ? report.get('element_costs') : report.element_costs
  switch (costDisplay) {
    case 0:  return 'off'
    case 1:  return 'rounded'
    case 2:  return 'exact'
    default: return 'exact'
  }
}

// Icon view will probably wait until after we launch redux-val.
// All code is hooked up except it's not available in the element toggles
export const savingsDisplayType = (report: IMap) => {
  const savingsDisplay = report.get('element_savings')
  switch (savingsDisplay) {
    case 0:  return 'off'
    case 1:  return 'lineItem'
    case 2:  return 'bars'
    case 3:  return 'stars'
    case 4:  return 'net'
    default: return 'lineItem'
  }
}

export const sirDisplayType = (report: IMap): string => {
  const sirDisplay = report.get('element_sir')
  switch (sirDisplay) {
    case 0:  return 'off'
    case 1:  return 'lineItem'
    case 2:  return 'icon'
    case 3:  return 'net'
    default: return 'lineItem'
  }
}

export const showCosts = _.flow(
  costDisplayType,
  (type) => type === 'rounded' || type === 'exact'
)

// Display approximate or exact cost. Rounding here for no cost (0) for loan calculations
export const recTotalCostDisplay = (total: number, costDisplay): number => {
  if (costDisplay === 'off' || costDisplay === 'rounded') {
    return new Value(total).specialCeil().toNumber()
  } else {
    return total
  }
}

export const formattedRecTotalCost = (total: number): string => {
  return new Value(total).d(0).prefix('$ ').toString()
}

// PDF title: (Obscure bug) The print dialogue truncates the title of the page if it finds
// a period. This can happen with "Main St.". This reformats & strips periods
export function formattedPrintTitle(job: IMap): string {
  const {first_name, last_name, address_1, address_2, city, state, zip} = job.toJS()
  const location = city + (city || zip ? ',' : '') + ` ${state} ${zip}`
  const pageTitle = strip`${first_name} ${last_name} ${address_1} ${address_2} ${location}`
  return pageTitle.replace(/\./g, '')
}

export function collectionNameTitles(val: string): string {
  if (val === 'dhw') {
    return 'Water Heating'
  }
  return _.startCase(val)
}

// split email across 2 lines if it's too long
export function formatLongEmail(email: ?string) {
  if (!email) {
    return null
  }
  const emailString = String(email)
  if (emailString.length <= 25) {
    return <span>{email}<br/></span>
  }
  const emailBreakIndex = _.indexOf(emailString, '@') + 1
  return (
    <span>
      {emailString.slice(0, emailBreakIndex)}<br/>
    {emailString.slice(emailBreakIndex)}
    </span>
  )
}

// If people have a space or newlines in a textarea such as homeowner notes, we
// don't want that to show up in the print view. Lodash trims whitespace & newlines
export function trimContent(content) {
  return _.trim(content)
}
