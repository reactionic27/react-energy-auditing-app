exports.up = function(knex, Promise) {
  return knex.schema.table('v5_vault', (t) => {
      t.enu('vault_cool_roof_improved', ["Yes", "No"])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('v5_vault', (t) => {
    t.dropColumn('vault_cool_roof_improved')
  })
};
