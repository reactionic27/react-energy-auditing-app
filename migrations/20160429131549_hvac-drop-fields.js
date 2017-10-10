var enumMigrator = require('../server/scripts/enum-migrator')

var current = [
  '',
  'Boiler',
  'Furnace with standalone ducts',
  'Electric Resistance',
  'Direct Heater',
  'Central AC with standalone ducts',
  'Room AC',
  'Evaporative Cooler - Direct',
  'Evaporative Cooler - Ducted',
  'Ductless Heat Pump',
  'Central Heat Pump',
  'Furnace / Central AC (shared ducts)',
  'Stove'
]
var renaming = {
  'Stove': "Stove or Insert",
  'Central Heat Pump': "Central Heat Pump (shared ducts)"
}
var adding = ["Solar Thermal"]

exports.up = function(knex, Promise) {
  return knex.schema
    .table('v5_hvac', t => {
      t.dropColumn('hvac_system_type')
      t.dropColumn('hvac_heating_equipment')
    })
    .then(() => enumMigrator(knex, 'v5_hvac', 'hvac_system_equipment_type', {current, adding, renaming}))
};

exports.down = function(knex, Promise) {


};
