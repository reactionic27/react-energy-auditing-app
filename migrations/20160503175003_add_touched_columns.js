exports.up = function(knex, Promise) {
  return knex.schema
    .table('v5_attic', (t) => {
      t.json('touched_fields')
    })
    .table('v5_dhw', (t) => {
      t.json('touched_fields')
    })
    .table('v5_door', (t) => {
      t.json('touched_fields')
    })
    .table('v5_freezer', (t) => {
      t.json('touched_fields')
    })
    .table('v5_hvac', (t) => {
      t.json('touched_fields')
    })
    .table('v5_refrigerator', (t) => {
      t.json('touched_fields')
    })
    .table('v5_vault', (t) => {
      t.json('touched_fields')
    })
    .table('v5_wall', (t) => {
      t.json('touched_fields')
    })
    .table('v5_window', (t) => {
      t.json('touched_fields')
    })
    .table('v5_basedata', (t) => {
      t.json('touched_fields')
    })
}

exports.down = function(knex, Promise) {
  return knex.schema
    .table('v5_attic', (t) => {
      t.dropColumn('touched_fields')
    })
    .table('v5_dhw', (t) => {
      t.dropColumn('touched_fields')
    })
    .table('v5_door', (t) => {
      t.dropColumn('touched_fields')
    })
    .table('v5_freezer', (t) => {
      t.dropColumn('touched_fields')
    })
    .table('v5_hvac', (t) => {
      t.dropColumn('touched_fields')
    })
    .table('v5_refrigerator', (t) => {
      t.dropColumn('touched_fields')
    })
    .table('v5_vault', (t) => {
      t.dropColumn('touched_fields')
    })
    .table('v5_wall', (t) => {
      t.dropColumn('touched_fields')
    })
    .table('v5_window', (t) => {
      t.dropColumn('touched_fields')
    })
    .table('v5_basedata', (t) => {
      t.dropColumn('touched_fields')
    })
}
