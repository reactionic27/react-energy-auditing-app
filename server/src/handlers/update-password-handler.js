import bcrypt from 'bcrypt-nodejs'

export default async function updatePasswordHandler(req: Object, res: Object) {

  await req.knex('accounts').update({
    password: await bcrypt.hashAsync(req.body.password, null, null)
  }).where({id: req.params.account_id})

  res.json({})
}
