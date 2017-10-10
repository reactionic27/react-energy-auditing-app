exports.up = function(knex, Promise) {
  return knex.schema
    .raw('alter table v5_totals modify saved_co2_percent decimal(4,1)')
};

exports.down = function(knex, Promise) {

};
