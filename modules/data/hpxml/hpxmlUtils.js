import _ from 'lodash'
import xml2js from 'xml2js'
const xmlBuilder = new xml2js.Builder()

type elementType = {
  xpath: string
};

export async function prettyPrintXML(xml: string) {
  return xmlBuilder.buildObject(await new Promise((resolver, rejecter) => {
    xml2js.parseString(xml, (err, result) => {
      err ? rejecter(err) : resolver(result)
    })
  }))
}

// Converts xpath to JS path used in _.set(). /a[0]/b/c -> a[0].b.c
// First convert xpath to array, knocking off the first '/' before calling setXMLPosition
export function convertXPathToJsPath(element: elementType) {
  const jsPath = ['HPXML']
    .concat(element.xpath.split('/'))
    .map((pathElement) => setXMLPosition(pathElement))
    .join('.')
  return _.set(element, 'jspath', jsPath)
}

// With xml2js(), child xml nodes are converted to array elements. If the child node
// is an array element, set array position as [0], [1], etc. Most are [0]
function setXMLPosition(pathElement) {
  // If array position is already set elsewhere such as Building[1] don't modify it
  if (_.includes(pathElement, ']')) {
    return pathElement
  }
  switch (pathElement) {
    case 'HPXML': return pathElement
    case '$': return pathElement
    case 'id': return pathElement
    case 'idref': return pathElement
    case 'sameas': return pathElement
    case 'Building': return pathElement
    default: return pathElement + '[0]'
  }
}
