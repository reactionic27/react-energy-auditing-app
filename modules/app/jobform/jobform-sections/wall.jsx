import React from 'react'
import {connect} from 'snugg-redux'
import * as Tables from '../tables'

@connect((state, {jobId}) => ({
  collection: state.fn.wallsByJobId(jobId)
}))
export default class WallContainer extends React.Component {

  render() {
    const {
      props: {jobId}
    } = this
    const collection = "wall"
    return (
      <div>
        <Tables.Walls type="Walls" jobId={jobId} />
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <div className="collection">
            <Snugg.CollectionLabel uuid={uuid} collection={collection}>Exterior Wall System {index}</Snugg.CollectionLabel>
            <Snugg.Radio uuid={uuid} field='Walls Insulated?' label='Insulated?' size={8} />
            <Snugg.Select uuid={uuid} field='Exterior Wall Siding' />
            <Snugg.Select uuid={uuid} field='Exterior Wall Construction' />
            <Snugg.Input uuid={uuid} field='Wall System % of Total' label='% of Total' />
          </div>
        ))}
        <Snugg.Buttons.CollectionAdd collection={collection} max={2} label="Add another wall" />
      </div>
    )
  }
}
