import React from 'react'
import {connect} from 'snugg-redux'
import AtticsVaultTable from '../tables/attic-vault'

@connect((state, {jobId}) => ({
  attics: state.fn.atticsByJobId(jobId),
  vaults: state.fn.vaultsByJobId(jobId)
}))
export default class AtticsVaults extends React.Component {

  render() {
    const collection1 = "attic"
    const collection2 = "vault"
    return (
      <div>
        <Snugg.Input field="% of Ceilings Shared" label={multiFamilyLabel} containerClass="col-sm-3"/>
        <div style={{paddingBottom: 20}}>
          {Snugg.mapCollection(this.props.attics, (uuid, index) => (
            <div className="collection">
              <Snugg.CollectionLabel {...this.props} collection={collection1} uuid={uuid} deleteMin={0}>
                Attic {index}
              </Snugg.CollectionLabel>
              <Snugg.Select uuid={uuid} field='Insulation Depth' containerClass="col-sm-9" />
              <Snugg.Select uuid={uuid} field='Insulation Type' />
            </div>
          ))}
          <Snugg.Buttons.CollectionAdd collection={collection1} max={2} label="Add attic" />
        </div>
        <div style={{paddingBottom: 20}}>
          {Snugg.mapCollection(this.props.vaults, (uuid, index) => (
            <div className="collection">
              <Snugg.CollectionLabel {...this.props} collection={collection2} uuid={uuid} deleteMin={0}>
                Vault or Flat Roof {index}
              </Snugg.CollectionLabel>
              <Snugg.Radio uuid={uuid} field="Vault %{n}" label="Insulated?" />
            </div>
          ))}
          <Snugg.Buttons.CollectionAdd collection={collection2} max={2} label="Add vaulted ceiling" />
        </div>
        <AtticsVaultTable jobId={this.props.jobId} />
      </div>
    )
  }

}

var multiFamilyLabel = (
  <span>% of Ceilings Shared<br />
    <span className="label">Multi-Family</span>
  </span>
)
