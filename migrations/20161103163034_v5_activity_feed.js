
exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists('v5_activity_feed', (t) => {
      t.uuid('uuid').primary()
      t.integer('job_id').unsigned().index().references('jobs.id').onDelete('cascade')
      t.integer('account_id').unsigned().index().references('accounts.id').onDelete('SET NULL')
      t.text('message')
      t.string('file_name', 255)
      t.uuid('file_uuid')
      t.text('file_url')
      t.specificType('created_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
      t.specificType('updated_at', 'TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP')
      t.specificType('deleted_at', 'TIMESTAMP NULL DEFAULT NULL')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('v5_activity_feed')
};
