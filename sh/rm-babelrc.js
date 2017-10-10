import Promise from 'bluebird'
import fs from 'fs'
import child from 'child_process'
import path from 'path'
Promise.promisifyAll(fs)
Promise.promisifyAll(child)

function p(...args) {
  return path.join(__dirname, '..', ...args)
}

function clean(project) {
  return Promise.try(() => {
    return fs.unlinkAsync(p('node_modules', project, '.babelrc'))
  }).catch(() => {})
}

Promise.all([
  clean('react-redux'),
  clean('redux'),
  child.execAsync('rm -rf node_modules/react-bootstrap/node_modules/babel-runtime'),
])
