exports.up = function(knex, Promise) {
  return knex.schema
    .raw(`ALTER TABLE v5_utilities ALTER bill_entry_type SET DEFAULT 'Detailed'`)
};

exports.down = function(knex, Promise) {

};
