const enumMigrator = require('../server/scripts/enum-migrator')

exports.up = function(knex, Promise) {
  return Promise.try(() => {
    return enumMigrator(knex, 'v5_hvac', 'hvac_duct_leakage_improved', {
      renaming: null,
      current: ["", "No Improvement", "Seal to 15% Leakage", "Seal to 6% Leakage", "Measured (cfm25) - add cost manually"],
      adding: ['50% Reduction']
    })
  })
};

exports.down = function(knex, Promise) {

};
