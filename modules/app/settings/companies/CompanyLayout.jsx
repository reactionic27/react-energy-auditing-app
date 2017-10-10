import {connect} from 'snugg-redux'
import React from 'react'
import {Link, browserHistory} from 'react-router'
import {Tabs, Row} from 'ui'
import SettingsHeader from 'app/components/settingsheader'
import DocumentTitle from 'react-document-title'
import {BackLink} from 'ui'
import * as f from 'data/formatters'

@connect((state, {companyId}) => {
  const company = state.fn.companyById(companyId)
  return {
    company,
    canAdmin: f.account.canAdminCompany(state, company)
  }
})
export default class CompanyLayout extends React.Component {

  static contextTypes = {
    isSnuggAdmin: React.PropTypes.bool.isRequired,
  };

  componentDidMount() {
    if (!(this.props.canAdmin || this.context.isSnuggAdmin)) {
      browserHistory.push('/settings/companies')
    }
  }
  render() {
    let {params: {companyId}, segments: {four}, company} = this.props
    return (
      <DocumentTitle title={`Settings > ${company.get('name')} | Snugg Pro`}>
        <div>
          <SettingsHeader pageTitle={company.get('name')} />
          <Row>
            <div className="header-instructions">
              <BackLink to="/settings/companies" backLabel="Return to companies" />
              <p>Update company details and manage users for {company.get('name')}</p>
            </div>
          </Row>
          <Tabs active={four} rootLink={`/settings/company/${companyId}`} >
            <Tabs.Link label="Company Profile" />
            <Tabs.Link match='billing' label="Billing" />
            <Tabs.Link match='users' label="Users" />
          </Tabs>
          <div className="tab-content">
            <div className="tab-pane active">
              {this.props.children}
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
