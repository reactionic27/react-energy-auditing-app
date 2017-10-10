import React from 'react'
import _ from 'lodash'
import {report as reportFields} from '../../../../constants/field-definitions'
import ReportToggle from './ReportToggle'

const fieldNamesByColumn = _.transform(reportFields, (result, val) => {
  result[val.outputColumn] = val.name
}, {})

export default class DraggableToggle extends React.Component {
  render() {
    const {toggle, jobId, report} = this.props
    const fieldName = fieldNamesByColumn[toggle]
    return (
      <ReportToggle fieldName={fieldName} jobId={jobId} report={report} isDraggable />
    )
  }
}
