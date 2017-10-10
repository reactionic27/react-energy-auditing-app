
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('alter table v5_caz modify caz_notes_improved text')
};

exports.down = function(knex, Promise) {
  return knex.schema
    .raw('alter table v5_caz modify caz_notes_improved varchar(255)')
};
