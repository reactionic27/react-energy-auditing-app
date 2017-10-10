
exports.up = function(knex, Promise) {
  return knex.schema
    .raw(`SET FOREIGN_KEY_CHECKS = 0`)
    .raw(`ALTER TABLE v5_attic CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_basedata CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_caz CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_concern CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_dhw CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_door CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_financing_templates CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_freezer CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_health CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_hvac CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_job_financing CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_job_stage_history CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_optimiser_sessions CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_optimiser_submissions CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_rec_definitions CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_recommendation_caption_rows CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_recommendations CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_refrigerator CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_reports CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_stages CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_totals CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_utilities CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_vault CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_wall CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`ALTER TABLE v5_window CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci`)
    .raw(`SET FOREIGN_KEY_CHECKS = 1`)
};

exports.down = function(knex, Promise) {

};
