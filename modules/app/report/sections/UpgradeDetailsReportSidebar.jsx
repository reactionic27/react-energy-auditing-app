import React from 'react'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'

const APPROXIMATE = 1;
const EXACT = 2;

@connect((state, {jobId, uuid}) => {
  const rec = state.fn.recByUuid(uuid)
  const report = state.fn.reportByJobId(jobId)
  const isCustom = f.recs.isCustomRec(rec)
  return {
    isCustom,
    category: f.recs.category(rec),
    cost: rec.get('cost'),
    savings: rec.get('savings'),
    elementCosts: report.get('element_costs'),
    elementSavings: report.get('element_savings') && !isCustom,
    elementWhyItMatters: report.get('element_why_it_matters'),
  }
})
export default class UpgradeDetailsReportSidebar extends React.Component {

  static contextTypes = {
    printing: React.PropTypes.bool.isRequired
  };

  render() {
    const {
      props: {
        cost, savings, uuid, category,
        elementCosts, elementSavings,
        elementWhyItMatters
      },
      context: {printing}
    } = this

    let renderedCosts = null

    if (elementCosts === APPROXIMATE) renderedCosts = <ApproximateCost cost={cost} />
    if (elementCosts === EXACT) renderedCosts = <ExactCost cost={cost} />

    return (
      <div>
        <div className="recommendation-category-label">{category}</div>

        {renderedCosts}

        {elementSavings ? <h3>Energy Savings</h3> : null}

        {elementSavings ? <h4>{f.num.format(savings, {decimals: 0, prefix:'Approx. $'})}</h4> : null}

        {elementWhyItMatters ? <h3>Why it matters</h3> : null}

        {elementWhyItMatters ? <WhyItMatters uuid={uuid} printing={printing} /> : null}

      </div>
    );
  }
}


const ExactCost = ({cost}) => {
  return (
    <span>
      <h3>Installed cost</h3>
      {f.num.format(cost, {decimals: 0, prefix: '$'})}
    </span>
  )
}

const ApproximateCost = ({cost}) => {
  return (
    <span>
      <h3>Approximate <br /> installed cost</h3>
      {f.num.format(cost, {decimals: 0, prefix: '$', specialCeil: true})}
    </span>
  )
}

const WhyItMatters = ({uuid, printing}) => {
  return (
    <div style={styles.wim}>
      <Snugg.Textarea
        style={styles.wimTextarea}
        field='Why it Matters'
        uuid={uuid}
        bare
        editable={!printing}
        placeholder="Click to Edit"
        printing={printing}
        rows="4" />
    </div>
  )
}

const styles = {
  wim: {
    height: 354,
    padding: '2px 2px 0 2px',
    overflowY: 'hidden',
  },
  wimTextarea: {
    height: 350,
    marginTop: -1
  }
}
