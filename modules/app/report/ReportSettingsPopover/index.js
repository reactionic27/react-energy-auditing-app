import React from 'react'
import _ from 'lodash'
import dynamicResize from 'decorators/dynamicResize'
import * as c from 'data/constants'
import {connectSelector} from 'snugg-redux'
import {ActivityDivider} from 'app/components/overlays'
import {palette} from 'app/lib/global-styles'
import ReportElementDraggableToggles from './ReportElementDraggableToggles'
import ReportStaticToggles from './ReportStaticToggles'
import dimensions from 'util/dimensions'
import {Popover} from 'react-bootstrap'

const { REPORT_PAGE_TOGGLES, REPORT_ELEMENT_TOGGLES } = c

const STATIC_TOGGLES = {
  page: REPORT_PAGE_TOGGLES,
  element: REPORT_ELEMENT_TOGGLES
};

const ReportSettingsToggles = ({jobId, program, report, settingsType}) => {
  let staticToggles = STATIC_TOGGLES[settingsType]
  const isElements = settingsType === 'element'
  return (
    <div className="tab-pane animated fadeIn active">
      <ReportStaticToggles toggles={staticToggles} report={report} program={program} jobId={jobId} />
      {isElements && <ActivityDivider bgColor={palette.BEIGE} label="Sortable"/>}
      {isElements && <ReportElementDraggableToggles report={report} jobId={jobId} />}
    </div>
  )
}

@connectSelector({
  report: (state, {jobId}) => state.fn.reportByJobId(jobId),
  program: (state, {jobId}) => state.fn.programByJobId(jobId)
})
@dynamicResize
export default class ReportSettingsPopover extends React.Component {
  render() {
    const {
      report, jobId, program, pill, pillClickHandler,
      ...props
    } = this.props
    let {windowHeight} = dimensions
    return (
      <Popover {..._.omit(props, 'dispatch', 'programId')} key={pill} placement="bottom" className="popover-header popover-report-settings" id="report-settings">
        <ul className="nav nav-pills nav-pills-popover ma-bo-10">
          <li className={(pill === 'page') && 'active'}
            onClick={(e) => pillClickHandler('page', e)}>
            <a href="#">Pages</a>
          </li>
          <li className={(pill === 'element') && 'active'}
            onClick={(e) => pillClickHandler('element', e)}>
            <a href="#">Elements</a>
          </li>
        </ul>
        <div className="popover-scrollable-content" style={{maxHeight: windowHeight - 220}}>
          <form className="form-horizontal">
            <div className="tab-content">
              <ReportSettingsToggles
                settingsType={pill}
                jobId={jobId}
                program={program}
                report={report} />
            </div>
          </form>
        </div>
      </Popover>
    )
  }
}
