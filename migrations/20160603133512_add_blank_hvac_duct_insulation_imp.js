const enumMigrator = require('../server/scripts/enum-migrator')

exports.up = function(knex, Promise) {
  return enumMigrator(knex, 'v5_hvac', 'hvac_duct_insulation_improved', {
    adding: [''],
    renaming: null,
    current: ["No Insulation Improvement", "R-6 Duct Insulation", "R-8 Duct Insulation", "Measured (R Value) - add cost manually"]
  })
};

exports.down = function(knex, Promise) {
  return enumMigrator(knex, 'v5_hvac', 'hvac_duct_insulation_improved', {
    adding: [],
    renaming: null,
    current: ["No Insulation Improvement", "R-6 Duct Insulation", "R-8 Duct Insulation", "Measured (R Value) - add cost manually"]
  })
};
