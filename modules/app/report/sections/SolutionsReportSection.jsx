import React, {PropTypes} from 'react'
import withContext from '../../../util/withContext'
import pure from 'pure-render-decorator'
import {connect} from 'snugg-redux'
import SolutionsReportSidebar from './SolutionsReportSidebar'
import SolutionsReportTableRow from './SolutionsReportTableRow'
import {renderToStaticMarkup} from 'react-dom/server'
import * as f from 'data/formatters'
import {ReportSection, ReportHeader, ReportBody, ReportFooter} from 'app/report/components'
import {REPORT, SOLUTIONS_TABLE} from 'app/lib/report-styles'

function solutionsDataSelector(state, {jobId}) {
  const report = state.fn.reportByJobId(jobId)
  return {
    jobId,
    recommendations: state.fn.recommendationsByJobId(jobId),
    savingsDisplayType: f.report.savingsDisplayType(report),
    sirDisplayType: f.report.sirDisplayType(report),
    costDisplayType: f.report.costDisplayType(report),
    totals: state.fn.totalsByJobId(jobId)
  }
}

@connect(solutionsDataSelector)
class SolutionsContent extends React.Component {

  render() {
    return (
      <SolutionsTable {...this.props} rows={f.recs.recommendedRecs(this.props.recommendations)} />
    )
  }
}

// Update if the design changes:
const MAX_ROWS_PER_PAGE = 12

SolutionsContent.paginating = {
  getAllData: solutionsDataSelector,
  paginate(node, elements, store) {
    const {recommendations, jobId} = elements
    let pages = []
    let rows = f.recs.recommendedRecs(recommendations)
    while (rows.length > 0) {
      const renderRows = rows.length > MAX_ROWS_PER_PAGE
        ? rows.slice(0, MAX_ROWS_PER_PAGE)
        : rows
      pages.push(renderToStaticMarkup(
        withContext({store, jobId, printing: true}, () => (
          <SolutionsTable {...elements} rows={renderRows} />
        ))
      ))
      rows = rows.slice(MAX_ROWS_PER_PAGE)
    }
    return pages
  }
}

@connect((state, {jobId}) => {
  const report = state.fn.reportByJobId(jobId)
  const solutionsTitle = report.get('solutions_title')
  return  {
    solutionsTitle
  }
}

)
class SolutionsTable extends React.Component {

  static contextTypes = {
    printing: React.PropTypes.bool,
  }

  render() {
    const {jobId, rows, totals, costDisplayType, savingsDisplayType, sirDisplayType, solutionsTitle} = this.props
    const displayTypes = {costDisplayType, savingsDisplayType, sirDisplayType}
    const showSavingsHeader = savingsDisplayType === 'lineItem' || savingsDisplayType === 'bars' || savingsDisplayType === 'stars'
    return (
      <div>
        <h2 style={styles.h2} className="editable-container inverse-placeholder">
          {this.context.printing ?
            <span>{solutionsTitle}</span>
            :
            <Snugg.Input bare editable field='Report: Solutions Title' jobId={jobId} placeholder="Click to edit." />
          }
        </h2>
        {/* Solutions table headers */}
        <table className="table table-striped">
          <tbody>
            <tr>
              <th className="details" style={styles.details}>Details</th>
              {costDisplayType === 'exact' &&
                <th className="costs" style={styles.costs}>Installed <br /> cost</th>
              }
              {costDisplayType === 'rounded' &&
                <th className="costs" style={styles.costs}>Approximate <br /> installed cost</th>
              }
              {showSavingsHeader &&
                <th className="savings" style={styles.savings}>Approximate <br /> annual savings</th>
              }

              {sirDisplayType === 'lineItem' &&
                <th className="sir" style={styles.sir}>SIR *</th>
              }
              {sirDisplayType === 'icon' &&
                <th className="sir" style={styles.sir}>Pays for itself *</th>
              }
            </tr>
            {rows.map(rec => (
              <SolutionsReportTableRow
                {...displayTypes}
                jobId={jobId}
                recommendation={rec}
                totals={totals}
                key={rec.get('uuid')} />
            ))}
          </tbody>
        </table>
        {sirDisplayType === 'lineItem' &&
          <p>* SIR is the Savings to Investment Ratio. Simply put, if the SIR is 1 or greater,
          then the energy savings from the item will pay for itself before it needs to be replaced
          again. This metric is used to help prioritize the recommendations by financial merit.</p>
        }
        {sirDisplayType === 'icon' &&
          <p>* Pays for itself: Specifically, this is the Savings to Investment Ratio. Simply put, if this ratio is 1 or greater,
          then the energy savings from the item will pay for itself before it needs to be replaced again.
          This metric is used to help prioritize the recommendations by financial merit.</p>
        }
      </div>
    )
  }

}


@pure
export default class SolutionsReportSection extends React.Component {
  static contextTypes = {
    jobId: PropTypes.number,
  }
  render() {
    const {jobId} = this.context
    return (
      <ReportSection name="solutions" paginating={SolutionsContent.paginating}>
        <ReportHeader field='Report: Title Solutions' jobId={jobId} />
        <ReportBody>
          <SolutionsReportSidebar jobId={jobId} />
          <SolutionsContent jobId={jobId} />
        </ReportBody>
        <ReportFooter jobId={jobId} />
      </ReportSection>
    )
  }
}

const thBase = {
  fontSize: 11,
  letterSpacing: '0.03em',
  color: '#333'
}

const styles = {
  h2: {
    borderRadius: REPORT.borderRadius,
    margin: '0 0 10px 0',
    padding: '8px 10px',
    fontSize: 15
  },

  details: {
    ...thBase,
    ...SOLUTIONS_TABLE.details
  },
  costs: {
    ...thBase,
    ...SOLUTIONS_TABLE.costs
  },
  savings: {
    ...thBase,
    ...SOLUTIONS_TABLE.savings
  },
  sir: {
    ...thBase,
    ...SOLUTIONS_TABLE.sir
  }
}
