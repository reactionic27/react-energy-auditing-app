import Value from 'util/value'
import {Map as IMap} from 'immutable'

export function formatFinancingTemplate(product: IMap) {
  const p = product.toJS()
  return {
    ...p,
    min_cash_down: new Value(p.min_cash_down).prefix('$ ').toString(),
    rate: new Value(p.rate).d(2).suffix('%').toString(),
    term: new Value(p.term).d(0).suffix(' months').toString(),
    min_purchase: new Value(p.min_purchase).d(0).prefix('$ ').toString(),
    max_purchase: new Value(p.max_purchase).d(0).prefix('$ ').toString(),
  }
}
