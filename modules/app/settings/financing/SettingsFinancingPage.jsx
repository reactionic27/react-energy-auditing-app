import React from 'react'
import {connect} from 'snugg-redux'
import FinancingCompanyCardBlock from './FinancingCompanyCardBlock'
import FinancingAccountCardBlock from './FinancingAccountCardBlock'
import FinancingProgramCardBlock from './FinancingProgramCardBlock'
import SettingsHeader from 'app/components/settingsheader'
import {View, Row, Col, PrimaryButton, Icon} from 'ui'
import DocumentTitle from 'react-document-title'

@connect((state, props) => {
  return {
    companies: state.fn.companiesByUser(state.fn.loggedInUser()),
    programs: state.snugg.get('programs').toArray() || []
  }
})
export default class SettingsFinancingPage extends React.Component {

  render() {
    const {companies, programs} = this.props
    return (
      <DocumentTitle title="Settings > Financing Product Templates | Snugg Pro">
        <View id="settings-financing">
          <SettingsHeader pageTitle="Financing Product Templates"/>
          <div className="settings settings-financing">
            <Row>
              <div className="header-instructions">
                <Row>
                  <Col sm={6}>
                    <p>Financing products templates can be used to automatically calculate monthly payments, cashflow, and more.
                    While performing a job, you can choose which product(s) to feature on the homeowner report.</p>
                  </Col>
                  <Col sm={6} md={5} lg={4} mdOffset={1} lgOffset={2}>
                    <PrimaryButton to="/settings/financing/create">
                      <Icon type="addNew" /> Add a reusable financing product
                    </PrimaryButton>
                  </Col>
                </Row>
              </div>
            </Row>
            <div className='cards'>
              <h2>Your Personal Templates:</h2>
              <FinancingAccountCardBlock />
            </div>
            <hr/>
            <div className="cards">
              <h2>Templates by company:</h2>
              <p>
                These products can be seen by you and users of the respective company.<br/>
                Company admins can edit these products.
                Company users can only view them and apply them to jobs.
              </p>
              {companies.map(company => (
                <FinancingCompanyCardBlock key={company.get('id')} company={company} />
              ))}
            </div>
            <hr/>
            <div className='cards'>
              <h2>Templates by program:</h2>
              <p>These products can be seen by you and all approved companies within a program.<br/>Only program admins can edit these products.</p>
              {programs.map(program => (
                <FinancingProgramCardBlock key={program.get('id')} program={program} />
              ))}
            </div>
          </div>

        </View>
      </DocumentTitle>
    )
  }

}
