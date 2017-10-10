import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import cx from 'classnames'
import dimensions from 'util/dimensions'
import {connect} from 'snugg-redux'
import DocumentTitle from 'react-document-title'
import {UISIZE, ANIMATION} from 'app/lib/global-styles'
import {InlineNotification, ReportInfoBox, PrintInfoBox} from 'app/components/overlays'
import {Icon} from 'ui'
import {Row, Col, Clearfix} from 'react-bootstrap'
import dynamicResize from 'decorators/dynamicResize'
import ReportSectionRenderer from './ReportSectionRenderer'
import ReportHeaderAndSidebar from './ReportHeaderAndSidebar'
import * as f from 'data/formatters'
import _ from 'lodash'
import {getTechSpecsData, splitPages} from './sections/getTechSpecsData'
import programPages from './sections/programs/programPages'

@connect((state, {jobId}) => {
  const report = state.fn.reportByJobId(jobId)
  const job = state.fn.jobById(jobId)
  const programId = job.get('program_id') || 1
  const visibleSections = f.report.visibleSections(report, programId)
  const techSpecPages = splitPages(getTechSpecsData(state, {jobId}))
  const recommendations = state.fn.recommendationsByJobId(jobId)

  const reportSectionCount = visibleSections.reduce(function(count, section) {
    switch (section.outputColumn) {
      case 'page_upgrade_details': {
        const recs = f.recs.recommendedRecs(recommendations)
        return count + (recs.length || 0)
      }
      case 'page_additional_notes': {
        const additionalNotes = f.recs.mentionedRecs(recommendations);
        return count + additionalNotes.length
      }
      case 'page_financing': {
        const financing = state.fn.jobFinancingByJobId(jobId)
        const selectedJobFinancing = financing.filter((p) => p.get('is_shown')).slice(0, 3)
        return count + (selectedJobFinancing.length > 0 ? 1 : 0)
      }
      case 'page_rebates': {
        const rebatePages = programPages(programId)
        return count + rebatePages.length
      }
      case 'page_tech_specs': return count + (techSpecPages.length || 0)
      default: return count + 1
    }
  }, 0)
  return {
    job,
    report,
    programId,
    visibleSections,
    reportSectionCount
  }
})
@dynamicResize
export default class ReportContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      printReadySections: {}
    }
    this.setPrintReadySection = this.setPrintReadySection.bind(this)
    this.isPrintReady = this.isPrintReady.bind(this)
  }

  static propTypes = {
    showSecondaryNav: PropTypes.bool.isRequired
  };

  static contextTypes = {
    hideSecondaryNav: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    if (this.props.showSecondaryNav) {
      this.context.hideSecondaryNav()
    }
  }

  componentDidUpdate() {
    if (this.isPrinting() && this.isPrintReady()) {
      this.props.dispatch({type: 'spinner/hide'})
    }
  }

  setPrintReadySection(sectionKey, status, name) {
    this.setState(state => {
      return {
        printReadySections: Object.assign({}, state.printReadySections, {
          [sectionKey]: status
        })
      }
    })
  }

  isPrintReady() {
    const {printReadySections} = this.state
    const {reportSectionCount} = this.props
    const values = _.values(printReadySections)
    return values.length === reportSectionCount && _.every(values, Boolean)
  }

  getReportBodyStyle() {
    const {showSecondaryNav} = this.props
    const {screenSize} = dimensions
    let translateX = 0
    let paddingLeft = '10px'

    if (screenSize === 'xs') {
      paddingLeft = '0'
    }
    if (screenSize === 'xs' && showSecondaryNav) {
      translateX = UISIZE.secondaryReportNavWidth
      paddingLeft = '10px'
    }


    return {
      ...styles.container,
      transform: `translateX(${translateX}px)`,
      paddingLeft: paddingLeft
    }
  }

  static childContextTypes = {
    jobId: React.PropTypes.number.isRequired,
    printing: React.PropTypes.bool.isRequired,
    setPrintReadySection: React.PropTypes.func
  };

  getChildContext() {
    return {
      jobId: this.props.jobId,
      printing: this.isPrinting(),
      setPrintReadySection: this.setPrintReadySection
    }
  }

  componentDidMount() {
    if (this.props.segments.three === 'print') {
      window.print()
    }
    if (this.isPrinting()) {
      this.props.dispatch({type: 'spinner/show'})
    }
  }

  handlePrintClick = (e) => {
    e.preventDefault()
    window.print();
  };

  renderPrint() {
    const {job, jobId, programId, visibleSections, segments} = this.props
    return (
      <DocumentTitle title={f.report.formattedPrintTitle(job)}>
        <div className="report-present clearfix">
          <div className="section">
            <PrintInfoBox jobId={jobId} isSampleJob={job.get('sample_job')} />
            <div className={cx(`theme-${this.getTheme()}`, {
              'print-preview' : true,
              'sample-job': job.get('sample_job') === 1
            })}>
              {visibleSections.map(section => (
                <ReportSectionRenderer
                  visibleSections={visibleSections}
                  printing
                  section={section}
                  jobId={jobId}
                  programId={programId}
                  key={section.label}
                  segments={segments} />
              ))}
            </div>
            <div className="discreet-navigation discreet-navigation--left">
              <Link className="btn" to={`/job/${jobId}/report`}>
                <Icon type='left' />
              </Link>
              {this.isPrintReady() ? <button type="button" className="btn" onClick={this.handlePrintClick}>
                <Icon type='print' />
              </button> : null}
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }

  getTheme() {
    return this.props.report.get('theme') || 'theme-1'
  }

  renderMain() {
    const {job, jobId, programId, report, visibleSections, segments} = this.props
    const hasUnmodeledChanges = f.job.hasUnmodeledChanges(job)
    const mayHaveUnmodeledChanges = f.job.mayHaveUnmodeledChanges(job)
    return (
      <div className={cx('in-app-report', `theme-${this.getTheme()}`)}>
        <ReportHeaderAndSidebar
          report={report}
          visibleSections={visibleSections}
          jobId={jobId}
          programId={job.get('program_id')}
          showSecondaryNav={this.props.showSecondaryNav} />
        <Row>
          <div className="job-container" >
            <Col sm={10} smOffset={2}>
              <div style={this.getReportBodyStyle()}>
                <ReportInfoBox jobId={jobId} isSampleJob={job.get('sample_job')} />
                {hasUnmodeledChanges && !mayHaveUnmodeledChanges ?
                  <InlineNotification
                    theme="error"
                    message={`
                      This job has unmodeled changes and may not be accurate.
                      Please model it for best results.`} /> : null
                }

                {mayHaveUnmodeledChanges ?
                  <InlineNotification message={
                    `Be sure to model this job if it has any unmodeled changes.`}/>
                  : null
                }

                {visibleSections.map((section) => (
                  <ReportSectionRenderer
                    segments={segments}
                    visibleSections={visibleSections}
                    section={section}
                    jobId={jobId}
                    programId={programId}
                    key={section.label} />
                ))}
              </div>
            </Col>
            <Clearfix/>
          </div>
        </Row>
      </div>
    )
  }

  isPrinting() {
    const {props: {segments: {three}}} = this
    return (three === 'print' || three === 'present') || false
  }

  render() {
    const reportBody = this.isPrinting()
      ? this.renderPrint()
      : this.renderMain()

    return (
      <DocumentTitle title={f.job.pageTitle(this.props.job, "> Report | Snugg Pro")}>
        {reportBody}
      </DocumentTitle>
    )
  }
}
const styles = {
  container: {
    transition: ANIMATION,
    marginTop: 0,
    display: 'block',
    paddingTop: UISIZE.header
  }
}
