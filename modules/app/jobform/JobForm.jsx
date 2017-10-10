import React, {PropTypes, Component} from 'react'
import dimensions from 'util/dimensions'
import invariant from 'fbjs/lib/invariant'
import * as Sections from './jobform-sections'
import * as f from 'data/formatters'
import { Element } from 'react-scroll'
import {JOBFORM_SECTIONS} from 'data/constants'
import DocumentTitle from 'react-document-title'
import {connect} from 'snugg-redux'
import {UISIZE, ANIMATION} from 'app/lib/global-styles'
import {SectionCard} from 'ui'
import JobContextPane from './JobContextPane'
import dynamicResize from 'decorators/dynamicResize'
import JobFormSectionHeader from './JobFormSectionHeader'
import JobformHeaderAndSecondaryNav from './JobformHeaderAndSecondaryNav'
import JobFormRefineModal from './JobFormRefineModal'
import HvacModal from '../hvacs/HvacModal'
import CazSystemModal from './jobform-sections/caz-system-modal'
import {Row, Col} from 'react-bootstrap'
import headerAndSecondaryNavDecorator from '../../decorators/headerAndSecondaryNavDecorator'
import {ContextPane, InputInfoBox} from 'app/components/overlays'
import {dispatchLocal} from 'data/actions'


import {segmentsType} from 'data/types'

@connect((state, {jobId}) => {
  const job = state.fn.jobById(jobId)
  return {
    title: f.job.pageTitle(job, "> Input | Snugg Pro"),
    isSampleJob: job.get('sample_job')
  }
}, {dispatchLocal})
@dynamicResize
export class JobForm extends Component {

  static propTypes = {
    segments: segmentsType,
    showSecondaryNav: PropTypes.bool.isRequired
  };

  static contextTypes = {
    hideSecondaryNav: PropTypes.func.isRequired
  };

  hideSecondaryNav = () => {
    if (this.props.showSecondaryNav) {
      setTimeout(this.context.hideSecondaryNav, 220)
    }
  };

  componentWillUnmount() {
    if (this.props.showSecondaryNav) {
      this.context.hideSecondaryNav()
    }
    this.props.dispatchLocal('contextState', {lastFocusedField: null})
  }

  getStyle(props) {
    const {showSecondaryNav} = this.props
    const {screenSize} = dimensions
    return (
      Object.assign({},
        {
          transition: ANIMATION,
          // marginLeft: UISIZE.secondaryJobformNavWidth,
          marginTop: 0,
          paddingTop: UISIZE.header,
          paddingLeft: 10
        },
        screenSize === 'xs' && {marginLeft: 0, paddingTop: UISIZE.xsJobHeader, paddingLeft: 0},
        screenSize === 'xs' && !showSecondaryNav && {transform: 'none'},
        screenSize === 'xs' && showSecondaryNav && {transform: `translateX(${UISIZE.secondaryJobformNavWidth}px)`}
      )
    )
  }

  render() {
    const {
      props: {jobId, title, segments: {three, four}, activeSection, isSampleJob}
    } = this
    const showRefineModal = three === 'quickrefine'
    const showHvacModal = three === 'hvac'
    const showCazModal = three === 'cazsystem'
    const {screenSize} = dimensions
    return (
      <DocumentTitle title={title}>
        <Row className="animated fadeIn">
          <Col sm={2} id="screen-nav">
            <JobformHeaderAndSecondaryNav
              jobId={jobId}
              visibleSections={JOBFORM_SECTIONS}
              hideSecondaryNav={this.hideSecondaryNav}
              showSecondaryNav={this.props.showSecondaryNav}
              activeSection={activeSection} />
          </Col>
          <Col sm={7} id="main-pane">
            {screenSize === "xs" ?
              <JobFormSectionHeader fixed jobId={jobId} label={activeSection} /> : null }
            <div className="job-container job-form" style={this.getStyle(this.props)}>
              <InputInfoBox jobId={jobId} isSampleJob={isSampleJob}/>
              {JOBFORM_SECTIONS.map(section => {
                const {componentName, label} = section
                const Section = Sections[componentName]
                invariant(
                  Section,
                  'Missing / incorrect jobform section definition for %s',
                  componentName
                );
                return (
                  <Element name={componentName} id={`jobform-scroll-${componentName}`} key={componentName} >
                    <SectionCard.Container>
                      <JobFormSectionHeader jobId={jobId} label={label} />
                      <SectionCard.Body>
                        <form onSubmit={e => e.preventDefault()}>
                          <Section jobId={jobId} />
                        </form>
                      </SectionCard.Body>
                    </SectionCard.Container>
                  </Element>
                )
              })}
            </div>
          </Col>
          <Col sm={3} id="context-placeholder">
            <ContextPane>
              <JobContextPane activeSection={activeSection} jobId={jobId} />
            </ContextPane>
          </Col>
          <div>
            {showRefineModal ? <JobFormRefineModal
              jobId={jobId}
              show={showRefineModal}
              refineSection={four} /> : null}
            <HvacModal
              source="job"
              jobId={jobId}
              show={showHvacModal}
              uuid={four} />
            <CazSystemModal
              jobId={jobId}
              show={showCazModal}
              systemUUID={four} />
          </div>
        </Row>
      </DocumentTitle>
    )
  }
}

@connect((state) => {
  return {
    visibleSections: JOBFORM_SECTIONS,
    activeSection: state.localState.get('activeSection')
  }
})
@headerAndSecondaryNavDecorator('jobform')
export default class JobFormContainer extends React.Component {
  render() {
    return <JobForm {...this.props} />
  }
}
