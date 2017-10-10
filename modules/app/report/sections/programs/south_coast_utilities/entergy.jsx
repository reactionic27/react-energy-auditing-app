import React from 'react'
import RebateTable from './rebate_table'

export default class Entergy extends React.Component {

  render() {
    return (
      <div className="report-page-rebates-aps">
        <div className="report-body">
          <div className="report-main">
            <RebateTable program='entergy' />
          </div>
        </div>
      </div>
    )
  }

}
