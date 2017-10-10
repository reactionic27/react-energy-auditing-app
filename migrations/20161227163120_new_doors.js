const enumMigrator = require('../server/scripts/enum-migrator')

exports.up = function(knex, Promise) {
  return Promise.try(() => {
    return enumMigrator(knex, 'v5_door', 'door_type', {
      renaming: null,
      current: ["", "Steel, hollow", "Steel, hollow with storm", "Steel, insulated", "Wood", "Wood with Storm", "Fiberglass"],
      adding: ["Fiberglass with Storm", "Steel, insulated with Storm", "1/2-Lite Steel, insulated", "1/2-Lite Steel, insulated with Storm", "1/2-Lite Wood", "1/2-Lite Wood with Storm", "1/2-Lite Fiberglass", "1/2-Lite Fiberglass with Storm"]
    })
  })
};

exports.down = function(knex, Promise) {

};
