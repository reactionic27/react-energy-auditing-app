
exports.up = function(knex, Promise) {
  return knex.schema.table('v5_reports', (t) => {
    t.json('page_sort_order')
    t.json('element_sort_order')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('v5_reports', (t) => {
    t.dropColumn('page_sort_order')
    t.dropColumn('element_sort_order')
  })
};
