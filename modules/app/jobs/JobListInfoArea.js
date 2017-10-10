import React from 'react'
import {Link} from 'react-router'
import {Row, Col, Clearfix} from 'react-bootstrap'
import {Button} from 'ui'
import {InfoBox} from 'app/components/overlays'

import {connect} from 'snugg-redux'
import * as f from 'data/formatters'
import ProgramJobExportModal from './ProgramJobExportModal'
import {ANIMATION, palette} from 'app/lib/global-styles'
import moment from 'moment'

@connect((state, {companyId}) => {
  const company = state.fn.companyById(companyId)
  const userId = state.fn.loggedInUser().get('id')
  const user = state.fn.accountById(userId)
  const isProfileComplete = f.company.hasCompanyProfile(company)
  const showOnboardingJobsList = state.localStorage.showOnboardingJobsList
  const onboardingJobsListTouched = state.localStorage.onboardingJobsListTouched
  const associatedAccountsCount = state.fn.accountsByCompanyId(company.get('id')).length
  const pendingInviteCount = state.fn.pendingInvitesByCompanyId(company.get('id')).length
  const hasInvitedTeamMembers = associatedAccountsCount + pendingInviteCount > 1
  return {
    company,
    canAdmin: f.account.canAdminCompany(state, company),
    currentUserName: user.get('first_name'),
    isProfileComplete,
    user,
    showOnboardingJobsList,
    onboardingJobsListTouched,
    hasInvitedTeamMembers
  }
})
export default class JobListInfoArea extends React.Component {

  static contextTypes = {
    isSnuggAdmin: React.PropTypes.bool,
    isProgramAdmin: React.PropTypes.bool
  };

  constructor(props) {
    super(...arguments)
    this.state = {
      showProgramJobExport: false,
    };
  }

  componentDidMount() {
    if (moment(this.props.user.get('created_at')).add(14, 'days') > moment() &&
        !this.props.onboardingJobsListTouched) {
      this.props.dispatch({type: 'toggleOnboardingJobsList'})
    }
  }

  showProgramJobExport = (e) => {
    e.preventDefault()
    this.setState({
      showProgramJobExport: true
    })
  }

  hideProgramJobExport = (e) => {
    this.setState({
      showProgramJobExport: false
    })
  }


  toggleGuide = (e) => {
    e.preventDefault()
    this.props.dispatch({type: 'toggleOnboardingJobsList'})
    if (!this.props.onboardingJobsListTouched) {
      this.props.dispatch({type: 'setOnboardingJobsListTouched'})
    }
  }

  render() {
    const {
      props: {canAdmin, company, currentUserName, isProfileComplete, showOnboardingJobsList, hasInvitedTeamMembers},
      context: {isProgramAdmin}
    } = this

    const computedContainerStyle = showOnboardingJobsList ? containerStyle : containerStyleCollapsed
    return (
      <Row>
        <div style={computedContainerStyle}>
          <Col xs={7}>
            <div style={{marginTop: 5, marginBottom: 5}}>
              Welcome <Link to="/settings">{currentUserName}</Link>.&nbsp;
                {isProgramAdmin ?
                  <span>
                    You're a program admin.
                    <br/>
                    <Button variant="link"
                      onClick={this.showProgramJobExport}
                      label="Download your program jobs"
                      customStyle={{width: 'auto', fontSize: 'inherit', paddingLeft: 0, paddingRight: 0}} />
                  </span>
                : null}
                {isProgramAdmin ?
                  <ProgramJobExportModal
                    show={this.state.showProgramJobExport}
                    hideProgramJobExport={this.hideProgramJobExport} />
                  : null
                }
            </div>
          </Col>
          <Col xs={5}>
            {!isProgramAdmin ?
              <Button variant="link"
                label={showOnboardingJobsList ? "Hide startup guide" : "Show startup guide"}
                size="sm"
                onClick={this.toggleGuide}
                isFlat
                customStyle={showHideButtonStyle} />
            : null
            }
          </Col>
          <Clearfix />
          <div className={`inlay animated ${showOnboardingJobsList ? 'fadeIn inlay-open' : 'fadeOut'}`}>
            <br/>
            <Col sm={12} lg={10} lgOffset={1}>
              <div style={{fontSize: 24, fontWeight: 600, paddingBottom:5}}>Let's get started.</div>
              <p style={{color: 'rgba(0,0,0,0.7)'}}>Explore these helpful pointers to get up to speed with Snugg Pro.</p>
              <Row>
                {canAdmin && !isProfileComplete ?
                  <Col sm={6}>
                    <Link to={`/settings/company/${company.get('id')}`}>
                      <InfoBox
                        size="sm"
                        isClickable
                        title="Complete your company profile"
                        srcIcon="companyProfileIcon">
                        <Row>
                          <Col sm={12}>
                            Make your reports stand out by customizing them with your company details.
                          </Col>
                          {/*<Col xs={3} md={2}>
                            <RoundCaret
                              size="sm" >
                              <Icon type="right"/>
                            </RoundCaret>
                          </Col>*/}
                        </Row>
                      </InfoBox>
                    </Link>
                  </Col>
                  : null
                  }
                <Col sm={6}>
                  <a href="https://snuggpro.com/webinars/training?adgroup=onboarding-cta" target="_blank">
                    <InfoBox
                      size="sm"
                      isClickable
                      title="Access the online training resources"
                      srcIcon="webinarIcon">
                      <Row>
                        <Col sm={12}>
                          Get {canAdmin ? 'you and your team ' : ''} up to speed quickly by attending our live webinars or watching the training videos.
                        </Col>
                        {/*<Col xs={3} md={2}>
                          <RoundCaret>
                            <Icon type="right"/>
                          </RoundCaret>
                        </Col>*/}
                      </Row>
                    </InfoBox>
                  </a>
                </Col>
                <Col sm={6}>
                  <a href="https://snuggpro.com/help/article/field-sheets" target="_blank">
                    <InfoBox
                      size="sm"
                      isClickable
                      title="Get the paper field sheets"
                      srcIcon="fieldSheetIcon">
                      <Row>
                        <Col sm={12}>
                          Print out the field sheets if you collect data using a clipboard, or if you just want to see our inputs on paper.
                        </Col>
                      </Row>
                    </InfoBox>
                  </a>
                </Col>
                {canAdmin && !hasInvitedTeamMembers ?
                  <Col sm={6}>
                    <Link to={`/settings/company/${company.get('id')}/users`}>
                      <InfoBox
                        size="sm"
                        isClickable
                        title="Invite your team"
                        srcIcon="usersIcon">
                        <Row>
                          <Col sm={12}>
                            Get your teammates to join {company.get('name')} on Snugg Pro and unlock the power of real-time collaboration.
                          </Col>
                        </Row>
                      </InfoBox>
                    </Link>
                  </Col>
                  : null
                  }
                <Col sm={6}>
                  <Link to="/settings/templates">
                    <InfoBox
                      size="sm"
                      isClickable
                      title="Save time with job templates"
                      srcIcon="templatesIcon">
                      <Row>
                        <Col sm={12}>
                          {canAdmin ?
                            'Create custom job templates that you can share with your company or keep for yourself.'
                            :
                            'Learn more about templates and create personal templates for youself.'
                          }
                        </Col>
                      </Row>
                    </InfoBox>
                  </Link>
                </Col>
                {/*{canAdmin ?
                  <Col sm={6}>
                    <Link to={`/settings/company/${company.get('id')}/billing`}>
                      <InfoBox
                        size="sm"
                        isClickable
                        title="Check out our pricing plans"
                        srcIcon="pricingPlanIcon">
                        <Row>
                          <Col sm={12}>
                            Discover our volume based discounted monthly plans along with the default pay-per-job.
                          </Col>
                        </Row>
                      </InfoBox>
                    </Link>
                  </Col>
                  : null
                }*/}
                <Col sm={6}>
                  <a href="https://snuggpro.com/help/article/mobile-device-compatibility-list" target="_blank">
                    <InfoBox
                      size="sm"
                      isClickable
                      title="Device & browser compatibility"
                      srcIcon="mobileIcon">
                      <Row>
                        <Col sm={12}>
                          Snugg Pro runs the web browser of your smartphones, tablet or computer.
                        </Col>
                      </Row>
                    </InfoBox>
                  </a>
                </Col>
              </Row>
            </Col>
            <Clearfix />
          </div>
          <Clearfix/>
        </div>
      </Row>
    )
  }
}

const containerStyle = {
  transition: ANIMATION,
  paddingTop: 5,
  paddingBottom: 5,
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  backgroundColor: palette.BEIGE
}

const containerStyleCollapsed = {
  ...containerStyle,
  backgroundColor: '#ffffff',
  borderBottom: 'none'
}
const showHideButtonStyle = {
  display: 'inline-block',
  width: 'auto',
  marginLeft: 10,
  marginTop: 2,
  float: 'right'
}
