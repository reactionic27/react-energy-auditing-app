import methods from "methods"
import Promise from "bluebird"
import supertest from "supertest"

// Support SuperTest's historical `del` alias for `delete`
const allMethods = methods.concat("del");

// Generate a SuperTest as Promised module that returns promise
// instances using the provided `Promise` constructor.
function makeModule(Promise) {
  var out;

  function toPromise() {
    return new Promise((resolve, reject) => {
      this.end((err, res) => {
        if (err) {
          console.log(res.error)
          if (res && res.body && res.body.stack) {
            err.message = err.message + ':' + res.body.message
            err.stack = res.body.stack
          }
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }

  function then(onFulfilled, onRejected) {
    return this.toPromise().then(onFulfilled, onRejected);
  }

  function _catch(onRejected) {
    var promise = this.toPromise();
    return promise.catch.apply(promise, arguments);
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
        test.catch = _catch;
        return test;
      };
    });

    return out;
  }

  out = function() {
    var request = supertest.apply(null, arguments);
    return wrap(request);
  }

  out.agent = function() {
    var agent = supertest.agent.apply(null, arguments);
    return wrap(agent);
  };

  return out;
}

export default makeModule(Promise);
