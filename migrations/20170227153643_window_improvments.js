exports.up = function(knex, Promise) {
  return knex.schema.table('v5_window', (t) => {
    t.enu('window_improvements', ["", "Yes", "No Improvement"]).defaultTo('Yes')
    t.enu('window_improvements_improved', ["", "Yes", "No Improvement"]).defaultTo('Yes')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('v5_window', (t) => {
    t.dropColumn('window_improvements')
    t.dropColumn('window_improvements_improved')
  })
};
