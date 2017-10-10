import React from 'react'
import RebateTable from './rebate_table'

export default class CLECO extends React.Component {

  render() {
    return (
      <div className="report-page-rebates-aps">
        <div className="report-body">
          <div className="report-main">
            <RebateTable program='cleco' />
          </div>
        </div>
      </div>
    )
  }

}
