
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('alter table `v5_reports` add column `page_coc` TINYINT(1) DEFAULT 0')
    .raw('alter table `v5_reports` add column `title_coc` VARCHAR(50) DEFAULT "Certificate of Completion"')
};

exports.down = function(knex, Promise) {
  return knex.schema
    .raw('alter table `v5_reports` drop column `page_coc`')
    .raw('alter table `v5_reports` drop column `title_coc`')
};
