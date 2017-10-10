exports.up = function(knex, Promise) {
  return knex.schema
    .raw(`ALTER TABLE v5_attic ALTER attic_cool_roof SET DEFAULT 'NO'`)
    .raw(`ALTER TABLE v5_attic ALTER attic_has_knee_wall SET DEFAULT 'NO'`)
    .raw(`ALTER TABLE v5_attic ALTER attic_cool_roof_improved SET DEFAULT 'NO'`)
    .raw(`ALTER TABLE v5_attic ALTER attic_has_knee_wall_improved SET DEFAULT 'NO'`)
    .raw(`ALTER TABLE v5_vault ALTER vault_cool_roof SET DEFAULT 'NO'`)
    .raw(`ALTER TABLE v5_vault ALTER vault_cool_roof_improved SET DEFAULT 'NO'`)
};

exports.down = function(knex, Promise) {
  return knex.schema

};
