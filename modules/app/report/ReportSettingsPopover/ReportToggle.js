import React from 'react'
import {Icon, Col} from 'ui'
import {Clearfix} from 'react-bootstrap'
import programPages from '../sections/programs/programPages'

// TODO: Remove this when refactoring the sortables
// to use field definitions
function makeLabel(toggle: string) {
  if (!toggle) {
    return ''
  }
  if (toggle.indexOf('Report: Element ') === 0) {
    return toggle.slice(16)
  }
  if (toggle.indexOf('Report: Page ') === 0) {
    return toggle.slice(13)
  }
}

export default function ReportToggle({jobId, report, program, fieldName, isDraggable}) {
  const isRebatesField = (fieldName === 'Report: Page Rebates & Incentives')
  const programPageInfo = programPages(program && program.get('id') || 1)
  if (isRebatesField && programPageInfo.length === 0) {
    return <span />
  }

  // Don't show the certificate of completion toggle if the program doesn't offer it
  const isCertificateOfCompletion = (fieldName === 'Report: Page Certificate of Completion')
  if (isCertificateOfCompletion && !program.get('hasCertificateOfCompletion')) {
    return <span />
  }

  const disabled = (isRebatesField && program.get('paysForJob'))
  const label = (
    <label style={{cursor: 'inherit', float: 'left', paddingTop: 12}}>
      {isDraggable && (
        <Icon
          type="dradUpDown"
          size={10}
          style={{marginLeft: -15, marginRight: 5, opacity: 0.7}}/>
      )}
      {makeLabel(fieldName)}
    </label>
  )
  return (
    <Snugg.Radio wrapper={Wrapper} bare field={fieldName} nullable={false} label={label} disabled={disabled} />
  );
}

function Wrapper({children, label}) {
  return (
    <div className="form-group form-group-lg">
      <Col sm={12}>
        {label}
        <div style={{textAlign: 'right', float: 'right'}}>
          {children}
        </div>
        <Clearfix/>
      </Col>
    </div>
  )
}
