
type simpleAccountType = {
  id: number,
  role: ?string,
};

type reqType = {
  account: simpleAccountType
};

export default function joblistReader(
  req: reqType,
  companyId: number,
  stageId: ?number,
) {
  const {model, account} = req

  return model('company')
    .where('companies.id', companyId)
    .fetch({
      withRelated: [{
        'jobs': (qb) => {
          companyJobsConstraint(req.knex.raw, qb, account, stageId)
        },
      },
      'jobs.account',
      'jobs.program'
      ]
    })
}

function companyJobsConstraint(raw, qb, account: simpleAccountType, stageId: ?number) {
  if (stageId) {
    qb.where({'jobs.stage_id': stageId})
  } else {
    qb.where(qb2 => {
      qb2.whereNull('stage_id').orWhereNotIn('jobs.stage_id', [9, 10])
    })
  }
  qb.whereIn('version', [4, 5])
    .where({'jobs.deleted_at': null})

  if (account.role !== 'snuggadmin') {
    const accountId = account.id
    qb.where((qb2) => {
      qb2
        .where({'accounts_companies.role': 'admin', 'jobs.sample_job': 0})
        .orWhere('jobs.account_id', accountId)
    })
    .innerJoin('accounts as acct', 'acct.id', accountId)
    .innerJoin('accounts_companies', (qb2) => {
      qb2.on('accounts_companies.company_id', '=', 'jobs.company_id')
        .andOn(raw('(accounts_companies.account_id = ?)', [accountId]))
    })
  }

}
