
export default function firstChild(props = {}) {
  return Array.isArray(props.children) ? props.children[0] : props.children
}
