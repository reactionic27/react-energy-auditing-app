import React, {Component, PropTypes} from 'react'
import {UISIZE, palette} from 'app/lib/global-styles'
import Radium from 'radium'
import Color from 'color'

@Radium
export default class ToolbarLabel extends Component {

  static propTypes = {
    label: PropTypes.string,
  };

  render() {
    const {label} = this.props
    return (
      <div style={styles.container}>
        <div style={styles.label}>{label}</div>
        <div style={styles.arrow}>
          <div style={styles.arrowAfter}>
          </div>
        </div>
      </div>
    )
  }
}


const styles = {
  container: {
    position: 'relative',
    width:20,
    height: '100%',
    float: 'left',
    paddingLeft: 3,
    marginRight: 10,
  },
  label: {
    transform: 'rotate(270deg)',
    textTransform: 'uppercase',
    float: 'left',
    fontSize: 10,
    textAlign: 'center',
    width: UISIZE.reportHeader,
    height: 20,
    marginTop: 13,
    marginLeft: '-14px'
  },
  arrow: {
    width: 0,
    height: 0,
    borderTop: `${(UISIZE.reportHeader / 2)}px solid transparent`,
    borderBottom: `${(UISIZE.reportHeader / 2)}px solid transparent`,
    borderLeft: `10px solid ${Color(palette.BEIGE).darken(0.25).rgbString()}`,
    float: 'right',
    position: 'absolute',
    right: '-8px',
    top: 0,
    zIndex: 10,
  },
  arrowAfter: {
    content: "",
    position: 'absolute',
    right: 1,
    top: -25,
    zIndex: 9,
    borderTop: '25px solid transparent',
    borderBottom: '25px solid transparent',
    borderLeft: `10px solid ${Color(palette.BEIGE).darken(0.04).rgbString()}`
  }
}
