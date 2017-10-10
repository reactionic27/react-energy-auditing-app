import React, {Component} from 'react'
import Button from './button'

export default class ContextButton extends Component {

  render() {
    const {customStyle} = this.props
    return <Button variant='link' size="sm" {...this.props} customStyle={{...buttonStyle, ...customStyle}} />
  }
}

const buttonStyle = {
  fontWeight: 400,
  textAlign: 'left',
  fontSize: 12,
  borderRadius: 0,
  paddingLeft: 3,
  paddingRight: 3,
  whiteSpace: 'normal'
}
