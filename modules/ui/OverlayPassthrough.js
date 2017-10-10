import React, { Component } from 'react'

// Sort of a weird workaround, but suggested here:
// https://github.com/react-bootstrap/react-overlays/issues/103#issuecomment-232361187
export default class OverlayPassthrough extends Component {
  render() {
    const {
      placement, arrowOffsetLeft, arrowOffsetTop, positionLeft, positionTop, // eslint-disable-line
      ...props
    } = this.props
    return (
      <div {...props}>
        {this.props.children}
      </div>
    )
  }
}
