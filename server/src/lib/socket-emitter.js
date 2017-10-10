import socketEmitter from 'socket.io-emitter'
import { emitClient } from './redis'

let emitter = process.env.NODE_ENV === 'test'
  ? mockEmitter()
  : socketEmitter(emitClient)

export {
  emitter
}

export function mockEmitter() {
  const SNUGG_TEST = Symbol.for('SNUGG_TEST')
  return {
    spy: {
      to: [],
      emit: []
    },
    [SNUGG_TEST]: true,
    to(...args) {
      this.spy.to.push(args)
      return this;
    },
    emit(...args) {
      this.spy.emit.push(args)
      return this
    },
    resetTest() {
      this.spy = {to: [], emit: []}
    }
  }
}
