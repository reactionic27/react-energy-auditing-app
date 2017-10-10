
exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists('v5_recommendations', (t) => {
      t.uuid('uuid').primary().notNullable()
      t.integer('job_id').unsigned().index().notNullable().references('jobs.id').onDelete('cascade')
      t.integer('rec_definition_id').unsigned().index().notNullable().references('v5_rec_definitions.id')
      t.integer('order').notNullable()
      t.specificType('status', 'TINYINT(1)').notNullable()
      t.string('title')
      t.string('savings')
      t.string('sir')
      t.string('cost')
      t.bool('touched_cost')
      t.text('homeowner_notes', 'mediumtext')
      t.text('contractor_notes', 'mediumtext')
      t.text('why_it_matters', 'mediumtext')
      t.specificType('created_at', 'TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP')
      t.specificType('updated_at', 'TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP')
      t.specificType('deleted_at', 'TIMESTAMP NULL DEFAULT NULL')
    })
    .createTableIfNotExists('v5_recommendation_caption_rows', (t) => {
      t.integer('job_id').index().unsigned().notNullable().references('jobs.id').onDelete('cascade')
      t.uuid('uuid').primary().notNullable()
      t.uuid('recommendation_uuid').index().references('v5_recommendations.uuid').onDelete('cascade')
      t.integer('order').notNullable()
      t.text('caption')
      t.uuid('left_photo_uuid')
      t.string('left_photo_name')
      t.text('left_photo_url')
      t.integer('left_photo_height')
      t.integer('left_photo_width')
      t.uuid('right_photo_uuid')
      t.string('right_photo_name')
      t.text('right_photo_url')
      t.integer('right_photo_height')
      t.integer('right_photo_width')
      t.specificType('created_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
      t.specificType('updated_at', 'TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP')
      t.specificType('deleted_at', 'TIMESTAMP NULL DEFAULT NULL')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('v5_recommendation_caption_rows')
    .dropTableIfExists('v5_recommendations')
};
