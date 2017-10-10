export default function stripString(segments, ...values) {
  var reduced = segments.reduce((result, value, i) => {
    const val = values[i]
    result += value
    if (val !== null && val !== undefined) {
      result += val
    }
    return result
  }, '')
  return reduced.trim()
}
