import React, {PropTypes} from 'react'
import FinancingCard from './FinancingCard'
import {connectSelector} from 'snugg-redux'
import * as f from 'data/formatters'
import {Row, Col} from 'ui'
import {InlineNotification} from 'app/components/overlays'

function EmptyTemplates({canAdmin, companyId}) {
  return (
    <Col sm={12}>
      <InlineNotification>
        This company has no financing product templates.
      </InlineNotification>
    </Col>
  )
}


@connectSelector({
  canAdmin: (state, {company}) => f.account.canAdminCompany(state, company),
  companyFinancingTemplates: (state, {company}) => state.fn.financingTemplatesByCompanyId(company.get('id')),
})
export default class FinancingCompanyCardBlock extends React.Component {

  static propTypes = {
    companyName: PropTypes.string,
    financingTemplates: PropTypes.array,
    canAdmin: PropTypes.bool
  };

  render() {
    // TODO: early return if no products available
    // if (financingTemplates.length === 0) return null
    const {company, canAdmin, companyFinancingTemplates} = this.props

    const templateRows = companyFinancingTemplates.length === 0
      ? <EmptyTemplates canAdmin={canAdmin} />
      : companyFinancingTemplates.map(template => {
        return <FinancingCard template={template} editable={canAdmin} key={template} />
      })

    return (
      <div className="clearfix">
        <h4>{company.get('name')}</h4>
        <Row>
          {templateRows}
        </Row>
        <br/>
      </div>
    )
  }

}
