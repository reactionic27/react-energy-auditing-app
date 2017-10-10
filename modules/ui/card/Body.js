import React, {PropTypes} from 'react'
import Radium from 'radium'


/**
 * Use this inside the <Card></Card> component to create the body of the card (below the header and above the footer).
 */

@Radium
export default class Body extends React.Component {

  render() {
    const {children} = this.props
    return (
      <div style={baseStyle}>
        {children}
      </div>
    )
  }
}

const baseStyle = {
  backgroundColor: '#ffffff',
  padding: '5px 10px',
  minHeight: 50,
  width: '100%'
}
