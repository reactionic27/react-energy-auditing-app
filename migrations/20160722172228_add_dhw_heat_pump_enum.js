const enumMigrator = require('../server/scripts/enum-migrator')

exports.up = function(knex, Promise) {
  return Promise.try(() => {
    return enumMigrator(knex, 'v5_dhw', 'dhw_type', {
      renaming: null,
      current: ["", "Standard tank", "Tank with extra insulation", "Tankless (on-demand)", "Sidearm Tank (set EF manually)", "Don\\'t Know"],
      adding: ["Heat Pump"]
    })
  })
};

exports.down = function(knex, Promise) {
  return enumMigrator(knex, 'v5_dhw', 'dhw_type', {
    adding: [],
    renaming: null,
    current: ["", "Standard tank", "Tank with extra insulation", "Tankless (on-demand)", "Sidearm Tank (set EF manually)", "Don\\'t Know"]
  })
};
