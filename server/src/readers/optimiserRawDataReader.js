import knex from '../init/knex-init'

export default async function optimiserRawDataReader(
  req: Object,
  job_id: number
): Object {

  return {
    jobId: job_id,
    rawResponse: await knex
      .select('parsed_response')
      .from('v5_optimiser_submissions')
      .where({job_id})
  }

}
