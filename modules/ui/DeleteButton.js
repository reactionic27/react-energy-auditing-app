import React from 'react'
import Button from './button'
import {Icon} from 'ui'

const DeleteButton = (props) => (
  <Button
    customStyle={DELETE_BUTTON_STYLE}
    {...props}
    size="lg"
    variant="delete">
    <Icon type="delete" />
  </Button>
)

const DELETE_BUTTON_STYLE = {
  display: 'inline-block',
  width: 44,
  height: 44,
  paddingLeft: 5,
  paddingRight: 5,
  paddingTop: 8,
  fontSize: 18,
  marginLeft: 4,
  color: '#FF0000'
}

export default DeleteButton
