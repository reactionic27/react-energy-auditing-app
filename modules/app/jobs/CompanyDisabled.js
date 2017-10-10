import React from 'react'
import {InlineNotification} from 'app/components/overlays'
import {Icon} from 'ui'
export default function CompanyDisabled({companyName}) {
  return (
    <InlineNotification>
      <div style={{fontSize: 16}}>
        <Icon type="warning" float="left" style={{paddingRight: 20}}/>
        {companyName} is inactive. Please contact support for assistance
      </div>
    </InlineNotification>
  )
}
