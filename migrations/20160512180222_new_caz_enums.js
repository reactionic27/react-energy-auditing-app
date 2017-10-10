
exports.up = function(knex, Promise) {
  return knex.schema.table('v5_caz', (t) => {
    t.dropColumn('caz_appliance_vent_system_type')
    t.dropColumn('caz_appliance_co_test_result')
    t.dropColumn('caz_appliance_flue_test_result')
    t.dropColumn('caz_appliance_spillage_test_result')
  }).table('v5_caz', (t) => {
    t.enu('caz_appliance_vent_system_type', ["", "Atmospheric", "Induced Draft", "Power Vented (at unit)", "Power Vented (at exterior)", "Direct Vented", "Sealed Combustion" ])
    t.enu('caz_appliance_co_test_result', ["", "Passed", "Fail", "Not Tested" ])
    t.enu('caz_appliance_flue_test_result', ["", "Passed", "Fail", "Not Tested" ])
    t.enu('caz_appliance_spillage_test_result', ["", "Passed", "Fail", "Not Tested" ])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('v5_caz', (t) => {
    t.dropColumn('caz_appliance_vent_system_type')
  })
};
