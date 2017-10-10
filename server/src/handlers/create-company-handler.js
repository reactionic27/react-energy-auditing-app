import _ from 'lodash'
import {
  linkAccountToCompany,
  linkCompanyToProgram,
  createDefaultTemplate
} from '../lib/snugg-server-helpers'

export default async function createCompany(
  req: Object,
  res: Object
) {
  const {body} = req

  const [companyId] = await req.knex.insert(body).into('companies')

  await linkAccountToCompany(req, req.account.id, companyId, 'admin')
  await linkCompanyToProgram(req, companyId, 1)
  await createDefaultTemplate(req, companyId)

  const company = await req.knex
    .select('*')
    .from('companies')
    .where('id', companyId)
    .first()

  const payload = _.omit(
    company,
    'created_at',
    'updated_at'
  )

  req.snuggAction = 'companies/create'
  req.broadcast(`account:${req.account.id}`, payload)

  res.json(payload)
}
