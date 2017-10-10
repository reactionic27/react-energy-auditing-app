import Boom from 'boom'
import moment from 'moment'

export default async function validateBilling(req: Object, companyId: number) {

  const [company] = await req.knex.select(
    'cached_stripe_last4',
    'cached_stripe_exp',
    'card_declined',
    'demo_company'
  )
  .from('companies')
  .where({id: companyId})

  if (!company) {
    throw Boom.notFound(`Company ${companyId} not found`)
  }

  const {cached_stripe_exp, cached_stripe_last4, demo_company, card_declined} = company

  const exp = moment(cached_stripe_exp, 'M/YYYY')
  const now = moment()

  return {
    last4: cached_stripe_last4,
    isDeclined: !!card_declined,
    isExpired: exp.isValid() ? moment(exp).isBefore(now, 'month') : false,
    demoCompany: !!demo_company
  }
}
