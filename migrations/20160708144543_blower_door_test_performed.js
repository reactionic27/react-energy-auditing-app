
exports.up = function(knex, Promise) {
  return knex.schema.table('v5_basedata', (t) => {
    t.enu('blower_door_test_performed', ["Tested", "Estimate"]).defaultTo('Estimate')
    t.enu('blower_door_test_performed_improved', ["Tested", "Estimate"]).defaultTo('Estimate')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('v5_basedata', (t) => {
    t.dropColumn('blower_door_test_performed')
    t.dropColumn('blower_door_test_performed_improved')
  })
};
