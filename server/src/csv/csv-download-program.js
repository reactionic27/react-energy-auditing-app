import Boom from 'boom'
import csvDownloadCommmon from './csv-download-common'

export default async function csvDownloadProgram(req, res, next) {
  try {
    const jobIdQuery = req.knex.pluck('jobs.id').from('jobs')
      .where({
        version: 5,
        program_id: req.account.program_id,
        is_template: 0,
        deleted_at: null,
        sample_job: 0,
      })
      .whereNotIn('company_id', qb => {
        qb.select('id').from('companies').where('demo_company', 1)
      })

    let filename = `program-${req.account.program_id}`

    //const {query: {startDate, endDate}} = req
    const {startDate, endDate} = req.body

    if (startDate) {
      jobIdQuery.where('created_at', '>=', startDate)
      filename += `-${startDate}`
    }
    if (endDate) {
      jobIdQuery.where('created_at', '<=', endDate)
      filename += `-${endDate}`
    }

    const jobIds = await jobIdQuery

    if (jobIds.length === 0) {
      return next(Boom.badRequest(new Error('No jobIds matching this timeframe')))
    }

    csvDownloadCommmon({jobIds, filename}, req, res, next)
  } catch (e) {
    next(e)
  }
}
