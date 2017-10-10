
export default function compareKeys(keyNames: Array, objA, objB) {
  return keyNames.every(key => objA && objB && objA.get(key) === objB.get(key))
}
