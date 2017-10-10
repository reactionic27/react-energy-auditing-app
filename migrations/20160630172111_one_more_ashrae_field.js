
exports.up = function(knex, Promise) {
  return knex.schema.table('v5_basedata', (t) => {
    t.decimal('ashrae_minimum_cfm50_improved', 6, 2)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('v5_basedata', (t) => {
    t.dropColumn('ashrae_minimum_cfm50_improved')
  })
};
