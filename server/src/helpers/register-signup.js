import _ from 'lodash'
import Boom from 'boom'
import bole from 'bole'
import bcrypt from 'bcrypt-nodejs'
import dedent from 'dedent'
import sendTemplate from '../emails/send-template'
import {EXCLUDE_EMAIL, EXCLUDE_COMPANY_IDENTIFIERS, COMPANY_MATCH_LOWER_LIMIT} from '../constants'
import distance from 'jaro-winkler'

import {
  createSampleJobs,
  linkAccountToCompany,
  linkCompanyToProgram,
  createDefaultTemplate
} from '../lib/snugg-server-helpers'
import welcomeAdmin from '../emails/welcome-admin'
import welcomeUser from '../emails/welcome-user'

const log = bole(__filename)


export default function registerSignup(type: 'invited' | 'register') {
  let isDuplicateCompany; // flag for identifying duplicateCompany
  return async function register(req: Object, res: Object) {
    const isInvite = type === 'invited'
    const isRegister = type === 'register'
    const targetingCookies = _.pick(req.cookies, 'adgroup', 'source', 'offer')

    const {body, invitation} = req
    const {first_name, last_name, email, password, company_name} = body

    const knex = req.knex

    const transacting = req.knex.transaction(async (trx) => {

      req.knex = trx

      const existingAccount = await trx('accounts').where({email}).first('*')

      if (existingAccount) {
        if (isInvite) {
          throw Boom.badRequest(dedent`
            This email is already registered.
            Please request an invite to this company using that email address
          `)
        } else {
          throw Boom.badRequest(dedent`
            The email ${email} is already registered.
            If you meant to log in or reset your password, you can do so from the login screen.
          `)
        }
      }
      isDuplicateCompany = false;
      if (req.body.submit_normal) {
        let companyName = _.toLower(body.company_name);
        const companyList =  await trx.select('Id', 'name').from('companies');
        if (companyList && companyList.length > 0 && companyName) {
          const duplicateExist = isCompanyDuplication(companyList, companyName);
          if (duplicateExist)
            isDuplicateCompany = true;
        }

        if (!isDuplicateCompany && body.email) {
          const emailProvider = _.split(body.email, '@').pop();
          if (!_.includes(EXCLUDE_EMAIL, emailProvider)) {
            const checkDuplicateCompoanyEmail = await trx('accounts').where('email', 'like', '%' + emailProvider);
            if (checkDuplicateCompoanyEmail.length > 0)
              isDuplicateCompany = true;
          }
        }
        if (isDuplicateCompany) {
          throw Boom.badRequest(dedent`
            This is a likely duplicate company. You're trying to create ${company_name} using the email address ${email}.
          `)
        }
      }
      // First, either create a company (when type = 'register')
      // or find the existing company (when type = 'invited')
      let company
      if (isRegister) {
        const [companyId] = await trx('companies').insert({
          name: company_name,
          ...targetingCookies
        })
        company = await trx('companies').where({id: companyId}).first('*')

        await linkCompanyToProgram(req, companyId, 1)
        await createDefaultTemplate(req, companyId)

      } else {
        company = await trx('companies')
          .where({id: invitation.get('company_id')})
          .first('*')
      }

      const insertBody = {
        first_name,
        last_name,
        email,
        password: await bcrypt.hashAsync(password, null, null)
      }

      if (isRegister) {
        Object.assign(insertBody, targetingCookies)
      }

      const [accountId] = await trx('accounts').insert(insertBody)

      const account = await trx('accounts').where({id: accountId}).first('*')

      const role = isInvite ? invitation.get('role') : 'admin'

      await linkAccountToCompany(req, accountId, company.id, role)

      await createSampleJobs(req, accountId, company.id)

      if (isInvite) {
        await trx('invitations').where({id: invitation.id}).update({status: 'accepted'})
      }

      let emailTemplate = welcomeAdmin
      if (isInvite && invitation.get('role') !== 'admin') {
        emailTemplate = welcomeUser
      }

      const options = {
        ...emailTemplate,
        recipient: account.email,
        locals: {
          app_url: req.locals.origin,
          first_name: account.first_name,
          company_name: company.name
        }
      }

      sendTemplate(options)

      return account
    })

    try {
      const account = await transacting
      req.knex = knex
      req.token = {id: account.id}
      res.redirect('/')
    } catch (err) {
      log.error(err, 'error during registration ' + req.url)
      req.flash('error', [err.message])
      if (isDuplicateCompany)
        res.redirect('/duplicate-company-msg')
      else
        res.redirect(req.url)
    }
  }
}

function isCompanyDuplication(companyList, companyName) {
  return _.some(companyList, (dbVal, dbKey) => {
    let companyNameUser = companyName;
    let dbCompanyName = _.toLower(dbVal.name);
    _.filter(EXCLUDE_COMPANY_IDENTIFIERS, (ciVal) => {
      companyNameUser = _.replace(companyNameUser, ciVal, '');
      dbCompanyName =  _.replace(dbCompanyName, ciVal, '');
    });
    const matchScore = distance(companyNameUser, dbCompanyName);
    if (matchScore > COMPANY_MATCH_LOWER_LIMIT) {
      return true;
    }
  });
}
