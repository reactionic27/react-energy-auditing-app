import React from 'react'
import {connect} from 'snugg-redux'

@connect((state, {jobId}) => ({
  collection: state.fn.concernsByJobId(jobId)
}))
export default class ConcernCollection extends React.Component {


  render() {
    const collection = "concern"
    return (
      <div>
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <div className="collection">
            <Snugg.CollectionLabel {...this.props} collection={collection} uuid={uuid}>
              Concern {index}
            </Snugg.CollectionLabel>
            <Snugg.Input uuid={uuid} field="Summary" />
            <Snugg.Textarea uuid={uuid} field="Detail" size={12} rows={4} />
          </div>
        ))}
        <Snugg.Buttons.CollectionAdd collection={collection} className="btn-large" label="Add concern" />
      </div>
    )
  }
}
