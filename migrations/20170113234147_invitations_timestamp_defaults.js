
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('ALTER TABLE `invitations` CHANGE `created_at` `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
    .raw('ALTER TABLE `invitations` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP')
};

exports.down = function(knex, Promise) {

};
