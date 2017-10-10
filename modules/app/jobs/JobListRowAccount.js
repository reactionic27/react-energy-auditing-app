import React from 'react'

const JobAccount = ({first_name, last_name, address_1, city, zip, unreadActivityCount}) => (
  <div className="jl-account">
    <h3 style={unreadActivityCount ? {fontWeight: 700} : {}}>
      <span className="first-name">{first_name} </span>
      <span className="last-name">{last_name}</span>
      {unreadActivityCount > 0 ? <span className="badge">{unreadActivityCount}</span> : null}
    </h3>
    <div className="jl-discreet">
      {address_1} - {city}<span className="visible-md-inline visible-lg-inline">, {zip}</span>
    </div>
  </div>
)

export default JobAccount
