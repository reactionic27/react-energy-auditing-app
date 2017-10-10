import React from 'react'
import {connect, connectSelector} from 'snugg-redux'
import SettingsHeader from 'app/components/settingsheader'
import SettingsTemplateRow from './SettingsTemplateRow'
import DocumentTitle from 'react-document-title'
import {View, Row, Col, PrimaryButton, SecondaryButton, BlankText} from 'ui'

@connectSelector({
  templates: (state, {companyId}) => state.fn.templateJobsByCompanyId(companyId)
})
class CompanyTemplatesList extends React.Component {
  render() {
    const {templates} = this.props
    const showDelete = this.props.showDeleteButton
    if (templates.length === 0) return <EmptyTemplates type="companyId" />
    return (
      <div className="listings">
        {templates.map(tmpl => <SettingsTemplateRow showDelete={showDelete}  key={tmpl.get('id')} template={tmpl} />)}
      </div>
    )
  }
}

@connect((state) => {
  const user = state.fn.loggedInUser()
  return {
    personalTemplates: state.fn.templateJobsByAccountId(user.get('id')),
    adminCompanies: state.fn.adminCompaniesByUser(user),
    userCompanies: state.fn.userCompaniesByUser(user)
  }
})
export default class SettingsTemplatesPage extends React.Component {

  static contextTypes = {
    isProgramAdmin: React.PropTypes.bool
  };

  render() {
    const {adminCompanies, userCompanies, personalTemplates} = this.props
    const {isProgramAdmin} = this.context
    return (
      <DocumentTitle title="Job Templates | Snugg Pro">
        <View>
          <SettingsHeader pageTitle="Job Templates"/>
          <Row>
            <div className="header-instructions">
              <p>
                Use job templates to create jobs with pre-existing data.  Template creation is free.
                <br/>
                You can learn about templates in <a href="https://snuggpro.com/help/article/v5-template-updates1" target="_blank">this knowledge base article.</a>
              </p>
              <Row>
                <Col sm={5} md={4} lg={3}>
                  <PrimaryButton to="/create-template" label="Create a new template" />
                </Col>
                <Col sm={4} md={3}>
                  <SecondaryButton to="/create-job" label="Create a new job" disabled={isProgramAdmin} />
                </Col>
              </Row>
            </div>
            <Col sm={12}>
              <h2>Personal templates</h2>
              <p className="muted">Only you can see, edit and use these templates</p>
              <div className="listings">
                {personalTemplates.length === 0
                  ? <EmptyTemplates type="personal" />
                  : personalTemplates.map(tmpl => (
                    <SettingsTemplateRow showDelete key={tmpl.get('id')} template={tmpl} />
                  ))
                }
              </div>
              <h2>Company templates</h2>
              <p className="muted">
                All users of a company can use these templates when creating a job for the company.
                Only admins can create and edit these templates.
              </p>
              {adminCompanies.map(company => (
                <div key={company.get('id')}>
                  <h4>{company.get('name')}</h4>
                  <p className="muted">
                    As an admin, you can edit these templates.
                  </p>
                  <CompanyTemplatesList showDeleteButton companyId={company.get('id')} />
                </div>
              ))}
              {userCompanies.map(company => (
                <div key={company.get('id')}>
                  <h4>{company.get('name')}</h4>
                  <p className="muted">
                    As a user, you can choose from these templates when creating a job for this company.
                  </p>
                  <CompanyTemplatesList showDeleteButton={false} companyId={company.get('id')} />
                </div>
              ))}
            </Col>
          </Row>
        </View>
      </DocumentTitle>
    )
  }

}

const EmptyTemplates = ({type}) => (
  <BlankText>
    {type === 'personal' ? "You don't have any templates yet" : "This company has no templates"}
  </BlankText>
)
