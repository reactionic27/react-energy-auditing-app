
exports.up = function(knex, Promise) {
  return knex.schema.table('jobs', (t) => {
    t.integer('creator_account_id')
      .unsigned()
      .references('accounts.id')
      .onDelete('SET NULL')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('jobs', (t) => {
    t.dropForeign('creator_account_id')
    t.dropColumn('creator_account_id')
  })
};
