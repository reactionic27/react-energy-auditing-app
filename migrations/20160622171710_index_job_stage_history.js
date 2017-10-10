
exports.up = function(knex, Promise) {
  return knex.schema
  .raw(`ALTER TABLE v5_job_stage_history MODIFY job_id INT(11) UNSIGNED NOT NULL`)
  .raw(`ALTER TABLE v5_job_stage_history MODIFY stage_id INT(11) UNSIGNED NOT NULL`)
  .raw(`ALTER TABLE v5_job_stage_history MODIFY changed_by INT(11) UNSIGNED NOT NULL`)
  .alterTable('v5_job_stage_history', (t) => {
    t.index('job_id')
    t.foreign('job_id').references('jobs.id').onDelete('CASCADE')
    t.foreign('stage_id').references('v5_stages.id')
    t.foreign('changed_by').references('accounts.id').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {

};
