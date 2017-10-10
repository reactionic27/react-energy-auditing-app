import React from 'react'
import {connectSelector} from 'snugg-redux'
import SettingsHeader from 'app/components/settingsheader'
import FinancingFormContainer from './FinancingFormContainer'
import DocumentTitle from 'react-document-title'
import {BackLink} from 'ui'

@connectSelector({
  editing: (state, {financingId}) => state.fn.financingTemplateById(financingId)
})
export default class EditFinancingTemplate extends React.Component {

  render() {
    return (
      <DocumentTitle title="Financing > Edit | Snugg Pro">
        <div>
          <SettingsHeader pageTitle="Financing > Edit" />
          <div className="row">
            <div className="header-instructions">
              <BackLink
                backLabel="Cancel and return to financing products"
                to="/settings/financing" />
              <p>Edit this product for future jobs. If you have already applied this
              product to an existing job, that job will not reflect your changes.</p>
            </div>
          </div>
          <h2>Edit {this.props.productTitle}</h2>
          <FinancingFormContainer
            {...this.props}
            isTemplate
            submitLabel="Save changes"
            cancelPath="/settings/financing" />
        </div>
      </DocumentTitle>
    )
  }

}
