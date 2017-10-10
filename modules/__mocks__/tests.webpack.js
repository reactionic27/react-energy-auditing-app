/* eslint-disable no-console */
/* eslint-env mocha */
import 'babel-polyfill'

const context = require.context('./', true, /-test\.js$/)

context.keys().forEach(context)
