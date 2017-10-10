import React from 'react'
import _ from 'lodash'
import {InlineNotification} from 'app/components/overlays'


export function HESScoreRow({row}) {
  return (
    <tr>
      <td>{row.assessmentTypeCode}</td>
      <td>{row.assessmentTypeLabel}</td>
      <td>{row.baseScore}</td>
      <td>{String(row.locked)}</td>
      <td>{row.assessorId}</td>
      <td>{row.labelNumber}</td>
      <td>{row.hpxmlBuildingNode}</td>
      <td>{row.hpxmlEventType1}</td>
      <td>{row.hpxmlEventType2}</td>
      <td>{row.hpxmlTransactionType}</td>
      <td>{row.assessmentDate}</td>
    </tr>
  )
}

export function HESScoreTable({hesScores}) {
  if (_.isEmpty(hesScores)) {
    return <InlineNotification theme="warning" message={`No HES models for this job yet`} />
  }
  return (
    <table className="table table-condensed table-bordered" style={{minWidth: 937, marginBottom: 4, marginTop: 20}}>
      <thead style={{backgroundColor: '#f2f1ef'}}>
        <tr>
          <td>Assessment Type</td>
          <td>Assessment Type Label</td>
          <td>HES Base Score</td>
          <td>Locked?</td>
          <td>Assessor ID</td>
          <td>Label Number</td>
          <td>HPXML Building Node</td>
          <td>HPXML Event Type 1</td>
          <td>HPXML Event Type 2</td>
          <td>Transaction Type</td>
          <td>Assessment Date</td>
        </tr>
      </thead>
      <tbody>
        {_.map(hesScores, (score, i) => <HESScoreRow row={score} key={"i" + i} />)}
      </tbody>
    </table>
  )
}

// This throws up an alert that we are fetching the HPXML or HES files
// This could be used for other things, but it doesn't really fit in with our app.
export function IsUpdatingMessage() {
  const divStyles = {
    backgroundColor: "#000",
    opacity: 0.6,
    position: "fixed",
    left: 60,
    right: 0,
    bottom: 0,
    height: 100,
    zIndex: 100
  }
  return (
    <div style={divStyles} className="text-center">
      <h1 style={{color: "#fff"}}><strong>Reloading...</strong></h1>
    </div>
  )
}
