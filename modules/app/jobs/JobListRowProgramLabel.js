import React from 'react'
import pureRender from 'pure-render-decorator'
import classnames from 'classnames'

@pureRender
export default class JobRowProgramLabel extends React.Component {

  render() {
    let {programName} = this.props
    const isProgram = (programName && programName !== 'None')
    return (
      <span className={classnames("jl-box jl-program", {muted: !isProgram})}>
        {isProgram ? programName : '--'}
      </span>
    )
  }
}
