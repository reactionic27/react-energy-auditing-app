import React, {PropTypes} from 'react'
import Radium from 'radium'
import {palette} from 'app/lib/global-styles'
import Color from 'color'

/**
 * Create a light gray text block that serves as a section divider on the panes.
*/
@Radium
export default class PaneH4 extends React.Component {
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
  fontWeight: 600,
  color: '#726E6E',
  display: 'block',
  paddingTop: 5,
  paddingBottom: '0.5em',
  fontSize: 12

}

const clickableStyle = {
  ...baseStyle,

  ':hover': {
    color: Color(palette.GRAYLIGHT).darken(0.3).rgbString(),
    cursor: 'pointer'
  }
}
