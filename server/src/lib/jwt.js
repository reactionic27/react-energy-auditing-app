import Promise from 'bluebird'
import jwt from 'jsonwebtoken'

const JWT_SECRET = `
  This is a jsonwebtoken secret for SnuggPro that shouldn't be changed
  unless we want everyone to need to re-auth...
`
const JWT_OPTIONS = {}

export function verifyJwt(payload) {
  return new Promise((resolver, rejecter) => {
    jwt.verify(payload, JWT_SECRET, JWT_OPTIONS, (err, decoded) => {
      if (err) return rejecter(err)
      resolver(decoded)
    })
  })
}

export function signJwt(payload, options = {}) {
  return jwt.sign(payload, JWT_SECRET, {...JWT_OPTIONS, ...options})
}
