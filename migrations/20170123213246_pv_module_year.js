
exports.up = function(knex, Promise) {
  return knex.schema.table('v5_pv', (t) => {
    t.string("pv_module_year")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('v5_pv', (t) => {
    t.dropColumn('pv_module_year')
  })
};
