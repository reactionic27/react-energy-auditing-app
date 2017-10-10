var INSERT_TEMPLATE_V4 = `
insert into v5_financing_templates (
  id,
  account_id,
  company_id,
  program_id,
  type,
  title,
  rate,
  closing_cost,
  term,
  min_fico_score,
  min_cash_down,
  min_purchase,
  max_purchase,
  eligibility,
  description,
  contact_info,
  created_at,
  updated_at
) SELECT
  id,
  account_id,
  company_id,
  program_id,
  type,
  title,
  rate,
  closing_cost,
  term,
  min_fico_score,
  min_cash_down,
  min_purchase,
  max_purchase,
  eligibility,
  description,
  contact_info,
  created_at,
  updated_at
FROM v4_financing_products
  WHERE deleted_at IS NULL
  AND job_id IS NULL
  AND type IS NOT NULL
  AND (
    company_id IS NULL OR company_id IN (select id from companies)
  AND
    program_id IS NULL OR program_id IN (select id from programs)
  AND
    account_id IS NULL OR account_id IN (select id from accounts)
  )
`

exports.up = function(knex, Promise) {
  return knex.schema
    .raw('SET FOREIGN_KEY_CHECKS = 0;')
    .raw('TRUNCATE table v5_financing_templates;')
    .raw('SET FOREIGN_KEY_CHECKS = 1;')
    .alterTable('v5_job_financing', (t) => {
      t.dropColumn('type')
    })
    .then(() => knex.raw(INSERT_TEMPLATE_V4))
};

exports.down = function(knex, Promise) {
  return knex.schema
    .raw('SET FOREIGN_KEY_CHECKS = 0;')
    .raw('TRUNCATE table v5_financing_templates;')
    .raw('SET FOREIGN_KEY_CHECKS = 1;')
    .alterTable('v5_job_financing', (t) => {
      t.string('type')
    })
};
