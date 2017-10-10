import UUID from 'node-uuid'
import supertest from './supertest-promise'
import supertestSession from './supertest-session-promise'
import server from '../../src/server'

export function makeServer() {
  return supertest(server)
}

export function makeSessionServer() {
  return supertestSession(server)
}

export function validRegistration() {
  const uuid = UUID.v4()
  return {
    company_name: `Unit Test Company ${uuid}`,
    first_name: 'Unit Test First Name',
    last_name: 'Unit Test Last Name',
    email: `unittest-${uuid}@example.com`,
    password: 'unittestpassword',
    password_confirm: 'unittestpassword'
  }
}

export const mockCreateJob = {
  program_id: 1,
  stage_id: 1,
  is_template: false,
  address_1: '123 Fake St',
  address_2: '',
  city: 'Boulder',
  email: '1@example.com',
  first_name: 'UnitTestFN',
  home_phone: '',
  last_name: 'UnitTestLN',
  renter_owner: true,
  service_time: null,
  state: 'CO',
  zip: '80301',
}

export const mockCreateInvitation = {
  email: '1@example.com',
  role: 'user',
  title: 'Unit Test Invitation Title',
  updated_at: '2016-02-08T17:14:46.090Z'
}

export const mockUpdateBilling = {
  'token': 'unit-test-bogus-token',
  'card_name': 'UT',
}

// Base:

export const mockBasedataSave = {
  // job_id: number
}

export const mockHealthSave = {
  // job_id: number
}

export const mockUtilitiesSave = {
  // job_id: number
}

export const mockReportsSave = {
  // job_id: number
}

// Collections:

export const mockAtticCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0
}

export const mockAtticSave = {
  // job_id: number
  uuid: mockAtticCreate.uuid
}

export const mockInsertedAttic = {
  ...mockAtticCreate,
  attic_cool_roof: 'No',
  attic_cool_roof_improved: 'No',
  attic_has_knee_wall: 'No',
  attic_has_knee_wall_improved: 'No',
  attic_insulation: null,
  attic_insulation_depth: null,
  attic_insulation_improved: null,
  attic_insulation_type: null,
  attic_insulation_type_improved: null,
  attic_knee_wall_area: null,
  attic_knee_wall_area_improved: null,
  attic_knee_wall_insulation: null,
  attic_knee_wall_insulation_improved: null,
  attic_modeled_attic_area: null,
  attic_modeled_attic_area_improved: null,
  attic_percent: null,
  attic_radiant_barrier: 'No',
  attic_radiant_barrier_improved: 'No',
  attic_roof_absorptance: null,
  attic_roof_absorptance_improved: null,
  attic_roof_emissivity: null,
  attic_roof_emissivity_improved: null,
  deleted_at: null,
  touched_fields: {},
}

export const mockDhwCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0
}

export const mockDhwSave = {
  // job_id: number
  uuid: mockDhwCreate.uuid
}

export const mockInsertedDhw = {
  ...mockDhwCreate,
  deleted_at: null,
  dhw_age: null,
  dhw_energy_factor: null,
  dhw_energy_factor_improved: null,
  dhw_energy_star: null,
  dhw_energy_star_improved: null,
  dhw_fuel: null,
  dhw_fuel_2: null,
  dhw_fuel_2_improved: null,
  dhw_heating_capacity: null,
  dhw_heating_capacity_improved: null,
  dhw_location: null,
  dhw_manufacturer: null,
  dhw_manufacturer_improved: null,
  dhw_model: null,
  dhw_model_improved: null,
  dhw_model_year: null,
  dhw_model_year_improved: null,
  dhw_percent_load: null,
  dhw_percent_load_improved: null,
  dhw_tank_size: null,
  dhw_tank_size_improved: null,
  dhw_temp: null,
  dhw_temp_improved: null,
  dhw_temperature_settings: null,
  dhw_type: null,
  dhw_type_2: null,
  dhw_type_2_improved: null,
  touched_fields: {},
}

export const mockDoorCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0
}

export const mockDoorSave = {
  // job_id: number
  uuid: mockDoorCreate.uuid
}

export const mockInsertedDoor = {
  ...mockDoorCreate,
  deleted_at: null,
  door_area: null,
  door_area_improved: null,
  door_energy_star: null,
  door_energy_star_improved: null,
  door_type: null,
  door_u_value: null,
  door_u_value_improved: null,
  touched_fields: {},
}

export const mockFreezerCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0
}

export const mockFreezerSave = {
  // job_id: number
  uuid: mockFreezerCreate.uuid
}

export const mockInsertedFreezer = {
  ...mockFreezerCreate,
  deleted_at: null,
  freezer_energy_star: null,
  freezer_energy_star_improved: null,
  freezer_manufacturer: null,
  freezer_manufacturer_improved: null,
  freezer_model: null,
  freezer_model_improved: null,
  freezer_model_year: null,
  freezer_model_year_improved: null,
  freezer_name: null,
  freezer_usage: null,
  freezer_usage_improved: null,
  touched_fields: {},
}

export const mockHvacCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0,
  hvac_upgrade_action: "Replace with a newer model",
  hvac_system_equipment_type: "Boiler"
}

export const mockHvacSave = {
  // job_id: number
  uuid: mockHvacCreate.uuid
}

export const mockInsertedHvac = {
  ...mockHvacCreate,
  deleted_at: null,
  hvac_cooling_capacity: null,
  hvac_cooling_capacity_improved: null,
  hvac_cooling_equipment: null,
  hvac_cooling_equipment_improved: null,
  hvac_cooling_system_efficiency: null,
  hvac_cooling_system_efficiency_improved: null,
  hvac_cooling_system_manufacturer: null,
  hvac_cooling_system_manufacturer_improved: null,
  hvac_cooling_system_model: null,
  hvac_cooling_system_model_improved: null,
  hvac_cooling_system_model_year: null,
  hvac_cooling_system_model_year_improved: null,
  hvac_dual_equipment: null,
  hvac_duct_efficiency: null,
  hvac_duct_efficiency_improved: null,
  hvac_duct_insulation: null,
  hvac_duct_insulation_improved: null,
  hvac_duct_insulation_value: null,
  hvac_duct_insulation_value_improved: null,
  hvac_duct_leakage: null,
  hvac_duct_leakage_improved: null,
  hvac_duct_leakage_value: null,
  hvac_duct_leakage_value_improved: null,
  hvac_duct_location: null,
  hvac_duct_location_improved: null,
  hvac_heat_pump_inverter: null,
  hvac_heat_pump_inverter_improved: null,
  hvac_heating_capacity: null,
  hvac_heating_capacity_improved: null,
  hvac_heating_energy_source: null,
  hvac_heating_energy_source_improved: null,
  hvac_heating_equipment_improved: null,
  hvac_heating_system_efficiency: null,
  hvac_heating_system_efficiency_improved: null,
  hvac_heating_system_manufacturer: null,
  hvac_heating_system_manufacturer_improved: null,
  hvac_heating_system_model: null,
  hvac_heating_system_model_improved: null,
  hvac_heating_system_model_year: null,
  hvac_heating_system_model_year_improved: null,
  hvac_percent_of_total_cooling_load: null,
  hvac_percent_of_total_cooling_load_improved: null,
  hvac_percent_of_total_heating_load: null,
  hvac_percent_of_total_heating_load_improved: null,
  hvac_system_name: null,
  v4_uuid: null,
  touched_fields: {},
}

export const mockRefrigeratorCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0
}

export const mockRefrigeratorSave = {
  // job_id: number
  uuid: mockRefrigeratorCreate.uuid
}

export const mockInsertedRefrigerator = {
  ...mockRefrigeratorCreate,
  deleted_at: null,
  refrigerator_age: null,
  refrigerator_energy_star: null,
  refrigerator_energy_star_improved: null,
  refrigerator_manufacturer: null,
  refrigerator_manufacturer_improved: null,
  refrigerator_model: null,
  refrigerator_model_improved: null,
  refrigerator_model_year: null,
  refrigerator_model_year_improved: null,
  refrigerator_name: null,
  refrigerator_size: null,
  refrigerator_usage: null,
  refrigerator_usage_improved: null,
  touched_fields: {}
}

export const mockVaultCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0
}

export const mockVaultSave = {
  // job_id: number
  uuid: mockVaultCreate.uuid
}

export const mockInsertedVault = {
  ...mockVaultCreate,
  deleted_at: null,
  touched_fields: {},
  vault: null,
  vault_cavity_insulation: null,
  vault_cavity_insulation_improved: null,
  vault_continuous_insulation: null,
  vault_continuous_insulation_improved: null,
  vault_cool_roof: "No",
  vault_cool_roof_improved: "No",
  vault_modeled_vault_area: null,
  vault_modeled_vault_area_improved: null,
  vault_percent: null,
  vault_roof_absorptance: null,
  vault_roof_absorptance_improved: null,
  vault_roof_emissivity: null,
  vault_roof_emissivity_improved: null,
}

export const mockWallCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0
}

export const mockWallSave = {
  // job_id: number
  uuid: mockWallCreate.uuid
}

export const mockInsertedWall = {
  ...mockWallCreate,
  deleted_at: null,
  touched_fields: {},
  wall_cavity_insulation: null,
  wall_cavity_insulation_improved: null,
  wall_continuous_insulation: null,
  wall_continuous_insulation_improved: null,
  wall_exterior_wall_construction: null,
  wall_exterior_wall_siding: null,
  wall_modeled_wall_area: null,
  wall_modeled_wall_area_improved: null,
  wall_system_percent_of_total: null,
  walls_insulated: null,
}

export const mockWindowCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0
}

export const mockWindowSave = {
  // job_id: number
  uuid: mockWindowCreate.uuid
}

export const mockInsertedWindow = {
  ...mockWindowCreate,
  deleted_at: null,
  touched_fields: {},
  window_area_east: null,
  window_area_east_improved: null,
  window_area_north: null,
  window_area_north_improved: null,
  window_area_south: null,
  window_area_south_improved: null,
  window_area_west: null,
  window_area_west_improved: null,
  window_east_area_percent: null,
  window_east_overhang_depth: null,
  window_efficiency: null,
  window_efficiency_improved: null,
  window_energy_star: null,
  window_energy_star_improved: null,
  window_exterior_treatment_east: null,
  window_exterior_treatment_east_improved: null,
  window_exterior_treatment_north: null,
  window_exterior_treatment_north_improved: null,
  window_exterior_treatment_south: null,
  window_exterior_treatment_south_improved: null,
  window_exterior_treatment_west: null,
  window_exterior_treatment_west_improved: null,
  window_frame: null,
  window_north_area_percent: null,
  window_north_overhang_depth: null,
  window_solar_heat_gain_coefficient: null,
  window_solar_heat_gain_coefficient_improved: null,
  window_south_area_percent: null,
  window_south_overhang_depth: null,
  window_type: null,
  window_west_area_percent: null,
  window_west_overhang_depth: null,
}

export const mockCazCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0
}

export const mockCazSave = {
  // job_id: number
  uuid: mockCazCreate.uuid
}

export const mockInsertedCaz = {
  ...mockCazCreate,
  caz_ambient_co: null,
  caz_ambient_co_improved: null,
  caz_name: null,
  caz_notes: null,
  caz_notes_improved: null,
  caz_poor_case_test: null,
  caz_poor_case_test_improved: null,
  deleted_at: null,
}

export const mockConcernCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0
}

export const mockConcernSave = {
  // job_id: number
  uuid: mockConcernCreate.uuid
}

export const mockInsertedConcern = {
  ...mockConcernCreate,
  concern_detail: null,
  concern_summary: null,
  deleted_at: null,
}

export const mockRangeCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0
}

export const mockRangeSave = {
  // job_id: number
  uuid: mockRangeCreate.uuid
}

export const mockInsertedRange = {
  ...mockRangeCreate,
  deleted_at: null,
  range_fuel_type: null,
  range_fuel_type_improved: null,
}

export const mockOvenCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0
}

export const mockOvenSave = {
  // job_id: number
  uuid: mockOvenCreate.uuid
}

export const mockInsertedOven = {
  ...mockOvenCreate,
  deleted_at: null,
  oven_fuel_type: null,
  oven_fuel_type_improved: null,
}

export const mockClothesDryerCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0
}

export const mockClothesDryerSave = {
  // job_id: number
  uuid: mockClothesDryerCreate.uuid
}

export const mockInsertedClothesDryer = {
  ...mockClothesDryerCreate,
  clothes_dryer_fuel_type: null,
  clothes_dryer_fuel_type_improved: null,
  deleted_at: null,
}

export const mockCazSystemCreate = {
  // job_id: number
  uuid: UUID.v4(),
  caz_uuid: mockCazCreate.uuid,
  hvac_uuid: mockHvacCreate.uuid,
}

export const mockCazSystemSave = {
  // job_id: number
  uuid: mockCazSystemCreate.uuid
}

export const mockInsertedCazSystem = {
  ...mockCazSystemCreate,
  caz_appliance_co_current_condition: null,
  caz_appliance_co_current_condition_improved: null,
  caz_appliance_co_poor_scenario: null,
  caz_appliance_co_poor_scenario_improved: null,
  caz_appliance_co_test_result: null,
  caz_appliance_co_test_result_improved: null,
  caz_appliance_flue_test_result: null,
  caz_appliance_flue_test_result_improved: null,
  caz_appliance_spillage_current_condition: null,
  caz_appliance_spillage_current_condition_improved: null,
  caz_appliance_spillage_poor_condition: null,
  caz_appliance_spillage_poor_condition_improved: null,
  caz_appliance_spillage_test_result: null,
  caz_appliance_spillage_test_result_improved: null,
  caz_appliance_vent_system_type: null,
  caz_appliance_vent_system_type_improved: null,
  caz_fuel_leaks_addressed: null,
  caz_fuel_leaks_addressed_improved: null,
  caz_fuel_leaks_identified: null,
  caz_fuel_leaks_identified_improved: null,
  caz_water_heater_orphaned: null,
  caz_water_heater_orphaned_improved: null,
  clothes_dryer_uuid: null,
  dhw_uuid: null,
  oven_uuid: null,
  range_uuid: null,
  deleted_at: null,
}

export const mockRecommendationsCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0,
  rec_definition_id: 19,
  status: 1
}

export const mockRecommendationsSave = {
  // job_id: number
  uuid: mockRecommendationsCreate.uuid
}

export const mockInsertedRecommendations = {
  ...mockRecommendationsCreate,
  contractor_notes: null,
  cost: null,
  deleted_at: null,
  homeowner_notes: null,
  savings: null,
  sir: null,
  title: null,
  touched_cost: null,
  why_it_matters: null,
}

export const mockRecommendationCaptionRowsCreate = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0,
  recommendation_uuid: mockRecommendationsCreate.uuid
}

export const mockRecommendationCaptionRowsSave = {
  // job_id: number
  uuid: mockRecommendationCaptionRowsCreate.uuid,
}

export const mockInsertedRecommendationCaptionRows = {
  ...mockRecommendationCaptionRowsCreate,
  caption: null,
  deleted_at: null,
  left_photo_height: null,
  left_photo_name: null,
  left_photo_url: null,
  left_photo_uuid: null,
  left_photo_width: null,
  right_photo_height: null,
  right_photo_name: null,
  right_photo_url: null,
  right_photo_uuid: null,
  right_photo_width: null,
}

export const mockTemplateFinancingCreate  = {
  // job_id: number
  closing_cost: '1',
  contact_info: 'Call 1-900-mix-a-lot',
  description: 'UT Description',
  eligibility: 'UT eligibility',
  max_purchase: '2',
  min_cash_down: '3',
  min_fico_score: '4',
  min_purchase: '5',
  rate: 6,
  term: '7',
  title: 'Unit Test Financing Product 1'
}

export const mockJobFinancingCreate  = {
  // job_id: number
  uuid: UUID.v4(),
  order: 0,
  closing_cost: '1',
  contact_info: 'Call 1-900-mix-a-lot',
  description: 'UT Description',
  eligibility: 'UT eligibility',
  max_purchase: '2',
  min_cash_down: '3',
  min_fico_score: '4',
  min_purchase: '5',
  rate: '6.0',
  term: '7',
  title: 'Unit Test Financing Product 1'
}

export const mockJobFinancingSave = {
  // job_id: number
  uuid: mockJobFinancingCreate.uuid
}

export const mockInsertedJobFinancing = {
  ...mockJobFinancingCreate,
  cash_down: null,
  rate: 6,
  closing_cost: "1",
  contact_info: "Call 1-900-mix-a-lot",
  deleted_at: null,
  description: "UT Description",
  eligibility: "UT eligibility",
  from_financing_template_id: null,
  is_shown: 0,
  total_cost: null
}
