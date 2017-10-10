import _ from 'lodash'
import knex from '../init/knex-init'
import '../init/bluebird-init'
import omXmlParser from './optimiser/om-xml-parser'
import {emitter} from '../lib/socket-emitter'
import sessionReducer from '../helpers/session-reducer'
import transitWriter from '../helpers/transit-writer'
import * as OM_CONSTANTS from './optimiser/optimiser-constants'
import bole from 'bole'
import {kue, queue, saveKueJob, getKueJob} from '../init/kue-init'
import express from 'express'
import kueUi from 'kue-ui'
import request from 'request'
import calculatedJobReader from '../readers/calculatedJobReader'
import processResponse from './optimiser/process-response'
import hydrateRequestMiddleware from '../middleware/hydrate-request-middleware'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import {csvQueueProcess, handleCsvCompletedJob} from './csv-queue'
import {emailTrackQueueProcess, handleEmailCompletedJob} from './email-track-success'


const {HEROKU, KUE_PORT, PORT} = process.env
const {OM_URL, API_KEYS} = OM_CONSTANTS

const log = bole(__filename)

queue.watchStuckJobs(1000)

log.debug('Starting queue');

queue.process('csv_queue', csvQueueProcess);
queue.process('email_track_success', emailTrackQueueProcess);


queue.process('ping_optimiser', async function (job, done) {
  try {
    console.log('in ping_optimiser');
    if (!job.data.optimiserJobId) {
      job.data.optimiserJobId = await runRequest(job.data.formData)
      await saveKueJob(job)

      // Now that the job is ready
      done(new Error('Job Ready'))
      return
    }
  } catch (e) {
    log.error(e)
    done()
    return
  }
  try {
    const {type, data} = await getResponse(job.data.optimiserJobId)

    if (type === 'error') {
      throw new Error(data.message)
    }

    // Save the response on the job and mark as complete
    job.data.rawResponse = data

    await saveKueJob(job)

    done()
  } catch (e) {
    done(e)
  }
})

/**
 * Gets a job by the jobNumber
 * @return {Promise}
 */
async function getResponse(requestid: number) {
  const [response, body] = await request.postAsync(`${OM_URL}/get_omresponse`, {
    form: {
      ...API_KEYS,
      requestid
    }
  })
  if (response.statusCode === 200) {
    return omXmlParser(body)
  }
  throw new Error(body)
}

async function runRequest(form: Object) {
  const [, body] = await request.postAsync(`${OM_URL}/submitomrequest`, {form})
  const optimiserJobId = parseInt(body, 10)
  if (_.isNaN(optimiserJobId)) {
    throw new Error(body)
  }
  return optimiserJobId
}

async function handleCompletedJob(id, result) {
  log.debug('completed job %s', id);
  const kueJob = await getKueJob(id)
  let job_id = kueJob.id;
  try {
    if (kueJob.type === 'csv_queue') {
      handleCsvCompletedJob(id, result)
    } else if (kueJob.type === 'email_track_success') {
      handleEmailCompletedJob(id, result)
    } else {
      try {
        const {data: {job_id}} = kueJob
        await processResponse(kueJob)

        await knex('jobs').where({id: job_id}).update({has_calculated: true, is_calculating: 0})

        const job = await calculatedJobReader(job_id)

        emitter
          .to(`job:${job_id}`)
          .emit('om/complete', {
            job_id,
            transitData: transitWriter(sessionReducer(job))
          })
        kueJob.remove(err => {
          if (err) {
            console.error(err.stack)
          } else {
            console.log('removed completed job #%s', id);
            console.log('=================================')
          }
        })
      } catch (e) {
        console.error('Error processing kue job: ' + id)
        console.error(e)
      } finally {
        await knex('jobs').where({id: job_id}).update({has_calculated: true, is_calculating: 0})
      }
    }
  } catch (e) {
    console.error('Error processing kue job: ' + id)
    console.error(e)
  }
}

queue.on('job enqueue', function(id, type) {
  log.debug('Job %s got queued of type %s', id, type)
})
  .on('job complete', handleCompletedJob)
  .on('job failed', function(id, errorMessage) {
    console.error('Job failed')
    console.error(arguments)
  })

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.use(hydrateRequestMiddleware)

app.use('*', (req, res, next) => {
  if (req.account && req.account.role === 'snuggadmin') {
    return next()
  }
  next('Not Authorized')
})

kueUi.setup({
  apiURL: '/kueadmin/api',
  baseURL: '/kueadmin/kue',
  updateInterval: 5000
})

// Mount kue JSON api
app.use('/api', (req, res, next) => {
  if (req.originalUrl === '/api') {
    return res.redirect('/kueadmin' + req.originalUrl + '/')
  }
  next()
}, kue.app)

// Mount UI
app.use('/kue', kueUi.app)

const LISTEN_ON = HEROKU === "1" ? PORT : (KUE_PORT || 5000)

app.listen(LISTEN_ON, () => {
  console.log(`Kue running on port: ${LISTEN_ON}`)
});
