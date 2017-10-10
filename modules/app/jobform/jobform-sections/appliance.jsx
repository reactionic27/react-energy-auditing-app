import React from 'react'
import {connect} from 'snugg-redux'

@connect((state, {jobId}) => ({
  freezers: state.fn.freezersByJobId(jobId),
  clothesDryers: state.fn.clothesDryersByJobId(jobId),
  ranges: state.fn.rangesByJobId(jobId),
  ovens: state.fn.ovensByJobId(jobId),
}))
export default class Appliance extends React.Component {

  render() {
    const {
      props: {freezers, clothesDryers, ranges, ovens}
    } = this
    const collectionName = "freezer"
    return (
      <div>
        {Snugg.mapCollection(ranges, (uuid, i) => (
          <Snugg.Select field="Range Fuel Type" uuid={uuid} />
        ))}
        {Snugg.mapCollection(ovens, (uuid, i) => (
          <Snugg.Select field="Oven Fuel Type" uuid={uuid} />
        ))}
        {Snugg.mapCollection(clothesDryers, (uuid, i) => (
          <Snugg.Select field="Clothes Dryer Fuel Type" uuid={uuid} />
        ))}
        <Snugg.Radio field="Clothes Washer Type" label="Clothes Washer Type" />
        <Snugg.Radio field="Clothes Washer Energy Star" label="ENERGY STAR Clothes Washer?" />
        <Snugg.Radio field="Dishwasher Installed?"  />
        <Snugg.Radio field="Dishwasher Energy Star" label="ENERGY STAR Dishwasher?" />
        <div className="jobform-freezer">
          {Snugg.mapCollection(freezers, (uuid, index) => (
            <fieldset className="collection">
              <Snugg.CollectionLabel uuid={uuid} collection={collectionName} deleteMin={0}>
                <Snugg.Input
                  uuid={uuid}
                  editableTitle
                  collection={collectionName}
                  bare
                  label=' '
                  field="Freezer Name"
                  placeholder="Name this freezer"
                  size={0} />
              </Snugg.CollectionLabel>
              <Snugg.Radio className="form-control" label="ENERGY STAR" field="Freezer Energy Star" uuid={uuid} />
            </fieldset>
          ))}
          <Snugg.Buttons.CollectionAdd
            collection={collectionName}
            max={3}
            label="Add a freezer" />
        </div>
      </div>
    );
  }

}
