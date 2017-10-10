import validateBody from '../helpers/validate-body'

// Handles the saving of things like job, account, financing-template
// when there is no additional logic needed.
export default async function genericCreateTableHandler(req: Object, res: Object) {
  const {params: {0: tableName}} = req
  let dbTable = tableName

  if (dbTable === 'financing_templates') {
    dbTable = 'v5_financing_templates'
  }

  const body = await validateBody(`${tableName}/create`, req)

  const [insertId] = await req.knex(dbTable).insert(body)

  const row = await req.knex(dbTable).first('*').where({id: insertId})

  if (tableName === 'jobs') {
    throw new Error('Job creation has a dedicated route')
  }
  if (tableName === 'companies') {
    throw new Error('Company creation has a dedicated route')
  }
  if (tableName === 'invitations') {
    throw new Error('Invitation creation has a dedicated route')
  }
  if (tableName === 'financing_templates') {
    req.snuggAction = 'financingTemplates/create'
    switch (body.type) {
      case 'company': req.broadcast(`company:${body.company_id}`, row); break;
      case 'account': req.broadcast(`account:${body.account_id}`, row); break;
    }
  }

  res.json(row)
}
