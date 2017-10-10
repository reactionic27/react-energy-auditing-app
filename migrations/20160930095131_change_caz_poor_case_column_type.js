
exports.up = function(knex, Promise) {
  return knex.schema.raw(`
    alter table v5_caz
    modify column caz_poor_case_test varchar(255),
    modify column caz_poor_case_test_improved varchar(255)
  `)
};

exports.down = function(knex, Promise) {

};
