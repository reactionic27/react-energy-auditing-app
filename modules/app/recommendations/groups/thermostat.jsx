import React from 'react'

class ThermostatRec extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Rec.Row validate="setpoints" field='Heating Setpoint High' />
        <Snugg.Rec.Row validate="setpoints" field='Heating Setpoint Low' />
        <Snugg.Rec.Row validate="setpoints" field='Cooling Setpoint High' />
        <Snugg.Rec.Row validate="setpoints" field='Cooling Setpoint Low' />
      </div>
    )
  }
}

export default  ThermostatRec;
