export default [
  {
    name: "PV",
    label: "Has PV?",
    outputColumn: "pv",
    isSelect: true,
    hasImproved: true,
    type: "Radio",
    description: "Does the home have a Solar PV System?",
    options: [
      {
        displayValue: "Yes"
      },
      {
        displayValue: "No"
      }
    ],
    improvedOptions: [
      {
        displayValue: "No Improvement"
      },
      {
        displayValue: "New System"
      }
    ],
  },
  {
    name: "PV Array Size",
    label: "Array Size",
    outputColumn: "pv_array_size",
    description: "PV system size in kW.",
    suffix: "kW",
    hasImproved: true,
    type: "Numeric",
    decimals: 2,
    min: 0.01,
    max: 999,
    examples: "3.52, 8.75",
    omDirectSetBase: "BasePVArraykW",
    omDirectSetImproved: "ImpPVArraykW"
  },
  {
    name: "PV Annual Production",
    label: "Annual Production",
    outputColumn: "pv_annual_production",
    description: "PV system annual production in kWh.",
    suffix: "kWh",
    hasImproved: true,
    type: "Integer",
    omDirectSetBase: "BasePVkWhtoGrid/value",
    omDirectSetImproved: "ImpPVkWhtoGrid/value"
  },
  {
    name: "PV Array Slope",
    label: "Array Slope",
    outputColumn: "pv_array_slope",
    description: "Slope of the collector surface. Warning: 0-30 degrees is outside the range of analysis.",
    suffix: "º",
    hasImproved: true,
    type: "Integer",
    min: 30,
    max: 90,
    examples: "32, 41",
    omDirectSetBase: "BasePVArraySlope",
    omDirectSetImproved: "ImpPVArraySlope"
  },
  {
    name: "PV Array Orientation",
    label: "Array Orientation",
    outputColumn: "pv_array_orientation",
    description: "Orientation from North. South is 180 degrees. Facing East of South is less than 180.",
    suffix: "º",
    hasImproved: true,
    type: "Integer",
    min: 0,
    max: 360,
    examples: "183, 245 ",
    omDirectSetBase: "BasePVArrayAzimuth",
    omDirectSetImproved: "ImpPVArrayAzimuth"
  },
  {
    name: "PV Module Year",
    label: "Year Modules Manufactured",
    outputColumn: "pv_module_year",
    description: "Year the PV modules were manufactured. Taken into condieration for derating of system over time.",
    hasImproved: false,
    type: "Year",
    min: 1950,
    max: 2030,
    omDirectSetBase: "BasePVYear"
  },
].map(obj => {
  obj.outputTable = 'v5_pv'
  obj.collectionName = 'pv'
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
