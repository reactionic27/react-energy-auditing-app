import React from 'react'
import {connect} from 'snugg-redux'

@connect((state, {jobId}) => ({
  collection: state.fn.dhwsByJobId(jobId)
}))
export default class Dhws extends React.Component {

  render() {
    const collection = "dhw"
    return (
      <div name="dhw">
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <div className="collection">
            <Snugg.CollectionLabel uuid={uuid} collection={collection}>
              Water heater {index}
            </Snugg.CollectionLabel>
            <Snugg.Percentage uuid={uuid} field='DHW % Load' size={3} />
            <Snugg.Select uuid={uuid} field='DHW Fuel' size={3}/>
            <Snugg.Select uuid={uuid} field='DHW Type' />
            <Snugg.Select uuid={uuid} field='DHW Age' />
            <Snugg.Select uuid={uuid} field='DHW Location' />
            <Snugg.Select uuid={uuid} field='DHW Temperature Settings' />
          </div>
        ))}
        <Snugg.Buttons.CollectionAdd collection={collection} max={2} label="Add a water heater" />
      </div>
    )
  }

}
