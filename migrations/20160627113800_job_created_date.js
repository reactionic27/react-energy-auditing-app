
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('ALTER TABLE `jobs` CHANGE `created_at` `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
    .raw('ALTER TABLE `jobs` CHANGE `updated_at` `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
};

exports.down = function(knex, Promise) {

};
