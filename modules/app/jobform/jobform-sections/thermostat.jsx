import React from 'react'

export default class Thermostat extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Radio field="Programmable Thermostat Installed" />
        <Snugg.Input field="Heating Setpoint High" validate="setpoints" label={HeatingSetpointHighLabel} />
        <Snugg.Input field="Heating Setpoint Low" validate="setpoints" label={HeatingSetpointLowLabel} />
        <Snugg.Input field="Cooling Setpoint Low" validate="setpoints" label={CoolingSetpointLowLabel} />
        <Snugg.Input field="Cooling Setpoint High" validate="setpoints" label={CoolingSetpointHighLabel} />
      </div>
    )
  }
}

var HeatingSetpointHighLabel = (
  <div>
    Heating Setpoint: High<br />
    <small style={{fontWeight: 'normal'}}>(at home)</small>
  </div>
)

var HeatingSetpointLowLabel = (
  <div>
    Heating Setpoint: Low<br />
    <small style={{fontWeight: 'normal'}}>(not at home/sleeping)</small>
  </div>
)

var CoolingSetpointLowLabel = (
  <div>
    Cooling Setpoint: Low<br />
    <small style={{fontWeight: 'normal'}}>(at home)</small>
  </div>
)

var CoolingSetpointHighLabel = (
  <div>
    Cooling Setpoint: High<br />
    <small style={{fontWeight: 'normal'}}>(not at home)</small>
  </div>
)
