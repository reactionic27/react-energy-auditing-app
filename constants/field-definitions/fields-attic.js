export default [
  {
    name: "Insulation Depth",
    outputColumn: "attic_insulation_depth",
    collectionName: "attic",
    isSelect: true,
    type: "Select",
    description: "Enter the depth of all installed attic or ceiling insulation. If the insulation is not evenly distributed, estimate an average depth for the area. If the insulation is evenly distributed but has different depths installed in different area, use the depth of insulation that covers the largest area. If there is no attic and instead vaulted ceilings, enter an estimate of the thickness of insulation in the vaulted cavity.",
    omA1BaseKey: "A1BaseAtticCavInsulDepth%{n}",
    options: [
      "",
      {
        displayValue: "0",
        omValue: "0-0"
      },
      "1-3",
      "4-6",
      "7-9",
      "10-12",
      "13-15",
      "16+",
      "Don't Know"
    ],
    csv: "Attic > %{n} Insulation Depth"
  },
  {
    name: "Insulation Type",
    outputColumn: "attic_insulation_type",
    collectionName: "attic",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of insulation that is installed in the attic or ceiling. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "A1BaseAtticCavInsul%{n}",
    omDirectSetImproved: "A1ImpAtticCavInsul%{n}",
    options: [
      "",
      {
        displayValue: "Fiberglass or Rockwool (batts or blown)",
        omValue: "Fiberglass"
      },
      "Cellulose",
      "Spray Foam",
      "Don't Know"
    ],
    csv: "Attic > %{n} Insulation Type"
  },
  {
    name: "Modeled Attic Area",
    label: "Modeled Area",
    outputColumn: "attic_modeled_attic_area",
    collectionName: "attic",
    hasImproved: true,
    description: "This field will be automatically calculated based on the data you entered in the input form for Conditioned Area and Number of Stories.<br><br>\n\nThis field designates the actual interior surface area of the ceiling. On the improved side, this is the new total sqft of the attic. Reduce this number if you're switching the attic from unconditioned to a conditioned space. For instance, if the original house had 1000 sqft of attic space and you converted it to a fully conditioned attic by spray foaming the roof deck and rafters, then set the base side to 1000 sqft and the improved side to 0. Then create a vaulted ceiling that is 0 on the base side and 1118 sqft on the improved side (adding 118 sqft for a 6/12 roof pitch). ",
    suffix: "ft²",
    min: 0,
    max: 1000000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "AtticFootprint%{n}",
    omDirectSetImproved: "ImpAtticArea%{n}",
    csv: "Attic > %{n} Modeled Area"
  },
  {
    name: "Attic Insulation",
    label: "Insulation",
    outputColumn: "attic_insulation",
    collectionName: "attic",
    hasImproved: true,
    description: "Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in this Attic. Framing factors have already been taken into account, so specify the R-value of the insulation within the cavity.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "R Value",
    min: 0,
    max: 100,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseAtticCavR%{n}",
    omDirectSetImproved: "ImpAtticCavR%{n}",
    csv: "Attic > %{n} Insulation R Value"
  },
  {
    name: "Knee Wall Area",
    outputColumn: "attic_knee_wall_area",
    collectionName: "attic",
    hasImproved: true,
    description: "Enter the total surface area of knee wall adjoining this attic space.",
    suffix: "ft²",
    min: 0,
    max: 1000000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "KneeArea%{n}",
    omDirectSetImproved: "ImpKneeArea%{n}",
    csv: "Attic > %{n} Knee Wall Area"
  },
  {
    name: "Knee Wall Insulation",
    label: "Knee Wall Cavity Insulation",
    outputColumn: "attic_knee_wall_insulation",
    collectionName: "attic",
    hasImproved: true,
    description: "Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in this Knee Wall cavity.",
    suffix: "R Value",
    min: 0,
    max: 100,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseKneeCavR%{n}",
    omDirectSetImproved: "ImpKneeCavR%{n}",
    csv: "Attic > %{n} Knee Wall Cavity Insulation R Value"
  },
  {
    name: "Knee Wall Continuous Insulation",
    outputColumn: "attic_knee_wall_continuous_insulation",
    collectionName: "attic",
    hasImproved: true,
    description: "Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in this Knee Wall cavity.",
    suffix: "R Value",
    min: 0,
    max: 100,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseKneeContR%{n}",
    omDirectSetImproved: "ImpKneeContR%{n}",
    csv: "Attic > %{n} Knee Wall Continuous Insulation R Value"
  },
  {
    name: "Has Knee Wall?",
    outputColumn: "attic_has_knee_wall",
    collectionName: "attic",
    hasImproved: true,
    isSelect: true,
    type: "Radio",
    description: "Choose Yes if there is a knee wall in this attic space.",
    yesNo: true,
    csv: "Attic > %{n} Has Knee Wall"
  },
  {
    name: "Radiant Barrier?",
    outputColumn: "attic_radiant_barrier",
    collectionName: "attic",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "Please designate if the base or improved attic has a radiant barrier. Costs will not be adjusted for this nor will the R-Value of the attic insulation. The energy savings will be calculated in addition to the R-Value of the attic. ",
    omDirectSetBase: "BaseAttic%{n}Radiant",
    omDirectSetImproved: "ImpAttic%{n}Radiant",
    yesNo: true,
    csv: "Attic > %{n} Radiant Barrier"
  },
  {
    name: "Attic Percent",
    label: "% of Ceiling Area",
    outputColumn: "attic_percent",
    collectionName: "attic",
    description: "Enter the % of the total footprint that is attributed to each attic or vault area.",
    suffix: "%",
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1BaseAtticPct%{n}",
    csv: "Attic > %{n} % of Footprint"
  },
  {
    name: "Attic Roof Absorptance",
    label: "Roof Absorptance",
    outputColumn: "attic_roof_absorptance",
    collectionName: "attic",
    hasImproved: true,
    description: "Enter the Solar Absorptance of the roofing material above this attic space. Solar Absorptance is equal to 1 - Solar Reflectance. For example, if the ENERGY STAR website gives a Initial Solar Reflectance of 0.27, enter 0.73. Default numbers will be supplied automatically, so don't change these settings unless you plan to specify a cool roof as an improvement.",
    suffix: "#",
    examples: "0.80,0.57",
    min: 0,
    max: 1,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseAtticAbsorptance%{n}",
    omDirectSetImproved: "ImpAtticAbsorptance%{n}",
    csv: "Attic > %{n} Roof Absorptance"
  },
  {
    name: "Attic Roof Emissivity",
    label: "Roof Emissivity",
    outputColumn: "attic_roof_emissivity",
    collectionName: "attic",
    hasImproved: true,
    description: "Enter the Thermal Emittance or Emissivity of the roofing material above this attic space. Default numbers will be supplied automatically, so don't change these settings unless you plan to specify a cool roof as an improvement.",
    suffix: "#",
    examples: "0.76,0.89",
    min: 0,
    max: 1,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseAtticEmittance%{n}",
    omDirectSetImproved: "ImpAtticEmittance%{n}",
    csv: "Attic > %{n} Roof Emissivity"
  },
  {
    name: "Attic Cool Roof?",
    label: "Cool Roof?",
    outputColumn: "attic_cool_roof",
    collectionName: "attic",
    hasImproved: true,
    isSelect: true,
    type: "Radio",
    description: "Choose yes if you would like to specify characteristics of a cool roof (such as ENERGY STAR qualified roof products) for either the base or improved home. Default numbers will be supplied automatically. Most contractors will not use this option unless they are actually planning to replace a roof as part of an improvement package. ",
    yesNo: true,
    csv: "Attic > %{n} Has Cool Roof"
  },
  {
    name: "Knee Wall Insulation Type",
    outputColumn: "attic_knee_wall_insulation_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of insulation that is installed in the knee wall cavity. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseKneeCavInsul%{n}Type",
    omDirectSetImproved: "ImpKneeCavInsul%{n}Type",
    options: [
      "",
      {
        displayValue: "Fiberglass or Rockwool Batt",
        omValue: "fiberglassBatt"
      },
      {
        displayValue: "Blown Fiberglass or Rockwool",
        omValue: "fiberglassLooseFill"
      },
      {
        displayValue: "Cellulose",
        omValue: "celluloseLooseFill"
      },
      {
        displayValue: "Open Cell Spray Foam",
        omValue: "open cellSprayFoam"
      },
      {
        displayValue: "Closed Cell Spray Foam",
        omValue: "closed cellSprayFoam"
      },
      {
        displayValue: "Other",
        omValue: "other"
      }
    ],
    csv: "Attic > %{n} Knee Wall Insulation Type"
  },
  {
    name: "Knee Wall Continuous Insulation Type",
    outputColumn: "attic_knee_wall_continuous_insulation_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of continuous insulation that is installed on the knee wall. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseKneeContInsul%{n}Type",
    omDirectSetImproved: "ImpKneeContInsul%{n}Type",
    options: [
      "",
      {
        displayValue: "Rigid XPS",
        omValue: "xpsRigid"
      },
      {
        displayValue: "Rigid EPS",
        omValue: "epsRigid"
      },
      {
        displayValue: "Rigid Polyisocyanurate",
        omValue: "polyisocyanurateRigid"
      },
      {
        displayValue: "Open Cell Spray Foam",
        omValue: "open cellSprayFoam"
      },
      {
        displayValue: "Closed Cell Spray Foam",
        omValue: "closed cellSprayFoam"
      },
      {
        displayValue: "Other",
        omValue: "other"
      }
    ],
    csv: "Attic > %{n} Knee Wall Continuous Insulation Type"
  },


].map(o => {
  o.outputTable = 'v5_attic'
  if (o.affectsModeling !== false) {
    o.affectsModeling = true
  }
  return o
})
