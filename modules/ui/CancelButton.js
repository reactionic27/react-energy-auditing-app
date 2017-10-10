import React from 'react'
import Button from './button'
import {Icon} from 'ui'

// Typical prop includes a 'to' prop back to the previous screen
const CancelButton = (props) => (
  <Button customStyle={CANCEL_BUTTON_STYLE}
          {...props}
          size="sm"
          variant="delete">
    <Icon type="delete" />
  </Button>
)

const CANCEL_BUTTON_STYLE = {
  marginTop: 37,
  marginRight: 0,
  marginLeft: 20,
  marginBottom: 20,
  fontWeight: 400,
  fontSize: 14,
  display: 'inline-block',
  width: 'auto'
}

export default CancelButton
