
// false and zero are good value to keep. Filter out null, undefined or ''
// TODO: write test for this
export default function isTruthyFalseOrZero(val) {
  return Boolean(val || val === 0 || val === false)
}
