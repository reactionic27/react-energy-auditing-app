import React from 'react'
import {connect} from 'react-redux'
import * as f from 'data/formatters'

@connect((state, {programId}) => ({
  programName: programId ? f.program.programById(programId).get('name') : null
}))
export default class JobRowStageName extends React.Component {

  render() {
    let {programName} = this.props
    if (!programName || programName === 'None') return <span className="muted">--</span>
    return (
      <div className="jl-box jl-program">
        {programName}
      </div>
    )
  }

}
