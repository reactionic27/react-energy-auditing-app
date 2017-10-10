import React from 'react'
import {ANIMATION} from 'app/lib/global-styles'
import {Col} from 'react-bootstrap'
import Radium from 'radium'

@Radium
export default class ContextPane extends React.Component {

  render() {
    return (
      <Col sm={3} xsHidden style={contextPaneStyle}>
        <div style={xsStyle}>
          {this.props.children}
        </div>
      </Col>
    )
  }
}

const contextPaneStyle = {
  position: 'fixed',
  zIndex: 1060,
  top: 26,
  right: 0,
  bottom: 0,
  overflowY: 'scroll',
  transition: ANIMATION,
  marginTop: -1,
  paddingBottom: 30,
  height: 'auto',
  paddingTop: 44,
  paddingLeft: 10,
  paddingRight: 5,
  fontSize: 13,
}

const xsStyle = {
  '@media (max-width: 767px)': {
    padding: 10
  }
}
