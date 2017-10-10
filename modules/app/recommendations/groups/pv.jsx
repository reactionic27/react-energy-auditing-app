import React from 'react'
import {connectSelector} from 'snugg-redux'

@connectSelector({
  collection: (state, {jobId}) => state.fn.pvsByJobId(jobId)
})
export default class PV extends React.Component {
  render() {
    return (
      <div>
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <div className="collection">
            <Snugg.Rec.Row uuid={uuid} field="PV" lable="Has PV?"/>
            <Snugg.Rec.Row uuid={uuid} field="PV Array Size"/>
            <Snugg.Rec.Row uuid={uuid} field="PV Array Slope"/>
            <Snugg.Rec.Row uuid={uuid} field="PV Array Orientation"/>
            <Snugg.Input uuid={uuid} field="PV Module Year" />
            <Snugg.Rec.Row uuid={uuid} field="PV Annual Production" disabled/>
          </div>
        ))}
      </div>
    );
  }
}
