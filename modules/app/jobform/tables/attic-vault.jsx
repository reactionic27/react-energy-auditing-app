import React from 'react'
import {connectSelector} from 'snugg-redux'

@connectSelector({
  vaults: (state, {jobId}) => state.fn.vaultsByJobId(jobId),
  attics: (state, {jobId}) => state.fn.atticsByJobId(jobId),
})
export default class AtticsVaultTable extends React.Component {

  render() {
    let {
      props: {vaults, attics}
    } = this
    if ((vaults.length + attics.length) <= 1) {
      return null
    }
    return (
      <div className="form-group form-group-narrow">
        <label className="control-label col-sm-12">Attic/Vault %</label>
        <div className="col-sm-12">
          <div className="input-group">
            <table className="table">
              <thead>
                <tr>
                  {attics.map((attic) =>
                    <th key={attic.get('uuid')}>Attic {attics.indexOf(attic) + 1}</th>
                  )}
                  {vaults.map((vault) =>
                    <th key={vault.get('uuid')}>Vault {vaults.indexOf(vault) + 1}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Snugg.mapCollection(attics, (uuid) => (
                    <th>
                      <Snugg.Input uuid={uuid} bare field="Attic Percent" />
                    </th>
                  ))}
                  {Snugg.mapCollection(vaults, (uuid) => (
                    <th>
                      <Snugg.Input uuid={uuid} bare field="Vault Percent" />
                    </th>
                  ))}
                </tr>
                {/* <ErrorRow colspan="4" /> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

};
