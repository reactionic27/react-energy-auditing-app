import React, {PropTypes} from 'react';
import {Map as IMap} from 'immutable'
import ReportContainerHeader from './ReportContainerHeader'
import ReportContainerSidebar from './ReportContainerSidebar'
import headerAndSecondaryNavDecorator from '../../decorators/headerAndSecondaryNavDecorator'
import {Row, Col} from 'react-bootstrap'
import {connect} from 'snugg-redux'
import {dispatchLocal} from 'data/actions'

@connect((state) => {
  return {activeSection: state.localState.get('activeSection')}
})
@headerAndSecondaryNavDecorator('report')
export default class ReportHeaderAndSidebar extends React.Component {

  static propTypes = {
    jobId: PropTypes.number.isRequired,
    programId: PropTypes.number,
    report: PropTypes.instanceOf(IMap).isRequired,
    visibleSections: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      outputColumn: PropTypes.string.isRequired,
    })).isRequired
  };

  setActiveSection = (activeSection) => {
    this.props.dispatch(dispatchLocal('setActiveSection', {activeSection}))
  }

  render() {
    const {
      props: {report, jobId, programId, visibleSections, activeSection},
    } = this
    return (
      <Row>
        <Col sm={2}>
          <ReportContainerSidebar
            name='sidebar'
            jobProgramId={programId}
            report={report}
            jobId={jobId}
            activeSection={activeSection}
            setActiveSection={this.setActiveSection}
            visibleSections={visibleSections}
            showSecondaryNav={this.props.showSecondaryNav} />
        </Col>
        <Col sm={10}>
          <ReportContainerHeader
            jobId={jobId}
            programId={programId}
            activeSection={activeSection}
            showSecondaryNav={this.props.showSecondaryNav} />
        </Col>
      </Row>
    );
  }
}
