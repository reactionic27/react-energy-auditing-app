
exports.up = function(knex, Promise) {
  return knex.raw('ALTER TABLE v5_reports MODIFY COLUMN page_hes TINYINT(1) DEFAULT 0')
};

exports.down = function(knex, Promise) {

};
