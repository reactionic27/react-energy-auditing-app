import React, {PropTypes} from 'react'
import {Tab, Nav, NavItem} from 'react-bootstrap'
import HesViewScore from './hes/HesViewScore'
import HesGetScore from './hes/HesGetScore'
import HesHasNoAssessorId from './hes/HesHasNoAssessorId'
import {connect} from 'react-redux'
import * as f from 'data/formatters'

@connect(state => {
  return {
    isHesAssessor: f.account.isHesAssessor(state.fn.loggedInUser())
  }
})
export default class HesReportContent extends React.Component {

  constructor(props, {printing}) {
    super(...arguments)
    this.state = {
      activeTab: printing ? 2 : 1
    }
  }

  static contextTypes = {
    printing: React.PropTypes.bool
  }

  static PropTypes = {
    jobId: PropTypes.number,
  }

  render() {
    const {
      props: {jobId, isHesAssessor, segments},
      state: {activeTab},
      context: {printing}
    } = this
    return (
      <Tab.Container id="hes-score-tabs" activeKey={activeTab} onSelect={(key) => this.setState({activeTab: key})}>
        <div>
          {printing ? null :
            <Nav bsStyle="tabs" pullRight style={styles.nav}>
              <NavItem eventKey={1} style={styles.navItem}>
                Get Score
              </NavItem>
              <NavItem eventKey={2}>
                View Score
              </NavItem>
            </Nav>
          }

          <Tab.Content animation>
            <Tab.Pane eventKey={1} >
              {isHesAssessor ? <HesGetScore jobId={jobId} segments={segments} /> : <HesHasNoAssessorId />}
            </Tab.Pane>
            <Tab.Pane  eventKey={2} style={{padding: 0}}>
              <HesViewScore jobId={jobId} />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    );
  }
}

const styles = {
  nav: {
    marginTop: -76
  },
  tabPane: {
    padding: 0
  }
}
