import React from 'react'
import {omit} from 'lodash'

export default class UIRCol extends React.Component {

  static propTypes = {
    span: React.PropTypes.number,
    offset: React.PropTypes.number
  };

  render() {
    let classNames = this.props.className ? this.props.className.split(' ') : [];
    if (this.props.span) {
      classNames.push(`r-spa${this.props.span}`)
    }
    if (this.props.offset) {
      classNames.push(`r-offset${this.props.offset}`)
    }
    return <div {...omit(this.props, 'span', 'offset')} className={classNames.join(' ')} />
  }
}
