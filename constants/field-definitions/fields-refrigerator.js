export default [
  {
    name: "Refrigerator Age",
    outputTable: "v5_refrigerator",
    outputColumn: "refrigerator_age",
    collectionName: "refrigerator",
    isSelect: true,
    type: "Select",
    description: "Select the age range of this refrigerator.",
    omA1BaseKey: "A1BaseRefrigeratorAge%{n}",
    options: [
      "",
      "0-14",
      "15-21",
      "22-24",
      "25-26",
      "27-30",
      "31-34",
      "35-42",
      "42+",
      "Don't Know"
    ],
    csv: "Refrigerator > %{n} Age"
  },
  {
    name: "Refrigerator Size",
    outputTable: "v5_refrigerator",
    outputColumn: "refrigerator_size",
    collectionName: "refrigerator",
    isSelect: true,
    type: "Select",
    description: "Select the size range of this refrigerator.",
    omA1BaseKey: "A1BaseRefrigeratorSize%{n}",
    options: [
      "",
      "1-5",
      "6-12",
      "13-15",
      "16-18",
      "19-21",
      "22+",
      "Don't Know"
    ],
    csv: "Refrigerator > %{n} Size"
  },
  {
    name: "Refrigerator Name",
    label: "Name",
    outputTable: "v5_refrigerator",
    outputColumn: "refrigerator_name",
    collectionName: "refrigerator",
    description: "Select the age range and the size range in cubic feet of the refrigerator. For HPXML purposes, always enter the house's \"primary\" refrigerator first.",
    maxLength: 30,
    type: "Text",
    csv: "Refrigerator > %{n} Name",
    affectsModeling: false
  },
  {
    name: "Refrigerator Usage",
    label: "Usage",
    outputTable: "v5_refrigerator",
    outputColumn: "refrigerator_usage",
    collectionName: "refrigerator",
    hasImproved: true,
    description: "Enter the annual energy consumption for the refrigerator in kWh/yr. Search our knowledge base for \"Appliances Product Finder\" for more information. <br><br>\n\n<strong>Note:</strong><br>\nEdit this Base field in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "kWh/yr",
    min: 0,
    max: 10000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseRefrigeratorEnergy%{n}",
    omDirectSetImproved: "ImpRefrigeratorEnergy%{n}",
    csv: "Refrigerator > %{n} Manufacturer"
  },
  {
    name: "Refrigerator Manufacturer",
    label: "Manufacturer",
    outputTable: "v5_refrigerator",
    outputColumn: "refrigerator_manufacturer",
    collectionName: "refrigerator",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Enter the Manufacturer of the Refrigerator.",
    omDirectSetBase: "FridgeBrand%{?n}",
    omDirectSetImproved: "ImpRefrigeratorBrand%{n}",
    options: [
      "",
      "Unknown",
      "Amana",
      "Asko",
      "Bosch",
      "Fridgidaire",
      "GE",
      "Hotpoint",
      "KitchenAid",
      "LG",
      "Maytag",
      "Samsung",
      "Sears",
      "Sub-Zero",
      {
        displayValue: "Thermador",
        omValue: "Thermado"
      },
      "Whirlpool",
      "Fisher & Paykel",
      "Ikea",
      "Liebherr",
      "Other"
    ],
    csv: "Refrigerator > %{n} Manufacturer"
  },
  {
    name: "Refrigerator Model",
    label: "Model",
    outputTable: "v5_refrigerator",
    outputColumn: "refrigerator_model",
    collectionName: "refrigerator",
    type: "Text",
    maxLength: 255,
    hasImproved: true,
    description: "Enter the Model number for the Refrigerator.",
    omDirectSetBase: "FridgeModelNum%{?n}",
    omDirectSetImproved: "ImpRefrigeratorModelNum%{n}",
    csv: "Refrigerator > %{n} Model"
  },
  {
    name: "Refrigerator Energy Star",
    label: "ENERGY STAR",
    outputTable: "v5_refrigerator",
    outputColumn: "refrigerator_energy_star",
    collectionName: "refrigerator",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "If a Refrigerator is installed in the home, choose if it is an ENERGY STAR model.",
    omDirectSetBase: "BaseRefrigeratorEStar%{n}",
    omDirectSetImproved: "ImpRefrigeratorEStar%{n}",
    yesNo: true,
    csv: "Refrigerator > %{n} ENERGY STAR"
  },
  {
    name: "Refrigerator Model Year",
    label: "Model Year",
    outputTable: "v5_refrigerator",
    outputColumn: "refrigerator_model_year",
    collectionName: "refrigerator",
    hasImproved: true,
    description: "Enter the Model Year of the Refrigerator.",
    min: 1900,
    max: 2030,
    decimals: 0,
    type: "Year",
    omDirectSetBase: "FridgeMfgDate%{?n}",
    omDirectSetImproved: "ImpRefrigeratorYear%{n}",
    csv: "Refrigerator > %{n} Model Year"
  }
].map(obj => {
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
