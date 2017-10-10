
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('alter table `jobs` add column `coc_additional_info` text')
};

exports.down = function(knex, Promise) {
  return knex.schema
    .raw('alter table `jobs` drop column `coc_additional_info`')
};
