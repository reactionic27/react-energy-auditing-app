
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('accounts', t => {
    t.specificType('deleted_at', 'TIMESTAMP NULL DEFAULT NULL')
  }).catch(e => {
    console.log("Warn: " + e)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('accounts', t => {
    t.dropColumn('deleted_at')
  })
};
