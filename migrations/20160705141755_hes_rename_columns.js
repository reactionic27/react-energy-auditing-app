
exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('v5_hes_scores')
    .createTable('v5_hes_scores', (t) => {
      t.increments('id').unsigned().primary()
      t.integer('job_id', 10).notNullable().unsigned().references('jobs.id')
      t.tinyint('hes_locked', 1)
      t.string('hes_hpxml_event_type_1', 255)
      t.string('hes_hpxml_event_type_2', 255)
      t.string('hes_assessment_type_code', 255)
      t.string('hes_hpxml_building_node', 255)
      t.string('hes_xml_transaction_type', 255)
      t.integer('hes_base_score', 2)
      t.string('hes_assessment_type', 255)
      t.string('hes_city', 255)
      t.string('hes_state', 255)
      t.string('hes_zip_code', 255)
      t.integer('hes_conditioned_floor_area', 10)
      t.integer('hes_year_built', 10)
      t.tinyint('hes_cooling_present', 1)
      t.date('hes_assessment_date')
      t.integer('hes_label_number', 10)
      t.string('hes_qualified_assessor_id', 255)
      t.string('hes_hescore_version', 100)
      t.integer('hes_utility_electric', 10)
      t.integer('hes_utility_natural_gas', 10)
      t.integer('hes_utility_fuel_oil', 10)
      t.integer('hes_utility_lpg', 10)
      t.integer('hes_utility_cord_wood', 10)
      t.integer('hes_utility_pellet_wood', 10)
      t.integer('hes_source_energy_total_base', 10)
      t.integer('hes_source_energy_asset_base', 10)
      t.integer('hes_building_id', 10).unsigned()
      // t.text('hes_retrieved_inputs_json')
      t.specificType('created_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
      t.specificType('updated_at', 'TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP')
      t.specificType('deleted_at', 'TIMESTAMP NULL DEFAULT NULL')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('v5_hes_scores')
};
