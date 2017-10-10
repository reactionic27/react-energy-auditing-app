import React from 'react'

export default class ClothesWasherRec extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Rec.Row field="Clothes Washer Type" label="Type" />
        <Snugg.Rec.Row field="Clothes Washer MEF" label="Integrated Modified Energy Factor" />
        <Snugg.Rec.Row field="Clothes Washer Energy Usage" improvedOnly label="Energy Usage" />
        <Snugg.Rec.Row field="Clothes Washer Water Usage" improvedOnly label="Water Usage" />
        <Snugg.Rec.Row field="Clothes Washer Energy Star" label="ENERGY STAR" />
        <Snugg.Rec.Row field="Clothes Washer Manufacturer" label="Manufacturer" />
        <Snugg.Rec.Row field="Clothes Washer Model"  label="Model" />
        <Snugg.Rec.Row field="Clothes Washer Model Year"  label="Model Year" />
      </div>
    )
  }

}
