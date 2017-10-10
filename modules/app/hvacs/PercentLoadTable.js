import React from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {heatingSystems, coolingSystems} from 'data/formatters/hvacFormatters'
import {Clearfix} from 'react-bootstrap'
import {Col, Label} from 'ui'

@connect((state, {jobId, type, improved}) => {
  const hvacs = state.fn.hvacsByJobId(jobId)
  const systems = type === 'Heating'
    ? heatingSystems(hvacs, improved)
    : coolingSystems(hvacs, improved)
  const field = `hvac_percent_of_total_${type.toLowerCase()}_load${improved ? '_improved' : ''}`
  const totals = systems.reduce((result, s) => {
    const num = +s.get(field)
    return result + (isNaN(num) ? 0 : num)
  }, 0)
  return {
    systems,
    totals
  }
})
export default class PercentLoadTable extends React.Component {

  static propTypes = {
    type: React.PropTypes.oneOf(['Heating', 'Cooling']).isRequired,
    improved: React.PropTypes.bool.isRequired
  };

  render() {
    const {props: {improved, type, systems, totals}} = this
    const color = totals === 100 ? '#3c763d' : '#a94442'
    const headerRows = _.map(systems, (s, i) => <th key={`head${i}`}>{s.get('hvac_system_name')}</th>)
    const rows = _.map(systems, (s, i) => {
      return (
        <td key={`load${i}`}>
          <Snugg.Input bare improved={improved} field={`% of Total ${type} Load`} uuid={s.get('uuid')} />
        </td>
      )
    })
    return (
      <div className="form-group form-group-narrow">
        <label className="control-label">{improved ? 'Improved' : 'Base'} {type} Load %</label>
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
          <small>{ type === 'Cooling' ? 'Load percentages must not exceed 100%.' : 'Load percentages must add up to 100%.'}
            <span style={{color: color}}> Current Total: {totals}%</span>
          </small>
        </h4>
      </div>
    )
  }

}
