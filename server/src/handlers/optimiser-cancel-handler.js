import {getKueJob} from '../init/kue-init'
import raven from '../init/raven-init'

export default async function cancelOptimiser(req: Object, res: Object) {

  const {body: {job_id, is_calculating: kueJobId}} = req

  try {
    const kueJob = await getKueJob(kueJobId)

    kueJob.remove((err) => {
      err
        ? console.error(err.message)
        : console.log('removed cancelled job #%s', kueJobId)
    });

  } catch (e) {
    raven.captureError(e)
  } finally {
    await req.knex('jobs').update({is_calculating: 0}).where({id: job_id})
  }

  req.snuggAction = 'om/cancel'
  req.broadcast(`job:${job_id}`, {job_id, is_calculating: 0})

  res.json({})
}
