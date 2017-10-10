import React, {Component, PropTypes} from 'react'
import Button from './button'
import Icon from 'ui/icon'

export default class UpDown extends Component {

  static propTypes = {
    direction: PropTypes.oneOf(['up', 'down']).isRequired
  }
  render() {
    return (
      <Button {...this.props} variant="link" borderRadius="0px" className="btn-down" isFlat customStyle={upDownStyles}>
        <Icon type={this.props.direction === 'up' ? 'up' : 'down'} />
      </Button>
    )
  }
}

const upDownStyles = {
  paddingTop: 6,
  paddingBottom: 6,
  color: '#333'
}
