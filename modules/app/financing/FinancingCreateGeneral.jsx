import React from 'react'
import SettingsHeader from '../components/settingsheader'
import FinancingFormContainer from './FinancingFormContainer'
import DocumentTitle from 'react-document-title'
import {BackLink} from 'ui'
import {Row, Col} from 'react-bootstrap'

export default class CreateFinancingTemplate extends React.Component {
  render() {
    return (
      <DocumentTitle title="Settings > Financing > New reusable financing product | Snugg Pro">
        <div className="animated fadeIn">
          <SettingsHeader pageTitle="Financing > New" />
          <div className="row">
            <div className="header-instructions">
              <BackLink backLabel="Cancel and return to financing products" to="/settings/financing" />
              <p>This financing product will be accessible within your jobs.
              Adding reusable products lets you easily calculate and offer financing options in the audit report.
              You can select an existing financing product as a starting point or start from scratch.</p>
            </div>
          </div>
          <h2>Add a new reusable financing product</h2>
          <Row>
            <Col sm={8} md={6}>
              <FinancingFormContainer
                isTemplate
                submitLabel="Add product"
                cancelPath='/settings/financing' />
            </Col>
          </Row>
        </div>
      </DocumentTitle>
    )
  }

}
