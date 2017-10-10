const NODE_ENV = process.env.NODE_ENV
const IS_TEST = NODE_ENV === 'test'
const APP_COOKIE = process.env.APP_COOKIE || 'snuggtoken'
import fs from 'fs'
import path from 'path'

import Boom from 'boom'
import url from 'url'
import {verifyJwt} from '../lib/jwt'
import socketio from 'socket.io'
import socketioRedis from 'socket.io-redis'
import cookie from 'cookie'
import {pubClient, subClient} from '../lib/redis'
import transitionRooms from '../lib/transition-rooms'

let hasInitialized
export default function socketInit(server) {

  if (hasInitialized) {
    throw new Error('Attempting to call socket-init multiple times')
  }
  hasInitialized = true

  const io = socketio(server)

  if (!IS_TEST) {
    io.adapter(socketioRedis({
      pubClient: pubClient,
      subClient: subClient
    }))
  }

  // Login using the cookie set in the session.
  io.use(async function initializeSocket(socket, next) {
    try {
      const parsedCookies = cookie.parse(socket.request.headers.cookie)

      socket.jwt = await verifyJwt(parsedCookies[APP_COOKIE])

      socket.join(`account:${socket.jwt.id}`)

      try {
        await transitionRooms(socket, {
          toUrl: url.parse(socket.request.headers.referer).path
        })
      } catch (e) {
        console.error(e)
      }

      next()
    } catch (e) {
      if (e.message !== 'jwt must be provided') {
        console.log(e.message)
        console.log(e.stack)
      }
      next(Boom.unauthorized('Unauthorized'))
    }
  })

  io.on('connection', (socket) => {
    const file = path.join(__dirname, '../../../build-meta.json')
    if (fs.existsSync(file)) {
      const fileData = fs.readFileSync(file).toString()
      const buildId = fileData && JSON.parse(fileData).buildId ? JSON.parse(fileData).buildId : ""
      socket.emit('newBuild', {'buildId':buildId})
    }

    socket.on('transition-rooms', async (data) => {
      try {
        if (data.toUrl) {
          await transitionRooms(socket, data)
        } else {
          console.log('Malformed transition-rooms, ' + JSON.stringify(data))
        }

      } catch (e) {
        console.error(e)
      }
    })
  })

  return io
}
