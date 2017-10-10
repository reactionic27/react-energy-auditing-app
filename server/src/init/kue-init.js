import kue from 'kue'

const {REDISCLOUD_URL, LOCALHOST_REDIS} = process.env
const REDIS_URL = LOCALHOST_REDIS || REDISCLOUD_URL

const queue = kue.createQueue({redis: REDIS_URL});

function getKueJob(id) {
  return new Promise((resolver, rejecter) => {
    return kue.Job.get(id, (err, job) => {
      if (err) return rejecter(err)
      resolver(job)
    })
  })
}

function saveKueJob(job) {
  return new Promise((resolver, rejecter) => job.update(err => {
    if (err) return rejecter(err)
    resolver(job)
  }))
}

export {
  kue,
  queue,
  getKueJob,
  saveKueJob
}
