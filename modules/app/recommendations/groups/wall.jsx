import React from 'react'
import {connectSelector} from 'snugg-redux'

@connectSelector({
  collection: (state, {jobId}) => state.fn.wallsByJobId(jobId)
})
export default class Wall extends React.Component {

  render() {
    return (
      <div style={{marginBottom: 20}}>
        {Snugg.mapCollection(this.props.collection, (uuid: string, index: number) => (
          <div className="collection">
            <Snugg.Rec.Title label={`Wall ${index}`} collection="wall" uuid={uuid} deletable />
            <Snugg.Rec.Row field="Modeled Wall Area" uuid={uuid} labelSuffix="<sub>(including shared walls)</sub>" />
            <Snugg.Rec.Row field="Wall Cavity Insulation" uuid={uuid} />
            <Snugg.Rec.Row field="Wall Cavity Insulation Type" uuid={uuid} label={wallCavityInsulationTypeLabel}/>
            <Snugg.Rec.Row field="Wall Continuous Insulation" uuid={uuid} />
            <Snugg.Rec.Row field="Wall Continuous Insulation Type" uuid={uuid} label={wallContinuousInsulationTypeLabel}/>
          </div>
        ))}
        <Snugg.Buttons.CollectionAdd collection='wall' max={2} label="Add another wall" />
      </div>
    )
  }

}

var wallCavityInsulationTypeLabel = (
  <label>
    Cavity Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
var wallContinuousInsulationTypeLabel = (
  <label>
    Continuous Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
