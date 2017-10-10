
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('delete from accounts_companies where account_id not in (select id from accounts)')
    .raw('delete from accounts_companies where company_id not in (select id from companies)')
    .raw('delete from companies_programs where company_id not in (select id from companies)')
    .raw('delete from companies_programs where program_id not in (select id from programs)')
    .raw('alter table `companies_programs` modify `program_id` int(11) unsigned')
    .raw('alter table `companies_programs` modify `company_id` int(11) unsigned')
    .raw('alter table `accounts_companies` modify `account_id` int(11) unsigned')
    .raw('alter table `accounts_companies` modify `company_id` int(11) unsigned')
    .table('accounts_companies', (t) => {
      t.foreign('account_id').references('accounts.id').onDelete('cascade')
      t.foreign('company_id').references('companies.id').onDelete('cascade')
    })
    .table('companies_programs', (t) => {
      t.foreign('company_id').references('companies.id').onDelete('cascade')
      t.foreign('program_id').references('programs.id').onDelete('cascade')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table('accounts_companies', (t) => {
      t.dropForeign('account_id')
      t.dropForeign('company_id')
    })
    .table('companies_programs', (t) => {
      t.dropForeign('program_id')
      t.dropForeign('company_id')
    })
};
