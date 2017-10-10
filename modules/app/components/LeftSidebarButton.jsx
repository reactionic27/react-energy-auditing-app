import React from 'react'
import {Icon, Button} from 'ui'
import {palette} from 'app/lib/global-styles'
import Color from 'color'
import Radium from 'radium'
import dynamicResize from 'decorators/dynamicResize';
import dimensions from 'util/dimensions'

@Radium
@dynamicResize
export default class LeftSidebarButton extends React.Component {

  defaultProps = {
    iconLabel: React.PropTypes.string,
    iconType: React.PropTypes.string,
    iconRotate: React.PropTypes.number,
    isActive: React.PropTypes.bool,
  }

  render() {
    let {windowHeight} = dimensions
    const {iconType, iconLabel, isActive, iconRotate} = this.props
    const finalStyles = isActive ? activeButtonStyle : buttonStyle
    return (
      <Button
        customStyle={finalStyles}
        {...this.props}
        tabIndex="-1"
        size="sm">
        {windowHeight >= 500 &&
          <Icon type={iconType} size={18} rotate={iconRotate}/>
        }
        <div>{iconLabel}</div>
      </Button>
    )
  }
}

const buttonStyle = {
  color: Color(palette.BEIGE).saturationv(1.8).darken(0.35).rgbString(),
  boxShadow: 'none',
  borderRadius: 0,
  margin: 0,
  paddingTop: 6,
  paddingRight: 0,
  paddingBottom: 6,
  minHeight: 18,
  paddingLeft: 0,
  fontWeight: 400,
  fontSize: 10,
  width: '100%',
  letterSpacing: '0.05em',
  display: 'block',
  ':hover': {
    color: palette.BEIGE
  },
  ':active' : {
    color: palette.YELLOW
    // color: Color(palette.ORANGE).lighten(0.2).rgbString()
  },
  '@media (min-height: 590px)': {
    minHeight: 55,
    paddingTop: 8,
    paddingBottom: 8,
  }
}

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: Color(palette.BROWN).darken(0.3).rgbString(),
  color: palette.ORANGE,
  ':hover': {},
}
