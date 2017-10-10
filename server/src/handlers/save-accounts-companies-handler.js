export default async function saveAccountsCompaniesHandler(req: Object, res: Object) {
  let {account_id, company_id} = req.body
  await req.knex('accounts_companies').update(req.body).where({account_id, company_id})
  res.json({})
}
