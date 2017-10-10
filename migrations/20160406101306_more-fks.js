
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('DELETE FROM invitations WHERE account_id IS NOT NULL AND account_id NOT IN (select id from accounts)')
    .raw('DELETE FROM invitations WHERE company_id IS NOT NULL AND company_id NOT IN (select id from companies)')
    .raw('ALTER TABLE invitations CHANGE account_id account_id INT(11) UNSIGNED')
    .raw('ALTER TABLE invitations CHANGE company_id company_id INT(11) UNSIGNED')
    .table('invitations', (t) => {
      t.foreign('account_id').references('accounts.id').onDelete('cascade')
      t.foreign('company_id').references('companies.id').onDelete('cascade')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table('invitations', (t) => {
      t.dropForeign('account_id')
      t.dropForeign('company_id')
    })
};
