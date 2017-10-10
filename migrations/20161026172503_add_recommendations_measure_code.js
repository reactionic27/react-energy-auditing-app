
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('v5_recommendations', (t) => {
    t.string('measure_code', 255)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('v5_recommendations', (t) => {
    t.dropColumn('measure_code')
  })
};

