import React from 'react'
import Label from '../../../fields/Label'
import {connectSelector} from 'snugg-redux'
import {isMultiFamily} from '../../../../constants/show-if-conditions'
import {Row, Col} from 'react-bootstrap'

@connectSelector({
  isMultiFamily
})
export default class Walls extends React.Component {

  render() {
    if (!this.props.isMultiFamily) return null
    return (
      <Row>
        <div className="form-group form-group-narrow form-group-lg">
          <label className="control-label col-xs-12"> Shared Walls<br />
            <span className="label">Multi-Family</span>
          </label>
          <Col sm={12}>
            <table className="table">
              <thead>
                <tr>
                  <th>North</th>
                  <th>East</th>
                  <th>South</th>
                  <th>West</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="js-popover-target">
                    <Snugg.Input bare field="Shared Walls North" />
                  </td>
                  <td>
                    <Snugg.Input bare field="Shared Walls East" />
                  </td>
                  <td>
                    <Snugg.Input bare field="Shared Walls South" />
                  </td>
                  <td>
                    <Snugg.Input bare field="Shared Walls West" />
                  </td>
                </tr>
                {/* <ErrorRow colspan="4" /> */}
              </tbody>
            </table>
          </Col>
        </div>
      </Row>
    )
  }

}
