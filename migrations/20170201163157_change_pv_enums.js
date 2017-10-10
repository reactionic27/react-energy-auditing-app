const enumMigrator = require('../server/scripts/enum-migrator')

exports.up = function(knex, Promise) {
  return Promise.try(() => {
    return enumMigrator(knex, 'v5_pv', 'pv_improved', {
      current: ["Yes", "No"],
      renaming: {'No': 'No Improvement', 'Yes': 'New System'},
      adding: null
    })
  })
};

exports.down = function(knex, Promise) {
  return Promise.try(() => {
    return enumMigrator(knex, 'v5_pv', 'pv_improved', {
      current: ["New System", "No Improvement"],
      renaming: {'No Improvement': 'No', 'New System': 'Yes'},
      adding: null
    })
  })
}
