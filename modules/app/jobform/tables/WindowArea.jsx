import React, { Component } from 'react'
import WindowErrors from './WindowErrors'
import {connect} from 'snugg-redux'
import {Col} from 'react-bootstrap'
import windowOrientationLabels from './windowOrientationLabels'
import {dispatchSave} from 'data/actions'

@connect((state, {jobId, uuid}) => ({
  labels: windowOrientationLabels(state.fn.basedataByJobId(jobId)),
  win: state.fn.windowByUuid(uuid)
}), {dispatchSave})
export default class WindowArea extends Component {
  componentWillReceiveProps(nextProps) {
    if (!(this.props.win.get('window_north_area_percent') === null &&
        this.props.win.get('window_south_area_percent') === null &&
        this.props.win.get('window_east_area_percent') === null &&
        this.props.win.get('window_west_area_percent') === null
    )) {
      return
    }
    const sides = ['north', 'south', 'east', 'west']
    let windowAreas = {
      uuid: this.props.uuid,
      job_id: this.props.jobId
    }
    sides.forEach((side) => {
      const fieldName = `window_${side}_area_percent`
      if (nextProps.win.get(fieldName) !== this.props.win.get(fieldName)) {
        sides.forEach((side) => {
          const winFieldName = `window_${side}_area_percent`
          if ((winFieldName === fieldName) || nextProps.win.get(winFieldName)) {
            return
          }
          windowAreas[winFieldName] = 0
        })
      }
    })
    this.props.dispatchSave('window', windowAreas)
  }
  render() {
    const { uuid, labels, jobId} = this.props
    return (
      <div className="form-group form-group-lg form-group-narrow table-control-group jobform-windows">
        <label className="control-label col-sm-12 " style={{paddingTop: 8}}>
          <span>Window Area</span>
        </label>
        <Col sm={12}>
          <table className="table">
            <thead>
              <tr>
                <th>{labels[0]}</th>
                <th>{labels[1]}</th>
                <th>{labels[2]}</th>
                <th>{labels[3]}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Snugg.Input uuid={uuid} bare size={12} field="Window: North Area Percent" />
                </td>
                <td>
                  <Snugg.Input uuid={uuid} bare size={12} field="Window: East Area Percent" />
                </td>
                <td>
                  <Snugg.Input uuid={uuid} bare size={12} field="Window: South Area Percent" />
                </td>
                <td>
                  <Snugg.Input uuid={uuid} bare size={12} field="Window: West Area Percent" />
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <small>Enter the % of window area for each wall orientation. Example: If a quarter of the southern walls are windows, enter 25%. Unlike foundations, these fields don't need to add up to 100%.</small>
                  <WindowErrors uuid={uuid} jobId={jobId} />
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
      </div>
    );
  }
}
