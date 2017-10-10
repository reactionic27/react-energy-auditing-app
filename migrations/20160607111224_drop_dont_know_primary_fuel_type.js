const enumMigrator = require('../server/scripts/enum-migrator')

exports.up = function(knex, Promise) {
  return enumMigrator(knex, 'v5_utilities', 'primary_heating_fuel_type', {
    current: ['', 'Natural Gas', 'Electricity', 'Fuel Oil', 'Propane', 'Wood', 'Pellets', 'Solar'],
    adding: [],
    renaming: null
  })
};

exports.down = function(knex, Promise) {

};
