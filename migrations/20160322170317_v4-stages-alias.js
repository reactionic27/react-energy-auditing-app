
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('alter table `v4_stages` add column `alias` varchar(255) DEFAULT NULL;')
};

exports.down = function(knex, Promise) {
  return knex
    .raw('alter table `v4_stages` drop column `alias`;')
};
