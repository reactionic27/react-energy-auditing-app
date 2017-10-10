import React from 'react'
import Radium from 'radium'
import Color from 'color'
import {palette} from 'app/lib/global-styles'

@Radium
export default class HelpBlock extends React.Component {

  clickHandler = (e) => {
    e.preventDefault()
    this.setState({close: true})
    this.props.onClick(e)
  };


  // TODO: returning null for testing
  render() {
    return null

    const {error, warning, success, helpBlock} = this.props
    if (!error && !warning && !success && !helpBlock) {
      return null;
    }
    return (
      <div style={styles.helpBlock} key="radium-field-error">
        {error || warning || success || helpBlock}
        <div style={styles.tip} key="radium-field-error-tip"></div>
      </div>
    );
  }

}

const bgColor = Color(palette.ALERTRED).clearer(0.3).darken(0.1).desaturate(0.0).rgbString()
const fontColor = Color("#ffffff").clearer(0.2).rgbString()

// backgroundColor: Color(palette.ALERTRED).clearer(0.3).darken(0.08).desaturate(0.0).rgbString()
// color:


const styles = {
  helpBlock: {
    position: 'relative',
    height: 'auto',
    backgroundColor: bgColor,
    color: fontColor,
    zIndex: 3,
    borderRadius: 3,
    textAlign: 'left',
    lineHeight: 1.2,
    fontSize: '0.9em',
    marginTop: 10,
    padding: 10,
    '@media (min-width: 768px)': {
      padding: '3px 5px 4px 7px',
      position: 'absolute',
      width: 190,
      top: 0,
      left: 'auto',
      right: '-200px',
      bottom: 'auto',
      marginTop: 0
    }
  },
  tip: {
    content: '""',
    position: 'absolute',
    width: 0,
    height: 0,
    borderWidth: 8,
    borderStyle: 'solid',
    margin: 'auto',
    top: '-16px',
    left: 0,
    right: 0,
    borderColor: `transparent transparent ${bgColor} transparent`,

    '@media (min-width: 768px)': {
      top: 0,
      bottom: 0,
      left: '-16px',
      right: 'auto',
      borderColor: `transparent ${bgColor} transparent transparent`
    }
  },

}
