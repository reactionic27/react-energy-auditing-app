
exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists('v5_activity_tracking', (t) => {
      t.integer('job_id').unsigned().index().references('jobs.id').onDelete('cascade')
      t.integer('account_id').unsigned().index().references('accounts.id').onDelete('SET NULL')
      t.integer('unread_count')
      t.specificType('created_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
      t.specificType('updated_at', 'TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP')
      t.specificType('deleted_at', 'TIMESTAMP NULL DEFAULT NULL')
      t.unique(['account_id', 'job_id'])
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('v5_activity_tracking')
};
