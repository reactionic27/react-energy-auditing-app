import React from 'react'
import Radium from 'radium'
import {Clearfix} from 'react-bootstrap'

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
        <Clearfix/>
      </div>
    )
  }
}

const baseStyle = {
  backgroundColor: '#ffffff',
  padding: '15px 10px',
  minHeight: 50,
  width: '100%',
  boxShadow: "0px 1px 8px rgba(0,0,0,0.15)",
  borderRadius: 3
}
