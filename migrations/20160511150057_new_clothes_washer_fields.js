
exports.up = function(knex, Promise) {
  return knex.schema.table('v5_basedata', (t) => {
    t.decimal('clothes_washer_energy_usage_improved', 6, 2)
    t.decimal('clothes_washer_water_usage_improved', 6, 2)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('v5_basedata', (t) => {
    t.dropColumn('clothes_washer_energy_usage_improved')
    t.dropColumn('clothes_washer_water_usage_improved')
  })
};
