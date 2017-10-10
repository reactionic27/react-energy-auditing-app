exports.up = function(knex, Promise) {
  return knex.schema.table('v5_attic', (t) => {
      t.enu('attic_has_knee_wall_improved', ["Yes", "No"])
      t.enu('attic_cool_roof_improved', ["Yes", "No"])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('v5_attic', (t) => {
    t.dropColumn('attic_has_knee_wall_improved')
    t.dropColumn('attic_cool_roof_improved')
  })
};
