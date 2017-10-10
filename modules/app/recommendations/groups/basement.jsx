import React from 'react'

export default class Basement extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Rec.Row field="Basement Cavity Insulation" displayLabel="Cavity Insulation"/>
        <Snugg.Rec.Row field="Basement Cavity Insulation Type" label={basementCavityInsulationTypeLabel}/>
        <Snugg.Rec.Row field="Basement Continuous Insulation" displayLabel="Continuous Insulation"/>
        <Snugg.Rec.Row field="Basement Continuous Insulation Type" label={basementContinuousInsulationTypeLabel}/>
        <Snugg.Input field="Modeled Basement Floor Area" />
        <Snugg.Input field="Modeled Basement Perimeter" />
        <Snugg.Input field="Modeled Basement Wall Area" disabled/>
        <Snugg.Input field="Basement Rim Joist Length" />
        <Snugg.Rec.Row field="Basement Rim Joist Treatment" />
        <Snugg.Rec.Row field="Basement Rim Joist Insulation"/>
        <Snugg.Rec.Row field="Basement Rim Joist Insulation Type" label={basementRimInsulationTypeLabel}/>
      </div>
    )
  }
}
var basementCavityInsulationTypeLabel = (
  <label>
    Cavity Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
var basementContinuousInsulationTypeLabel = (
  <label>
    Continuous Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
var basementRimInsulationTypeLabel = (
  <label>
    Rim Joist Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
