exports.up = function(knex, Promise) {
  return knex.schema
  .table('v5_vault', (t) => {
    t.enu('vault_cavity_insulation_type', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('vault_cavity_insulation_type_improved', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('vault_continuous_insulation_type', ["", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('vault_continuous_insulation_type_improved', ["", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
  })
  .table('v5_basedata', (t) => {
    t.enu('floor_cavity_insulation_type', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('floor_cavity_insulation_type_improved', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('floor_continuous_insulation_type', ["", "Fiberglass Drape", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('floor_continuous_insulation_type_improved', ["", "Fiberglass Drape", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('crawl_cavity_insulation_type', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('crawl_cavity_insulation_type_improved', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('crawl_wall_insulation_type', ["", "Fiberglass Drape", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('crawl_wall_insulation_type_improved', ["", "Fiberglass Drape", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('crawlspace_rim_joist_insulation_type', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Other"])
    t.enu('crawlspace_rim_joist_insulation_type_improved', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Other"])
    t.enu('basement_cavity_insulation_type', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('basement_cavity_insulation_type_improved', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('basement_continuous_insulation_type', ["", "Fiberglass Drape", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('basement_continuous_insulation_type_improved', ["", "Fiberglass Drape", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('basement_rim_joist_insulation_type', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Other"])
    t.enu('basement_rim_joist_insulation_type_improved', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Other"])
    t.integer('dishwasher_energy_usage_improved')
    t.integer('dishwasher_water_usage_improved')

  })
  .table('v5_attic', (t) => {
    t.string('attic_knee_wall_continuous_insulation')
    t.string('attic_knee_wall_continuous_insulation_improved')
    t.enu('attic_knee_wall_insulation_type', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('attic_knee_wall_insulation_type_improved', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('attic_knee_wall_continuous_insulation_type', ["", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('attic_knee_wall_continuous_insulation_type_improved', ["", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
  })
  .table('v5_wall', (t) => {
    t.enu('wall_cavity_insulation_type', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('wall_cavity_insulation_type_improved', ["", "Fiberglass or Rockwool Batt", "Blown Fiberglass or Rockwool", "Cellulose", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('wall_continuous_insulation_type', ["", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
    t.enu('wall_continuous_insulation_type_improved', ["", "Rigid XPS", "Rigid EPS", "Rigid Polyisocyanurate", "Open Cell Spray Foam", "Closed Cell Spray Foam", "Other"])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .table('v5_vault', (t) => {
    t.dropColumn('vault_cavity_insulation_type')
    t.dropColumn('vault_cavity_insulation_type_improved')
    t.dropColumn('vault_continuous_insulation_type')
    t.dropColumn('vault_continuous_insulation_type_improved')
  })
  .table('v5_basedata', (t) => {
    t.dropColumn('floor_cavity_insulation_type')
    t.dropColumn('floor_cavity_insulation_type_improved')
    t.dropColumn('floor_continuous_insulation_type')
    t.dropColumn('floor_continuous_insulation_type_improved')
    t.dropColumn('crawl_cavity_insulation_type')
    t.dropColumn('crawl_cavity_insulation_type_improved')
    t.dropColumn('crawl_wall_insulation_type')
    t.dropColumn('crawl_wall_insulation_type_improved')
    t.dropColumn('crawlspace_rim_joist_insulation_type')
    t.dropColumn('crawlspace_rim_joist_insulation_type_improved')
    t.dropColumn('basement_cavity_insulation_type')
    t.dropColumn('basement_cavity_insulation_type_improved')
    t.dropColumn('basement_continuous_insulation_type')
    t.dropColumn('basement_continuous_insulation_type_improved')
    t.dropColumn('basement_rim_joist_insulation_type')
    t.dropColumn('basement_rim_joist_insulation_type_improved')
    t.dropColumn('dishwasher_energy_usage_improved')
    t.dropColumn('dishwasher_water_usage_improved')
  })
  .table('v5_attic', (t) => {
    t.dropColumn('attic_knee_wall_continuous_insulation')
    t.dropColumn('attic_knee_wall_continuous_insulation_improved')
    t.dropColumn('attic_knee_wall_insulation_type')
    t.dropColumn('attic_knee_wall_insulation_type_improved')
    t.dropColumn('attic_knee_wall_continuous_insulation_type')
    t.dropColumn('attic_knee_wall_continuous_insulation_type_improved')
  })
  .table('v5_wall', (t) => {
    t.dropColumn('wall_cavity_insulation_type')
    t.dropColumn('wall_cavity_insulation_type_improved')
    t.dropColumn('wall_continuous_insulation_type')
    t.dropColumn('wall_continuous_insulation_type_improved')
  })
};