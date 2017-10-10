
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('v4_job_stage_history', (t) => {
    t.increments('id').unsigned()
    t.integer('job_id').notNullable()
    t.integer('stage_id').notNullable()
    t.datetime('start_at').notNullable()
    t.datetime('end_at')
    t.integer('changed_by')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('v4_job_stage_history')
};
