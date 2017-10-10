exports.up = function(knex, Promise) {
  return knex.schema.alterTable('jobs', (t) => {
    t.tinyint('has_unmodeled_changes', 1)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('jobs', (t) => {
    t.dropColumn('has_unmodeled_changes')
  })
};

