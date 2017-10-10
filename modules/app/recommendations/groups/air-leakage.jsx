import React from 'react'

export default class AirLeakage extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Rec.Row field="Blower Door Test Performed"/>
        <Snugg.Rec.Row field="Blower Door Reading"/>
        <Snugg.Input field="Conditioned Air Volume"/>
        <Snugg.Select field="Wind Zone" size={1} />
        <Snugg.Select field="Shielding" size={3}/>
        <Snugg.Input field="N-Factor" disabled />
        <Snugg.Rec.Row field="Equivalent NACH" disabled />
        <Snugg.Rec.Row field="Equivalent ACH50" disabled />
        <Snugg.Rec.Row field="Effective Leakage Area" disabled/>
        <Snugg.Radio field="ASHRAE 62.2" />
        <Snugg.Rec.Row field="ASHRAE Required Additional CFM" disabled/>
        <Snugg.Rec.Row field="ASHRAE Minimum CFM50" improvedOnly disabled label="ASHRAE 62.2 Minimum CFM50" />
        <Snugg.Rec.Row field="ASHRAE Kitchen Fan CFM" size={1} />
        <Snugg.Rec.Row field="ASHRAE Kitchen Window" />
        <Snugg.Radio field="ASHRAE Number of Bathrooms" />
        <Snugg.Rec.Row field="ASHRAE Bathroom Fan 1 CFM" size={1} />
        <Snugg.Rec.Row field="ASHRAE Bathroom 1 Window" />
        <Snugg.Rec.Row field="ASHRAE Bathroom Fan 2 CFM" />
        <Snugg.Rec.Row field="ASHRAE Bathroom 2 Window" />
        <Snugg.Rec.Row field="ASHRAE Bathroom Fan 3 CFM" />
        <Snugg.Rec.Row field="ASHRAE Bathroom 3 Window" />
        <Snugg.Rec.Row field="ASHRAE Bathroom Fan 4 CFM" />
        <Snugg.Rec.Row field="ASHRAE Bathroom 4 Window" />
      </div>
    )
  }

}
