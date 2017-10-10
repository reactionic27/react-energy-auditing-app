import React, {PropTypes} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Clearfix} from 'react-bootstrap'
import {Col} from 'ui'

function int(val) {
  return isNaN(+val) ? 0 : +val
}

@connect((state, {jobId, type, improved}) => {
  const attics = state.fn.atticsByJobId(jobId)
  const vaults = state.fn.vaultsByJobId(jobId)
  let total = 0
  attics.forEach(a => {
    total += int(a.get('attic_percent'))
  })
  vaults.forEach(v => {
    total += int(v.get('vault_percent'))
  })
  return {
    attics,
    vaults,
    total
  }
})
export default class AtticVaultTotalTable extends React.Component {

  static propTypes = {
    jobId: PropTypes.number.isRequired,
    uuid: PropTypes.string
  };

  render() {
    const {
      props: {attics, vaults, total}
    } = this
    const color = total === 100 ? '#3c763d' : '#a94442'
    let headerRows = []
    let rows = []
    _.forEach(attics, (a, i) => {
      headerRows.push(
        <th key={`atticHead${i}`}>Attic {i + 1}</th>
      )
      rows.push(
        <td key={`attic${i}`}>
          <Snugg.Input bare field='Attic Percent' uuid={a.get('uuid')} />
        </td>
      )
    })
    _.forEach(vaults, (v, i) => {
      headerRows.push(
        <th key={`vaultHead${i}`}>Vault {i + 1}</th>
      )
      rows.push(
        <td key={`vault${i}`}>
          <Snugg.Input bare field='Vault Percent' uuid={v.get('uuid')} />
        </td>
      )
    })
    return (
      <div className="form-group form-group-lg form-group-narrow">
        <label className="control-label col-sm-3">Attic & Vault %</label>
        <Col sm={6}>
          <table className="table" style={{marginBottom: 0}}>
            <thead>
              <tr>
                {headerRows}
              </tr>
            </thead>
            <tbody>
              <tr>
                {rows}
              </tr>
            </tbody>
          </table>
          <Clearfix />
          <h4>
            <small>Attic & Vault percentages must add up to 100%.
              <span style={{color: color}}> Current Total: {total}%</span>
            </small>
          </h4>
        </Col>
      </div>
    )
  }

}
