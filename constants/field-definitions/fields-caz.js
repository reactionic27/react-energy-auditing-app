export default [
  {
    name: "CAZ Name",
    outputColumn: "caz_name",
    csv: "CAZ > %{n} Name",
    affectsModeling: false
  },
  {
    name: "CAZ Ambient CO",
    label: "Ambient CO",
    outputColumn: "caz_ambient_co",
    description: "Ambient Carbon Monoxide in Parts Per Million. Should not exceed 35 ppm per BPI Protocol.",
    suffix: "PPM",
    decimals: 0,
    hasImproved: true,
    type: "PositiveInteger",
    csv: "CAZ > %{n} Ambient CO"
  },
  {
    name: "CAZ Poor Case Test",
    label: "Poor Case Test",
    outputColumn: "caz_poor_case_test",
    description: "The poor case CAZ depressurization test is configured by determining the largest combustion appliance zone depressurization attainable at the time of testing due to the combined effects of door position, exhaust appliance operation, and air handler fan operation. A base pressure must be measured with all fans off and doors open. The poor case CAZ depressurization measurement is the pressure difference between the largest depressurization attained at the time of testing and the base pressure.",
    suffix: "PA",
    decimals: 2,
    type: "Numeric",
    hasImproved: true,
    csv: "CAZ > %{n} Poor Case Test"
  },
  {
    name: "CAZ Notes",
    label: "Notes",
    outputColumn: "caz_notes",
    description: "CAZ Zone Notes",
    hasImproved: true,
    csv: "CAZ > %{n} Zone Notes",
    affectsModeling: false,
    type: 'Textarea'
  },
].map(obj => {
  obj.outputTable = "v5_caz"
  obj.collectionName = "caz"
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
