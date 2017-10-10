
exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('v5_job_stage_history')
    .createTableIfNotExists('v5_job_stage_history', (t) => {
      t.increments('id').unsigned()
      t.integer('job_id').notNullable()
      t.integer('stage_id').notNullable()
      t.datetime('start_at').notNullable()
      t.datetime('end_at')
      t.integer('changed_by')
    })
};

exports.down = function(knex, Promise) {

};
