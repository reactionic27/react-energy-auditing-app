
exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('v5_caz_system')
    .dropTableIfExists('v5_caz')
    .createTable('v5_caz', (t) => {
      t.uuid('uuid').primary()
      t.integer('job_id').notNullable().unsigned().index().references('jobs.id').onDelete('cascade')
      t.integer('order').notNullable()
      t.specificType('created_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
      t.specificType('updated_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      t.specificType('deleted_at', 'TIMESTAMP NULL DEFAULT NULL')
      t.string('caz_name')
      t.integer('caz_ambient_co')
      t.integer('caz_max_ambient_co')
      t.integer('caz_poor_case_test')
      t.string('caz_notes')
    })
    .createTable('v5_caz_system', (t) => {
      t.uuid('uuid').primary()
      t.uuid('caz_uuid').references('v5_caz.uuid').onDelete('cascade')
      t.integer('job_id').notNullable().unsigned().index().references('jobs.id').onDelete('cascade')
      t.uuid('hvac_uuid').references('v5_hvac.uuid').onDelete('cascade')
      t.uuid('dhw_uuid').references('v5_dhw.uuid').onDelete('cascade')
      t.specificType('created_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
      t.specificType('updated_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      t.integer('caz_appliance_co_current_condition')
      t.integer('caz_appliance_co_current_condition_improved')
      t.integer('caz_appliance_co_poor_scenario')
      t.integer('caz_appliance_co_poor_scenario_improved')
      t.enu('caz_appliance_vent_system_type', ["", "Atmospheric", "Induced Draft", "Power Vented (at unit)", "Power Vented (at exterior)", "Direct Vented", "Sealed Combustion" ])
      t.enu('caz_appliance_vent_system_type_improved', ["", "Atmospheric", "Induced Draft", "Power Vented (at unit)", "Power Vented (at exterior)", "Direct Vented", "Sealed Combustion" ])
      t.enu('caz_appliance_co_test_result', ["Passed", "Fail", "Not Tested" ])
      t.enu('caz_appliance_co_test_result_improved', ["Passed", "Fail", "Not Tested" ])
      t.enu('caz_appliance_flue_test_result', ["Passed", "Fail", "Not Tested" ])
      t.enu('caz_appliance_flue_test_result_improved', ["Passed", "Fail", "Not Tested" ])
      t.enu('caz_appliance_spillage_test_result', ["Passed", "Fail", "Not Tested" ])
      t.enu('caz_appliance_spillage_test_result_improved', ["Passed", "Fail", "Not Tested" ])
      t.integer('caz_appliance_spillage_current_condition')
      t.integer('caz_appliance_spillage_current_condition_improved')
      t.integer('caz_appliance_spillage_poor_condition')
      t.integer('caz_appliance_spillage_poor_condition_improved')
      t.enu('caz_water_heater_orphaned', ["Yes", "No"])
      t.enu('caz_water_heater_orphaned_improved', ["Yes", "No"])
      t.enu('caz_fuel_leaks_identified', ["Yes", "No"])
      t.enu('caz_fuel_leaks_identified_improved', ["Yes", "No"])
      t.enu('caz_fuel_leaks_addressed', ["Yes", "No"])
      t.enu('caz_fuel_leaks_addressed_improved', ["Yes", "No"])
    }).catch(e => {
      console.error('Warning: ' + e)
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('v5_caz_system')
    .dropTable('v5_caz')
};
