import Value from 'util/value'

export function dollars(val) {
  return new Value(val).d(0).prefix('$ ').toString()
}

export function percent(val) {
  return new Value(val).d(2).suffix(' %').toString()
}

export function specialCeil(val) {
  return new Value(val).specialCeil().d(0).prefix('$ ').toString()
}

type formatType = {
  decimals: ?number,
  suffix: ?string,
  times: ?number,
  prefix: ?string,
  specialCeil: ?boolean
};

export function format(val, props: formatType) {
  val = new Value(val);
  ['decimals', 'times', 'specialCeil', 'prefix', 'suffix'].forEach(method => {
    if (props.hasOwnProperty(method)) {
      val[method](props[method])
    }
  })
  if (props.prefix || props.suffix) {
    return val.toString()
  }
  return val.toNumber()
}

