import {applianceFuelEnum, applianceFuelEnumImp} from '../enum-options'

export default [
  {
    name: "Oven Fuel Type",
    outputColumn: "oven_fuel_type",
    outputTable: 'v5_oven',
    collectionName: 'oven',
    isSelect: true,
    type: "Select",
    hasImproved: true,
    affectsModeling: false,
    description: "Select the type of energy source used by the oven. If the home has more than oven, select the one that is used the most. If the range and oven are dual fuel (i.e., have both a fuel heating source and an electricity heating source) select the type that is used to cook most often.",
    options: applianceFuelEnum,
    improvedOptions: applianceFuelEnumImp,
    csv: "Appliances > Oven Fuel"
  },
].map(obj => {
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
