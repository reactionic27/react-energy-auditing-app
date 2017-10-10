
exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable('v5_optimiser_sessions', (t) => {
      t.foreign('job_id').references('jobs.id').onDelete('cascade')
    })
    .alterTable('v5_optimiser_submissions', (t) => {
      t.foreign('job_id').references('jobs.id').onDelete('cascade')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable('v5_optimiser_sessions', (t) => {
      t.dropForeign('job_id')
    })
    .alterTable('v5_optimiser_submissions', (t) => {
      t.dropForeign('job_id')
    })
};
