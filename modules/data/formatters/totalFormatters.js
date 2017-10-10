import _ from 'lodash'
import {Map as IMap} from 'immutable'
import Value from '../../util/value'
import {FIELD_FORMATS, METRICS_PAIRS} from 'data/constants'

// Totals
// ----------

export const formattedTotals = (totals: IMap) => {
  return {
    totalSavings: new Value(totals.get('total_savings')).d(0).prefix('$').toString(),
    savedMbtuPercent: new Value(totals.get('saved_mbtu_percent')).d(0).suffix('%').toString(),
    sir: new Value(totals.get('sir')).d(1).toString(),
    mirr: new Value(totals.get('mirr')).d(0).suffix('%').toString(),
  }
}

// Pass in a pair of metrics and calculate the savings.
// Make sure to round first, then subtract, then round again. People notice if not
export const calculatedMetrics = (totals: IMap | Object) => {
  return METRICS_PAIRS.reduce((result, [base, imp]) => {
    let baseNumber, impNumber, baseDigits, improvedDigits
    if (base) {
      baseDigits = FIELD_FORMATS[base].d
      baseNumber = new Value(getTotal(totals, base)).d(baseDigits).else(0).toNumber()
      result[base] = baseNumber
    }
    if (imp) {
      improvedDigits = FIELD_FORMATS[imp].d
      impNumber = new Value(getTotal(totals, imp)).d(improvedDigits).else(null).toNumber()
      result[imp] = impNumber
    }
    if (base && imp) {
      result[`${base}_saved`] = new Value(baseNumber - impNumber).d(baseDigits).else(0).toNumber()
    }
    return result
  }, {})
}

function getTotal(totals, key) {
  if (IMap.isMap(totals)) {
    return totals.get(key)
  }
  return totals[key]
}

export const formattedMetrics = (totals: IMap | Object) => {
  return _.transform(calculatedMetrics(totals), (result, val, key) => {
    const f = FIELD_FORMATS[key] || {}
    result[key] = new Value(val).d(f.d).prefix(f.prefix).suffix(f.suffix).else(f.fallback).toString()
  })
}

export const monthlyEnergySavings = (totals: IMap) => {
  const base = totals.get('yearly_energy_cost', 0) / 12
  const impr = totals.get('yearly_energy_cost_improved', 0) / 12
  return base - impr
}

export const formattedMonthlyEnergySavings = (totals: IMap) => {
  return new Value(monthlyEnergySavings(totals)).d(0).prefix('$ ').toString()
}

export const formattedDemandkW = (baseData: IMap): Object => {
  return {
    demandKWBase: new Value(baseData.get('demand_k_w')).d(3).else('N/A').toString(),
    demandKWImp: new Value(baseData.get('demand_k_w_improved')).d(3).else('N/A').toString(),
    demandKWSavings: new Value(baseData.get('demand_k_w_savings')).d(3).else('N/A').toString()
  }
}
