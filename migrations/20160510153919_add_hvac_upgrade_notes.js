
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('jobs', (t) => {
    t.text('upgrade_notes_hvac')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('jobs', (t) => {
    t.dropColumn('upgrade_notes_hvac')
  })
};
