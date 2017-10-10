const Router = require('express').Router;
const methods = require('methods').concat(['use', 'all', 'param'])

const isPromise = val => typeof val === 'object' && val !== null && typeof val.catch === 'function'

const wrappedAry2 = (m: Function) => (req, res, next) => {
  const val = m(req, res)
  if (isPromise(val)) {
    val.catch(next)
  }
}
const wrappedAry3 = (m: Function) => (req, res, next) => {
  const val = m(req, res, next)
  if (isPromise(val)) {
    val.catch(next)
  }
}
const wrappedAry4 = (m: Function) => (err, req, res, next) => {
  const val = m(err, req, res, next)
  if (isPromise(val)) {
    val.catch(next)
  }
}
function wrapMiddleware(middleware) {
  switch (middleware.length) {
    case 3: return wrappedAry3(middleware)
    case 4: return wrappedAry4(middleware)
    default: {
      return wrappedAry2(middleware)
    }
  }
}
function flatten(arr, ret = []) {
  var len = arr.length;
  for (var i = 0; i < len; ++i) {
    if (Array.isArray(arr[i])) {
      flatten(arr[i], ret);
    } else {
      ret.push(arr[i]);
    }
  }
  return ret;
}
function bindRouteMethods(rtr) {
  methods.forEach(method => {
    const originalMethod = rtr[method]
    rtr[method] = function wrappedMethod(...args) {
      return originalMethod.apply(this, flatten(args).map((arg, i) => {
        if (i === 0 && typeof arg === 'string' || arg instanceof RegExp) {
          return arg
        }
        return wrapMiddleware(arg)
      }))
    }
  })
  return rtr
}

export default function promiseRouter(path) {
  var rtr = new Router(path);
  const originalRoute = rtr.route;
  rtr.route = function wrappedRoute(path) {
    const route = originalRoute.call(this, path)
    return bindRouteMethods(route)
  }
  return bindRouteMethods(rtr);
}
