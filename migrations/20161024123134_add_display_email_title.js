exports.up = function(knex, Promise) {
  return knex.schema.table('accounts_companies', (t) => {
    t.string('display_email', 255)
    t.string('display_title', 255)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('accounts_companies', (t) => {
    t.dropColumn('display_email')
    t.dropColumn('display_title')
  })
};
