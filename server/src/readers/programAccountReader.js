
// Given a request object and an accountId, fetches the account.
export default async function programAccountReader(
  req: Object,
  accountId: number
) {
  return await req.model('account').where('id', accountId).fetch({
    require: true,
    withRelated: {
      'adminProgram.companies': (qb) => {
        qb.whereNotIn('id', (qb2) => {
          qb2.select('id')
            .from('companies')
            .where('demo_company', 1)
        })
      }
    }
  })
}
