import React from 'react'
import {connect} from 'snugg-redux'

@connect()
export default class JobSelect extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    const {jobId} = this.props
    this.props.dispatch({
      type: 'local/toggleJobSelect',
      payload: {
        jobId
      }
    })
  };

  render() {
    const {selected} = this.props
    return (
      <div className="snugg-select" onClick={this.handleClick}>
        {selected ? <span>&#x2713;</span> : <span />}
      </div>
    )
  }

}
