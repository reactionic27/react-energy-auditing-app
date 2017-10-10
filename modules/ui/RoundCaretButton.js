import React, {Component} from 'react'
import {palette} from 'app/lib/global-styles'
import Radium from 'radium'

@Radium
export default class RoundCaretButton extends Component {

  render() {
    return (
      <div
        {...this.props}
        style={{
          display: 'inline-block',
          float: 'right',
          minWidth: 'none',
          marginBottom: 20,
          borderRadius: '2em',
          height: '2em',
          width: '2em',
          fontSize: 20,
          color: '#333',
          padding: '0.5em',
          backgroundColor: palette.BEIGE,
          textAlign: 'center',
          '@media (min-width: 768px)': {
            marginRight: 10
          }
        }}
        />
    )
  }
}
