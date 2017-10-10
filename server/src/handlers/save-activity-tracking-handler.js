export default async function saveActiviyTrackingHandler(req: Object, res: Object) {
  let {account_id, job_id} = req.body
  console.log('activity tracking save !')
  await req.knex('v5_activity_tracking').update(req.body).where({account_id, job_id})
  res.json(req.body)
}
