import React from 'react'
import {Icon} from 'ui'

export default class FieldLock extends React.Component {

  static propTypes = {
    label: React.PropTypes.string,
    locked: React.PropTypes.bool.isRequired
  };

  static defaultProps = {
    locked: true
  };

  render() {
    return (
      <div style={styles}>
        <Icon type="lock" />
      </div>
    )
  }
}

// TODO: Ben this is super quick and dirty.
// You probably want to flex your muscles on this
const styles = {
  position: 'absolute',
  top: 14,
  zIndex: 50,
  right: 87,
}
