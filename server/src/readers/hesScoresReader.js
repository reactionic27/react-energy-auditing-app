import Boom from 'boom'

export default async function hesReader(req: Object, job_id: number) {

  let rows = await req.knex.select('*').from('v5_hes_scores').where({job_id})

  // This was from the HPXML reader. Not sure why the same query is called twice
  // if (!row || !row.hpxml) {
  //
  //   [row] = await req.knex.select('hpxml').from('v4_optimiser_submissions').where({job_id})
  //
  // }
  //
  // if (!row || !row.hpxml) {
  //   throw Boom.badRequest(`There was an error creating the HPXML. There is a good chance you have not modeled the job. Please model or re-model the job and try again. If you continue to experience this error after re-modeling, please contact support.`)
  // }
  //

  // return row.hpxml

  return {}
}
