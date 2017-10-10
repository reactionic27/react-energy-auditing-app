import React from 'react'

export default class Lighting extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Select field="% CFLs or LEDs" />
        <Snugg.Input field='Total # of Light Bulbs' containerClass="col-sm-3"/>
      </div>
    )
  }
}
