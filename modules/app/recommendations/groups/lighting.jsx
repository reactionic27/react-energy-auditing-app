import React from 'react'

class LightingRec extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Rec.Row field="# of CFLs or LEDs" />
        <Snugg.Rec.Row field="# of LEDs" />
        <Snugg.Rec.Row field="# of Incandescents" />
        <Snugg.Rec.Row field="Total # of Light Bulbs" disabled type="PositiveInteger"/>
      </div>
    )
  }
}

export default  LightingRec;
