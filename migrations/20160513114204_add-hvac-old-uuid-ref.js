
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('v5_hvac', (t) => {
    t.uuid('v4_uuid')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('v5_hvac', (t) => {
    t.dropColumn('v4_uuid')
  })
};
