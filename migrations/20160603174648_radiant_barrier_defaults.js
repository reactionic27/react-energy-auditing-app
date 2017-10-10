exports.up = function(knex, Promise) {
  return knex.schema
    .raw(`ALTER TABLE v5_attic ALTER attic_radiant_barrier SET DEFAULT 'NO'`)
    .raw(`ALTER TABLE v5_attic ALTER attic_radiant_barrier_improved SET DEFAULT 'NO'`)
};

exports.down = function(knex, Promise) {
  return knex.schema

};
