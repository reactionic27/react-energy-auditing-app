import {Map as IMap, List as IList} from 'immutable'
import transit from 'transit-js'

var handlers = {
  cmap(rep) {
    return IMap().withMutations(function(map) {
      for (var i = 0, l = rep.length; i < l; i += 2) {
        map.set(rep[i], rep[i + 1]);
      }
      return map;
    });
  },
  error(rep) {
    rep = rep.toJS()
    const error = new Error(rep.message)
    error.stack = rep.stack
    error.code  = rep.code
    error.name = rep.name
    return error
  }
}

var transitDecoder = transit.decoder({
  handlers: handlers,
  arrayBuilder: {
    init() { return IList().asMutable(); },
    add(ret, val) { return ret.push(val); },
    finalize(ret) { return ret.asImmutable(); },
    fromArray(arr) { return IList(arr) }
  },
  mapBuilder: {
    init() { return IMap().asMutable(); },
    add(ret, key, val) { return ret.set(key, val);  },
    finalize(ret) { return ret.asImmutable(); }
  }
});

export default function(data, session) {
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }
  return transitDecoder.decode(data, transit.readCache());
}
