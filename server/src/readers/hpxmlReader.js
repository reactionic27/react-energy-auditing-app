import Boom from 'boom'

export default async function hpxmlReader(req: Object, job_id: number) {

  let [row] = await req.knex.select('hpxml').from('v5_optimiser_submissions').where({job_id})

  if (!row || !row.hpxml) {

    [row] = await req.knex.select('hpxml').from('v4_optimiser_submissions').where({job_id})

  }

  if (!row || !row.hpxml) {
    throw Boom.badRequest(`There was an error creating the HPXML. There is a good chance you have not modeled the job. Please model or re-model the job and try again. If you continue to experience this error after re-modeling, please contact support.`)
  }

  return row.hpxml
}
