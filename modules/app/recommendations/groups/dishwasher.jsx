import React from 'react'

export default class DishwasherRec extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Rec.Row type="Radio" field="Dishwasher Installed?" />
        <Snugg.Rec.Row field="Dishwasher Energy Star" />
        <Snugg.Rec.Row field="Dishwasher Energy Factor" label="Energy Factor" />
        <Snugg.Rec.Row field="Dishwasher Energy Usage" improvedOnly label="Energy Usage" />
        <Snugg.Rec.Row field="Dishwasher Water Usage" improvedOnly label="Water Usage" />
        <Snugg.Rec.Row field="Dishwasher Manufacturer" />
        <Snugg.Rec.Row field="Dishwasher Model" />
        <Snugg.Rec.Row field="Dishwasher Model Year"/>
      </div>
    )
  }

}
