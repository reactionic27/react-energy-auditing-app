export default [
  {
    name: "HES HPXML Event Type 1",
    outputColumn: "hes_hpxml_event_type_1",
    maxLength: 255,
    csv: "HES > HPXML Event Type 1"
  },
  {
    name: "HES HPXML Event Type 2",
    outputColumn: "hes_hpxml_event_type_2",
    maxLength: 255,
    csv: "HES > HPXML Event Type 2"
  },
  {
    name: "HES Assessment Type Code",
    outputColumn: "hes_assessment_type_code",
    maxLength: 255,
    csv: "HES > Assessment Type Code"
  },
  {
    name: "HES HPXML Building Node",
    outputColumn: "hes_hpxml_building_node",
    maxLength: 255,
    csv: "HES > HPXML Building Node"
  },
  {
    name: "HES XML Transaction Type",
    outputColumn: "hes_xml_transaction_type",
    maxLength: 255,
    csv: "HES > XML Transaction Type"
  },
  {
    name: "HES Base Score",
    outputColumn: "hes_base_score",
    csv: "HES > Base Score"
  },
  {
    name: "HES Assessment Type",
    outputColumn: "hes_assessment_type",
    maxLength: 255,
    csv: "HES > Assessment Type"
  },
  {
    name: "HES City",
    outputColumn: "hes_city",
    maxLength: 255,
    csv: "HES > City"
  },
  {
    name: "HES State",
    outputColumn: "hes_state",
    maxLength: 255,
    csv: "HES > State"
  },
  {
    name: "HES Zip Code",
    outputColumn: "hes_zip_code",
    maxLength: 255,
    csv: "HES > Zip Code"
  },
  {
    name: "HES Conditioned Floor Area",
    outputColumn: "hes_conditioned_floor_area",
    csv: "HES > Conditioned Floor Area"
  },
  {
    name: "HES Year Built",
    outputColumn: "hes_year_built",
    csv: "HES > Year Built"
  },
  {
    name: "HES Cooling Present",
    outputColumn: "hes_cooling_present",
    csv: "HES > Cooling Present"
  },
  {
    name: "HES Assessment Date",
    outputColumn: "hes_assessment_date",
    csv: "HES > Assessment Date"
  },
  {
    name: "HES Label Number",
    outputColumn: "hes_label_number",
    csv: "HES > Label Number"
  },
  {
    name: "HES Qualified Assessor ID",
    outputColumn: "hes_qualified_assessor_id",
    maxLength: 255,
    csv: "HES > Qualified Assessor ID"
  },
  {
    name: "HESCORE Version",
    outputColumn: "hes_hescore_version",
    max: 100,
    csv: "HES > HESCORE Version"
  },
  {
    name: "HES Utility Electric",
    outputColumn: "hes_utility_electric",
    csv: "HES > Utility Electric"
  },
  {
    name: "HES Utility Natural Gas",
    outputColumn: "hes_utility_natural_gas",
    csv: "HES > Utility Natural Gas"
  },
  {
    name: "HES Utility Fuel Oil",
    outputColumn: "hes_utility_fuel_oil",
    csv: "HES > Utility Fuel Oil"
  },
  {
    name: "HES Utility LPG",
    outputColumn: "hes_utility_lpg",
    csv: "HES > Utility LPG"
  },
  {
    name: "HES Utility Cord Wood",
    outputColumn: "hes_utility_cord_wood",
    csv: "HES > Utility Cord Wood"
  },
  {
    name: "HES Utility Pellet Wood",
    outputColumn: "hes_utility_pellet_wood",
    csv: "HES > Utility Pellet Wood"
  },
  {
    name: "HES Source Energy Total Base",
    outputColumn: "hes_source_energy_total_base",
    csv: "HES > Source Energy Total Base"
  },
  {
    name: "HES Source Energy Asset Base",
    outputColumn: "hes_source_energy_asset_base",
    csv: "HES > Source Energy Asset Base"
  },
  {
    name: "HES Building ID",
    outputColumn: "hes_building_id",
    csv: "HES > Building ID"
  }
].map(f => {
  f.outputTable = "v5_hes_scores"
  if (f.name.indexOf('HES ') === 0) {
    f.label = f.name.slice(4)
  }
  return f
})
