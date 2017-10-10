
exports.up = function(knex, Promise) {
  return knex.raw(`ALTER TABLE v5_basedata ALTER dishwasher_installed SET DEFAULT NULL;`)
};

exports.down = function(knex, Promise) {
  return knex.raw(`ALTER TABLE v5_basedata ALTER dishwasher_installed SET DEFAULT 'Yes';`)
};
