
exports.up = function(knex, Promise) {
  return knex.raw(
    'ALTER TABLE `jobs` CHANGE `is_calculating` `is_calculating` INT(11)'
  )
};

exports.down = function(knex, Promise) {

};
