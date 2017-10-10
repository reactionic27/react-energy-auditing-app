
exports.up = function(knex, Promise) {
  return knex.schema.table('v5_caz', (t) => {
    t.enu('caz_fuel_leaks_identified', ["Yes", "No"])
    t.enu('caz_fuel_leaks_identified_improved', ["Yes", "No"])
    t.enu('caz_fuel_leaks_addressed', ["Yes", "No"])
    t.enu('caz_fuel_leaks_addressed_improved', ["Yes", "No"])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('v5_caz', (t) => {
    t.dropColumn('caz_fuel_leaks_identified')
    t.dropColumn('caz_fuel_leaks_identified_improved')
    t.dropColumn('caz_fuel_leaks_addressed')
    t.dropColumn('caz_fuel_leaks_addressed_improved')
  })
};
