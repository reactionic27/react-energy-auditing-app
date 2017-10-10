import React from 'react'
import {Map as IMap} from 'immutable'
import {Link} from 'react-router'
import JobFinancingCard from './JobFinancingCard'
import {connect} from 'snugg-redux'
import {InlineNotification} from 'app/components/overlays'

const FinancingBlankState = (props) => (
  <div>
    <InlineNotification>
      <span>You haven't added any products to this job yet. </span>
    </InlineNotification>
    <JobFinancingCard product={sampleProduct} selectedCount={0} jobId={props.jobId} isSample/>
  </div>
)

@connect((state, {jobId}) => {
  const jobProducts = state.fn.jobFinancingByJobId(jobId)
  const selectedCount = jobProducts.reduce((result, p) => (
    p.get('is_shown') ? result + 1 : result
  ), 0)
  return {
    jobProducts,
    selectedCount
  }
})
export default class JobFinancingCardList extends React.Component {

  render() {
    const {jobProducts, selectedCount, jobId} = this.props
    if (jobProducts.length === 0) return <FinancingBlankState jobId={jobId} />

    return (
      <div>
        {jobProducts.map((p, i) => (
          <JobFinancingCard product={p} key={i} selectedCount={selectedCount} jobId={jobId} isEditable />
        ))}
      </div>
    )
  }
}

const sampleProduct = IMap({
  "uuid": "sample",
  "rate": 2.49,
  "from_product_id": null,
  "min_cash_down": "0",
  "created_at": "2016-08-04T10:10:27.000Z",
  "term": "60",
  "account_id": null,
  "contact_info": "contact info",
  "eligibility": "eligibiily",
  "min_purchase": "5,000",
  "min_fico_score": "650",
  "program_id": -1,
  "closing_cost": "0",
  "updated_at": "2016-09-04T10:10:27.000Z",
  "title": "Sample Loan Product",
  "deleted_at": null,
  "type": "program",
  "id": 0,
  "max_purchase": "33,000",
  "description": "description",
  "company_id": null,
  "job_id": null
})
