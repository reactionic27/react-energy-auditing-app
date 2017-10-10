import Boom from 'boom'
import Promise from '../init/bluebird-init'
import bcrypt from 'bcrypt-nodejs'
import UUID from 'node-uuid'
import bookshelf from '../init/bookshelf-init'
import bole from 'bole'
import sendTemplate from '../emails/send-template'
import forgotPasswordTemplate from '../emails/forgot-password'
import {emitter} from '../lib/socket-emitter'

import {
  checkPassword,
  linkAccountToCompany,
} from '../lib/snugg-server-helpers'

const log = bole(__filename)

export function ensureLoggedOut(pageType: string) {
  return function(req: Object, res: Object, next: Function) {
    if (req.account) {
      const accountId = req.account.id
      emitter.to(`account:${accountId}`).emit('account/maybe-logout')
      req.token = {}
      res.redirect(req.path)
      return
    }
    next()
  }
}

async function ensureUuid(req: Object, res: Object, next: Function) {
  const { uuid } = req.params

  log.debug({ uuid }, 'looking up invitation')

  let invitation

  try {
    invitation = await req.model('invitation').where({uuid}).fetch({require: true})
  } catch (e) {
    req.flash('error', 'The invitation link has already been accepted')
    res.redirect('/')
    return
  }

  if (invitation.get('deleted_at') !== null) {
    req.flash('error', 'The invitation has been removed, please contact the person who sent this invitation.')
    res.redirect('/')
    return;
  }

  if (invitation.get('status') === 'sent') {
    await updateInvitation(req, invitation.id, 'viewed')
  }
  if (invitation.get('status') === 'accepted') {
    req.flash('error', 'The invitation link has already been accepted')
    res.redirect('/')
    return
  }

  log.debug({uuid, email: invitation.get('email')}, 'invitation found, proceeding')

  req.invitation = invitation

  next()
}

export const inviteUuid = {
  get: ensureUuid,
  post: ensureUuid
}

export const login = {
  get(req: Object, res: Object) {
    res.render('login.html', {title: 'Login'})
  },
  async post(req: Object, res: Object) {
    const {email, password} = req.body
    const [account] = await req.knex.select('id', 'password').from('accounts').where({email: email})
    if (!account) {
      log.error(`Attempting to login with an invalid email ${email}`)
    }
    try {
      await checkPassword(password, account.password)
    } catch (e) {
      req.flash('error', 'Check your email and password and try again')
      res.redirect(req.url)
      return
    }
    req.token = {id: account.id}
    req.query && req.query.from ? res.redirect(req.query.from) : res.redirect('/')
  }
}

export const register = {
  get(req: Object, res: Object) {
    if (req.account) {
      res.redirect('/settings/companies/add-new')
    } else {
      res.render('register.html', {title: 'Register', email: ''})
    }
  }
}

export const duplicateCompany = {
  get(req: Object, res: Object) {
    if (req.account) {
      res.redirect('/settings/companies/add-new')
    }
    else if (req.cookies && req.cookies.snuggflash) {
      const {company_name, email} = req.cookies.snuggflash
      const locals = {
        title: 'Duplicate company alert',
        email: email || "",
        companyName: company_name || 'your company'
      }
      res.render('duplicate-company-msg.html', locals)
    } else {
      res.redirect('/register')
    }
  }
}

export const forgotPassword = {
  get(req: Object, res: Object) {
    res.render('forgot-password.html', {title: 'Forgot Password'})
  },
  async post(req: Object, res: Object) {
    const {email} = req.body
    try {
      const password_reset_link = UUID.v4()

      const account = await req.model('account').where({email}).fetch({require: true})

      await account.save({password_reset_link})

      log.debug({accountId: account.id, email}, 'doing forgot password')

      const options = {
        ...forgotPasswordTemplate,
        recipient: email,
        locals: {
          first_name: account.get('first_name'),
          app_url: req.locals.origin,
          password_reset_link: `${req.locals.origin}/reset-password/${password_reset_link}`
        }
      }

      log.debug(options, 'sending password reset email')

      sendTemplate(options)
      req.flash(
        'alert',
        `If ${email} is a valid Snugg Pro user, you'll get an email with instructions to change your password.
        If you don't receive the email in the next 5 minutes, check your spam then contact support.`
      )
      res.redirect('/login')
    } catch (e) {
      if (e instanceof bookshelf.NotFoundError) {
        throw Boom.badRequest(`Invalid email address: ${email}`)
      }
    }
  }
}

export const registerInvited = {
  async get(req: Object, res: Object) {
    let company = await req.model('company')
      .where({id: req.invitation.get('company_id')})
      .fetch({require: true})

    const locals = {
      title: 'Register',
      uuid: req.params.uuid,
      email: req.invitation.get('email'),
      companyName: company.get('name')
    }
    res.render('register-invited.html', locals)
  }
}

export const resetPassword = {
  get(req: Object, res: Object) {
    res.render('reset-password.html', {title: 'Reset Password'})
  },
  async post(req: Object, res: Object) {
    const {password, password_confirm} = req.body

    if (password !== password_confirm) {
      throw new Error('Password and confirm password do not match')
    }

    log.debug({uuid: req.params.uuid}, 'starting reset password')

    try {
      const account = await req.knex('accounts').where({password_reset_link: req.params.uuid}).first('*')

      if (!account) {
        throw Boom.badRequest('Invalid password reset link')
      }

      await req.knex('accounts').update({
        password: await bcrypt.hashAsync(password, null, null)
      }).where({id: account.id})

      await req.knex('accounts').update({password_reset_link: null}).where({id: account.id})

      req.token = {id: account.id}
      res.redirect('/')

    } catch (e) {
      req.flash('error', e.message)
      res.redirect(req.url)
    }
  }
}

export const loginInvited = {
  async get(req: Object, res: Object) {
    const company = await req.knex
      .first('name')
      .from('companies')
      .where({id: req.invitation.get('company_id'), deleted_at: null})

    if (!company) {
      throw Boom.badRequest('Invalid invitation.')
    }

    res.render('login-invited.html', {
      title: 'Login to Join Company',
      companyName: company.name
    })
  },
  async post(req: Object, res: Object) {
    const {email, password} = req.body;

    const [account, invitation] = await Promise.all([
      req.model('account').where({email}).fetch({require: true}),
      req.model('invitation').where({uuid: req.params.uuid}).fetch({require: true})
    ])

    await checkPassword(password, account.get('password'))

    const companyId = invitation.get('company_id')
    await Promise.all([
      linkAccountToCompany(req, account.id, companyId, invitation.get('role')),
      updateInvitation(req, invitation.id, 'accepted')
    ])

    req.token = {id: account.id}
    res.redirect(`/joblist/${companyId}`)
  }
}

export const confirmInvited = {
  async get(req: Object, res: Object) {

    let company = await req.model('company')
        .where({id: req.invitation.get('company_id')})
        .fetch({require: true})

    let inviteAccount = await req.model('account')
        .where({id: req.invitation.get('account_id')})
        .fetch({require: true})

    if (!req.account || (req.account.id !== inviteAccount.id)) {
      return res.redirect(`/login-invited/${req.invitation.get('uuid')}`)
    }
    res.render('confirm-invited.html', {
      title: 'Confirm your Password to Join Company',
      companyName: company.get('name'),
      firstName: inviteAccount.get('first_name')
    })
  },
  async post(req: Object, res: Object) {
    const {body: {password}, invitation} = req;

    let inviteAccount = await req.model('account')
      .where({id: req.invitation.get('account_id')})
      .fetch({require: true})

    if (!req.account || (req.account.id !== inviteAccount.id)) {
      return res.redirect(`/login-invited/${req.invitation.get('uuid')}`)
    }

    try {
      await checkPassword(password, inviteAccount.get('password'))
    } catch (e) {
      req.flash('error', 'Incorrect password')
      res.redirect(req.url)
      return;
    }

    await Promise.all([
      linkAccountToCompany(req, req.account.id, invitation.get('company_id'), invitation.get('role')),
      updateInvitation(req, invitation.id, 'accepted')
    ])

    res.redirect(`/joblist/${invitation.get('company_id')}`)
  }
}

async function updateInvitation(
  req: Object,
  id: number,
  status: string
) {
  await req.knex('invitations').where({id}).update({status})
}
