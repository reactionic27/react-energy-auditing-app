const {NODE_ENV, APP_COOKIE, FLASH_COOKIE, KUE_APP} = process.env

import _ from 'lodash'
import simpleAccountReader from '../readers/simpleAccountReader'
import {verifyJwt, signJwt} from '../lib/jwt'
import {getDomain} from '../lib/snugg-server-helpers'
import bookshelf, {knex} from '../init/bookshelf-init'

let paths = {}
if (!KUE_APP) {
  const stats = require('../../../stats.json')
  paths = _.mapValues(stats, val => Array.isArray(val) ? val[0] : val)
}

// Setup everything we need to work with a request
export default async function hydrateRequestMiddleware(req: Object, res: Object, next: Function) {
  const domain = getDomain(req.hostname)

  let account
  let token = req.cookies[APP_COOKIE]

  function model(ref) {
    return bookshelf.model(ref)
  }
  req.model = model
  req.knex = knex

  try {
    token = await verifyJwt(token)

    if (token.id) {
      // At this point, we only load the bare minimum
      // account info we need for roles, permissions, etc.
      account = await simpleAccountReader(req, token.id)
    }
  } catch (e) {
    if (e.message !== 'jwt must be provided') {
      console.log(e.message)
      console.log(e.stack)
    }
    token = {}
  }

  let flashCookie = req.cookies[FLASH_COOKIE] || {}

  if (req.url !== '/') {
    res.clearCookie(FLASH_COOKIE)
  }

  req.flash = function setFlash(key, value) {
    if (key === 'error' && req.method === 'POST') {
      flashCookie = {...flashCookie, ...req.body}
    }
    flashCookie = {...flashCookie, [key]: value}
    res.cookie(FLASH_COOKIE, flashCookie, {httpOnly: true})
    return this
  }

  req.locals = res.locals = {
    title: '',
    account: account || {},
    env: NODE_ENV,
    origin: `${req.protocol}://${req.hostname === 'localhost' ? req.header('host') : req.hostname}`,
    get flash() {
      return flashCookie
    },
    flashBody(item, fallback = '') {
      return _.get(flashCookie, item, fallback)
    },
    paths
  }
  res.token = Object.freeze(token) // Freeze to ensure we re-assign rather than mutate
  req.account = account

  Object.defineProperty(req, 'token', {
    get() {
      return res.token
    },
    set(value: Object) {
      res.token = Object.freeze(value)
      res.cookie(APP_COOKIE, signJwt(value), {
        domain,
        httpOnly: true,
        maxAge: 31556952000
      })
    }
  })
  next()
}
