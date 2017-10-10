import React from 'react'
import {connectSelector} from 'snugg-redux'

@connectSelector({
  collection: (state, {jobId}) => state.fn.refrigeratorsByJobId(jobId)
})
export default class Refrigerators extends React.Component {

  render() {
    return (
      <div style={{marginBottom: 20}}>
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <div>
            <Snugg.Rec.Title label={`Refrigerator ${index}`} collection='refrigerator' uuid={uuid} deletable />
            <Snugg.Rec.Row uuid={uuid} field="Refrigerator Usage" label="Usage" />
            <Snugg.Rec.Row uuid={uuid} label="ENERGY STAR" field="Refrigerator Energy Star" />
            <Snugg.Rec.Row uuid={uuid} field="Refrigerator Manufacturer" type="Select" label="Manufacturer" />
            <Snugg.Rec.Row uuid={uuid} field="Refrigerator Model" label="Model #" />
            <Snugg.Rec.Row uuid={uuid} field="Refrigerator Model Year" label="Model Year" />
          </div>
        ))}
      </div>
    )
  }

}
