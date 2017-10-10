export default [
  {
    name: "Window Type",
    label: "Type",
    outputTable: "v5_window",
    outputColumn: "window_type",
    collectionName: "window",
    isSelect: true,
    type: "Select",
    description: "Select the type of windows that are installed in the home. If more than one type of window is installed, add a second window system.",
    omA1BaseKey: "A1BaseWindowType%{n}",
    options: [
      "",
      {
        displayValue: "Single pane",
        omValue: "Single"
      },
      {
        displayValue: "Single pane + storm",
        omValue: "Single + Storm"
      },
      {
        displayValue: "Double pane",
        omValue: "Double"
      },
      {
        displayValue: "Double pane + low e",
        omValue: "Double + Low E"
      },
      {
        displayValue: "Triple pane + low e",
        omValue: "Triple + Low E"
      },
      "Don't Know"
    ],
    csv: "Windows > %{n} Type"
  },
  {
    name: "Window Frame",
    label: "Frame",
    outputTable: "v5_window",
    outputColumn: "window_frame",
    collectionName: "window",
    isSelect: true,
    type: "Select",
    description: "Select the type of window frame material that is used for the windows installed in the home. If more than one type of window is installed, add a second window system.",
    omA1BaseKey: "A1BaseWindowFrame%{?n}",
    options: [
      "",
      "Metal",
      "Vinyl",
      {
        displayValue: "Wood or metal clad",
        omValue: "Wood"
      },
      "Don't Know"
    ],
    csv: "Windows > %{n} Frame"
  },
  {
    name: "Window: North Area Percent",
    label: "% of North Wall",
    outputTable: "v5_window",
    outputColumn: "window_north_area_percent",
    collectionName: "window",
    description: "Enter the % of EXPOSED wall area for each orientation that is made up of window glass area. If some of the wall is shared with another conditioned unit (multi-family, townhome, etc.) put in the % of the exposed area only.",
    suffix: "%",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1BaseWindowNorth%{n}",
    csv: "Windows > %{n} % of North Wall"
  },
  {
    name: "Window Improvements",
    label: "Windows Improved?",
    outputTable: "v5_window",
    outputColumn: "window_improvements",
    collectionName: "window",
    isSelect: true,
    hasImproved: true,
    type: "Radio",
    description: "If any of the windows or window treatments in this window system will be improved, leave the default setting as Yes and make changes to the improved fields below accordingly. If you will not be making any improvements to the windows or window treatments in this window system, then choose No.",
    omDirectSetBase: "BaseWindowType%{n}",
    omDirectSetImproved: "ImpWindowType%{n}",
    options: [
      "",
      {
        displayValue: "Yes",
        omValue: ""
      },
      {
        displayValue: "No Improvement",
        omValue: "182299999999"
      }
    ]
  },
  {
    name: "Efficiency",
    label: "U-Value",
    outputTable: "v5_window",
    outputColumn: "window_efficiency",
    collectionName: "window",
    hasImproved: true,
    description: "Enter the average gross window (including frame effects) U-value of the windows installed (BASE) or to be installed (IMPROVED). <br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "U Value",
    min: 0.01,
    max: 2,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseWindowU%{n}/controlvalue",
    omDirectSetImproved: "ImpWindowU%{n}/controlvalue",
    csv: "Windows > %{n} U Value"
  },
  {
    name: "Window Area: North",
    label: "Window Area: North",
    outputTable: "v5_window",
    outputColumn: "window_area_north",
    collectionName: "window",
    hasImproved: true,
    description: "Enter the total area of windows for this orientation of this Window System. BASE values determine the area of the existing windows in the house. The IMPROVED values represent the area of windows in this orientation that are actually going to be improved. The difference in sqft between BASE and IMPROVED will be assumed as unchanged. \n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "ft²",
    min: 0,
    max: 10000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseWindowNorth%{n}",
    omDirectSetImproved: "ImpWindowNorth%{n}",
    csv: "Windows > %{n} North Area"
  },
  {
    name: "Window Area: East",
    label: "Window Area: East",
    outputTable: "v5_window",
    outputColumn: "window_area_east",
    collectionName: "window",
    hasImproved: true,
    description: "Enter the total area of windows for this orientation of this Window System. BASE values determine the area of the existing windows in the house. The IMPROVED values represent the area of windows in this orientation that are actually going to be improved. The difference in sqft between BASE and IMPROVED will be assumed as unchanged. \n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "ft²",
    min: 0,
    max: 10000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseWindowEast%{n}",
    omDirectSetImproved: "ImpWindowEast%{n}",
    csv: "Windows > %{n} East Area"
  },
  {
    name: "Window Area: South",
    label: "Window Area: South",
    outputTable: "v5_window",
    outputColumn: "window_area_south",
    collectionName: "window",
    hasImproved: true,
    description: "Enter the total area of windows for this orientation of this Window System. BASE values determine the area of the existing windows in the house. The IMPROVED values represent the area of windows in this orientation that are actually going to be improved. The difference in sqft between BASE and IMPROVED will be assumed as unchanged. \n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "ft²",
    min: 0,
    max: 10000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseWindowSouth%{n}",
    omDirectSetImproved: "ImpWindowSouth%{n}",
    csv: "Windows > %{n} South Area"
  },
  {
    name: "Window Area: West",
    label: "Window Area: West",
    outputTable: "v5_window",
    outputColumn: "window_area_west",
    collectionName: "window",
    hasImproved: true,
    description: "Enter the total area of windows for this orientation of this Window System. BASE values determine the area of the existing windows in the house. The IMPROVED values represent the area of windows in this orientation that are actually going to be improved. The difference in sqft between BASE and IMPROVED will be assumed as unchanged. \n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "ft²",
    min: 0,
    max: 10000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseWindowWest%{n}",
    omDirectSetImproved: "ImpWindowWest%{n}",
    csv: "Windows > %{n} West Area"
  },
  {
    name: "Solar Heat Gain Coefficient",
    label: "Solar Heat Gain Coefficient",
    outputTable: "v5_window",
    outputColumn: "window_solar_heat_gain_coefficient",
    collectionName: "window",
    hasImproved: true,
    description: "Enter the average gross window (including frame effects) Solar Heat Gain Coefficient (SHGC) of the windows installed (BASE) or to be installed (IMPROVED). IMPORTANT! Do not adjust this number to account for the affects of solar screens or shades. Use the Exterior Treatment fields below for this and only change the SHGC if the window unit itself is being replaced.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "SHGC",
    min: 0.01,
    max: 0.99,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseWindowSHGC%{n}",
    omDirectSetImproved: "ImpWindowSHGC%{n}",
    csv: "Windows > %{n} SHGC"
  },
  {
    name: "Window: East Area Percent",
    label: "% of East Wall",
    outputTable: "v5_window",
    outputColumn: "window_east_area_percent",
    collectionName: "window",
    description: "Enter the % of EXPOSED wall area for each orientation that is made up of window glass area. If some of the wall is shared with another conditioned unit (multi-family, townhome, etc.) put in the % of the exposed area only.",
    suffix: "%",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1BaseWindowEast%{n}",
    csv: "Windows > %{n} % of East Wall"
  },
  {
    name: "Window: South Area Percent",
    label: "% of South Wall",
    outputTable: "v5_window",
    outputColumn: "window_south_area_percent",
    collectionName: "window",
    description: "Enter the % of EXPOSED wall area for each orientation that is made up of window glass area. If some of the wall is shared with another conditioned unit (multi-family, townhome, etc.) put in the % of the exposed area only.",
    suffix: "%",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1BaseWindowSouth%{n}",
    csv: "Windows > %{n} % of South Wall"
  },
  {
    name: "Window: West Area Percent",
    label: "% of West Wall",
    outputTable: "v5_window",
    outputColumn: "window_west_area_percent",
    collectionName: "window",
    description: "Enter the % of EXPOSED wall area for each orientation that is made up of window glass area. If some of the wall is shared with another conditioned unit (multi-family, townhome, etc.) put in the % of the exposed area only.",
    suffix: "%",
    examples: "5,25",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1BaseWindowWest%{n}",
    csv: "Windows > %{n} % of West Wall"
  },
  {
    name: "North Overhang Depth",
    outputTable: "v5_window",
    outputColumn: "window_north_overhang_depth",
    collectionName: "window",
    description: "Enter the average window overhang width (feet) on the exterior walls for this orientation.",
    suffix: "ft",
    min: 0,
    max: 20,
    decimals: 2,
    type: "Numeric",
    omA1BaseKey: "A1BaseWindowOHVertN%{n}",
    csv: "Windows > %{n} North Overhang Depth"
  },
  {
    name: "East Overhang Depth",
    outputTable: "v5_window",
    outputColumn: "window_east_overhang_depth",
    collectionName: "window",
    description: "Enter the average window overhang width (feet) on the exterior walls for this orientation.",
    suffix: "ft",
    min: 0,
    max: 20,
    decimals: 2,
    type: "Numeric",
    omA1BaseKey: "A1BaseWindowOHVertE%{n}",
    csv: "Windows > %{n} East Overhang Depth"
  },
  {
    name: "South Overhang Depth",
    outputTable: "v5_window",
    outputColumn: "window_south_overhang_depth",
    collectionName: "window",
    description: "Enter the average window overhang width (feet) on the exterior walls for this orientation.",
    suffix: "ft",
    min: 0,
    max: 20,
    decimals: 2,
    type: "Numeric",
    omA1BaseKey: "A1BaseWindowOHVertS%{n}",
    csv: "Windows > %{n} South Overhang Depth"
  },
  {
    name: "West Overhang Depth",
    outputTable: "v5_window",
    outputColumn: "window_west_overhang_depth",
    collectionName: "window",
    description: "Enter the average window overhang width (feet) on the exterior walls for this orientation.",
    suffix: "ft",
    min: 0,
    max: 20,
    decimals: 2,
    type: "Numeric",
    omA1BaseKey: "A1BaseWindowOHVertW%{n}",
    csv: "Windows > %{n} West Overhang Depth"
  },
  {
    name: "Exterior Treatment: North",
    outputTable: "v5_window",
    outputColumn: "window_exterior_treatment_north",
    collectionName: "window",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Choose the type of exterior shading device that's attached to windows on this side of the home. IMPORTANT! Do not adjust the SHGC number to account for the affects of solar screens or shades and only change the SHGC if the window unit itself is being replaced.",
    omDirectSetBase: "BaseWindowExtTreatN%{n}/value",
    omDirectSetImproved: "ImpWindowExtTreatN%{n}/value",
    options: [
      "",
      {
        displayValue: "Insect Screen (full)",
        omValue: "2"
      },
      {
        displayValue: "Insect Screen (half)",
        omValue: "3"
      },
      {
        displayValue: "Solar Screen (summer only)",
        omValue: "4"
      },
      {
        displayValue: "Solar Screen (all year)",
        omValue: "5"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (summer only)",
        omValue: "6"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (all year)",
        omValue: "7"
      },
      {
        displayValue: "Solar Shades, Louvered (summer only)",
        omValue: "8"
      },
      {
        displayValue: "Solar Shades, Louvered (all year)",
        omValue: "9"
      },
      {
        displayValue: "Solar Film (all year)",
        omValue: "10"
      },
      {
        displayValue: "No Treatment",
        omValue: "1"
      }
    ],
    improvedOptions: [
      "",
      {
        displayValue: "No Improvement",
        omValue: "180799999999"
      },
      {
        displayValue: "Insect Screen (half)",
        omValue: "229999999999"
      },
      {
        displayValue: "Insect Screen (full)",
        omValue: "229899999999"
      },
      {
        displayValue: "Solar Screen (summer only)",
        omValue: "230099999999"
      },
      {
        displayValue: "Solar Screen (all year)",
        omValue: "230199999999"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (summer only)",
        omValue: "230299999999"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (all year)",
        omValue: "230399999999"
      },
      {
        displayValue: "Solar Shades, Louvered (summer only)",
        omValue: "230499999999"
      },
      {
        displayValue: "Solar Shades, Louvered (all year)",
        omValue: "230599999999"
      },
      {
        displayValue: "Solar Film (all year)",
        omValue: "230699999999"
      },
      {
        displayValue: "No Treatment",
        omValue: "229799999999"
      }
    ],
    csv: "Windows > %{n} North Exterior Treatment"
  },
  {
    name: "Exterior Treatment: East",
    outputTable: "v5_window",
    outputColumn: "window_exterior_treatment_east",
    collectionName: "window",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Choose the type of exterior shading device that's attached to windows on this side of the home. IMPORTANT! Do not adjust the SHGC number to account for the affects of solar screens or shades and only change the SHGC if the window unit itself is being replaced.",
    omDirectSetBase: "BaseWindowExtTreatE%{n}/value",
    omDirectSetImproved: "ImpWindowExtTreatE%{n}/value",
    options: [
      "",
      {
        displayValue: "Insect Screen (full)",
        omValue: "2"
      },
      {
        displayValue: "Insect Screen (half)",
        omValue: "3"
      },
      {
        displayValue: "Solar Screen (summer only)",
        omValue: "4"
      },
      {
        displayValue: "Solar Screen (all year)",
        omValue: "5"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (summer only)",
        omValue: "6"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (all year)",
        omValue: "7"
      },
      {
        displayValue: "Solar Shades, Louvered (summer only)",
        omValue: "8"
      },
      {
        displayValue: "Solar Shades, Louvered (all year)",
        omValue: "9"
      },
      {
        displayValue: "Solar Film (all year)",
        omValue: "10"
      },
      {
        displayValue: "No Treatment",
        omValue: "1"
      }
    ],
    improvedOptions: [
      "",
      {
        displayValue: "No Improvement",
        omValue: "180799999999"
      },
      {
        displayValue: "Insect Screen (half)",
        omValue: "229999999999"
      },
      {
        displayValue: "Insect Screen (full)",
        omValue: "229899999999"
      },
      {
        displayValue: "Solar Screen (summer only)",
        omValue: "230099999999"
      },
      {
        displayValue: "Solar Screen (all year)",
        omValue: "230199999999"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (summer only)",
        omValue: "230299999999"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (all year)",
        omValue: "230399999999"
      },
      {
        displayValue: "Solar Shades, Louvered (summer only)",
        omValue: "230499999999"
      },
      {
        displayValue: "Solar Shades, Louvered (all year)",
        omValue: "230599999999"
      },
      {
        displayValue: "Solar Film (all year)",
        omValue: "230699999999"
      },
      {
        displayValue: "No Treatment",
        omValue: "229799999999"
      }
    ],
    csv: "Windows > %{n} East Exterior Treatment"
  },
  {
    name: "Exterior Treatment: South",
    outputTable: "v5_window",
    outputColumn: "window_exterior_treatment_south",
    collectionName: "window",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Choose the type of exterior shading device that's attached to windows on this side of the home. IMPORTANT! Do not adjust the SHGC number to account for the affects of solar screens or shades and only change the SHGC if the window unit itself is being replaced.",
    omDirectSetBase: "BaseWindowExtTreatS%{n}/value",
    omDirectSetImproved: "ImpWindowExtTreatS%{n}/value",
    options: [
      "",
      {
        displayValue: "Insect Screen (full)",
        omValue: "2"
      },
      {
        displayValue: "Insect Screen (half)",
        omValue: "3"
      },
      {
        displayValue: "Solar Screen (summer only)",
        omValue: "4"
      },
      {
        displayValue: "Solar Screen (all year)",
        omValue: "5"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (summer only)",
        omValue: "6"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (all year)",
        omValue: "7"
      },
      {
        displayValue: "Solar Shades, Louvered (summer only)",
        omValue: "8"
      },
      {
        displayValue: "Solar Shades, Louvered (all year)",
        omValue: "9"
      },
      {
        displayValue: "Solar Film (all year)",
        omValue: "10"
      },
      {
        displayValue: "No Treatment",
        omValue: "1"
      }
    ],
    improvedOptions: [
      "",
      {
        displayValue: "No Improvement",
        omValue: "180799999999"
      },
      {
        displayValue: "Insect Screen (half)",
        omValue: "229999999999"
      },
      {
        displayValue: "Insect Screen (full)",
        omValue: "229899999999"
      },
      {
        displayValue: "Solar Screen (summer only)",
        omValue: "230099999999"
      },
      {
        displayValue: "Solar Screen (all year)",
        omValue: "230199999999"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (summer only)",
        omValue: "230299999999"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (all year)",
        omValue: "230399999999"
      },
      {
        displayValue: "Solar Shades, Louvered (summer only)",
        omValue: "230499999999"
      },
      {
        displayValue: "Solar Shades, Louvered (all year)",
        omValue: "230599999999"
      },
      {
        displayValue: "Solar Film (all year)",
        omValue: "230699999999"
      },
      {
        displayValue: "No Treatment",
        omValue: "229799999999"
      }
    ],
    csv: "Windows > %{n} South Exterior Treatment"
  },
  {
    name: "Exterior Treatment: West",
    outputTable: "v5_window",
    outputColumn: "window_exterior_treatment_west",
    collectionName: "window",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Choose the type of exterior shading device that's attached to windows on this side of the home. IMPORTANT! Do not adjust the SHGC number to account for the affects of solar screens or shades and only change the SHGC if the window unit itself is being replaced.",
    omDirectSetBase: "BaseWindowExtTreatW%{n}/value",
    omDirectSetImproved: "ImpWindowExtTreatW%{n}/value",
    options: [
      "",
      {
        displayValue: "Insect Screen (full)",
        omValue: "2"
      },
      {
        displayValue: "Insect Screen (half)",
        omValue: "3"
      },
      {
        displayValue: "Solar Screen (summer only)",
        omValue: "4"
      },
      {
        displayValue: "Solar Screen (all year)",
        omValue: "5"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (summer only)",
        omValue: "6"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (all year)",
        omValue: "7"
      },
      {
        displayValue: "Solar Shades, Louvered (summer only)",
        omValue: "8"
      },
      {
        displayValue: "Solar Shades, Louvered (all year)",
        omValue: "9"
      },
      {
        displayValue: "Solar Film (all year)",
        omValue: "10"
      },
      {
        displayValue: "No Treatment",
        omValue: "1"
      }
    ],
    improvedOptions: [
      "",
      {
        displayValue: "No Improvement",
        omValue: "180799999999"
      },
      {
        displayValue: "Insect Screen (half)",
        omValue: "229999999999"
      },
      {
        displayValue: "Insect Screen (full)",
        omValue: "229899999999"
      },
      {
        displayValue: "Solar Screen (summer only)",
        omValue: "230099999999"
      },
      {
        displayValue: "Solar Screen (all year)",
        omValue: "230199999999"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (summer only)",
        omValue: "230299999999"
      },
      {
        displayValue: "Solar Shades, Vertical Roller (all year)",
        omValue: "230399999999"
      },
      {
        displayValue: "Solar Shades, Louvered (summer only)",
        omValue: "230499999999"
      },
      {
        displayValue: "Solar Shades, Louvered (all year)",
        omValue: "230599999999"
      },
      {
        displayValue: "Solar Film (all year)",
        omValue: "230699999999"
      },
      {
        displayValue: "No Treatment",
        omValue: "229799999999"
      }
    ],
    csv: "Windows > %{n} West Exterior Treatment"
  },
  {
    name: "Window Energy Star",
    label: "ENERGY STAR",
    outputTable: "v5_window",
    outputColumn: "window_energy_star",
    collectionName: "window",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "Select Yes if this window system is ENERGY STAR Certified.",
    omDirectSetBase: "BaseWindowEStar%{n}",
    omDirectSetImproved: "ImpWindowEStar%{n}",
    yesNo: true,
    csv: "Windows > %{n} ENERGY STAR"
  }
].map(obj => {
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
