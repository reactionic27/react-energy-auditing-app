import _ from 'lodash'
import Boom from 'boom'
import UUID from 'node-uuid'
import inviteNew from '../emails/invite-new-user'
import inviteExisting from '../emails/invite-existing-user'
import sendTemplate from '../emails/send-template'

export default async function createInvitation(req: Object, res: Object) {
  const {body} = req
  const {company_id, email} = body

  const [company, existingAccount, sender, alreadyInvited] = await Promise.all([
    req.knex('companies').where({id: company_id}).first('*'),
    req.knex('accounts').where({email}).first('*'),
    req.knex('accounts').where({id: req.account.id}).first('*'),
    req.knex('invitations').where({company_id, email}).whereNull('deleted_at').first('*'),
  ])

  if (alreadyInvited) {
    throw Boom.badRequest(`${email} has already been invited to ${company.name}`)
  }

  if (existingAccount) {
    const hasJoined = await req.knex('accounts_companies')
      .where({account_id: existingAccount.id, company_id})
      .first('*')

    if (hasJoined) {
      throw Boom.badRequest(`${email} is already a member of ${company.name}`)
    }
  }

  if (!company) {
    throw Boom.badRequest(`Missing company ${company_id}, please contact support`)
  }

  const insertData = {
    ...body,
    account_id: existingAccount && existingAccount.id,
    uuid: UUID.v4()
  }

  // payload.status will default to 'sent' in the DB
  const [invitationId] = await req.knex.insert(insertData).into('invitations')
  const template = existingAccount ? inviteExisting : inviteNew
  const register_invited_link = existingAccount ? 'confirm-invited' : 'register-invited'

  const options = {
    ...template,
    recipient: body.email,
    loggedInUserEmail:req.account && req.account.email ? req.account.email : '' ,
    locals: {
      app_url: req.locals.origin,
      register_invited_link: `${req.locals.origin}/${register_invited_link}/${insertData.uuid}`,
      first_name: sender.first_name,
      full_name: `${sender.first_name || ''} ${sender.last_name || ''}`,
      company_name: company.name
    }
  }

  sendTemplate(options)

  const payload = _.omit(
    await req.knex.first('*').from('invitations').where('id', invitationId),
    'created_at',
    'updated_at'
  )

  req.snuggAction = 'invitations/create'
  req.broadcast(`company:${body.company_id}`, payload)

  res.json(payload)
}
