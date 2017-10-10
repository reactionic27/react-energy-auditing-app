
// Given a request object and an accountId, fetches the account.
export default async function accountReader(
  req: Object,
  accountId: number
) {
  const account = await req.model('account').where('id', accountId).fetch({
    require: true,
    withRelated: [{
      sampleJobs(qb) {
        qb.where({sample_job: 1, version: 5})
      }
    }]
  })
  return await loadAdditionalData(account)
}

function loadAdditionalData(account: Object) {
  return account.load([{
    companies(qb) {
      return qb.column(
        'companies.id',
        'name',
        'stripe_id',
        'cached_stripe_exp',
        'cached_stripe_last4',
        'card_declined',
        'pricing_plan',
        'demo_company',
        'address_1',
        'phone',
        'website',
        'hours_of_operation',
        'company_photo_name',
        'city',
        'zip',
        'state',
        'accounts_companies.company_id as _pivot_company_id',
        'accounts_companies.account_id as _pivot_account_id'
      );
    },
    jobs(qb) {
      qb.where('is_template', 1).where('version', 5)
    },
    'companies.programs.financingTemplates': function(qb) {
      qb.whereNull('deleted_at')
    },
    'companies.programs.templates': function(qb) {
      qb.whereNull('deleted_at')
    },
  },

    // TODO: Make sure to filter on account a bit more constrained?
    'companies.accounts',
    'companies.templates',
    'companies.financingTemplates',
    'financingTemplates'
  ])
}
