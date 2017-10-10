import React, {PropTypes} from 'react'
import Radium from 'radium'
import {palette} from 'app/lib/global-styles'
import Color from 'color'

/**
 * Create a light gray text block when you don't want to draw too much attention to the text.
*/
@Radium
export default class PaneH2 extends React.Component {
  static PropTypes = {
    /**
     * Applies suitable hover, focus and active styles
    */
    isClickable: PropTypes.bool,
  }

  static defaultProps = {
    isClickable: false
  }

  render() {
    const {children, isClickable, onClick} = this.props
    const computedStyle = onClick || isClickable ? clickableStyle : baseStyle

    return (
      <div style={computedStyle}>{children}</div>
    )
  }
}

const baseStyle = {
  fontWeight: 700,
  fontSize: 10,
  color: '#999',
  letterSpacing: '0.05em',
  lineHeight: '14px',
  paddingTop: 5,
  paddingBottom: '0.4em',
  display: 'block',
  textTransform: 'uppercase'

}

const clickableStyle = {
  ...baseStyle,

  ':hover': {
    color: Color(palette.GRAYLIGHT).darken(0.3).rgbString(),
    cursor: 'pointer'
  }
}
