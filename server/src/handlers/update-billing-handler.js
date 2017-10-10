import Boom from 'boom'
import request from 'request'
import bole from 'bole'
const {STRIPE_SECRET_KEY} = process.env

const log = bole(__filename)

export default async function updateBillingHandler(
  req: Object,
  res: Object
) {

  const body = req.body

  log.info(body, 'updating billing info')
  const {company_id, token, card_name} = body
  const {email, id: account_id, name} = req.account
  const [{stripe_id}] = await req.knex.select('stripe_id').from('companies').where({id: company_id})

  if (stripe_id === 'comp') {
    throw Boom.badRequest('Please contact support to update your stripe id - #comp')
  }

  // Depending on whether we're creating or updating.
  const stripeId = stripe_id ? `/${stripe_id}` : ''
  const stripeUrl = `https://api.stripe.com/v1/customers${stripeId}`
  log.debug('calling stripe API', stripeUrl)

  const [stripeReply, resp] = await request.postAsync(stripeUrl, {
    form: {
      source: token,
      email,
      description: `${account_id} - ${name}`
    },
    auth: {
      user: STRIPE_SECRET_KEY,
      pass: ''
    }
  })

  const stripeBody = JSON.parse(resp)

  log.debug(stripeBody, 'stripe reply', stripeReply.statusCode)

  if (stripeBody.error || stripeReply.statusCode > 399) {
    // TODO: Log
    throw Boom.badImplementation(`####### Stripe API Error ######: ${JSON.stringify(stripeBody)}`)
  }
  const {active_card: {last4, exp_month, exp_year}, id: response_stripe_id} = stripeBody
  const response = {
    id: company_id,
    card_name,
    cached_stripe_last4: last4,
    cached_stripe_exp: `${exp_month}/${exp_year}`
  };
  const update = {
    stripe_id: response_stripe_id,
    ...response
  }

  await req.knex('companies').where({id: company_id}).update(update)

  const company = await req.knex('companies').where({id: company_id}).first()

  req.snuggAction = 'companies/save'
  req.broadcast(`company:${company_id}`, company)

  res.json(company)
}
