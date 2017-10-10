
export default function bulkUpdate(state, payload) {
  return payload.reduce((acc, val, key) => {
    return acc.mergeDeepIn([key], val);
  }, state);
}
