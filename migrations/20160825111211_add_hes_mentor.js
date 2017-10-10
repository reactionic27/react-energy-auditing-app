exports.up = function(knex, Promise) {
  return knex.schema.alterTable('accounts', (t) => {
    t.tinyint('hes_mentor', 1)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('accounts', (t) => {
    t.dropColumn('hes_mentor')
  })
};

