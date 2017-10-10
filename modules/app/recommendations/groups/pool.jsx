import React from 'react'
import {connect} from 'snugg-redux'
import {hasPool} from '../../../../constants/show-if-conditions'

@connect((state, props) => ({
  hasPool: hasPool(state, props)
}))
export default class PoolRec extends React.Component {

  render() {
    if (!this.props.hasPool) return null
    return (
      <div>
        <Snugg.Input field="Pool Size" />
        <Snugg.Rec.Row field="Pool Pump Type" />
        <Snugg.Rec.Row field="Pool Pump Horsepower" />
        <Snugg.Rec.Row field="Pool Pump Days Per Year" />
        <Snugg.Rec.Row field="Pool Pump Hours" />
        <Snugg.Rec.Row field="Pool Pump Turnover"/>
        <Snugg.Rec.Row field="Pool Pump Manufacturer" />
        <Snugg.Rec.Row field="Pool Pump Model" />
      </div>
    )
  }
}
