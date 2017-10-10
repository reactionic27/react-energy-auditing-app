import React from 'react'
import {Map as IMap} from 'immutable'
import {Link} from 'react-router';
import {Col, Icon} from 'ui'
import {connectSelector} from 'snugg-redux'
import * as f from 'data/formatters'

@connectSelector({
  pendingInviteCount: (state, {company}) => state.fn.pendingInvitesByCompanyId(company.get('id')).length,
  associatedAccountsCount: (state, {company}) => state.fn.accountsByCompanyId(company.get('id')).length
})
export default class CompanyCard extends React.Component {

  static propTypes = {
    company: React.PropTypes.instanceOf(IMap).isRequired
  };

  getHeader(props) {
    let {company, role, isEditable} = this.props
    return (
      <div className="card-header" disabled={!isEditable}>
        <div>
          {company.get('name')}
          {role !== "user" && <Icon type="edit" size={13}/>}
        </div>
      </div>
    )
  }

  getBodyAndFooter() {
    let {pendingInviteCount, associatedAccountsCount, company} = this.props
    return (
      <div>
        <ul>
          <li>Billing info:
            <span className="value">
              {company.get('stripe_id') ? <Icon type="completed" /> : <Icon type="missing" />}
            </span>
          </li>
          <li>Active users:
            <span className="value">{associatedAccountsCount}</span>
          </li>
          <li>Pending invitations:
            <span className="value">{pendingInviteCount}</span>
          </li>
          <li>Profile:
            <span className="value">{f.company.hasCompanyProfile(company) ? "Complete" : "Incomplete"}</span>
          </li>
        </ul>
      </div>
    )
  }

  render() {
    let {company, role} = this.props
    if (role === 'user') {
      return (
        <Col sm={6} md={4} lg={3}>
          <div className="card card-fluid card-readonly">
            {this.getHeader(this.props)}
            {this.getBodyAndFooter(this.props)}
          </div>
        </Col>
      )
    }
    return (
      <Col sm={6} md={4} lg={3}>
        <Link className="card card-fluid" to={`/settings/company/${company.get('id')}`}>
          {this.getHeader(this.props)}
          {this.getBodyAndFooter(this.props)}
        </Link>
      </Col>
    )
  }
}
