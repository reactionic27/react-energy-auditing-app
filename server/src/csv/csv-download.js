import Boom from 'boom'
import moment from 'moment'
import {validateCsvJobIds} from '../csv/csvDataReader'
import csvDownloadCommon from './csv-download-common'

export default async function csvDownload(req, res, next) {

  let data = req.body;
  if (!data.jobIds) {
    return next(Boom.badRequest(new Error('Missing jobIds parameter')))
  }
  const jobIds = data.jobIds.split(',').map(v => +v)

  try {
    await validateCsvJobIds(req, jobIds)
  } catch (e) {
    console.log("Exception in validation " ,e);
    return next(e)
  }

  const date = moment().format(`YYYY-MM-DD_HH:mm:ss`)

  csvDownloadCommon({jobIds, filename: date}, req, res, next)
}
