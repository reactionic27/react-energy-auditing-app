import _ from 'lodash'
import Boom from 'boom'
import bcrypt from 'bcrypt-nodejs'
import jobFromTemplate from '../helpers/job-from-template'
import standardJobCreate from '../helpers/standard-job-create'
import templateFromTemplate from '../helpers/template-from-template'

const SAMPLE_JOB_IDS = process.env.NODE_ENV === 'production'
  ? [43203, 43204] // Production Sample Jobs
  : process.env.NODE_ENV === 'test'
    ? global.SAMPLE_JOB_IDS
    : [41593, 41588] // Staging Sample Jobs

const DEFAULT_TEMPLATE_ID = process.env.NODE_ENV === 'production' ? 44680 : 41728;

// Given a password and a bcrypt hash,
// checks to see if the password matches the hash
export async function checkPassword(password: string, hash: string) {
  const passed = await bcrypt.compareAsync(password, hash);
  if (!passed) {
    throw Boom.badRequest('Invalid Password')
  }
}

export function getSegment(url: string, n: number, castInt = true) {
  const seg = url.split('?')[0].split('/').filter(x => x)[n - 1]
  return castInt ? parseInt(seg, 10) : seg
}

export async function linkAccountToCompany(
  req: Object,
  account_id: number,
  company_id: number,
  role: string
) {
  await req.knex('accounts_companies').insert({account_id, company_id, role})
}

export async function linkCompanyToProgram(req: Object, company_id: number, program_id: number) {
  await req.knex('companies_programs').insert({company_id, program_id})
}

// Using the "SAMPLE_JOB_IDS", fetch the rows from the DB, and create new jobs
// based on these as a template
export async function createSampleJobs(req: Object, account_id, company_id) {

  const sampleJobs = await req.knex
    .select('*')
    .from('jobs')
    .whereIn('id', SAMPLE_JOB_IDS)

  if (sampleJobs.length !== SAMPLE_JOB_IDS.length) {
    throw Boom.badRequest(`Missing sample jobs, expected ${SAMPLE_JOB_IDS} saw ${_.map(sampleJobs, 'id')}, please contact support.`)
  }

  for (const job of sampleJobs) {
    await jobFromTemplate(req, {
      ...job,
      id: undefined,
      account_id,
      company_id,
      program_id: 1,
      sample_job: 1,
      from_template_id: job.id,
      is_template: 0
    })
  }

}

export async function createDefaultTemplate(req: Object, company_id: number) {

  const [defaultTemplate] = await req.knex
    .select('*')
    .from('jobs')
    .where('id', DEFAULT_TEMPLATE_ID)

  if (defaultTemplate)
    {
    await templateFromTemplate(req,  {
      ...defaultTemplate,
      id: undefined,
      account_id : null,
      created_by_account_id: null,
      created_by_company_id: company_id,
      created_by_program_id: 1,
      company_id,
      program_id: 1,
      sample_job: 0,
      from_template_id: defaultTemplate.id,
      is_template: 1
    }, defaultTemplate)
  }
}

export function getDomain(hostname) {
  const pieces = hostname.split('.')
  if (pieces.length === 1) {
    return hostname

  // https://devcenter.heroku.com/articles/cookies-and-herokuapp-com
  } else if (pieces[1] === 'herokuapp') {
    return pieces.join('.')
  }
  return pieces.slice(1).join('.')
}
