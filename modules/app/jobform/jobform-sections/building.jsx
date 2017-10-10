import React from 'react'

export default class Building extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Input field="Year Built" />
        <Snugg.Input field="Conditioned Area" />
        <Snugg.Radio field="Includes Basement" label="Area Includes Basement" />
        <Snugg.Input field="Average Wall Height" step='0.1'/>
        <Snugg.Input field="House Length" />
        <Snugg.Input field="House Width" />
        <Snugg.Input field="Floors Above Grade" step='0.1' />
        <Snugg.Input field="Number of Occupants" step='0.5' />
        <Snugg.Input field="Number of Bedrooms" />
        <Snugg.Select field="Type of Home" />
        <Snugg.Input field="Number of Units" label="# of Units in Building" />
        <Snugg.Select field="Front of Building Orientation" />
        <Snugg.Select field="Shielding" />
        <Snugg.Radio field="Tuck Under Garage" label={tuckUnderGarageLabel} size={4}/>
        <Snugg.Radio field="Garage Size" label={garageSizeLabel} size={4}/>
      </div>
    );
  }

}

var tuckUnderGarageLabel = (
  <div>
    Floor Above Garage or Cantilevers<br />
    <small style={{fontWeight: 'normal'}}>(see tooltip)</small>
  </div>
)

var garageSizeLabel = (
  <div>
    Garage Size<br />
    <small style={{fontWeight: 'normal'}}>(see tooltip)</small>
  </div>
)
