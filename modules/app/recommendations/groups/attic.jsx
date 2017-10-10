import React from 'react'

// It would be nice to allow for the small label, but this doesn't seem to work on the recommendations screen
// var AtticRoofAbsorptanceLabel = (
//   <label>
//     Attic Roof Absorptance<br />
//     <small style={{fontWeight: 'normal'}}>(optional)</small>
//   </label>
// )
//
// var AtticRoofEmissivityLabel = (
//   <label>
//     Attic Roof Emissivity<br />
//     <small style={{fontWeight: 'normal'}}>(optional)</small>
//   </label>
// )

import {connectSelector} from 'snugg-redux'

@connectSelector({
  collection: (state, {jobId}) => state.fn.atticsByJobId(jobId)
})
export default class Attic extends React.Component {

  render() {
    return (
      <div>
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <div>
            <Snugg.Rec.Title collection="attic" uuid={uuid} label={`Attic ${index}`} deletable />
            <Snugg.Rec.Row uuid={uuid} field="Modeled Attic Area"/>
            <Snugg.Rec.Row uuid={uuid} field="Insulation Type" />
            <Snugg.Rec.Row uuid={uuid} field="Attic Insulation" />
            <Snugg.Rec.Row uuid={uuid} field="Radiant Barrier?"/>
            <Snugg.Rec.Row uuid={uuid} field="Has Knee Wall?" />
            <Snugg.Rec.Row uuid={uuid} field="Knee Wall Area" />
            <Snugg.Rec.Row uuid={uuid} field="Knee Wall Insulation" />
            <Snugg.Rec.Row uuid={uuid} field="Knee Wall Insulation Type" label={kneeWallInsulationTypeLabel}/>
            <Snugg.Rec.Row uuid={uuid} field="Knee Wall Continuous Insulation" />
            <Snugg.Rec.Row uuid={uuid} field="Knee Wall Continuous Insulation Type" label={kneeWallContinuousInsulationTypeLabel}/>
            <Snugg.Rec.Row uuid={uuid} field="Attic Cool Roof?" label="Cool Roof?" />
            <Snugg.Rec.Row uuid={uuid} field="Attic Roof Absorptance" label="Roof Absorptance" />
            <Snugg.Rec.Row uuid={uuid} field="Attic Roof Emissivity" label="Roof Emissivity" />
          </div>
        ))}
        <Snugg.Buttons.CollectionAdd collection="attic" max={2} label="Add attic" />
      </div>
    )
  }
}
var kneeWallInsulationTypeLabel = (
  <label>
    Knee Wall Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
var kneeWallContinuousInsulationTypeLabel = (
  <label>
    Knee Wall Continuous Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
