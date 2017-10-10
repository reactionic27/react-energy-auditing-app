import billingPlans from '../../../constants/billing-plan-definitions'
import {Map as IMap} from 'immutable'
import moment from 'moment'

const billDateFormat = 'dddd MMM D, YYYY'


// Checks whether the plan code maps to a real plan
export function hasPlan(code: ?string): boolean {
  const truePlan = billingPlans.find((billingPlan) => code === billingPlan.get('code'))
  return truePlan ? true : false
}

// Returns the plan or a default plan if no plan matches -> Use with caution.
// Dipslaying no info is better than dipslaying wrong info.
export function billingPlansByCode(code: ?string): IMap {
  const defaultPlan = "30" // this is our fallback
  const id = code || defaultPlan
  const truePlan = billingPlans.find((billingPlan) => id === billingPlan.get('code'))
  return truePlan ? truePlan : billingPlans.find((billingPlan) => defaultPlan === billingPlan.get('code'))
}

export function planPrice(code: ?string): number {
  const plan = billingPlansByCode(code)
  return plan.get('isSubscription') ? plan.get('basePrice') : plan.get('pricePerJob')
}


export function billingDescriptionByCode(code: ?string): string {
  const plan = billingPlansByCode(code)
  if (plan.get('isSubscription')) {
    return `This job is part of a subscription plan. Your next subscription will be billed on the 1st of ${moment().add(1, 'months').format('MMM, YYYY')}`
  }
  return `This job will cost $ ${plan.get('pricePerJob')}. It will be billed on ${moment().day(5).format('DD, MMM, YYYY')}.`
}

export function planTypeByCode(code: ?string): string {
  const plan = billingPlansByCode(code)
  if (plan.get('isSubscription')) {
    return "Subscription"
  }
  return "Pay-per-job"
}

// Finds the next bill date based on plan:
// Subscriptions are billed on the first weekday of the month
// Pay-per-job are billed weekly on Fridays
export function nextBillDateByCode(code: ?string): string {
  const plan = billingPlansByCode(code)
  if (plan.get('isSubscription')) {
    const firstDayOfMonth = moment().add(1, 'months').startOf('month')
    const firstWeekday = firstDayOfMonth.isoWeekday() >= 6 ? firstDayOfMonth.add(1, 'weeks').isoWeekday(1) : firstDayOfMonth
    return firstWeekday.format(billDateFormat)
  }
  return moment().day(5).format(billDateFormat)
}
