import {Map as IMap, List as IList, Set as ISet} from 'immutable'
import transit from 'transit-js'

const ListHandler = transit.makeWriteHandler({
  tag(v) { return "array"; },
  rep(v) { return v; },
  stringRep(v) { return null; }
});
const MapHandler = transit.makeWriteHandler({
  tag(v) { return "map"; },
  rep(v) { return v; },
  stringRep(v) { return null; }
});
const SetHandler = transit.makeWriteHandler({
  tag() { return 'set'; },
  rep(v) { return v.toArray(); },
  stringRep() { return null; }
});
const ErrorHandler = transit.makeWriteHandler({
  tag() { return 'error' },
  rep(v) { return {code: v.code, message: v.message, name: v.name, stack: v.stack} },
  stringRep() { return null }
})
const ModelHandler = transit.makeWriteHandler({
  tag(v) { return "map" },
  rep(v) { return IMap(v.toJSON()) },
  stringRep(v) { return null }
})

const handlers = [
  'model', ModelHandler,
  'error', ErrorHandler,
  IList, ListHandler,
  IMap,  MapHandler,
  ISet,  SetHandler
]

const writer = transit.writer("json", {handlers: transit.map(handlers)})

export default function(obj) {
  return writer.write(obj);
}
