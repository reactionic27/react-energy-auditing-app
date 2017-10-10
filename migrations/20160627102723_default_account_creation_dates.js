
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('ALTER TABLE `accounts` CHANGE `created_at` `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
    .raw('ALTER TABLE `accounts` CHANGE `updated_at` `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
};

exports.down = function(knex, Promise) {

};
