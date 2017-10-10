import React, {PropTypes} from 'react'
import Radium from 'radium'
import {Clearfix} from 'react-bootstrap'

/**
 * Create a light gray text block when you don't want to draw too much attention to the text.
*/
@Radium
export default class BadgeOutline extends React.Component {
  static PropTypes = {
    /**
     * Applies suitable hover, focus and active styles
    */
    isClickable: PropTypes.bool,
    float: PropTypes.oneOf(['left, right, none']),
    style: PropTypes.object
  }

  static defaultProps = {
    isClickable: false,
    float: 'none',
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
  color: '#bcbcbc',
  border: '1px solid #bcbcbc',
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: '0.1em',
  paddingBottom: '0.1em',
  borderRadius: 4,
  fontSize: '0.8em',
  minWidth: 20,
  textAlign: 'center',
  display: 'inline-block'
}

const clickableStyle = {
  ...baseStyle,

  ':hover': {
    cursor: 'pointer'
  }
}
