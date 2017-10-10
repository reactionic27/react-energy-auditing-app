import React from 'react'

export default class Leakage extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Radio field="Blower Door Test Performed" />
        <Snugg.Input field="Blower Door Reading" containerClass="col-sm-4"/>
      </div>
    )
  }
}
