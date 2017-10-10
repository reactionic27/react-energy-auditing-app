import React from 'react'

export function splitNewlines(target = '', react = false) {
  return target.split(/^(?:\r\n)|(?:\n)/g).reduce((reduced, str, i) => {
    return reduced.concat([str, react ? <br key={i} /> : '<br>'])
  }, [])
  .filter(str => !!str)
}

export function toTitleCase(str) {
  return str &&  (str[0].toUpperCase() + str.substring(1))
}

export function trim(str) {
  if (!str) return
  return str.toString().trim()
}