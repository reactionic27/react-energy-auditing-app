import React from 'react'
import {connect} from 'snugg-redux'
import {dispatchSave} from 'data/actions'
import * as c from 'data/constants'
import DraggableToggle from './DraggableToggle'
import { List } from 'immutable'
import SortableList from 'app/components/sortable/SortableList'

@connect((state, {jobId}) => {
  const report = state.fn.reportByJobId(jobId)
  return {
    sortedToggles: report.get('element_sort_order') || List(c.ELEMENT_SORT)
  }
}, {dispatchSave})
export default class ReportElementDraggableToggles extends React.Component {

  saveToggleOrder = (items) => {
    this.props.dispatchSave('reports', {
      job_id: this.props.jobId,
      element_sort_order: items
    })
  };

  renderItem = (item) => {
    const {jobId, report} = this.props
    return (
      <DraggableToggle
        toggle={item}
        report={report}
        jobId={jobId}
      />
    )
  }

  render() {
    const {sortedToggles} = this.props
    return (
      <SortableList
        items={sortedToggles}
        renderItem={this.renderItem}
        save={this.saveToggleOrder}
      />
    )
  }
}
