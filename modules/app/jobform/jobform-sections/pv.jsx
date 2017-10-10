import React from 'react'
import {connect} from 'snugg-redux'

@connect((state, {jobId}) => ({
  pvs: state.fn.pvsByJobId(jobId),
}))
export default class PV extends React.Component {

  render() {
    const {
      props: {pvs}
    } = this
    return (
      <div>
        {Snugg.mapCollection(pvs, (uuid, i) => (
          <div>
            <Snugg.Radio field="PV" label="Has PV?" uuid={uuid} />
            <Snugg.Input field="PV Array Size" uuid={uuid} />
            <Snugg.Input field="PV Array Slope" uuid={uuid} />
            <Snugg.Input field="PV Array Orientation" uuid={uuid} />
            <Snugg.Input field="PV Module Year" uuid={uuid} />
          </div>
        ))}
      </div>
    )
  }
}
