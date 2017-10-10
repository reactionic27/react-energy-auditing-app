import validateBody from '../helpers/validate-body'
import jobCreateHandler from '../handlers/job-create-handler'
import jobCollectionCreateHandler from '../handlers/job-collection-create-handler'
import saveJobCollectionHandler from '../handlers/save-job-collection-handler'
import saveJobEntityHandler from '../handlers/save-job-entity-handler'
import optimiserModelHandler from '../handlers/optimiser-model-handler'
import optimiserCancelHandler from '../handlers/optimiser-cancel-handler'
import updateBillingHandler from '../handlers/update-billing-handler'
import updatePasswordHandler from '../handlers/update-password-handler'
import swapOrderHandler from '../handlers/swap-order-handler'
import updateJobsStageHandler from '../handlers/update-jobs-stage-handler'
import modelHesScoresHandler from '../handlers/model-hes-scores-handler'
import createCompanyHandler from '../handlers/create-company-handler'
import createInvitationHandler from '../handlers/create-invitation-handler'
import genericSaveTableHandler from '../handlers/generic-save-table-handler'
import genericCreateTableHandler from '../handlers/generic-create-table-handler'
import syncOfflineHandler from '../handlers/sync-offline-handler'
import saveAccountsCompaniesHandler from '../handlers/save-accounts-companies-handler'
import saveActiviyTrackingHandler from '../handlers/save-activity-tracking-handler'
import markAllReadHandler from '../handlers/mark-all-read-handler'
import authorize from '../authorizations/authorize'
import csvDownload from '../csv/csv-download'
import csvDownloadProgram from '../csv/csv-download-program'

const ID_TABLE_NAMES = [
  'jobs',
  'companies',
  'accounts',
  'financing_templates',
  'invitations'
]

const COLLECTION_TABLE_NAMES = [
  'attic',
  'dhw',
  'door',
  'freezer',
  'hvac',
  'refrigerator',
  'vault',
  'wall',
  'window',
  'caz',
  'concern',
  'job_financing',
  'range',
  'oven',
  'clothes_dryer',
  'caz_system',
  'recommendations',
  'recommendation_caption_rows',
  'pv',
  'activity_feed'
]

const ENTITY_TABLE_NAMES = [
  'basedata',
  'health',
  'utilities',
  'reports',
]

const UUID_REGEX_STRING = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'

// e.g.: POST: /api/jobs/:id/attic
export const POST_JOB_CREATE_COLLECTION = new RegExp(`^/api/jobs/([0-9]+)/(${COLLECTION_TABLE_NAMES.join('|')})$`)

export const PUT_ACCOUNTS_COMPANIES = '/api/accountsCompanies'
export const PUT_ACTIVITY_TRACKING = '/api/activityTracking'
// e.g.:
// PUT: /api/jobs/:id
// PUT: /api/accounts/:id
// PUT: /api/companies/:id
export const PUT_SAVE_CORE_TABLE = new RegExp(`^/api/(${ID_TABLE_NAMES.join('|')})/([0-9]+)$`)

// e.g.: PUT: /api/jobs/:id/attic/:uuid
export const PUT_JOB_SAVE_COLLECTION = new RegExp(`^/api/jobs/([0-9]+)/(${COLLECTION_TABLE_NAMES.join('|')})/(${UUID_REGEX_STRING})$`)

// e.g.: PUT: /api/jobs/:id/basedata
export const PUT_JOB_SAVE_ENTITY = new RegExp(`^/api/jobs/([0-9]+)/(${ENTITY_TABLE_NAMES.join('|')})$`)

export default function authenticatedPostRoutes(router: Object) {


  // Create a new company, from /settings page
  router.post('/api/companies',
    validateBody('companies/create'),
    authorize('notProgramAdmin'),
    createCompanyHandler
  )

  // Create a new job, template job, or otherwise
  router.post(
    '/api/jobs',
    validateBody('jobs/create'),
    authorize('createJob'),
    jobCreateHandler
  )

  // Create a new invitation, from the /settings page
  router.post(
    '/api/invitations',
    validateBody('invitations/create'),
    authorize('createInvite'),
    createInvitationHandler
  )

  router.post('/api/financing_templates',
    (req, res, next) => {
      // Pretend this is a regex'ed route, for consistency
      req.params = {0: 'financing_templates'}
      next()
    },
    authorize('createFinancingTemplates'),
    genericCreateTableHandler
  )

  router.put(PUT_ACTIVITY_TRACKING,
    validateBody('activity_tracking/save'),
    authorize('any'),
    saveActiviyTrackingHandler
  )


  // Save changes to things like "job", "account", "company"
  router.put(PUT_SAVE_CORE_TABLE, genericSaveTableHandler)

  // Create job collection entries, like "attic", "vault", "caz_system"
  router.post(POST_JOB_CREATE_COLLECTION, jobCollectionCreateHandler)

  // Update job collection entries, like "attic", "vault", "caz_system"
  router.put(PUT_JOB_SAVE_COLLECTION, saveJobCollectionHandler)

  // Update single row job info, like "basedata", "utilities"
  router.put(PUT_JOB_SAVE_ENTITY, saveJobEntityHandler)

  router.put(PUT_ACCOUNTS_COMPANIES,
    validateBody('accountsCompanies/save'),
    authorize('any'),
    saveAccountsCompaniesHandler
  )


  // Switch the order of two collection items, like recommendations.
  router.post('/api/swap-order',
    validateBody('swap-order'),
    authorize('swapOrder'),
    swapOrderHandler
  )

  // Update stage(s) for jobs in a particular company
  router.post('/api/companies/:company_id/update-jobs-stages',
    validateBody('update-jobs-stages'),
    authorize('updateJobsStages'),
    updateJobsStageHandler
  )

  router.post('/api/companies/:company_id/mark-all-read',
    validateBody('mark-all-read'),
    authorize('updateJobsStages'),
    markAllReadHandler
  )

  // HES is in progress...
  const HES_ROUTE = new RegExp('^/api/job/([0-9]+)/hes')
  router.post(HES_ROUTE,
    validateBody('model-hes'),
    authorize('modelHes'),
    modelHesScoresHandler
  )

  // Update the password for the current account
  router.post('/api/accounts/:account_id/update-password',
    validateBody('update-password'),
    authorize('updatePassword'),
    updatePasswordHandler
  )

  // Update the billing for an account
  router.post('/api/companies/:company_id/update-billing',
    validateBody('update-billing'),
    authorize('updateBilling'),
    updateBillingHandler
  )

  // Model a job
  router.post('/api/om-model',
    validateBody('om/model'),
    authorize('omModel'),
    optimiserModelHandler
  )

  // Cancel the modeling of a job
  router.post('/api/om-cancel',
    validateBody('om/cancel'),
    authorize('omCancel'),
    optimiserCancelHandler
  )

  // Sync all of the offline changes for the current account
  router.post('/api/sync-offline',
    validateBody('sync-offline'),
    authorize('any'),
    syncOfflineHandler
  )

  // Standard download route for a non-program user
  router.post('/csv-download', validateBody('csv-download'), authorize('any'), csvDownload);

  // Download all of the jobs associated with a program
  router.post('/api/program-csv', validateBody('/api/program-csv'), authorize('programAdmin'), csvDownloadProgram)

  return router
}
