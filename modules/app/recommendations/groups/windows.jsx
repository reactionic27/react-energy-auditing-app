import React from 'react'
import {connect} from 'snugg-redux'
import windowOrientationLabels from '../../jobform/tables/windowOrientationLabels'


@connect((state, {jobId}) => ({
  collection: state.fn.windowsByJobId(jobId),
  labels: windowOrientationLabels(state.fn.basedataByJobId(jobId))
}))
export default class Windows extends React.Component {

  render() {
    const { labels } = this.props
    return (
      <div style={{marginBottom: 20}}>
        <Snugg.Rec.Row field="Window Venting Used" />
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <div className="collection">
            <Snugg.Rec.Title collection="window" label={`Window System ${index}`} uuid={uuid} deletable />
            <Snugg.Rec.Row uuid={uuid} field="Window Improvements" improvedOnly/>
            <Snugg.Rec.Row uuid={uuid} field="Efficiency" />
            <Snugg.Rec.Row uuid={uuid} field="Solar Heat Gain Coefficient" />
            <Snugg.Rec.Row uuid={uuid} label="ENERGY STAR" field="Window Energy Star" />
            <Snugg.Rec.Row uuid={uuid} field="Window Area: North" label={`Window Area: ${labels[0]}`} />
            <Snugg.Rec.Row uuid={uuid} field="Window Area: East" label={`Window Area: ${labels[1]}`} />
            <Snugg.Rec.Row uuid={uuid} field="Window Area: South" label={`Window Area: ${labels[2]}`} />
            <Snugg.Rec.Row uuid={uuid} field="Window Area: West" label={`Window Area: ${labels[3]}`} />
            <Snugg.Rec.Row uuid={uuid} field="Exterior Treatment: North" label={`Exterior Treatment: ${labels[0]}`} />
            <Snugg.Rec.Row uuid={uuid} field="Exterior Treatment: East" label={`Exterior Treatment: ${labels[1]}`} />
            <Snugg.Rec.Row uuid={uuid} field="Exterior Treatment: South" label={`Exterior Treatment: ${labels[2]}`} />
            <Snugg.Rec.Row uuid={uuid} field="Exterior Treatment: West" label={`Exterior Treatment: ${labels[3]}`} />
          </div>
        ))}
        <Snugg.Buttons.CollectionAdd collection="window" max={2} label="Add another set of windows" />
      </div>
    );
  }

}
