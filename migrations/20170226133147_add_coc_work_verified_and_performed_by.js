
exports.up = function(knex, Promise) {
  return knex.schema
  .raw('alter table `jobs` add column `coc_work_performed_by` varchar(255) DEFAULT NULL')
  .raw('alter table `jobs` add column `coc_work_verified_by` varchar(255) DEFAULT NULL')
};

exports.down = function(knex, Promise) {
  return knex.schema
  .raw('alter table `jobs` drop column `coc_work_performed_by`')
  .raw('alter table `jobs` drop column `coc_work_verified_by`')
};
