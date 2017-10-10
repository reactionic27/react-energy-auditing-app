
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('v5_caz_system', t => {
    t.uuid('oven_uuid').references('v5_oven.uuid').onDelete('cascade')
    t.uuid('range_uuid').references('v5_range.uuid').onDelete('cascade')
    t.uuid('clothes_dryer_uuid').references('v5_clothes_dryer.uuid').onDelete('cascade')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('v5_caz_system', t => {
    t.dropColumn('oven_uuid')
    t.dropColumn('range_uuid')
    t.dropColumn('clothes_dryer_uuid')
  })
};
