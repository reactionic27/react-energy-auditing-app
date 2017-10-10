const {MAILGUN_KEY, MAILGUN_DOMAIN, MAILGUN_SENDER} = process.env
import {queue} from '../init/kue-init'
import Promise from 'bluebird'
import bole from 'bole'
import render from './render'
const log = bole(__filename)

const mailgun = Promise.promisifyAll(require('mailgun-js')({
  apiKey: MAILGUN_KEY,
  domain: MAILGUN_DOMAIN
}).messages())

if (process.env.NODE_ENV === 'test') {

  let sentEmails = []

  exports.resetSentEmails = function() {
    sentEmails = []
  }

  exports.getSentEmails = function() {
    return sentEmails
  }

  mailgun.sendAsync = function(options) {
    sentEmails.push(options)
    return Promise.resolve({})
  }
}

/**
 * Render an email template and send via mailgun.
 *
 * @param {Object} options
 * @param {String} options.recipient
 *        email address for "To:"
 * @param {String} options.subject
 *        email subject (ejs allowed)
 * @param {String} options.body
 *        email body (ejs allowed, will be wrapped in layout)
 *
 * @return {Promise} for mailgun API response
 */
export default function sendTemplate(options: Object) {
  const result = render(options)
  return mailgun.sendAsync({
    to: options.recipient,
    from: MAILGUN_SENDER,
    subject: result.subject,
    html: result.body
  }).then(function(success) {
    console.log("in mail suceess", success)
    const jobParams = {
      to: options.recipient,
      from: MAILGUN_SENDER,
      subject: result.subject,
      messageId: success.id,
      mailgunKey:MAILGUN_KEY,
      mailgunDomain:MAILGUN_DOMAIN
    }

    if (options.loggedInUserEmail)
      jobParams.loggedInUserEmail = options.loggedInUserEmail

    let job = queue.create('email_track_success', jobParams)
      .delay(300000)
      .save(err => {
        if (err) {
          console.log("Error occur while creating email_track_success job queue", err);
        } else {
          console.log("created job", job.id);
        }
      });

  }).catch(function(error) {
    log.error(error, 'error sending email', {
      recipient: options.recipient,
      subject: result.subject
    })
  })
}
