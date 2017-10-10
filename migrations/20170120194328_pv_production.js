
exports.up = function(knex, Promise) {
  return knex.schema.table('v5_pv', (t) => {
    t.string("pv_annual_production")
    t.string("pv_annual_production_improved")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('v5_pv', (t) => {
    t.dropColumn('pv_annual_production')
    t.dropColumn('pv_annual_production_improved')
  })
};
