import React from 'react'
import classNames from 'classnames'

export default function Pill(props) {
  return (
    <a href="#" style={props.style} onClick={props.onClick} className={classNames({
      btn: true,
      active: props.active
    })}>
      {props.title}
      {props.subtitle && <small>{props.subtitle}</small>}
    </a>
  )
}

Pill.propTypes = {
  active: React.PropTypes.bool,
  subtitle: React.PropTypes.string,
  title: React.PropTypes.string,
  style: React.PropTypes.object
}
