import React from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Clearfix} from 'react-bootstrap'
import {Col} from 'ui'

function int(val) {
  return isNaN(+val) ? 0 : +val
}

@connect((state, {jobId, type, improved}) => {
  const walls = state.fn.wallsByJobId(jobId)
  let total = 0
  walls.forEach(a => {
    total += int(a.get('wall_system_percent_of_total'))
  })
  return {
    walls,
    total
  }
})
export default class PercentWallTable extends React.Component {

  static propTypes = {
    improved: React.PropTypes.bool.isRequired
  };

  render() {
    const {
      props: {walls, total}
    } = this
    const color = total === 100 ? '#3c763d' : '#a94442'
    let headerRows = []
    let rows = []
    _.forEach(walls, (d, i) => {
      headerRows.push(
        <th key={`atticHead${i}`}>Wall System {i + 1}</th>
      )
      rows.push(
        <td key={`attic${i}`}>
          <Snugg.Input bare field='Wall System % of Total' uuid={d.get('uuid')} />
        </td>
      )
    })
    return (
      <div className="form-group form-group-lg form-group-narrow">
        <label className="control-label col-sm-3">Wall System % of Total</label>
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
            <small>Wall System percentages must add up to 100%.
              <span style={{color: color}}> Current Total: {total}%</span>
            </small>
          </h4>
        </Col>
      </div>
    )
  }

}
