import React from 'react'

export default function BaseImprovedLabel({label, children}) {
  return (
    <div style={styles}>
      {label || children}
    </div>
  )
}

const styles = {
  fontSize: 14,
  textTransform: 'uppercase',
  marginBottom: 10,
  marginTop: 20
}
