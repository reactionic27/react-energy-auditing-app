import React from 'react'
import {Map as IMap} from 'immutable'
import {STAGES} from '../constants'
import strip from 'util/strip'
import * as f from 'data/formatters'

export function isJobSelected(state, jobId: number) {
  return state.localState.get('selectedJobs').includes(jobId)
}

export function pageTitle(job: IMap, customText = '') {
  const first_name = job.get('first_name') || ''
  const last_name = job.get('last_name') || ''
  if (job.get('is_template')) {
    return strip`${first_name} ${customText}`
  }
  return strip`${first_name} ${last_name.slice(0, 1)}. ${customText}`
};

export const fullName = (job: IMap) => {
  const lastName = job.get('last_name', '')
  const firstName = job.get('first_name', '')
  if (job.get('is_template')) {
    return firstName
  }
  return strip`${firstName} ${lastName}`
}

export const stageName = (job: IMap) => {
  const stageId = job.get('stage_id', 5)
  const stage = STAGES.find(s => s[0] === stageId)
  return stage ? stage[1] : 'Uncategorized'
}

// company templates have a company_id and not an account_id.
// personal templates have an account_id and not a company_id
export const templatesDropdown = (state, accountId: number, companyId: number, programId: number) => {
  const company = state.fn.companyById(companyId)
  const program = f.program.programById(programId)
  const companyName = company.get('name')
  const programName = program.get('name')
  function mapTmpl(job) {
    return [job.get('id'), job.get('first_name')]
  }

  const personalTemplates = state.fn.templateJobsByAccountId(accountId).map(mapTmpl)
  const companyTemplates = state.fn.templateJobsByCompanyId(companyId).map(mapTmpl)
  const programTemplates = state.fn.templateJobsByProgramId(programId).map(mapTmpl)

  let templatesDropdown = []

  if (personalTemplates.length > 0) {
    templatesDropdown.push({'Personal Templates': personalTemplates})
  }
  if (companyTemplates.length > 0) {
    templatesDropdown.push({[`Company: ${companyName}`]: companyTemplates})
  }
  if ((programId !== 1) && (programTemplates.length > 0)) {
    templatesDropdown.push({[`Program: ${programName}`]: programTemplates})
  }

  if (templatesDropdown.length > 0) {
    templatesDropdown = [[null, '']].concat(templatesDropdown)
  }

  return templatesDropdown
}

export const formattedAddress = (job: IMap) => {
  const {is_template, last_name, address_1, address_2, city, state, zip} = job.toJS()
  if (is_template) return last_name;
  return (
    <span>
      {strip`${address_1} ${address_2}, ${city}`}
      <span className="hidden-xs">
        {strip`, ${state} ${zip}`}
      </span>
    </span>
  )
}

export const formattedName = (job: IMap) => {
  let {first_name, last_name} = job.toJS()
  return <span>{strip`${first_name} ${last_name}`}</span>
}

export const hasUnmodeledChanges = (job: IMap): ? boolean => {
  return (job.get('has_unmodeled_changes') !== 0 && !job.get('is_template')) || !job.get('has_calculated')
}

// About mayHaveUnmodeledChanges: It allows us to test for grandfathered jobs where we can't
// tell whether there are unmodeled changes.
export const mayHaveUnmodeledChanges = (job: IMap): ? boolean => {
  return job.get('has_unmodeled_changes') === null && !job.get('is_template')
}

export const isJobTemplate = (job: IMap): boolean => {
  return job.get('is_template') === 1
}
