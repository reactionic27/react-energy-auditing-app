
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('v5_hvac', (t) => {
    t.dropColumn('hvac_age_of_heating_equipment')
    t.dropColumn('hvac_age_of_cooling_equipment')
  }).catch(e => {})
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('v5_hvac', (t) => {
    t.string('hvac_age_of_heating_equipment')
    t.string('hvac_age_of_cooling_equipment')
  }).catch(e => {})
};
