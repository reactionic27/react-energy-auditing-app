import React from 'react'
import Tabs from 'ui/tabs'
import {Link} from 'react-router'
import SettingsHeader from 'app/components/settingsheader'
import {Col, Row} from 'ui'

export default class SettingsAccount extends React.Component {

  static contextTypes = {
    isProgramAdmin: React.PropTypes.bool
  };

  render() {
    const {
      props: {segments},
      context: {isProgramAdmin}
    } = this
    return (
      <div>
        <SettingsHeader pageTitle="Your profile"/>
        <Row>
          {!isProgramAdmin && <div className="header-instructions">
            <p>Manage your company including branding,  billing, and team members in <Link to="/settings/companies">company settings</Link>.</p>
          </div>}
        </Row>
        <Row>
          <Col sm={12}>
            <div className="ma-to-20">
              <Tabs rootLink='/settings' active={segments.two}>
                {!isProgramAdmin && <Tabs.Link label="Profile" />}
                <Tabs.Link match="password" label="Password" />
                <Tabs.Link match="preferences" label="Preferences" />
              </Tabs>
              <div className="tab-content">
                <div className="tab-pane active">
                  {this.props.children}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
