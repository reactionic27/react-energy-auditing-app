import React from 'react'
import {connect} from 'snugg-redux'
import {ContextButton} from 'ui'

@connect((state, {jobId, recLink}) => {
  return {
    rec: state.fn.recByType(jobId, recLink[0])
  }
})
export default class RecLink extends React.Component {
  render() {
    const {recLink, rec, jobId, customStyle} = this.props
    return (
      <ContextButton
        to={`/job/${jobId}/recommendation/${rec.get('uuid')}`}
        customStyle={customStyle}
        label={recLink[1]} />
    )
  }
}
