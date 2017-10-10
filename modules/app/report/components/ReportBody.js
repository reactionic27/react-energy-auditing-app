// Goals of the report body:
// -----
// 1. Iterate the report
import React from 'react'
import {RRow, RCol} from 'ui'

export default function ReportBodyContainer({children}) {
  const childCount = React.Children.count(children)
  if (childCount > 2) {
    console.error('The <ReportBody> can only take one or two children.')
    return null
  }
  if (childCount === 1) {
    return (
      <RRow>
        <RCol span={12}>
          <div className="report-main">
            {children}
          </div>
        </RCol>
      </RRow>
    )
  }
  return (
    <RRow className="report-body">
      <RCol span={3}>
        <div className="report-sidebar">
          {children[0]}
        </div>
      </RCol>
      <RCol span={9}>
        <div className="report-main">
          {children[1]}
        </div>
      </RCol>
    </RRow>
  )
}
