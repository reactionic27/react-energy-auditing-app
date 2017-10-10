
exports.up = function(knex, Promise) {
  return knex.schema
    .raw(`ALTER DATABASE ${knex.client.database()} DEFAULT COLLATE utf8_unicode_ci`)
};

exports.down = function(knex, Promise) {

};
