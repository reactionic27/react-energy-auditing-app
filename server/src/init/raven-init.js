import raven from 'raven'
const {NODE_ENV, RAVEN_URL} = process.env

let client;

if (NODE_ENV === 'production') {
  client = new raven.Client(RAVEN_URL)
  client.patchGlobal()
} else {
  client = {
    captureMessage(msg) {
      console.log('Raven Error Message: ' + msg)
    },
    captureError(err) {
      console.log('Raven Error: ' + JSON.stringify(err, ["message", "arguments", "type", "name", "stack"]))
    }
  }
}

export default client
