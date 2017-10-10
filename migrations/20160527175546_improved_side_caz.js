exports.up = function(knex, Promise) {
  return knex.schema.table('v5_caz', (t) => {
    t.integer('caz_ambient_co_improved')
    t.integer('caz_max_ambient_co_improved')
    t.integer('caz_poor_case_test_improved')
    t.string('caz_notes_improved')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('v5_caz', (t) => {
    t.dropColumn('caz_max_ambient_co_improved')
    t.dropColumn('caz_ambient_co_improved')
    t.dropColumn('caz_poor_case_test_improved')
    t.dropColumn('caz_notes_improved')
  })
};
