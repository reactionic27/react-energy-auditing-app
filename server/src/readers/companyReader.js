
const invitations = {
  invitations(qb) {
    qb.where('status', '!=', 'accepted')
  }
}
const programsFP = {
  ['programs.financingTemplates']: function(qb) {
    qb.whereNull('deleted_at')
  }
}
const financing = {
  financingTemplates(qb) {
    qb.whereNull('deleted_at')
  }
}

export default function companyReader(req: Object, companyId: number, accountId: number) {
  return req.model('company').where('companies.id', companyId)
    .query((qb) => {
      qb.innerJoin('accounts as acct', 'acct.id', accountId)
        .innerJoin('accounts_companies', function() {
          this.on('companies.id', 'accounts_companies.company_id')
            .andOn(req.knex.raw('(accounts_companies.account_id = ? OR acct.role = "snuggadmin" OR acct.program_id IS NOT NULL)', [accountId]))
        })
    })
    .fetch({
      require: true,
      withRelated: ['accounts', invitations, programsFP, financing]
    })
}
