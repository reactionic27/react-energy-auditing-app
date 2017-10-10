import React from 'react'
import {connectSelector} from 'snugg-redux'

@connectSelector({
  collection: (state, {jobId}) => state.fn.doorsByJobId(jobId)
})
export default class Doors extends React.Component {
  render() {
    return (
      <div>
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <div className="collection">
            <Snugg.Rec.Title label={`Door ${index}`} collection="door" uuid={uuid} deletable deleteMin={2} />
            <Snugg.Rec.Row uuid={uuid} field="Door Area" />
            <Snugg.Rec.Row uuid={uuid} label="ENERGY STAR" field="Door Energy Star" type="Radio"/>
            <Snugg.Rec.Row uuid={uuid} field="Door %{n} U Value" label="U Value" />
          </div>
        ))}
        <Snugg.Buttons.CollectionAdd collection="door" max={4} label="Add another door" />
      </div>
    );
  }
}
