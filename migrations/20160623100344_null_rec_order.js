
exports.up = function(knex, Promise) {
  return knex.raw('ALTER TABLE jobs MODIFY COLUMN recommendation_order TEXT NULL')
};

exports.down = function(knex, Promise) {

};
