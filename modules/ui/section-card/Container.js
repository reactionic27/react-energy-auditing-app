import React, {PropTypes} from 'react'
import Radium from 'radium'
import {Clearfix} from 'react-bootstrap'

/**
 * Use this as the main wrapper for each individual <Card></Card> component.
 */

@Radium
export default class Container extends React.Component {
  static propTypes = {
    /**
    * Adds the appropriate styling for hover and active states if true
    */
    isClickable: PropTypes.bool
  }

  static defaultProps = {
    isClickable: false,
    isDisabled: false
  }

  render() {
    const {children, isClickable, onClick} = this.props
    const computedStyle = onClick || isClickable ? clickableStyle : baseStyle
    return (
      <div style={computedStyle} onClick={this.props.onClick}>
        {children}
        <Clearfix/>
      </div>
    )
  }
}

const baseStyle = {
  minHeight: 44,
  marginBottom: 20,
  marginTop: 10,
  borderRadius: 3

}

const clickableStyle = {
  ...baseStyle,
  cursor: 'pointer',
  ':hover': {
    boxShadow: "0px 3px 10px rgba(0,0,0,0.3)"
  },
  ':focus': {
    boxShadow: "0px 3px 10px rgba(0,0,0,0.3)"
  },
  ':active': {
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
  }
}
