
exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists('v5_hes_scores', (t) => {
      t.increments('id').unsigned().primary()
      t.integer('job_id', 10).notNullable().unsigned().references('jobs.id')
      t.tinyint('locked', 1)
      t.string('hpxml_event_type1', 255)
      t.string('hpxml_event_type2', 255)
      t.string('assessment_type_code', 255)
      t.string('hpxml_building_node', 255)
      t.string('xml_transaction_type', 255)
      t.integer('base_score', 2)
      t.string('assessment_type', 255)
      t.string('city', 255)
      t.string('state', 255)
      t.string('zip_code', 255)
      t.integer('conditioned_floor_area', 10)
      t.integer('year_built', 10)
      t.tinyint('cooling_present', 1)
      t.date('assessment_date')
      t.integer('label_number', 10)
      t.string('qualified_assessor_id', 255)
      t.string('hescore_version', 100)
      t.integer('utility_electric', 10)
      t.integer('utility_natural_gas', 10)
      t.integer('utility_fuel_oil', 10)
      t.integer('utility_lpg', 10)
      t.integer('utility_cord_wood', 10)
      t.integer('utility_pellet_wood', 10)
      t.integer('source_energy_total_base', 10)
      t.integer('source_energy_asset_base', 10)
      t.integer('building_id', 10).unsigned()
      t.text('retrieved_inputs')
      t.specificType('created_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
      t.specificType('updated_at', 'TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP')
      t.specificType('deleted_at', 'TIMESTAMP NULL DEFAULT NULL')
    })
    .table('accounts', (t) => {
      t.string('doe_assessor_id', 255)  }).catch(e => console.warn(e.message))
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('v5_hes_scores')
    .table('accounts', (t) => {
      t.dropColumn('doe_assessor_id')  })
};
