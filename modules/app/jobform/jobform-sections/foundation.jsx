import React from 'react'
import * as Tables from '../tables'

export default class Foundation extends React.Component {

  render() {
    const {jobId} = this.props
    return (
      <div>
        <Snugg.Input field="% of Floors Shared" containerClass="col-sm-3"/>
        <Tables.Foundation jobId={jobId} />
        <Snugg.Input field="Foundation Above Grade Height" containerClass="col-sm-3"/>
        <Snugg.Select field="Basement Wall Insulation" />
        <Snugg.Select field="Basement Heating" />
        <Snugg.Select field="Basement Cooling" />
        <Snugg.Select field="Crawlspace Insulation" />
        <Snugg.Select field="Crawlspace Type" />
      </div>
    )
  }

}
