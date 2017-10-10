import React from 'react'
import {connect} from 'snugg-redux'
import {palette} from 'app/lib/global-styles'
import Color from 'color'

const SELECTED_MAX = 3

@connect()
export default class FinancingToggle extends React.Component {

  static propTypes = {
    uuid: React.PropTypes.string.isRequired
  };

  render() {
    let {selectedCount, uuid, isSample} = this.props
    const finalStyle = selectedCount > SELECTED_MAX ? counterStyleError : counterStyle

    const selectedCountDisplay = (
      <div style={finalStyle}>
        {selectedCount} selected ({SELECTED_MAX} max)
      </div>
    )

    return (
      <div style={{float:'right'}}>
        <Snugg.Radio
          uuid={uuid}
          field="Job Financing: Is Shown?"
          disabled={isSample}
          nullable={false}
          bare
          btnStyle={{padding: '10px 11px'}} />

        {selectedCountDisplay}

      </div>
    )
  }
}

const counterStyle = {
  fontSize: '0.8em',
  color: 'rgba(0,0,0,0.6)',
  textAlign: 'center',
  marginTop: 3,
  letterSpacing: '0.04em'
}
const counterStyleError = {
  ...counterStyle,
  color: Color(palette.ALERTRED).darken(0.2).rgbString(),
  backgroundColor: Color(palette.ALERTRED).clearer(0.85).rgbString()
}
