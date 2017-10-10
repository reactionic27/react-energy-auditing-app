import React from 'react'
import FinancingCard from './FinancingCard'
import {connectSelector} from 'snugg-redux'
import {Row, Col} from 'ui'
import {InlineNotification} from 'app/components/overlays'

function EmptyTemplates() {
  return (
    <Col sm={12}>
      <InlineNotification>
        This program has no financing product templates.
      </InlineNotification>
    </Col>
  )
}


@connectSelector({
  programFinancingTemplates: (state, {program}) => state.fn.financingTemplatesByProgramId(program.get('id')),
})
export default class FinancingProgramCardBlock extends React.Component {

  render() {
    const {program, programFinancingTemplates} = this.props

    const templateRows = programFinancingTemplates.length === 0
      ? <EmptyTemplates />
      : programFinancingTemplates.map(template => {
        return <FinancingCard template={template} editable={false} key={template} />
      })

    // Don't show any financing products for program called 'none'
    if (program.get('id') === 1) {
      return null
    }

    return (
      <div className="clearfix">
        <h4>{program.get('name')}</h4>
        <Row>
          {templateRows}
        </Row>
        <br/>
      </div>
    )
  }

}
