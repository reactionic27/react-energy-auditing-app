import React from 'react'
import {connectSelector} from 'snugg-redux'

@connectSelector({
  collection: (state, {jobId}) => state.fn.doorsByJobId(jobId)
})
export default class DoorCollection extends React.Component {

  render() {
    return (
      <div>
        {Snugg.mapCollection(this.props.collection, (uuid, i) => (
          <Snugg.Select uuid={uuid} field='Door %{n} Type' label={`Door ${i} Type`} containerClass="col-sm-9 deletable">
            <Snugg.Buttons.CollectionDelete uuid={uuid} min={2} collection="door" />
          </Snugg.Select>
        ))}
        <Snugg.Buttons.CollectionAdd collection="door" max={4} label="Add another door" />
      </div>
    )
  }
}
