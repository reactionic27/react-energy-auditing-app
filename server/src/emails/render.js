import ejs from 'ejs'
import fs from 'fs'
import {join} from 'path'

const layoutPath = join(__dirname, '../../../email-templates/layout.ejs')
const layoutTemplate = fs.readFileSync(layoutPath, 'utf8')
const layoutFn = ejs.compile(layoutTemplate)

/**
 * @typedef Email
 * @type Object
 * @property {String} subject the email subject as rendered text
 * @property {String} body the email body as rendered HTML including layout
 */

/**
 * Render an email template.
 *
 * @param {Object} options
 * @param {String} options.subject
 *        email subject (ejs allowed)
 * @param {String} options.body
 *        email body (ejs allowed, will be wrapped in layout)
 * @param {String} options.locals
 *        variables to interpolate into ejs templates
 *
 * @return {Email}
 */
export default function render(options: Object) {
  const bodyHtml = ejs.render(options.body, options.locals)
  return {
    subject: ejs.render(options.subject, options.locals),
    body: layoutFn({body: bodyHtml}),
  }
}
