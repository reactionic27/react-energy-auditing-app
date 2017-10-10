export default [
  {
    name: "Ambient Carbon Monoxide",
    outputColumn: "health_ambient_carbon_monoxide",
    migrateV4Column: "ambient_carbon_monoxide",
    csv: "Health & Safety > Ambient Carbon Monoxide"
  },
  {
    name: "Natural Condition Spillage",
    outputColumn: "health_natural_condition_spillage",
    migrateV4Column: "nat_cond_spillage",
    csv: "Health & Safety > Natural Condition Spillage"
  },
  {
    name: "Worst Case Depressurization",
    outputColumn: "health_worst_case_depressurization",
    migrateV4Column: "worst_case_dep",
    csv: "Health & Safety > Worst Case Depressurization"
  },
  {
    name: "Worst Case Spillage",
    outputColumn: "health_worst_case_spillage",
    migrateV4Column: "worst_case_spill",
    csv: "Health & Safety > Worst Case Spillage"
  },
  {
    name: "Undiluted Flue CO",
    outputColumn: "health_undiluted_flue_co",
    migrateV4Column: "undiluted_flue_co",
    csv: "Health & Safety > Undiluted Flue Co"
  },
  {
    name: "Draft Pressure",
    outputColumn: "health_draft_pressure",
    migrateV4Column: "draft_pressure",
    csv: "Health & Safety > Draft Pressure"
  },
  {
    name: "Gas Leak",
    outputColumn: "health_gas_leak",
    migrateV4Column: "gas_leak",
    csv: "Health & Safety > Gas Leak"
  },
  {
    name: "Venting",
    outputColumn: "health_venting",
    migrateV4Column: "venting",
    csv: "Health & Safety > Venting"
  },
  {
    name: "Mold & Moisture",
    outputColumn: "health_mold_moisture",
    migrateV4Column: "mold",
    csv: "Health & Safety > Mold & Moisture"
  },
  {
    name: "Radon",
    outputColumn: "health_radon",
    migrateV4Column: "radon",
    csv: "Health & Safety > Radon"
  },
  {
    name: "Asbestos",
    outputColumn: "health_asbestos",
    migrateV4Column: "asbestos",
    csv: "Health & Safety > Asbestos"
  },
  {
    name: "Lead",
    outputColumn: "health_lead",
    migrateV4Column: "lead",
    csv: "Health & Safety > Lead"
  },
  {
    name: "Electrical",
    outputColumn: "health_electrical",
    migrateV4Column: "electrical",
  }
].map(obj => {
  obj.outputTable = "v5_health"
  obj.isSelect = true
  obj.type = "Radio"
  obj.description = "Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\"."
  obj.options = [
    "Passed",
    "Failed",
    "Warning",
    "Not Tested"
  ]
  return obj
})
