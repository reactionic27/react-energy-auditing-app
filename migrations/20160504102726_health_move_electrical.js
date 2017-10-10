
exports.up = function(knex, Promise) {
  return knex.schema.table('v5_basedata', (t) => {
    t.dropColumn('electrical')
  }).table('v5_health', (t) => {
    t.enu('health_electrical', ["Passed", "Failed", "Warning", "Not Tested"])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table('v5_basedata', (t) => {
      t.enu('electrical', ["Passed", "Failed", "Warning", "Not Tested"])
    })
    .table('v5_health', (t) => {
      t.dropColumn('health_electrical')
    })
};
