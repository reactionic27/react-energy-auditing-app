const enumMigrator = require('../server/scripts/enum-migrator')

exports.up = function(knex, Promise) {
  return Promise.try(() => {
    return enumMigrator(knex, 'v5_basedata', 'basement_wall_insulation', {
      current: ["", "None or Bare Walls", "Fiberglass blanket or batts on wall", "Finished wall without Insulation", "Finished wall with Insulation"],
      renaming: {'Fiberglass blanket or batts on wall': 'Fiberglass blanket'},
      adding: ["Unfinished frame wall with fiberglass batts", "Don't Know"]
    })
  })
};

exports.down = function(knex, Promise) {
  return Promise.try(() => {
    return enumMigrator(knex, 'v5_basedata', 'basement_wall_insulation', {
      current: ["", "None or Bare Walls", "Fiberglass blanket", "Finished wall without Insulation", "Finished wall with Insulation", "Unfinished frame wall with fiberglass batts"],
      renaming: {'Fiberglass blanket': 'Fiberglass blanket or batts on wall'},
      adding: null
    })
  })
}
