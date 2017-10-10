
exports.up = function(knex, Promise) {
  return knex.raw('alter table `invitations` add column `deleted_at` timestamp NULL DEFAULT NULL')
};

exports.down = function(knex, Promise) {
  return knex.raw('alter table `invitations` drop column `deleted_at`')
};
