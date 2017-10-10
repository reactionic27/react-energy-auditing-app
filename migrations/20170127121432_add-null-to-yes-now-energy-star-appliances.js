const enumMigrator = require('../server/scripts/enum-migrator')

exports.up = function(knex, Promise) {
  return Promise.all([
    enumMigrator(knex, 'v5_basedata', 'clothes_washer_energy_star', {
      renaming: null,
      current: ["Yes", "No"],
      adding: [""]
    }),
    enumMigrator(knex, 'v5_basedata', 'clothes_washer_energy_star_improved', {
      renaming: null,
      current: ["Yes", "No"],
      adding: [""]
    }),
    enumMigrator(knex, 'v5_basedata', 'dishwasher_energy_star', {
      renaming: null,
      current: ["Yes", "No"],
      adding: [""]
    }),
    enumMigrator(knex, 'v5_basedata', 'dishwasher_energy_star_improved', {
      renaming: null,
      current: ["Yes", "No"],
      adding: [""]
    }),
  ])
};

exports.down = function(knex, Promise) {

};
