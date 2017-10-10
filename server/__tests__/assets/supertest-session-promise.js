import methods from "methods"
import Promise from "bluebird"
import session from "supertest-session"

// Support SuperTest's historical `del` alias for `delete`
const allMethods = methods.concat("del");

function toPromise() {
  var self = this;
  return new Promise(function(resolve, reject) {
    self.end((err, res) => {
      if (err) {
        if (res && res.body && res.body.stack) {
          err.message = err.message + ':' + res.body.message
          err.stack = res.body.stack
        }
        err.response = res
        reject(err);
        return;
      }
      if (typeof res === 'number') {
        res = res + ''
      }
      resolve(res);
    });
  });
}

function then(onFulfilled, onRejected) {
  return this.toPromise().then(onFulfilled, onRejected);
}

// Creates a new object that wraps `factory`, where each HTTP method
// (`get`, `post`, etc.) is overriden to inject a `then` method into
// the returned `Test` instance.
function wrap(factory) {
  var out = {};
  allMethods.forEach((method) => {
    out[method] = function() {
      var test = factory[method].apply(factory, arguments);
      test.toPromise = toPromise;
      test.then = then;
      return test;
    };
  });

  Object.defineProperty(out, 'cookies', {
    get: function() { return factory.cookies; },
    set: function(val) { factory.cookies = val; }
  });

  return out;
}

export default function(app, options) {
  return wrap(session(app, options));
};
