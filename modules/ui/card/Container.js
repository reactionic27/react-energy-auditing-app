import React, {PropTypes} from 'react'
import Radium from 'radium'


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
    const {children, isClickable, onClick, style} = this.props
    const computedStyle = onClick || isClickable ? {...clickableStyle, ...style} : {...baseStyle, ...style}
    return (
      <div style={computedStyle} onClick={this.props.onClick}>
        {children}
      </div>
    )
  }
}

const baseStyle = {
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  minHeight: 44,
  boxShadow: "0 1px 5px rgba(0,0,0,0.3)",
  marginBottom: 30,
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
