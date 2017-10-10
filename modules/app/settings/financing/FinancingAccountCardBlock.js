import React from 'react'
import FinancingCard from './FinancingCard'
import {connectSelector} from 'snugg-redux'
import {Row, Col} from 'ui'
import {InlineNotification} from 'app/components/overlays'

function EmptyTemplates() {
  return (
    <Col sm={12}>
      <InlineNotification>
        You have no financing product templates.
      </InlineNotification>
    </Col>
  )
}


@connectSelector({
  accountFinancingTemplates: (state) => state.fn.financingTemplatesByAccountId(state.fn.loggedInUser().get('id'))
})
export default class FinancingAccountCardBlock extends React.Component {

  render() {
    const {accountFinancingTemplates} = this.props

    const templateRows = accountFinancingTemplates.length === 0
      ? <EmptyTemplates />
      : accountFinancingTemplates.map(template => {
        return <FinancingCard template={template} editable key={template} />
      })

    return (
      <div className="clearfix">
        <Row>
          {templateRows}
        </Row>
        <br/>
      </div>
    )
  }

}
