import React, {PropTypes} from 'react'

export default function LeftPushNavBtn(props, {toggleLeftPushNav}) {
  return (
    <div className="header-navbar visible-xs-block" onClick={toggleLeftPushNav}>
      <div className="btn btn-header btn-side-left-handle">
        <i className="ico-budicon-32"></i>
      </div>
    </div>
  )
}

LeftPushNavBtn.contextTypes = {
  toggleLeftPushNav: PropTypes.func.isRequired
}
