import LoanCalc from 'loan-calc'
import {createSelector} from 'simple-selectors'
import {Map as IMap} from 'immutable'
import Value from 'util/value'
import {monthlyEnergySavings} from './totalFormatters'
import {recTotalCost} from './recommendationFormatters'
import {dollars, percent} from './numberFormatters'
import {isFinite} from 'lodash'

export const formatted = createSelector(
  (state, {product}) => product,
  (state, {jobId}) => recTotalCost(state.fn.recommendationsByJobId(jobId)),
  (state, {jobId}) => monthlyEnergySavings(state.fn.totalsByJobId(jobId)),
  formattedFinancingObject
)

export function formattedFinancingObject(product: IMap, recTotalCost: number, energySavings: number) {
  const principal = financingPrincipal(product, recTotalCost)
  const monthlyPayment = calculateMonthlyPayments(product, principal)
  const expense = netMonthlyExpense(monthlyPayment, energySavings)
  const payments = dollars(monthlyPayment)
  const expenseLabel = (expense <= 0) ? 'Savings' : 'Cost'
  return {
    uuid: product.get('uuid'),
    cashDown: dollars(product.get('cash_down') || 0),
    closingCost: product.get('closing_cost'),
    contactInfo: product.get('contact_info'),
    description: product.get('description', 'N/A'),
    eligibility: product.get('eligibility'),
    maxPurchase: dollars(product.get('max_purchase')),
    minPurchase: dollars(product.get('min_purchase')),
    minCashDown: dollars(product.get('min_cash_down')),
    minFicoScore: product.get('min_fico_score'),
    rate: percent(product.get('rate')),
    term: new Value(product.get('term')).suffix(' months').toString(),
    title: product.get('title', ''),
    totalCost: dollars(product.get('total_cost')),
    principal: dollars(principal),
    expense: dollars(Math.abs(expense)),
    payments,
    energySavings: dollars(energySavings),
    expenseLabel
  }
}


// total will be rounded for both approximate and no cost (0, 1). Exact (2) will be exact
function financingPrincipal(product: IMap, recTotalCost: number) {
  return recTotalCost - product.get('cash_down', 0)
}

export function calculateMonthlyPayments(product: IMap, principal: number) {
  const rate = parseFloat(product.get('rate'))
  const term = parseFloat(product.get('term'))

  if (principal <= 0) {
    return 0
  }

  if (!principal) {
    return 0
  }

  if (!term || !isFinite(term) || term < 0) {
    return 0
  }

  // Allow for zero interest rate loans. TODO: Create PR to fix the LoanCalc library
  if (rate === 0) {
    return principal / term
  }

  if (!rate || !isFinite(rate) || rate < 0) {
    return 0
  }

  return LoanCalc.paymentCalc({
    amount: principal,
    rate: rate,
    termMonths: term
  })
}

function netMonthlyExpense(monthlyPayment: number, monthlyEnergySavings: number) {
  return monthlyPayment - monthlyEnergySavings
}
