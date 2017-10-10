
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
    .createTableIfNotExists('v5_clothes_dryer', coll(t => {
      t.enu('clothes_dryer_fuel_type', ["", "Natural Gas", "Electricity", "Propane", "None", "Don\\'t Know"])
      t.enu('clothes_dryer_fuel_type_improved', ["", "Natural Gas", "Electricity", "Propane", "None"])
    }))
    .createTableIfNotExists('v5_oven', coll(t => {
      t.enu('oven_fuel_type', ["", "Natural Gas", "Electricity", "Propane", "None", "Don\\'t Know"])
      t.enu('oven_fuel_type_improved', ["", "Natural Gas", "Electricity", "Propane", "None"])
    }))
    .createTableIfNotExists('v5_range', coll(t => {
      t.enu('range_fuel_type', ["", "Natural Gas", "Electricity", "Propane", "None", "Don\\'t Know"])
      t.enu('range_fuel_type_improved', ["", "Natural Gas", "Electricity", "Propane", "None"])
    }))
    .alterTable('v5_caz_system', t => {
      t.specificType('deleted_at', 'TIMESTAMP NULL DEFAULT NULL')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('v5_clothes_dryer')
    .dropTable('v5_oven')
    .dropTable('v5_range')
    .alterTable('v5_caz_system', t => {
      t.dropColumn('deleted_at')
    })
};
