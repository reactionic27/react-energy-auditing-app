
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('CREATE TABLE `v5_optimiser_submissions` LIKE `v4_optimiser_submissions`')
    .raw('CREATE TABLE `v5_optimiser_sessions` LIKE `v4_optimiser_sessions`')

    // Unsigned for foreign key
    .raw('ALTER TABLE `v5_optimiser_submissions` MODIFY job_id int(10) unsigned')
    .raw('ALTER TABLE `v5_optimiser_sessions` MODIFY job_id int(10) unsigned')

    .raw('ALTER TABLE `v5_optimiser_submissions` MODIFY request_url MEDIUMTEXT')
    .raw('ALTER TABLE `v5_optimiser_submissions` MODIFY client_om_data MEDIUMTEXT')
    .raw('ALTER TABLE `v5_optimiser_submissions` MODIFY error_response MEDIUMTEXT')
    .raw('ALTER TABLE `v5_optimiser_submissions` MODIFY parsed_response MEDIUMTEXT')
    .raw('ALTER TABLE `v5_optimiser_submissions` MODIFY raw_response MEDIUMTEXT')
    .raw('ALTER TABLE `v5_optimiser_submissions` MODIFY hpxml MEDIUMTEXT')

    .raw('ALTER TABLE `v5_optimiser_sessions` MODIFY `client_om_data` MEDIUMTEXT')
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('v5_optimiser_submissions')
    .dropTableIfExists('v5_optimiser_sessions')
};
