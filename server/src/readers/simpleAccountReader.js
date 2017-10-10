
// Fetches the bare minimum info we need about an account, used in POST
// requests since we only need basic account info to determine permissions.
export default async function simpleAccountReader(
  req: Object,
  accountId: number
) {
  let account = await req.knex('accounts')
    .where('id', accountId)
    .first(
      'id',
      'email',
      'first_name',
      'last_name',
      'last_used_company',
      'role',
      'program_admin',
      'program_id'
    )
  return account
}
