export default async function unreadActivityReader(req: Object) {
  const data = await req
                       .knex
                       .select('a.*', 'jobs.company_id')
                       .from('v5_activity_tracking as a')
                       .distinct('a.account_id', 'a.job_id')
                       .innerJoin('jobs', (qb) => {
                          qb.on('a.job_id', 'jobs.id')
                            .on('jobs.is_template', 0)
                            .onNull('jobs.deleted_at')
                       })
                       .innerJoin('companies', (qb) => {
                          qb.on('companies.id', 'jobs.company_id')
                       })
                       .innerJoin('accounts_companies', (qb) => {
                          qb.on('accounts_companies.company_id', 'companies.id')
                            .on('accounts_companies.role', req.knex.raw('"admin"'))
                            .orOn('jobs.account_id', req.account.id)
                          if (req.account.program_id) {
                            qb.orOn('jobs.program_id', req.account.program_id)
                          }
                          qb.on('accounts_companies.account_id', req.account.id)
                       })
                       .andWhere('a.account_id', req.account.id)

  return data
}
