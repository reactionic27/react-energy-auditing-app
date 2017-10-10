import {applianceFuelEnum, applianceFuelEnumImp} from '../enum-options'

export default [
  {
    name: "Range Fuel Type",
    outputTable: 'v5_range',
    outputColumn: "range_fuel_type",
    collectionName: 'range',
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of energy source used by the range and oven in the home. If the home has more than one range and oven, select the one that is used the most. If the range and oven are dual fuel (i.e., have both a fuel heating source and an electricity heating source) select the type that is used to cook most often.",
    omA1BaseKey: "A1BaseRangeFuel",
    options: applianceFuelEnum,
    improvedOptions: applianceFuelEnumImp,
    csv: "Appliances > Range Fuel"
  },
].map(obj => {
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
