export default [
  {
    name: "Freezer Usage",
    label: "Usage",
    outputTable: "v5_freezer",
    outputColumn: "freezer_usage",
    collectionName: "freezer",
    hasImproved: true,
    description: "Enter the annual energy consumption for the freezer in kWh/yr. Search our knowledge base for \"Appliances Product Finder\" for more information.<br><br>\n\n<strong>Note:</strong><br>\nEdit this Base field in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "kWh/yr",
    min: 0,
    max: 10000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseFreezerEnergy%{n}",
    omDirectSetImproved: "ImpFreezerEnergy%{n}",
    csv: "Freezer > %{n} Usage"
  },
  {
    name: "Freezer Manufacturer",
    label: "Manufacturer",
    outputTable: "v5_freezer",
    outputColumn: "freezer_manufacturer",
    collectionName: "freezer",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Enter the Manufacturer of the Freezer.",
    omDirectSetBase: "FreezerBrand%{?n}",
    omDirectSetImproved: "ImpFreezerBrand%{n}",
    options: [
      "",
      "Amana",
      "Unknown",
      "Asko",
      "Bosch",
      "Fridgidaire",
      "GE",
      "Igloo",
      "LG",
      "Maytag",
      "Samsung",
      "Sears",
      "Sub-Zero",
      "Thermador",
      "Whirlpool",
      "Other"
    ],
    csv: "Freezer > %{n} Manufacturer"
  },
  {
    name: "Freezer Model Year",
    label: "Model Year",
    outputTable: "v5_freezer",
    outputColumn: "freezer_model_year",
    collectionName: "freezer",
    hasImproved: true,
    description: "Enter the Model Year of the Freezer.",
    examples: "1998,2014",
    min: 1900,
    max: 2030,
    decimals: 0,
    type: "Year",
    omDirectSetBase: "FreezerMfgDate%{?n}",
    omDirectSetImproved: "ImpFreezerYear%{n}",
    csv: "Freezer > %{n} Model Year"
  },
  {
    name: "Freezer Model",
    label: "Model",
    outputTable: "v5_freezer",
    outputColumn: "freezer_model",
    collectionName: "freezer",
    hasImproved: true,
    description: "Enter the Model number for the Freezer.",
    omDirectSetBase: "FreezerModelNum%{?n}",
    omDirectSetImproved: "ImpFreezerModelNum%{n}",
    csv: "Freezer > %{n} Model"
  },
  {
    name: "Freezer Name",
    label: "Name",
    outputTable: "v5_freezer",
    outputColumn: "freezer_name",
    collectionName: "freezer",
    csv: "Freezer > %{n} Name",
    affectsModeling: true
  },
  {
    name: "Freezer Energy Star",
    label: "ENERGY STAR",
    outputTable: "v5_freezer",
    outputColumn: "freezer_energy_star",
    collectionName: "freezer",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "If a Freezer is installed in the home, choose if it is an ENERGY STAR model.",
    omDirectSetBase: "BaseFreezerEStar%{n}",
    omDirectSetImproved: "ImpFreezerEStar%{n}",
    yesNo: true,
    csv: "Freezer > %{n} ENERGY STAR"
  }
].map(obj => {
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
