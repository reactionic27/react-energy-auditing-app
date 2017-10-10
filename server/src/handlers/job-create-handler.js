import standardJobCreate from '../helpers/standard-job-create'
import jobFromTemplate from '../helpers/job-from-template'

// When we create a new job, we just insert the rows in the db and return the insert id.
// The client is then responsible for fetching the job data in the next NAVIGATE socket call.
export default async function jobCreateHandler(req: Object, res: Object) {

  const {body} = req

  const createdJob = body.from_template_id
    ? await jobFromTemplate(req, body)
    : await standardJobCreate(req)

  let rooms = []

  // todo: Broadcast the action
  if (body.company_id) {
    rooms.push(`company:${body.company_id}`)
  }
  if (body.account_id) {
    rooms.push(`account:${body.account_id}`)
  }

  req.snuggAction = 'jobs/create'
  req.broadcast(rooms, createdJob)

  res.json(createdJob)
}
