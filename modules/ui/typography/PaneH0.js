import React, {PropTypes} from 'react'
import Radium from 'radium'
import {Clearfix} from 'react-bootstrap'

/**
 * Create a light gray text block when you don't want to draw too much attention to the text.
*/
@Radium
export default class PaneH0 extends React.Component {
  static PropTypes = {
    /**
     * Applies suitable hover, focus and active styles
    */
    isClickable: PropTypes.bool,
    style: PropTypes.object
  }

  static defaultProps = {
    isClickable: false,
    style: {}
  }

  render() {
    const {children, isClickable, onClick, float, style} = this.props
    const computedStyle = onClick || isClickable ? clickableStyle : baseStyle
    return (
      <div style={{...computedStyle, float: float, ...style}}>
        {children}
        <Clearfix/>
      </div>
    )
  }
}

const baseStyle = {
  fontWeight: 400,
  backgroundColor: 'transparent',
  color: '#aaa',
  paddingTop: '0.1em',
  paddingBottom: '0.2em',
  fontSize: '0.8em',
  display: 'block',
  borderBottom: '1px solid #ddd',
  marginBottom: 5
}

const clickableStyle = {
  ...baseStyle,

  ':hover': {
    cursor: 'pointer'
  }
}
