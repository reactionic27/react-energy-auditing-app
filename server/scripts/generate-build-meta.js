import fs from 'fs'
import path from 'path'
const file = path.join(__dirname, '../../build-meta.json')
import uuid from 'node-uuid'

// This build ID helps us notify userse when we deploy and they need to refresh the page.
const writeObj = {buildId : uuid.v4()}
fs.writeFile(file, JSON.stringify(writeObj, null, 2), err => {
  if (err) throw err
  console.log('New Build Id generated ' + writeObj.buildId)
})
