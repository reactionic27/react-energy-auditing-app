exports.up = function(knex, Promise) {
  return knex.schema.alterTable('v5_dhw', (t) => {
    t.integer('dhw_recovery_efficiency')
    t.integer('dhw_recovery_efficiency_improved')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('accounts', (t) => {
    t.dropColumn('dhw_recovery_efficiency')
    t.dropColumn('dhw_recovery_efficiency_improved')
  })
};
