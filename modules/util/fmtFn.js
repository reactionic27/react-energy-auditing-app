import Formatter from './formatter'

export default function fmt(value: ?number | ?string, formatString: string) {
  let val = new Formatter(value);
  formatString.split('~')
    .map(val => val.split('!'))
    .forEach(([method, arg]) => {
      if (typeof val[method] !== 'function') {
        console.error(`Invalid value method: ${method}`)
      } else {
        val = val[method](arg)
      }
    })
  return val.asChild();
}
