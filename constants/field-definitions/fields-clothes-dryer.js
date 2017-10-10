import {applianceFuelEnum, applianceFuelEnumImp} from '../enum-options'

export default [
  {
    name: "Clothes Dryer Fuel Type",
    label: "Dryer Fuel Type",
    outputTable: 'v5_clothes_dryer',
    outputColumn: "clothes_dryer_fuel_type",
    collectionName: 'clothesDryer',
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of clothes dryer used in the home. If the home has more than one clothes dryer, select the one that is used most often.",
    omA1BaseKey: "A1BaseDryerFuel",
    options: applianceFuelEnum,
    improvedOptions: applianceFuelEnumImp,
    csv: "Appliances > Clothes Dryer Fuel",
    affectsModeling: true
  },
]
