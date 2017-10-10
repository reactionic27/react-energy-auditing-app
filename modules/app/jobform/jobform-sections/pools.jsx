import React from 'react'

export default class Pools extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Radio field="Pool" label="Swimming Pool"  />
        <Snugg.Select field="Pool Pump Type" />
        <Snugg.Select field="Pool Pump Horsepower" />
        <Snugg.Input field="Pool Pump Turnover" containerClass="col-sm-3"/>
        <Snugg.Radio field="Hot Tub" label="Existing Hot Tub"  />
      </div>
    )
  }
}
