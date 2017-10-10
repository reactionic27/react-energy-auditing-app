import React from 'react'
import {RCol} from 'ui'
import BetterBuildingsLogo from '../../../../../src/img/partners/doe/better-buildings-logo@2x.png'

export default function HesHeader(props) {
  return (
    <div>
      <RCol span={5}>
        <img style={bbLogo} src={BetterBuildingsLogo}/>
      </RCol>
      <RCol span={7}>
        <div style={hesTitle}>Home Energy Score</div>
      </RCol>
    </div>
  )
}

const hesTitle = {
  color: '#223F74',
  fontWeight: 700,
  fontSize: 48,
  letterSpacing: '-0.02em'
}

const bbLogo = {
  maxWidth: 250,
  maxHeight: 85
}
