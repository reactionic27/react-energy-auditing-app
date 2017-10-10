export default function maybe(strings, arg) {
  if (arg) {
    return strings.join(arg)
  }
  return ''
}
