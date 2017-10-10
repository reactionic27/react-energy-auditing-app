
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('v5_pv', (t) => {
    t.text('touched_fields')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('v5_pv', (t) => {
    t.dropColumn('touched_fields')
  })
};
