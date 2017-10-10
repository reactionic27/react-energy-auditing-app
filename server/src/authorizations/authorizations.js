export default {

  async any() {

  },

  async snuggadmin(req: Object) {
    if (req.account.role !== 'snuggadmin') {
      throw new Error('Not Admin')
    }
  },

  async notProgramAdmin(req: Object) {
    return !req.account.program_id
  },

  async programAdmin(req: Object) {
    return !!req.account.program_id
  },

  async createJob(req: Object) {

  },

  async createInvite(req: Object) {

  },

  async createFinancingTemplates(req: Object) {

  },

  async saveGenericTable(req: Object) {
    const id = checkInt(req, 'id', 1)
    if (req.params[0] === 'companies') {
      return await canAdminCompany(req, id)
    }
  },

  async saveCoreTable(req: Object) {

  },

  async saveJobCollection(req: Object) {
    return await canAdminJob(req, req.body.job_id)
  },

  async saveJobEntity(req: Object) {
    return await canAdminJob(req, req.body.job_id)
  },

  async swapOrder(req: Object) {

  },

  async updateJobsStages(req: Object) {

  },

  async modelHes(req: Object) {

  },

  async updatePassword(req: Object) {
    return req.account.id === parseInt(req.params.account_id, 10)
  },

  async updateBilling(req: Object) {
    const companyId = checkInt(req, 'company_id')
    return await canAdminCompany(req, companyId)
  },

  async omModel(req: Object) {

  },

  async omCancel(req: Object) {

  }

}

// Checks to ensure the parameter in the URL matches the
// value of the key in the request body. If the url is a regex,
// pass the keyIndex property to determine which key we're matching against
function checkInt(req: Object, key: string, keyIndex: ?number) {
  const id = parseInt(req.params[keyIndex || key], key)
  if (req.body[key] !== id) {
    throw new Error(`Malformed request, key: ${key}`)
  }
  return id
}

async function canAdminCompany(req: Object, id: number) {
  const rows = await req.knex
    .select('id')
    .from('companies')
    .innerJoin('accounts_companies', (qb) => {
      qb.on('accounts_companies.company_id', 'companies.id')
        .on('accounts_companies.role', req.knex.raw('"admin"'))
    })
    .where({id, 'accounts_companies.account_id': req.account.id})
    .limit(1)
  return rows.length > 0
}

async function canAdminJob(req: Object, id: number) {
  const rows = await req.knex
    .select('id')
    .from('jobs')
    .where({id})
    .where((qb) => {
      qb.where('jobs.account_id', req.account.id)
        .orWhereIn('jobs.company_id', (sub) => {
          sub.select('accounts_companies.company_id')
            .from('accounts_companies')
            .where({account_id: req.account.id, role: 'admin'})
        })
    })
    .limit(1)
  return rows.length > 0
}
