import { mount } from 'enzyme'
import ErrorPage from '../app/lib/error-page'
import {browserHistory} from 'react-router'
import {TEST_ACCOUNT_1_ID, mockBootstrap} from './mocks'
import expect from 'expect'

function noop() {}

let attachTo

function testRender(component) {
  return mount(component, {attachTo: attachTo || document.getElementById('primary-container')})
}

export function setNode(node) {
  attachTo = node
}

/* eslint-env mocha */
export function testRoute(route: string, expectedErrors, fn = noop, only = false) {
  let currentRoot
  switch (arguments.length) {
    case 1: return testRoute(route, [], noop)
    case 2: {
      if (typeof expectedErrors === 'function') {
        return testRoute(route, [], expectedErrors)
      }
      if (typeof expectedErrors === 'boolean') {
        return testRoute(route, [], noop, expectedErrors)
      }
      break;
    }
    case 3: {
      if (typeof expectedErrors === 'function') {
        return testRoute(route, [], expectedErrors, fn)
      }
      if (typeof fn === 'boolean') {
        fn = noop
        only = fn
      }
      break;
    }
  }
  const DESCRIBE = only ? describe.only : describe
  DESCRIBE(`route ${route}`, function() {

    before((done) => {
      beforeSpy()
      console.error.expected = expectedErrors
      browserHistory.push(route)
      window.snuggApp(mockBootstrap, TEST_ACCOUNT_1_ID, testRender)
        .then(reactWrapper => {
          currentRoot = reactWrapper
          afterSpy()
          done()
        })
        .catch(done)
    })

    beforeEach(beforeSpy)

    after(() => {
      if (currentRoot && currentRoot.detach) {
        currentRoot.detach()
      }
    })

    afterEach(afterSpy)

    it(`should render ${route}`, (done) => {
      process.nextTick(() => {
        if (currentRoot.find(ErrorPage).nodes.length > 0) {
          done(new Error(`Saw 404 for route ${route}`))
        } else {
          done()
        }
      })
    })

    fn(() => currentRoot)
  })
}

export function beforeSpy() {
  expect.spyOn(console, 'error').andCall(msg => {
    for (const about of console.error.expected) {
      if (msg.indexOf(about) !== -1) {
        console.error.warned[about] = true
        return
      }
    }

    console.error.threw = true
    console.warn(`
      console.error call:
      ---
        ${msg}
      ---
      was not expected.
    `)
    console.error.warned[msg] = true
    // throw new Error(msg)
  })

  console.error.expected = []
  console.error.warned = Object.create(null)
  console.error.threw = false
}

export function afterSpy() {

  if (!console.error.threw) {
    console.error.expected.forEach(about => {
      if (!console.error.warned[about]) {
        console.warn(`
          Missing expected console.error:
          ---
          ${about}
          ---
        `)
      }
      // expect(console.error.warned[about]).toExist(
      //   `Missing expected warning: ${about}`
      // )
    })
  }

  console.error.restore()
}
