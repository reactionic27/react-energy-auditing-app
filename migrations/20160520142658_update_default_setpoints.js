exports.up = function(knex, Promise) {
  return knex.schema
    .raw(`ALTER TABLE v5_basedata ALTER heating_setpoint_high SET DEFAULT '64-72'`)
    .raw(`ALTER TABLE v5_basedata ALTER heating_setpoint_low SET DEFAULT '60-68'`)
    .raw(`ALTER TABLE v5_basedata ALTER cooling_setpoint_high SET DEFAULT '76-88'`)
    .raw(`ALTER TABLE v5_basedata ALTER cooling_setpoint_low SET DEFAULT '72-82'`)
};

exports.down = function(knex, Promise) {

};
