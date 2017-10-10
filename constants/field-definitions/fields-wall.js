export default [
  {
    name: "Exterior Wall Siding",
    label: "Siding",
    outputTable: "v5_wall",
    outputColumn: "wall_exterior_wall_siding",
    collectionName: "wall",
    isSelect: true,
    type: "Select",
    description: "Select the type of exterior finish material that covers the outside of this home.",
    omA1BaseKey: "A1BaseWallCladding%{?n}",
    options: [
      "",
      {
        displayValue: "Brick Veneer",
        omValue: "Brick veneer"
      },
      "Metal/vinyl siding",
      "Shingle/Composition",
      "Stone veneer",
      "Stucco",
      {
        displayValue: "Wood/Fiber Cement siding",
        omValue: "Wood siding"
      },
      "Other",
      "None",
      "Don't Know"
    ],
    csv: "Walls > %{n} Exterior Siding"
  },
  {
    name: "Exterior Wall Construction",
    label: "Construction",
    outputTable: "v5_wall",
    outputColumn: "wall_exterior_wall_construction",
    collectionName: "wall",
    isSelect: true,
    type: "Select",
    description: "Select the type of construction material used to build the exterior walls of the home that are above grade (above ground).",
    omA1BaseKey: "A1BaseWallConstruction%{?n}",
    options: [
      "",
      "Concrete Block",
      {
        displayValue: "Full Brick",
        omValue: "Full brick"
      },
      {
        displayValue: "2x4 Frame",
        omValue: "Frame"
      },
      {
        displayValue: "2x6 Frame",
        omValue: "Frame2x6"
      },
      "Log",
      "Straw Bale",
      "Don't Know"
    ],
    csv: "Walls > %{n} Exterior Construction"
  },
  {
    name: "Walls Insulated?",
    label: "Insulated?",
    outputTable: "v5_wall",
    outputColumn: "walls_insulated",
    collectionName: "wall",
    isSelect: true,
    type: "Radio",
    description: "Is there insulation in the wall cavities of this home? If so, how good is it? If unsure, please leave blank.<br><br>\n\n<strong>Well</strong>: All cavities contain insulation at full or near full depth with gaps and voids not exceeding 5%.<br><br>\n<strong>Poor</strong>: Majority of cavities contain insulation, but one or more of the following is suspected: low density, low depth, poor installation.<br><br>\n<strong>Yes</strong>: You can confirm that insulation exists, but are unsure of the installation quality.<br><br>\n<strong>No</strong> - No insulation value is applied to cavities.",
    omA1BaseKey: "A1BaseWallInsul%{n}",
    options: [
      "Well",
      {
        displayValue: "Poorly",
        omValue: "Poor"
      },
      "Yes",
      "No"
    ],
    csv: "Walls > %{n} Insulated"
  },
  {
    name: "Wall Cavity Insulation",
    label: "Cavity Insulation",
    outputTable: "v5_wall",
    outputColumn: "wall_cavity_insulation",
    collectionName: "wall",
    hasImproved: true,
    description: "Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in this Wall System.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "R Value",
    min: 0,
    max: 100,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseWallInsulR%{?n}",
    omDirectSetImproved: "ImpWallInsulR%{?n}",
    csv: "Walls > %{n} Cavity Insulation R Value"
  },
  {
    name: "Wall Continuous Insulation",
    label: "Continuous Insulation",
    outputTable: "v5_wall",
    outputColumn: "wall_continuous_insulation",
    collectionName: "wall",
    hasImproved: true,
    description: "Enter the total R-value of continuous insulation installed or to be installed in this Wall System. Continuous insulation is any insulation like spray foam or rigid foam that is continuous and consistent in R-value across studs, joists, or any framing member.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>\n\n",
    suffix: "R Value",
    min: 0,
    max: 100,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseWallContInsulR%{?n}",
    omDirectSetImproved: "ImpWallContInsulR%{?n}",
    csv: "Walls > %{n} Continuous Insulation R Value"
  },
  {
    name: "Modeled Wall Area",
    label: "Modeled Area",
    outputTable: "v5_wall",
    outputColumn: "wall_modeled_wall_area",
    collectionName: "wall",
    hasImproved: true,
    description: "This field will be automatically calculated based on the data you entered in the input form for House Length, House Width, and Average Wall Height.<br><br>\n\nThis field designates the total gross exterior wall area, including all window and door openings. It does not include walls shared in common with other conditioned dwelling units. An additional 1' of wall height is automatically included for every story beyond the first to account for rim joists. First floor (foundation) rim joists are included separately in the basement or crawl space wall areas. <br><br>\n\nThe BASE area designates the sqft of this wall system on the house. The IMPROVED area designates only the sqft that will be improved. If you're not improving all of that wall, enter only the sqft that is actually being improved. The IMPROVED area cannot be used to reduce or increase the sqft of wall area in the home. ",
    suffix: "ft²",
    min: 10,
    max: 1000000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseWallArea%{n}",
    omDirectSetImproved: "ImpWallArea%{n}",
    csv: "Walls > %{n} Modeled Area"
  },
  {
    name: "Wall System % of Total",
    label: "% of Exterior Walls",
    outputTable: "v5_wall",
    outputColumn: "wall_system_percent_of_total",
    collectionName: "wall",
    description: "If there is more than one wall system type, enter the % of all walls that this system represents. Both wall systems must add up to 100%. If there is only one type of wall system in the house, then enter 100%.",
    suffix: "%",
    examples: "40,75",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1BaseWallPct%{n}",
    csv: "Walls > %{n} % of Total Walls"
  },
  {
    name: "Wall Cavity Insulation Type",
    outputColumn: "wall_cavity_insulation_type",
    isSelect: true,
    outputTable: "v5_wall",
    hasImproved: true,
    type: "Select",
    description: "Select the type of insulation that is installed in the wall cavity. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseWallInsul%{?n}Type",
    omDirectSetImproved: "ImpWallInsul%{?n}Type",
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
    csv: "Walls > %{n} Wall Cavity Insulation Type"
  },
  {
    name: "Wall Continuous Insulation Type",
    outputColumn: "wall_continuous_insulation_type",
    isSelect: true,
    outputTable: "v5_wall",
    hasImproved: true,
    type: "Select",
    description: "Select the type of continuous insulation that is installed on the wall. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseWallContInsul%{?n}Type",
    omDirectSetImproved: "ImpWallContInsul%{?n}Type",
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
    csv: "Walls > %{n} Wall Continuous Insulation Type"
  }

].map(obj => {
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
