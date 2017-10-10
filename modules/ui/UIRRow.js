import React from 'react'

export default class UIRRow extends React.Component {

  render() {
    let classNames = this.props.className ? this.props.className.split(' ') : [];
    classNames.push(`r-row`)
    return <div {...this.props} className={classNames.join(' ')} />
  }
}
