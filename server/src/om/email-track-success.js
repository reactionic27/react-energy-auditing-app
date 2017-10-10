import {getKueJob} from '../init/kue-init'
import _ from 'lodash'
export async function emailTrackQueueProcess(job, done) {
  if (job && job.data) {
    let jobData = job.data;
    let slackMsg = 'Email delivery failure - Subject: ' + jobData.subject + ', from: ' + jobData.from + ', sent to: ' + jobData.to + '.'

    if (jobData.loggedInUserEmail)
      slackMsg += 'The user who sent this email is: ' + jobData.loggedInUserEmail

    const mailgun = require('mailgun-js')({
      apiKey: jobData.mailgunKey,
      domain: jobData.mailgunDomain
    })
    let messageId = _.replace(jobData.messageId, '<', '')
    messageId = _.replace(messageId, '>', '')
    mailgun.get('/' + jobData.mailgunDomain + '/events', { 'message-id': messageId }, function(error, body) {
      if (!error && body.items.length > 0) {
        const deliveryStatus = body.items[0].event ? body.items[0].event : ""
        if (deliveryStatus !== 'delivered')
          console.error(new Error(slackMsg))
      } else {
        console.error(new Error(slackMsg))
      }
      done()
    });

  }
}

export async function handleEmailCompletedJob(id, done) {
  const kueJob = await getKueJob(id)
  kueJob.remove(err => {
    if (err) {
      console.error(err.stack)
    } else {
      console.log('removed completed job #%s', id);
      console.log('=================================')
    }
  })
}
