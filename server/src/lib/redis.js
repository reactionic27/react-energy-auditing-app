import redis from 'redis'
import EventEmitter from 'events'

const { REDISCLOUD_URL, LOCALHOST_REDIS, NODE_ENV } = process.env
const IS_TEST = NODE_ENV === 'test'
const REDIS_URL = LOCALHOST_REDIS || REDISCLOUD_URL

export const pubClient = IS_TEST ? new EventEmitter() : redis.createClient(REDIS_URL)
export const subClient = IS_TEST ? new EventEmitter() : redis.createClient(REDIS_URL, {return_buffers: true})
export const emitClient = IS_TEST ? new EventEmitter() : redis.createClient(REDIS_URL, {return_buffers: true})

pubClient.on('error', err => console.log(`Redis Pub Error: ${err}`))
subClient.on('error', err => console.log(`Redis Sub Error: ${err}`))
emitClient.on('error', err => console.log(`Redis Emit Error: ${err}`))
