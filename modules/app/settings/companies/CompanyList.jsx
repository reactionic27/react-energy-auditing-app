import React from 'react'
import {Row, Icon} from 'ui'
import {Link} from 'react-router'
import CreateCompanyForm from './CreateCompanyForm'
import CompanyCard from './CompanyCard'
import SettingsHeader from 'app/components/settingsheader'
import DocumentTitle from 'react-document-title'
import {connectSelector} from 'snugg-redux'

@connectSelector({
  adminCompanies: (state) => {
    return state.fn.adminCompaniesByUser(state.fn.loggedInUser())
  },
  userCompanies: (state) => {
    return state.fn.userCompaniesByUser(state.fn.loggedInUser())
  },
})
export default class CompanyList extends React.Component {

  render() {
    const shouldShowModal = this.props.segments.three === 'add-new'
    const {adminCompanies, userCompanies} = this.props
    return (
      <DocumentTitle title="Settings > Your companies | Snugg Pro">
        <div className="settings settings-companies">
          <SettingsHeader pageTitle="Your Companies" />

          <Row>
            <div className="header-instructions">
              <p>Manage and view the companies you work with.</p>
            </div>
          </Row>

          <div className="cards">
            <h2>You are an admin for these companies:</h2>
            <p>You can manage the following companies’ contact info, billing details and users</p>
            <Row>
              {adminCompanies.map(c => (
                <CompanyCard role="admin" company={c} key={c.get('id')} isEditable />
              ))}
            </Row>
          </div>

          <div className="cards">
            <h2>You are an authorized user for these companies:</h2>
            <p>You can create jobs and view those jobs in these companies.  You cannot manage these companies' contact info, billing details or users.</p>
            <Row>
              {userCompanies.map(c => (
                <CompanyCard role="user" company={c} key={c.get('id')} isEditable={false} />
              ))}
            </Row>
          </div>
          <hr/>
          <h2>Need another company?</h2>
          <p>Create a new company when you want to manage certain auditing activities
          independently of the existing companies you work with. This is free and does not affect your relationship or
          access privileges with existing companies.</p>

          <h5>
            <Link to='/settings/companies/add-new'>
              <Icon type="addNew"/> Create a new company
            </Link>
          </h5>

          <CreateCompanyForm show={shouldShowModal} />
        </div>
      </DocumentTitle>
    )
  }
};
