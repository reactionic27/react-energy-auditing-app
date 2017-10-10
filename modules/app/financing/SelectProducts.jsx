import React from 'react'
import {connect} from 'snugg-redux'
import {Modal} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import {InlineNotification} from 'app/components/overlays'
import TemplateListItem from './TemplateListItem'
import Color from 'color'
import {palette} from 'app/lib/global-styles'

const FinancingBlankState = () => (
  <div style={{padding: '0 10px'}}>
    <InlineNotification message="There are no financing product templates available for this job." />
  </div>
)

@connect((state, {jobId}) => {
  const job = state.fn.jobById(jobId)
  const accountTemplates = state.fn.financingTemplatesByAccountId(state.fn.loggedInUser().get('id'))
  const companyTemplates = state.fn.financingTemplatesByCompanyId(job.get('company_id'))
  const programTemplates = state.fn.financingTemplatesByProgramId(job.get('program_id'))
  return {
    accountTemplates,
    companyTemplates,
    programTemplates,
    noTemplates:
    accountTemplates.length === 0
      && companyTemplates.length === 0
      && programTemplates.length === 0
  }
})
export default class AddJobProduct extends React.Component {

  render() {
    const {show, jobId, noTemplates, accountTemplates, companyTemplates, programTemplates} = this.props
    let financingBlocks = []

    if (accountTemplates.length > 0) {
      financingBlocks.push(
        <div key="account">
          <div style={styles.divider}>Account Templates</div>
          {accountTemplates.map(template => {
            return <TemplateListItem template={template} key={template.get('id')} />
          })}
        </div>
      )
    }
    if (companyTemplates.length > 0) {
      financingBlocks.push(
        <div key="company">
          <div style={styles.divider}>Company Templates</div>
          {companyTemplates.map(template => {
            return <TemplateListItem template={template} key={template.get('id')} />
          })}
        </div>
      )
    }
    if (programTemplates.length > 0) {
      financingBlocks.push(
        <div key="program">
          <div style={styles.divider}>Program Templates</div>
          {programTemplates.map(template => {
            return <TemplateListItem template={template} key={template.get('id')} />
          })}
        </div>
      )
    }

    return (
      <Modal show={show} dialogClassName="modal-add-financing" onHide={() => {
        browserHistory.replace(`/job/${jobId}/financing`)
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Add financing product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {noTemplates
            ? <FinancingBlankState />
            : financingBlocks
          }
          <div style={styles.divider}>More options</div>
          <TemplateListItem
            isCustom
            title="Create your own product for this job"
            to={`/job/${jobId}/financing/create`}>
            Applies to this job only. Visit the settings section if you want
            to add reusable financing products.
          </TemplateListItem>
        </Modal.Body>
      </Modal>
    )
  }
};

const styles = {
  divider: {
    backgroundColor: palette.BEIGE,
    color: Color(palette.BROWN).clearer(0.3).rgbString(),
    padding: '5px 10px',
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.02em'
  }
}
