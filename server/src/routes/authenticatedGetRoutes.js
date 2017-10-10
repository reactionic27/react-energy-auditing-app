import Boom from 'boom'
import moment from 'moment'
import authorize from '../authorizations/authorize'
import jobReader from '../readers/jobReader'
import joblistReader from '../readers/joblistReader'
import accountReader from '../readers/accountReader'
import companyReader from '../readers/companyReader'
import hpxmlReader from '../readers/hpxmlReader'
import hesScoresReader from '../readers/hesScoresReader'
import joblistCountReader from '../readers/joblistCountReader'
import unreadActivityReader from '../readers/unreadActivityReader'
import programJoblistCountReader from '../readers/programJoblistCountReader'
import programJoblistReader from '../readers/programJoblistReader'
import programAccountReader from '../readers/programAccountReader'
import responseMiddleware from '../middleware/response-middleware'
import {emitter} from '../lib/socket-emitter'

export const GET_JOBLIST_REGEX = /^(?:\/api)?\/joblist\/([0-9]+)(?:\/stage\/([0-9]+))?$/
export const GET_JOB_REGEX = /^(?:\/api)?\/job\/([0-9]+)(?:\/.*?)?$/
export const GET_COMPANY_REGEX = /^(?:\/api)?\/settings\/company\/([0-9]+)(?:\/.*?)?$/

const OTHER_PAGES = [
  'create-(?:job|template)(/?.*)',
  'settings(/?.*)'
]

export const GET_OTHER_REGEX = new RegExp(`^(?:/api)?/(?:${OTHER_PAGES.join('|')})$`)

export default function authenticatedGetRoutes(router: Object) {


  router.use((req: Object, res: Object, next: Function) => {

    if (!req.account || !req.account.id) {
      throw Boom.unauthorized(`Not authorized for ${req.url}`)
    }
    next()
  })

  // Used as a dummy route to check login status when an account logs out.
  router.get('/api/check-token', (req: Object, res: Object) => res.json({}))

  router.get('/logout', (req: Object, res: Object) => {
    const accountId = req.account.id
    emitter.to(`account:${accountId}`).emit('account/maybe-logout')
    req.token = {}

    if (req.query.from) {
      return res.redirect(`${req.query.from}`)
    }
    res.redirect('/')
  })

  const STAGE_COUNT_ROUTE = new RegExp('^/api/companies/([0-9]+)/stage-counts$')

  router.get(
    STAGE_COUNT_ROUTE,
    async function prepareStageCount(req, res) {
      const companyId = +req.params[0]
      const counts = req.account.program_id
        ? await programJoblistCountReader(req, companyId, req.account.program_id)
        : await joblistCountReader(req, companyId, req.account.id, req.account.role)
      res.json(counts)
    }
  )

  const HPXML_ROUTE = new RegExp('^/api/jobs/([0-9]+)/hpxml$')

  router.get(
    HPXML_ROUTE,
    async function prepareHpxml(req: Object, res: Object) {
      const jobId = +req.params[0]
      const hpxml = await hpxmlReader(req, jobId)
      res.json({hpxml})
    }
  )

  const HES_SCORES_ROUTE = new RegExp('^/api/job/([0-9]+)/hes-scores')

  router.get(
    HES_SCORES_ROUTE,
    async function prepareHesScores(req: Object, res: Object) {
      const jobId = +req.params[0]
      const hesScores = await hesScoresReader(req, jobId)
      res.json({hesScores})
    }
  )

  const UNREAD_ACTIVITY_ROUTE = new RegExp('^/api/unread-activity$')

  router.get(
    UNREAD_ACTIVITY_ROUTE,
    async function prepareUnreadActivity(req: Object, res: Object) {
      const activityTracking = await unreadActivityReader(req)
      res.json({activityTracking})
    }
  )

  // Matches: /joblist/:company_id
  // Matches: /joblist/:company_id/stage/:stage_id
  router.get(
    GET_JOBLIST_REGEX,
    async function prepareJoblist(req: Object, res: Object, next: Function) {
      const companyId = +req.params[0]
      const stageId = req.params[1] && +req.params[1]

      if (req.account.program_id) {
        res.account = await programAccountReader(req, req.account.id)
      } else {
        res.account = await accountReader(req, req.account.id)
      }

      if (req.account.program_id) {
        res.joblist = await programJoblistReader(req, req.account.program_id, companyId, stageId)
      } else {
        res.joblist = await joblistReader(req, companyId, stageId)
      }

      // Clear the last used company if it doesn't exist but it's
      // set as the last company
      const company = await companyReader(req, companyId, req.account.id)
      if (!company) {
        if (companyId === req.account.last_used_company) {
          await req.knex
            .table('accounts')
            .update({last_used_company: null})
            .where({id: req.account.id})
        }
        throw Boom.notFound('Page not found')
      }

      // If we've switched companies, update the 'last_used_company'
      if (companyId !== req.account.last_used_company) {
        await req.knex
          .table('accounts')
          .update({last_used_company: companyId})
          .where({id: req.account.id})
      }
      next()
    },
    responseMiddleware
  )

  // Matches: /job/:job_id/*
  router.get(
    GET_JOB_REGEX,
    async function prepareJob(req: Object, res: Object, next: Function) {
      const jobId = +req.params[0]
      const account = req.account.program_id ? await programAccountReader(req, req.account.id) : await accountReader(req, req.account.id)
      res.account = account
      // Load the job
      res.job = await jobReader(req, account, jobId, req.account.id)
      next()
    },
    responseMiddleware
  )

  // Matches: /settings/company/:company_id/*
  router.get(GET_COMPANY_REGEX,
    async function prepareCompany(req: Object, res: Object, next: Function) {

      const companyId = +req.params[0]
      if (req.account.program_id) {
        res.account = await programAccountReader(req, req.account.id)
      } else {
        res.account = await accountReader(req, req.account.id)
      }
      res.company = await companyReader(req, companyId, req.account.id)
      next()
    },
    responseMiddleware
  )
  // Matches: /create-job/*, /create-template/*
  router.get(
    GET_OTHER_REGEX,
    async function prepareAccount(req: Object, res: Object, next: Function) {
      if (req.account.program_id) {
        res.account = await programAccountReader(req, req.account.id)
      } else {
        res.account = await accountReader(req, req.account.id)
      }
      next()
    },
    responseMiddleware
  )

  return router
}
