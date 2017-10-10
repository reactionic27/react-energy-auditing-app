import fs from 'fs'
import path from 'path'

const templateDir = path.resolve(path.join(
  __dirname, '../../../email-templates'))
export default function load(relPath) {
  return fs.readFileSync(path.join(templateDir, relPath), 'utf8')
}
