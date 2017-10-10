import sessionReducer from '../helpers/session-reducer'
import transitWriter from '../helpers/transit-writer'
import fs from 'fs'
import path from 'path'

export default async function responseMiddleware(req: Object, res: Object, next: Function) {

  const data = transitWriter(
    sessionReducer([
      res.company,
      res.account,
      res.joblist,
      res.job,
    ])
  )

  const file = path.join(__dirname, '../../../build-meta.json')
  let buildId = ""
  if (fs.existsSync(file)) {
    const fileData = fs.readFileSync(file).toString()
    buildId = fileData && JSON.parse(fileData).buildId ? JSON.parse(fileData).buildId : ""
  }

  if (req.url.startsWith('/api')) {
    return res.json({data})
  }

  return res.render('index.html', {
    bootstrapped: data,
    buildId:buildId
  })
}
