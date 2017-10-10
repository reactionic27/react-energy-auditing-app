import invariant from 'fbjs/lib/invariant'

export default function downloadFile(contentString: string, fileName: string, fileType: string = 'plain') {
  invariant(
    typeof document !== 'undefined',
    'document not defined. This function can only be run from a browser environment'
  )
  let link = document.createElement('a')
  link.href = `data:text/${fileType};charset=utf-8,${encodeURIComponent(contentString)}`
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  return true
}
