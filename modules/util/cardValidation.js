import moment from 'moment'
import {compact, head} from 'lodash'
const cardDateFormat = 'M/YYYY'

export function validateCard(company) {
  if (company.get('demo_company')) {
    return false
  }
  const today = moment()
  const exp = moment(company.get('cached_stripe_exp'), cardDateFormat)
  const hasCard = company.get('stripe_id') ? false : `There is no card on file for ${company.get('name')}.`
  const isDeclined = company.get('card_declined') ? `The card for ${company.get('name')} was declined.` : false
  const isInvalid = exp.isValid() ? false : `The card expiration date is invalid.`

  // Cards are good through the last day of the month listed on the card.
  // So add a month to the expiration so we don't throw an error if we're
  // in the same month as the card expires
  const isExpired = exp.add(1, 'month').isAfter(today, 'month') ? false : `The card on file for ${company.get('name')} is expired.`
  const errors = compact([hasCard, isDeclined, isInvalid, isExpired])
  if (errors.length === 0) {
    return false
  }
  return head(errors)
}

export function checkMonthsUntilExpired(company) {
  if (company.get('demo_company')) {
    return false
  }
  const exp = moment(company.get('cached_stripe_exp'), cardDateFormat).endOf('month')
  const daysUntilExpired = exp.diff(moment(), 'days')
  if (daysUntilExpired < 20 && daysUntilExpired > 0) {
    return `The card on file expires in ${daysUntilExpired} days.`
  }
}
