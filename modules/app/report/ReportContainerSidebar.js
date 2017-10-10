import React, {PropTypes} from 'react'
import _ from 'lodash'
import {Map as IMap} from 'immutable'
import {createSelector} from 'simple-selectors'
import Radium from 'radium'
import dynamicResize from 'decorators/dynamicResize'
import {browser as Bowser} from 'bowser'
import SecondaryNavLink from 'app/components/SecondaryNavLink'
import SecondaryNav from 'app/components/SecondaryNav'
import {SecondaryNavH2} from 'ui'
import { connect } from 'snugg-redux'
import * as c from 'data/constants'
import * as f from 'data/formatters'
import SortableList from 'app/components/sortable/SortableList'
import {List} from 'immutable'
import { scroller } from 'react-scroll'
import { dispatchSave } from 'data/actions'

@connect(createSelector(
  (state, {jobId}) => f.report.pageSortOrder(state.fn.reportByJobId(jobId)),
  (state, {visibleSections}) => visibleSections,
  (pageSortOrder, visibleSections) => {
    return {
      pageSortOrder,
      visibleSectionList: visibleSections.reduce((result, val) => (
        result.push(val.outputColumn)
      ), List())
    }
  }
), {dispatchSave})
@Radium
@dynamicResize
export default class ReportContainerSidebar extends React.Component {

  static propTypes = {
    activeSection: PropTypes.string,
    report: PropTypes.instanceOf(IMap).isRequired,
    visibleSections: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      outputColumn: PropTypes.string.isRequired,
    })).isRequired,
    pageSortOrder: PropTypes.instanceOf(List).isRequired,
    visibleSectionList: PropTypes.instanceOf(List).isRequired
  };

  savePageOrder = (localItems, items, {endDragIndex}) => {
    const { jobId, pageSortOrder } = this.props
    const newSortOrder = pageSortOrder.sort((a, b) => {
      const idxA = localItems.indexOf(a)
      const idxB = localItems.indexOf(b)
      if (idxA === -1 || idxB === -1) return 0
      return idxA > idxB ? 1 : -1
    })
    this.props.dispatchSave('reports', {
      job_id: jobId,
      page_sort_order: newSortOrder
    })
    const droppedItem = localItems.get(endDragIndex)
    const item = _.find(this.props.visibleSections, {outputColumn: droppedItem})
    this.props.setActiveSection(item.label)
    scroller.scrollTo(`report-scroll-${droppedItem}`, {smooth: true, duration: 100, offset: -90})
  }

  renderNavItem = (outputColumn: string) => {
    const item = _.find(this.props.visibleSections, {outputColumn})
    const label = item.label
    return (
      <SecondaryNavLink
        to={label}
        smooth
        duration={100}
        offset={-90}
        isActive={this.props.activeSection === label}
        key={label}>
        {label}
      </SecondaryNavLink>
    )
  }

  render() {
    const {showSecondaryNav} = this.props
    return (
      <SecondaryNav showSecondaryNav={showSecondaryNav} sm={2}>
        <SecondaryNavH2>ACTIVE PAGES</SecondaryNavH2>
        <SortableList
          activeSection={this.props.activeSection}
          items={this.props.visibleSectionList}
          renderItem={this.renderNavItem}
          save={this.savePageOrder}
        />
      </SecondaryNav>
    )
  }
}
