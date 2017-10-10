
exports.up = function(knex, Promise) {
  return knex.raw('alter table `v5_concern` modify concern_detail text;')
};

exports.down = function(knex, Promise) {

};
