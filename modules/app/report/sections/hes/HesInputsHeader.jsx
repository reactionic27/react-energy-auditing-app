import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'

export default class HesInputsHeader extends Component {
  render() {

    return (
      <div>
        <Row style={{marginBottom: 20, fontSize: '0.9em'}}>
          <Col xs={3}>
            <div style={errorLegend}></div> Required inputs
          </Col>
          <Col xs={3}>
            <div style={warningLegend}></div> Inferred values (please check)
          </Col>
        </Row>

        <Row>
          <Col xs={4}>
            <div style={headerStyle} />
          </Col>
          <Col xs={4}>
            <div style={valueHeaderStyle}>Base</div>
          </Col>
          <Col xs={4}>
            <div style={valueHeaderStyle}>Improved</div>
          </Col>
        </Row>
      </div>
    )
  }
}

const baseLegend = {
  width: 15,
  height: 15,
  marginRight: 8,
  borderRadius: '1em',
  float: 'left',
  boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
}

const warningLegend = {
  ...baseLegend,
  backgroundColor: '#F7EFCE'
}

const errorLegend = {
  ...baseLegend,
  backgroundColor: '#F9E8E8'
}

const baseStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingRight: 10
}

const headerStyle = {
  ...baseStyle,
  fontWeight: 700,
  padding: '0 0 5px',
  textTransform: 'uppercase',
  letterSpacing: '0.04em'
}

const valueHeaderStyle = {
  ...baseStyle,
  ...headerStyle,
  textAlign: 'right'
}
