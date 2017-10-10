import React from 'react'
import Radium from 'radium'
import { Helpers } from 'react-scroll'
import {palette} from 'app/lib/global-styles'
import Color from 'color'

@Helpers.Scroll
@Radium
export default class SecondaryNavLink extends React.Component {

  getLinkStyle(isActive) {
    if (isActive) {
      return activeLinkStyle
    }
    return styles.link
  };


  render() {
    const {children, isActive, ...props} = this.props
    return (
      <a {...props} style={this.getLinkStyle(isActive)}>
        {children}
      </a>
    )
  }
}

const styles = {
  link: {
    fontSize: 11,
    paddingTop: 13,
    paddingRight: 5,
    paddingBottom: 13,
    cursor: 'pointer',
    paddingLeft: 15,
    lineHeight: '1em',
    letterSpacing: '0.025em',
    display: 'block',
    userSelect: 'none',
    color: palette.BROWN,
    [':hover']: {
      backgroundColor: Color(palette.ORANGE).lighten(0.3).clearer(0.2).rgbString()
    },
    [':active']: {
      backgroundColor: Color(palette.ORANGE).clearer(0.3).rgbString(),
      color: '#000'
    }
  }
}

const activeLinkStyle = {
  ...styles.link,
  backgroundColor: Color(palette.ORANGE).clearer(0.4).rgbString(),
  color: '#000',
  [':hover']: {
    backgroundColor: Color(palette.ORANGE).clearer(0.4).rgbString(),
    color: '#000',
  }
}
