import _ from 'lodash'
import React from 'react'
import {Col} from 'react-bootstrap'

export default class UICol extends React.Component {

  static propTypes = {
    noGutter: React.PropTypes.arrayOf(
      React.PropTypes.oneOf([
        'xs', 'xsLeft', 'xsRight',
        'sm', 'smLeft', 'smRight',
        'md', 'mdLeft', 'mdRight',
        'lg', 'lgLeft', 'lgRight',
        'al', 'alLeft', 'alRight'
      ])
    )
  };

  render() {
    let classNames = this.props.className ? this.props.className.split(' ') : [];
    if (this.props.noGutter) {
      classNames = classNames.concat(this.props.noGutter.map(prop => {
        if (prop.length > 2) {
          return `no-gutter-${prop.slice(2, prop.length + 1).toLowerCase()}-${prop.slice(0, 2)}`
        }
        return `no-gutter-${prop.slice(0, 2)}`
      }))
    }
    return <Col {..._.omit(this.props, 'noGutter')} className={classNames.join(' ')} />
  }
}
