import React from 'react'
import {connect} from 'snugg-redux'

@connect((state, {jobId}) => ({
  collection: state.fn.refrigeratorsByJobId(jobId)
}))
export default class RefrigeratorCollection extends React.Component {

  render() {
    const collectionName = 'refrigerator'
    return (
      <div className="jobform-refrigerator">
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <fieldset className="job-row collection">
            <Snugg.CollectionLabel collection={collectionName} uuid={uuid}>
              <Snugg.Input
                uuid={uuid}
                editableTitle
                collection={collectionName}
                bare
                label=" "
                field="Refrigerator Name"
                placeholder="Name this fridge"
                size={0} />
            </Snugg.CollectionLabel>
            <Snugg.Select
              uuid={uuid}
              className="form-control"
              label="Age (in years)"
              field="Refrigerator Age" />
            <Snugg.Select
              uuid={uuid}
              className="form-control"
              label="Size (in cubic ft)"
              field="Refrigerator Size" />
            <Snugg.Radio
              uuid={uuid}
              className="form-control"
              label="ENERGY STAR"
              field="Refrigerator Energy Star" />
          </fieldset>
        ))}
        <Snugg.Buttons.CollectionAdd
          collection={collectionName}
          name="refrigerator"
          max={3}
          label="Add another fridge" />
      </div>
    )
  }
}
