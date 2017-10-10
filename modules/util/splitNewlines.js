import React from 'react'

export default function splitNewlines(target = '') {
  return target.split(/^(?:\r\n)|(?:\n)/g).reduce((reduced, str, i) => {
    return reduced.concat([str, <br key={i} />])
  }, [])
  .filter(str => !!str)
}
