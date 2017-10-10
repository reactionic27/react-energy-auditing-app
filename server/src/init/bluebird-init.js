// Promisify anything we need to here:
import Promise from 'bluebird'
import bcrypt from 'bcrypt-nodejs'
import fs from 'fs'
import request from 'request'

Promise.prototype.exec = Promise.prototype.nodeify // eslint-disable-line
Promise.promisifyAll(fs)
Promise.promisifyAll(bcrypt)
Promise.promisifyAll(request, {
  multiArgs: true
})

export default Promise
