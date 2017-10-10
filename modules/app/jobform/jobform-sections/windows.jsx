import React from 'react'
import {connect} from 'snugg-redux'
import * as Tables from '../tables'

@connect((state, {jobId}) => ({
  collection: state.fn.windowsByJobId(jobId)
}))
export default class Windows extends React.Component {

  render() {
    const {
      props: {jobId}
    } = this
    const collection = "window"
    return (
      <div>
        <Snugg.Input field="Skylight Area" containerClass="col-sm-4"/>
        <Snugg.Radio field="Window Venting Used" />
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <div className="collection">
            <Snugg.CollectionLabel uuid={uuid} collection={collection}>
              Window System {index}
            </Snugg.CollectionLabel>
            <Snugg.Select uuid={uuid} field="Window Type" containerClass="col-sm-9" />
            <Snugg.Select uuid={uuid} field="Window Frame" />
            <Tables.WindowSystem jobId={jobId} uuid={uuid} />
          </div>
        ))}
        <Snugg.Buttons.CollectionAdd collection={collection} max={2} label="Add a window system" />
      </div>
    )
  }

}
