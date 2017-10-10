import React, {PropTypes} from 'react'
import pure from 'pure-render-decorator'
import programPages from './programs/programPages'
import {ReportSection, ReportHeader, ReportBody, ReportFooter} from 'app/report/components'

class RebatePage extends React.Component {

  static reportHeaderTitle = 'reports:title_rebates';

  render() {
    const Page = this.props.page
    const {jobId} = this.props
    return (
      <ReportSection name="rebates">
        <ReportHeader field='Report: Rebates Title' jobId={jobId} />
        <ReportBody>
          <Page jobId={this.props.jobId}/>
        </ReportBody>
        <ReportFooter jobId={jobId} />
      </ReportSection>

    )
  }
}


@pure
export default class RebatesReportSection extends React.Component {
  static contextTypes = {
    jobId: PropTypes.number,
  }
  static propTypes = {
    programId: PropTypes.number.isRequired,
  };

  render() {
    const {
      props: {programId},
      context: {jobId}
    } = this
    const rebatePages = programPages(programId)
    if (!rebatePages || rebatePages.length === 0) return null

    return (
      <div>
        {rebatePages.map((page, index) => <RebatePage page={page} key={`i${index}`} jobId={jobId} />) }
      </div>
    )
  }
}
