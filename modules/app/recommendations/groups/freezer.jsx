import React from 'react'
import {connectSelector} from 'snugg-redux'

@connectSelector({
  collection: (state, {jobId}) => state.fn.freezersByJobId(jobId)
})
export default class Freezers extends React.Component {
  render() {
    return (
      <div style={{marginBottom: 20}}>
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <div>
            <Snugg.Rec.Title label={`Freezer ${index}`} collection="freezer" uuid={uuid} deletable deleteMin={0} />
            <Snugg.Rec.Row uuid={uuid} field="Freezer Usage" label="Usage" />
            <Snugg.Rec.Row uuid={uuid} label="ENERGY STAR" field="Freezer Energy Star" />
            <Snugg.Rec.Row uuid={uuid} field="Freezer Manufacturer" label="Manufacturer" />
            <Snugg.Rec.Row uuid={uuid} field="Freezer Model" label="Model #" />
            <Snugg.Rec.Row uuid={uuid} field="Freezer Model Year" label="Model Year" />
          </div>
        ))}
        <Snugg.Buttons.CollectionAdd collection="freezer" max={3} label="Add a freezer" />
      </div>
    );
  }
}
