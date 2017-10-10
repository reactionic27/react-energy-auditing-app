
// == Find node to attach popover to ===========================================
const skippedNodes = ['OPTION', 'SUP']

export default function getLastNode(node, lastNode, depth = 0) {
  if (depth === 0) {
    const definedTarget = node.querySelectorAll('.js-popover-target')
    if (definedTarget.length > 0) {
      return definedTarget[0]
    }
  }
  if (node) {
    if (node.nodeName === 'NOSCRIPT' || isClearfix(node) || node.nodeName === '#comment') {
      return getLastNode(node.previousSibling, lastNode, depth)
    }
    if (skippedNodes.indexOf(node.nodeName) !== -1) {
      return lastNode
    }
    if (node.childNodes.length > 0) {
      return getLastNode(node.childNodes[node.childNodes.length - 1], node, depth + 1)
    }
  }
  return lastNode;
}

function isClearfix(node) {
  return node.classList && node.classList.contains('clearfix')
}
