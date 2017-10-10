import _ from 'lodash'
import v4ToV5Migration from '../../scripts/v4-to-v5-migration'

const TO_CHECK = ['utilities', 'health', 'totals']

import bole from 'bole'
const log = bole(__filename)

function logError(id, e) {
  if (e.message === 'ERROR_MIGRATING') {
    console.log(id, JSON.stringify(e.errors))
  } else if (e.sql) {
    console.log(id, [e.sql, e.message, e.stack])
  } else {
    console.log(id, e.stack)
  }
}

function canAccessJobTemplate(job: Object, account:Object, accountCompany: ?Object) {
  switch (true) {
    case !!job.get('account_id'): return job.get('account_id') === account.get('id')
    case !!job.get('company_id'): return job.get('company_id') === accountCompany && accountCompany.company_id
    case !!job.get('program_id'): return job.get('program_id') === account.get('program_id')
    default: return false
  }
}

function canAccessJob(req: Object, job: Object, account:Object, accountCompany: ?Object, company: ?Object, accountId: number) {
  switch (true) {
    case account.get('role') === 'snuggadmin': return true
    case account.get('role') === 'program-admin': return job.get('program_id') === account.get('program_id')
    case company && company.disabled === 1: return false
    case accountCompany && accountCompany.suspended === 1: return false
    case accountCompany && accountCompany.role === 'admin': return true

    case job.get('is_template') === 1: return canAccessJobTemplate(job, account, accountCompany)
    default: return job.get('account_id') === accountId
  }
}

export default async function jobReader(req: Object, account: Object, jobId: number, accountId: number, recursing: boolean = false) {

  log.debug({jobId, accountId}, 'jobReader reading job')

  const job = await req.model('job')
    .query(qb => {
      qb.where({id: jobId, deleted_at: null}).whereIn('version', [4, 5])
    }).fetch({require: true})


  if (job.get('version') === 4) {

    if (recursing) {
      throw new Error('Infinite loop detected.')
    }

    try {
      await v4ToV5Migration(jobId)
      return jobReader(req, account, jobId, accountId, true)
    } catch (e) {
      const id = _.uniqueId('upgradeError')
      logError(id, e)
      throw new Error(`There is an error converting your job to v5, please contact support with id: ${id}`)
    }
  }

  const accountCompany = await req.knex.first('*').from('accounts_companies').where({
    account_id: req.account.id,
    company_id: job.get('company_id')
  })

  const company = await req.knex.first('*').from('companies').where({
    id: job.get('company_id')
  })

  if (!canAccessJob(req, job, account, accountCompany, company, accountId)) {
    throw new Error('Invalid job access')
  }

  await job.load([
    'utilities', 'health',

    'basedata',

    'account', 'totals', 'company', {
      recommendations: notDeleted,
      recommendationCaptionRows: notDeleted,
      concerns: notDeleted,
      attics: notDeleted,
      caz: notDeleted,
      dhws: notDeleted,
      doors: notDeleted,
      freezers: notDeleted,
      hvacs: notDeleted,
      refrigerators: notDeleted,
      vaults: notDeleted,
      walls: notDeleted,
      windows: notDeleted,
      ovens: notDeleted,
      ranges: notDeleted,
      pvs: notDeleted,
      clothesDryers: notDeleted,
      cazSystems: notDeleted,
      hesScores: notDeleted,
      activityFeed: notDeleted,
      // activityTracking: notDeleted
    },
    'jobStageHistory',
    'report', 'program', 'financing'
  ])

  TO_CHECK.forEach(type => {
    if (_.isEmpty(job.related(type).attributes)) {
      throw new Error("There is an error with your job, please contact support: code #empty-" + type)
    }
  })

  if (job.get('program_id')) {
    job.relations.adminAccounts = await req.model('account').where({program_id: job.get('program_id'), role: 'program-admin', 'deleted_at': null}).fetchAll()
  }

  job.relations.snuggAdminAccounts = await req.model('account').where({role: 'snuggadmin', 'deleted_at': null}).fetchAll()

  return job
}

function notDeleted(qb) {
  return qb.where('deleted_at', null)
}
