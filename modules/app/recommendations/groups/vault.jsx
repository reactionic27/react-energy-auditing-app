import React from 'react'
import {connectSelector} from 'snugg-redux'

@connectSelector({
  collection: (state, {jobId}) => state.fn.vaultsByJobId(jobId)
})
export default class Vault extends React.Component {

  render() {
    return (
      <div style={{marginBottom: 20}}>
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <div className="collection">
            <Snugg.Rec.Title label={`Vault or Flat Roof ${index}`} uuid={uuid} collection="vault" deletable />
            <Snugg.Rec.Row uuid={uuid} field="Modeled Vault Area" />
            <Snugg.Rec.Row uuid={uuid} field="Vault Cavity Insulation" />
            <Snugg.Rec.Row uuid={uuid} field="Vault Cavity Insulation Type" label={vaultCavityInsulationTypeLabel}/>
            <Snugg.Rec.Row uuid={uuid} field="Vault Continuous Insulation" />
            <Snugg.Rec.Row uuid={uuid} field="Vault Continuous Insulation Type" label={vaultContinuousInsulationTypeLabel}/>
            <Snugg.Rec.Row uuid={uuid} field="Vault Cool Roof?" label="Cool Roof?" />
            <Snugg.Rec.Row uuid={uuid} field="Vault Roof Absorptance" label="Roof Absorptance" />
            <Snugg.Rec.Row uuid={uuid} field="Vault Roof Emissivity" label="Roof Emissivity" />
          </div>
        ))}
        <Snugg.Buttons.CollectionAdd collection="vault" max={2} label="Add vault" />
      </div>
    )
  }

}
var vaultCavityInsulationTypeLabel = (
  <label>
    Cavity Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
var vaultContinuousInsulationTypeLabel = (
  <label>
    Continuous Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
