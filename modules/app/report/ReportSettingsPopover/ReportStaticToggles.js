import React from 'react'
import ReportToggle from './ReportToggle'

export default function ReportStaticToggles({toggles, report, program, jobId}) {
  return (
    <div>
      {toggles.map(fieldName => (
        <ReportToggle key={fieldName} fieldName={fieldName} report={report} program={program} jobId={jobId} />
      ))}
    </div>
  )
}
