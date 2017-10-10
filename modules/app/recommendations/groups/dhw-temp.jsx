import React from 'react'
import {connectSelector} from 'snugg-redux'

@connectSelector({
  collection: (state, {jobId}) => state.fn.dhwsByJobId(jobId)
})
export default class DhwTemp extends React.Component {
  render() {
    return (
      <div>
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <div className="collection">
            <Snugg.Rec.Title label={`DWH ${index}`} uuid={uuid} collection="dhw" deletable />
            <Snugg.Rec.Row field="DHW Temp" uuid={uuid} />
          </div>
        ))}
      </div>
    );
  }
}
