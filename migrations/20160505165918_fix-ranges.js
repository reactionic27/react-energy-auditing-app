
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('alter table v5_basedata modify conditioned_area varchar(255)')
    .raw('alter table v5_basedata modify average_wall_height varchar(255)')
    .raw('alter table v5_basedata modify foundation_above_grade_height varchar(255)')
};

exports.down = function(knex, Promise) {
  return knex.schema
    .raw('alter table v5_basedata modify conditioned_area decimal(6,2)')
    .raw('alter table v5_basedata modify average_wall_height decimal (4,2)')
    .raw('alter table v5_basedata modify foundation_above_grade_height decimal(2,1)')
};
