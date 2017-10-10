import React, {PropTypes} from 'react'
import {connect} from 'snugg-redux'
import WindowArea from './WindowArea'
import windowOrientationLabels from './windowOrientationLabels'
import {Row, Col} from 'react-bootstrap'
import Label from 'fields/Label'

@connect((state, {jobId}) => ({
  labels: windowOrientationLabels(state.fn.basedataByJobId(jobId))
}))
export default class WindowSystem extends React.Component {

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    labels: PropTypes.array.isRequired
  };

  render() {
    var {labels, uuid, jobId} = this.props
    // TODO: pass labels for table header on windows
    return (
      <Row>
        <WindowArea jobId={jobId} uuid={uuid} />
        <div className="form-group form-group-lg form-group-narrow table-control-group jobform-windows">
          <Col sm={12}>
            <Label className="control-label" style={{paddingTop: 8}}>
              Overhang Depth
            </Label>
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
                    <Snugg.Input uuid={uuid} bare size={12} field="North Overhang Depth" />
                  </td>
                  <td>
                    <Snugg.Input uuid={uuid} bare size={12} field="East Overhang Depth" />
                  </td>
                  <td>
                    <Snugg.Input uuid={uuid} bare size={12} field="South Overhang Depth" />
                  </td>
                  <td>
                    <Snugg.Input uuid={uuid} bare size={12} field="West Overhang Depth" />
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </div>
      </Row>
    )
  }
}
