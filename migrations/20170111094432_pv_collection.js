
function coll(fn) {
  return function(t) {
    t.uuid('uuid').primary()
    t.integer('job_id').notNullable().unsigned().index().references('jobs.id').onDelete('cascade')
    t.integer('order').notNullable()
    t.specificType('created_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
    t.specificType('updated_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    t.specificType('deleted_at', 'TIMESTAMP NULL DEFAULT NULL')
    fn(t)
  }
}

exports.up = function(knex, Promise) {
  return knex.schema
  .table('v5_basedata', (t) => {
    t.dropColumn("pv_production")
    t.dropColumn("pv")
  })
  .createTableIfNotExists('v5_pv', coll(t => {
    t.enu('pv', ["Yes", "No"])
    t.enu('pv_improved', ["Yes", "No"])
    t.string("pv_array_size")
    t.string("pv_array_size_improved")
    t.string("pv_array_slope")
    t.string("pv_array_slope_improved")
    t.string("pv_array_orientation")
    t.string("pv_array_orientation_improved")
  }))

};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable('v5_basedata', (t) => {
      t.string("pv_production")
      t.enu('pv', ["Yes", "No"])
    })
    .dropTable('v5_pv')
};
