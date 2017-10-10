import React, {PropTypes} from 'react'
import {Button, Icon} from 'ui'

export default function SecondaryNavToggle(props, {toggleSecondaryNav}) {
  return (
    <Button variant="dark" borderRadius="0 3px 3px 0" onClick={(e) => {
      e.preventDefault()
      toggleSecondaryNav()
    }} {...props}>
      <Icon type="more" size={24}/>
    </Button>
  )
}

SecondaryNavToggle.contextTypes = {
  toggleSecondaryNav: PropTypes.func
}
