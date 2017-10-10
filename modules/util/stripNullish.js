
// cast null / undefined to empty string, used for form fields
export default function stripNullish(val) {
  return val === null || val === undefined ? '' : val
}
