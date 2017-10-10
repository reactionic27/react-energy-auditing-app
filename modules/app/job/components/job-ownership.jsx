import React from 'react'
import * as f from 'data/formatters'
import {connect} from 'snugg-redux'


@connect((state, {jobId}) => {
  const company = state.fn.companyByJobId(jobId)
  const program = state.fn.programByJobId(jobId)
  const account = state.fn.accountByJobId(jobId)
  const job = state.fn.jobById(jobId)
  return {
    canAdminJobCompany: company && f.account.canAdminCompany(state, company),
    companyId: company && company.get('id'),
    programId: program && program.get('id') || 1,
    stageId: job.get('stage_id'),
    accountId: account ? account.get('id') : null,
    accounts: company && f.account.accountsDropdown(state.fn.accountsByCompanyId(company.get('id'))),
    stageOptions: f.stages.stageOptionGroups()
  }
})
export default class JobInfo extends React.Component {

  render() {
    const {canAdminJobCompany, jobId, companyId, programId, accountId, accounts, stageOptions} = this.props
    return (
      <fieldset>
        {companyId ? <Snugg.Input id={companyId} label="Company:" field="Company Name" disabled /> : null}
        <Snugg.Input id={programId} label="Progam:" field="Program Name" disabled />
        <Snugg.Select id={jobId} label="Stage:" field="Job Stage id" options={stageOptions} companyId={companyId} />
        {accountId && (canAdminJobCompany
          ? <Snugg.Select id={jobId} field="Job Account id" label="Account" options={accounts} />
          : <Snugg.Input id={accountId} label="Account" field="Account: First name" disabled />
        )}
      </fieldset>
    )
  }

}
