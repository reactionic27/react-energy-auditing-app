
exports.up = function(knex, Promise) {
  return knex.raw(`
    delete from v5_financing_templates
      where (account_id is null and company_id is null and program_id is null)
      and type not in ('program', 'account', 'company')
  `)
};

exports.down = function(knex, Promise) {

};
