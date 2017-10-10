exports.up = function(knex, Promise) {
  return knex.schema
  .table('v5_caz', (t) => {
    t.dropColumn('caz_max_ambient_co')
    t.dropColumn('caz_max_ambient_co_improved')
  })
  .table('v5_caz_system', (t) => {
    t.integer('caz_max_ambient_co_improved')
    t.integer('caz_max_ambient_co')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .table('v5_caz', (t) => {
    t.integer('caz_max_ambient_co_improved')
    t.integer('caz_max_ambient_co')
  })
  .table('v5_caz_system', (t) => {
    t.dropColumn('caz_max_ambient_co')
    t.dropColumn('caz_max_ambient_co_improved')
  })
};
