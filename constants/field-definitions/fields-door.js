export default [
  {
    name: "Door %{n} Type",
    label: "Type",
    outputTable: "v5_door",
    outputColumn: "door_type",
    collectionName: "door",
    isSelect: true,
    type: "Select",
    description: "Select the type of door construction used for each door.",
    omA1BaseKey: "A1BaseDoorType%{n}",
    options: [
      "",
      "Steel, hollow",
      "Steel, hollow with storm",
      "Steel, insulated",
      "Steel, insulated with Storm",
      "Wood",
      "Wood with Storm",
      "Fiberglass",
      "Fiberglass with Storm",
      "1/2-Lite Steel, insulated",
      "1/2-Lite Steel, insulated with Storm",
      "1/2-Lite Wood",
      "1/2-Lite Wood with Storm",
      "1/2-Lite Fiberglass",
      "1/2-Lite Fiberglass with Storm",
    ],
    csv: "Doors > %{n} Type"
  },
  {
    name: "Door %{n} U Value",
    label: "U Value",
    outputTable: "v5_door",
    outputColumn: "door_u_value",
    collectionName: "door",
    hasImproved: true,
    description: "This field will be automatically calculated based on the data you entered in the input form. You may override this number with the actual door U-Value.<br><br>\n\n",
    suffix: "U Value",
    min: 0.01,
    max: 9,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseDoorU%{n}",
    omDirectSetImproved: "ImpDoorU%{n}",
    csv: "Doors > %{n} U Value"
  },
  {
    name: "Door Area",
    label: "Area",
    outputTable: "v5_door",
    outputColumn: "door_area",
    collectionName: "door",
    hasImproved: true,
    description: "This field will be automatically calculated based on the data you entered in the input form. You may override this number with the actual door sizes for the home.<br><br>\n\nFor doors with glazing area of greater than or equal to 50% of the rough frame opening, model the entire door as a window with area equal to the rough frame opening. Note that even full-light swinging doors are usually less than 50% glazing.",
    suffix: "ft²",
    min: 0,
    max: 1000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseDoorArea%{n}",
    omDirectSetImproved: "ImpDoorArea%{n}",
    csv: "Doors > %{n} Area"
  },
  {
    name: "Door Energy Star",
    label: "ENERGY STAR",
    outputTable: "v5_door",
    outputColumn: "door_energy_star",
    collectionName: "door",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "Select Yes if this door is ENERGY STAR Certified.",
    omDirectSetBase: "BaseDoorEStar%{n}",
    omDirectSetImproved: "ImpDoorEStar%{n}",
    yesNo: true,
    csv: "Doors > %{n} ENERGY STAR"
  }
].map(obj => {
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
