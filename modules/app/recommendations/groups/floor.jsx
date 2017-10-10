import React from 'react'

export default class Floor extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Input field="Modeled Floor Area" />
        <Snugg.Rec.Row field="Floor Cavity Insulation" displayLabel="Floor" />
        <Snugg.Rec.Row field="Floor Cavity Insulation Type" label={floorCavityInsulationTypeLabel}/>
        <Snugg.Rec.Row field="Floor Continuous Insulation" displayLabel="Continuous" />
        <Snugg.Rec.Row field="Floor Continuous Insulation Type" label={floorContinuousInsulationTypeLabel} />
      </div>
    )
  }
}

var floorCavityInsulationTypeLabel = (
  <label>
    Cavity Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
var floorContinuousInsulationTypeLabel = (
  <label>
    Continuous Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
