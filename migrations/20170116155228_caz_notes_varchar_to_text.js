
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('alter table v5_caz modify caz_notes text')
};

exports.down = function(knex, Promise) {
  return knex.schema
    .raw('alter table v5_caz modify caz_notes varchar(255)')
};
