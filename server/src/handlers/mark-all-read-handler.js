export default async function markAllReadHandler(req: Object, res: Object) {
  const {job_ids} = req.body
  await req.knex('v5_activity_tracking')
          .update({unread_count: 0})
          .where('account_id', req.account.id)
          .whereIn('job_id', job_ids)
  res.json({})
}
