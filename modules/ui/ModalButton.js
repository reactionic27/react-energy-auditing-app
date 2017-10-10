import React from 'react'
import Button from './button'

// Typical prop includes a 'to' prop back to the previous screen
const ModalButton = (props) => (
  <Button customStyle={modalStyle}
    {...props}
    size="lg"
    variant="light"
    isFlat
    />
)

const modalStyle = {
  marginRight: 0,
  marginLeft: 0,
  marginBottom: 0,
  fontWeight: 600,
  fontSize: 16,
  paddingTop: 12,
  paddingBottom: 12,
  borderRadius: "0 0 4px 4px"
}

export default ModalButton
