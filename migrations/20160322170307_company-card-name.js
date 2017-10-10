
exports.up = function(knex, Promise) {
  return knex.raw('alter table `companies` add column `card_name` varchar(255) DEFAULT NULL;')
};

exports.down = function(knex, Promise) {
  return knex.raw('alter table `companies` drop column `card_name`;')
};
