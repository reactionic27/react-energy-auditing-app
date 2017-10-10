import Boom from 'boom'

// Takes a GET request from the server and provides our own
// routing to determine how much data we need to fetch to
// render the request, returning that data to the client
export default async function readRootMiddleware(req: Object, res: Object, next: Function) {
  const {path, account} = req

  if (!account) {
    if (path === '/' || path === '') {
      return res.redirect('/login')
    } else {
      return res.redirect(`/login?from=${req.url}`)
    }
  }

  if (path === '/' || path === '') {
    return navToLastCompany(req, res, next)
  }

  next()
}

function throwNoCompanyError() {
  throw Boom.unauthorized(
    'There are no companies associated with this account. This is unusual, but can happen if you are no longer part of a company, or if the company is suspended. Please contact support if you have any questions.'
  )
}

async function navToLastCompany(req: Object, res: Object) {

  let last_used_company = req.account.last_used_company
  const company = await req.knex.first('*').from('companies').where({
    id: last_used_company
  })
  if ((company && company.disabled) || !last_used_company) {
    const [pivot] = await req.knex
      .select('company_id')
      .from('accounts_companies')
      .where({account_id: req.account.id})
      .limit(1)

    if (!pivot) {
      throwNoCompanyError()
    }

    last_used_company = pivot.company_id

    await req.knex.table('accounts').update({last_used_company}).where({id: req.account.id})
  }

  res.redirect(`/joblist/${last_used_company}`)
}
