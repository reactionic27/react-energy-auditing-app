import React, {PropTypes} from 'react'
import { Element } from 'react-scroll'

import ReportCover from './sections/ReportCover'
import ConcernsReportSection from './sections/ConcernsReportSection'
import AdditionalNotesReportSection from './sections/AdditionalNotesReportSection'
import HealthReportSection from './sections/HealthReportSection'
import RebatesReportSection from './sections/RebatesReportSection'
import FinancingReportSection from './sections/FinancingReportSection'
import MetricsReportSection from './sections/MetricsReportSection'
import SolutionsReportSection from './sections/SolutionsReportSection'
import TechSpecsReportSection from './sections/TechSpecsReportSection'
import UpgradeDetailsReportSection from './sections/UpgradeDetailsReportSection'
import HesReportSection from './sections/HesReportSection'
import CoCReportSection from './sections/CoCReportSection'
import GlossaryReportSection from './sections/GlossaryReportSection'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'

const sectionObj = PropTypes.shape({
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  outputColumn: PropTypes.string.isRequired,
})

@connect((state, {programId}) => {
  const program = f.program.programById(programId)
  return {
    branding: f.program.makeProgramBranding(program)
  }
})
/**
 * Pulls in all the report sections that get printed if they're visible.
 */
export default class ReportSectionRenderer extends React.Component {

  static propTypes = {
    jobId: PropTypes.number.isRequired,
    programId: PropTypes.number.isRequired,
    section: sectionObj,
    visibleSections: PropTypes.arrayOf(sectionObj).isRequired
  };

  static childContextTypes = {
    branding: React.PropTypes.object
  };

  getChildContext() {
    return {branding: this.props.branding};
  }

  renderContent() {
    const {section: {label}, visibleSections, jobId, programId, segments} = this.props
    switch (label) {
      case 'Cover': return <ReportCover visibleSections={visibleSections} />;
      case 'Concerns': return <ConcernsReportSection />;
      case 'Solutions': return <SolutionsReportSection />;
      case 'Upgrade Details': return <UpgradeDetailsReportSection jobId={jobId} />;
      case 'Health & Safety': return <HealthReportSection jobId={jobId} />;
      case 'Additional Notes': return <AdditionalNotesReportSection jobId={jobId} />;
      case 'Rebates & Incentives': return <RebatesReportSection programId={programId} />;
      case 'Financing': return <FinancingReportSection jobId={jobId} />;
      case 'Metrics': return <MetricsReportSection />;
      case 'Tech specs': return <TechSpecsReportSection jobId={jobId}/>;
      case 'HES': return <HesReportSection jobId={jobId} segments={segments} />;
      case 'Certificate of Completion': return <CoCReportSection jobId={jobId} programId={programId} />;
      case 'Glossary': return <GlossaryReportSection />;
    }
    return <h1>{label}</h1>
  }

  render() {
    if (this.props.printing) {
      return this.renderContent()
    }
    const {section: {label, outputColumn}} = this.props
    return (
      <Element name={label} id={`report-scroll-${outputColumn}`}>
        {this.renderContent()}
      </Element>
    )
  }

}
