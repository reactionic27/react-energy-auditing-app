import React, {Component, PropTypes} from 'react'
import Button from './button'
import {Icon} from 'ui'

// Typical prop includes a 'to' prop back to the previous screen
export default class BackLink extends Component {

  static propTypes = {
    label: PropTypes.string,
    to: PropTypes.string,
    customStyle: PropTypes.object
  };

  render() {
    const {to, backLabel, customStyle} = this.props
    return (
      <Button customStyle={{...BACK_LINK_STYLE, ...customStyle}}
              to={to}
              size="sm"
              variant="link" >
        <Icon type="left" /> &nbsp; {backLabel}
      </Button>
    )
  }
}

const BACK_LINK_STYLE = {
  marginTop: 10,
  marginBottom: 10,
  paddingLeft: 3,
  fontWeight: 400,
  fontSize: 14,
  display: 'inline-block',
  width: 'auto',
}
