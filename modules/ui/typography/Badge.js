import React, {PropTypes} from 'react'
import Radium from 'radium'

/**
 * Create a light gray text block when you don't want to draw too much attention to the text.
*/
@Radium
export default class Badge extends React.Component {
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
    const {children, isClickable, onClick, style} = this.props
    const computedStyle = onClick || isClickable ? clickableStyle : baseStyle
    return (
      <div style={{...computedStyle, ...style}}>{children}</div>
    )
  }
}

const baseStyle = {
  float: 'right',
  fontWeight: 400,
  backgroundColor: 'rgba(0,0,0,0.30)',
  color: '#ffffff',
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: '0.1em',
  paddingBottom: '0.1em',
  borderRadius: 4,
  fontSize: '0.8em',
  minWidth: 20,
  textAlign: 'center',
  display: 'inline-block',
  width: 'auto'
}

const clickableStyle = {
  ...baseStyle,

  ':hover': {
    cursor: 'pointer'
  }
}
