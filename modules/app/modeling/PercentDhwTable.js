import React from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Clearfix} from 'react-bootstrap'
import {Col} from 'ui'

function int(val) {
  return isNaN(+val) ? 0 : +val
}

@connect((state, {jobId, type}) => {
  const dhws = state.fn.dhwsByJobId(jobId)
  let total = 0
  dhws.forEach(a => {
    total += int(a.get('dhw_percent_load'))
  })
  return {
    dhws,
    total
  }
})
export default class PercentDhwTable extends React.Component {

  render() {
    const {
      props: {dhws, total}
    } = this
    const color = total === 100 ? '#3c763d' : '#a94442'
    let headerRows = []
    let rows = []
    _.forEach(dhws, (d, i) => {
      headerRows.push(
        <th key={`atticHead${i}`}>Water Heater {i + 1}</th>
      )
      rows.push(
        <td key={`attic${i}`}>
          <Snugg.Input bare field='DHW % Load' uuid={d.get('uuid')} />
        </td>
      )
    })
    return (
      <div className="form-group form-group-lg form-group-narrow">
        <label className="control-label col-sm-3">Water Heater % Load</label>
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
            <small>DHW load percentages must add up to 100%.
              <span style={{color: color}}> Current Total: {total}%</span>
            </small>
          </h4>
        </Col>
      </div>
    )
  }

}
