const enumMigrator = require('../server/scripts/enum-migrator')

exports.up = function(knex, Promise) {
  return Promise.try(() => {
    return enumMigrator(knex, 'v5_wall', 'wall_exterior_wall_construction', {
      current: ["", "Concrete Block", "Full Brick", "Frame", "Log", "Straw Bale", "Don\\'t Know"],
      renaming: {'Frame': '2x4 Frame'},
      adding: ["2x6 Frame"]
    })
  })
};

exports.down = function(knex, Promise) {
  return Promise.try(() => {
    return enumMigrator(knex, 'v5_wall', 'wall_exterior_wall_construction', {
      current: ["", "Concrete Block", "Full Brick", "2x4 Frame", "2x6 Frame", "Log", "Straw Bale", "Don\\'t Know"],
      renaming: {'2x4 Frame': 'Frame'},
      adding: null
    })
  })
}
