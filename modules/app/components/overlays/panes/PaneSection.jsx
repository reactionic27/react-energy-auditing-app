import React from 'react'
import Radium from 'radium'
import {palette} from 'app/lib/global-styles'
import Color from 'color'
import {View, Icon} from 'ui'

@Radium
export class PaneSection extends React.Component {

  static propTypes = {
    type: React.PropTypes.oneOf(['tip', 'problem']),
    iconType: React.PropTypes.oneOf(['tip', 'problem', 'circleCheck', 'warning']),
    count: React.PropTypes.number
  };

  // Set styles based on styling props and Radium:
  getSectionStyle() {
    return (
      Object.assign({},
        styles.baseStyle,
        this.props.type && styles[this.props.type]
      )
    )
  }
  getBadgeStyle() {
    return (
      Object.assign({},
        styles.badge,
        this.props.type && styles[this.props.type].badge
      )
    )
  }

  render() {
    return (
      <View className="clearfix" style={this.getSectionStyle()}>
        <span style={{paddingRight: 10}}><Icon type={this.props.iconType}/></span>
        {this.props.children}
        {this.props.count && <div style={this.getBadgeStyle()}>{this.props.count}</div>}
      </View>
    )
  }
}

const styles = {
  baseStyle: {
    padding: '5px 5px 5px 15px',
    borderBottom: `1px solid  ${Color(palette.BEIGE).darken(0.1).hexString()}`,
    textTransform: 'uppercase',
    fontWeight: 600
  },
  badge: {
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 3,
    color: '#ccc',
    float: 'right',
    padding: '2px 5px',
    marginTop: 3,
    fontWeight: 300,
    fontSize: 11
  },
  problem: {
    background: Color(palette.ALERTRED).lighten(0.98).desaturate(0.7).hexString(),
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: Color(palette.ALERTRED).lighten(0.75).desaturate(0.7).hexString(),
    color: Color(palette.ALERTRED).darken(0.2).desaturate(0.7).hexString(),
    badge: {
      backgroundColor: Color(palette.ALERTRED).darken(0.2).desaturate(0.7).hexString(),
      color: Color(palette.ALERTRED).lighten(0.98).desaturate(0.7).hexString(),
    }
  },
  tip: {
    backgroundColor: Color(palette.ALERTORANGE).lighten(0.9).desaturate(0.2).hexString(),
    color: Color(palette.ALERTORANGE).darken(0.2).desaturate(0.9).hexString(),
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: Color(palette.ALERTORANGE).lighten(0.6).desaturate(0.4).hexString(),
    badge: {
      color: Color(palette.ALERTORANGE).lighten(0.9).desaturate(0.2).hexString(),
      backgroundColor: Color(palette.ALERTORANGE).darken(0.2).desaturate(0.9).hexString(),
    }
  }
}
