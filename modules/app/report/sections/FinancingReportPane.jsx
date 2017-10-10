import React from 'react'
import TwoCellRow from 'ui/two-cell-row'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'
import {PAGINATION_HEIGHT} from 'data/constants'

function getColumnClass(offerCount) {
  switch (offerCount) {
    case 1: return 'r-spa9';
    case 2: return 'r-spa4';
    case 3: return 'r-spa3';
    default: return 'r-spa3';
  }
}

@connect((state, props) => {
  return {
    product: f.jobFinancing.formatted(state, props),
    recTotalCost: f.recs.recTotalCost(state.fn.recommendationsByJobId(props.jobId), 'd!0~prefix!$')
  }
})
export default class FinancingReportPane extends React.Component {

  static propTypes = {
    product: React.PropTypes.object.isRequired,
    count: React.PropTypes.number.isRequired
  };

  render() {
    let {product, count, recTotalCost} = this.props
    return (
      <div className={getColumnClass(count)} style={styles.product}>
        <h2 style={styles.title}>{product.title}</h2>
        <div style={styles.smallHeader}>The Math</div>
        <table className="table table-extra-condensed" style={styles.table}>
          <tbody>
            <TwoCellRow label="Job Cost" value={recTotalCost} tdStyle={styles.altTd} />
            <TwoCellRow label="Cash down and/or Incentives" value={product.cashDown} />
            <TwoCellRow label="Loan amount" value={product.principal} tdStyle={styles.altTd} />
            <TwoCellRow label={`Your loan payment: ${product.rate} @ ${product.term}`} value={product.payments} />
            <TwoCellRow label={'Estimated energy savings'} value={product.energySavings} tdStyle={styles.altTd} />
            <TwoCellRow label={`Net Monthly ${product.expenseLabel}`} value={product.expense} />
          </tbody>
        </table>
        <div style={styles.smallHeader}>Terms & Conditions</div>
        <table className="table table-extra-condensed" style={styles.table}>
          <tbody>
            <TwoCellRow label="Minimum Loan" value={product.minPurchase} tdStyle={styles.altTd}/>
            <TwoCellRow label="Maximum Loan" value={product.maxPurchase} />
            <TwoCellRow label="Min. Cash Down" value={product.minCashDown} tdStyle={styles.altTd}/>
            <TwoCellRow label="Rate" value={product.rate} />
            <TwoCellRow label="Term" value={product.term} tdStyle={styles.altTd}/>
            <TwoCellRow label="Min. FICO Score" value={product.minFicoScore} />
            <TwoCellRow label="Closing costs" value={product.closingCost} tdStyle={styles.altTd}/>
          </tbody>
        </table>
        {product.description &&
          <div>
            <div style={styles.smallHeader}>Description</div>
            <div style={styles.description}>{product.description}</div>
          </div>
        }
        {product.contactInfo &&
          <div style={styles.cta}>
            {product.contactInfo}
          </div>
        }
      </div>
    )
  }
}

const styles = {
  product: {
    height: PAGINATION_HEIGHT,
    position: 'relative'
  },
  title: {
    lineHeight: '18px',
    fontSize: 15
  },
  table: {
    marginBottom: 15
  },
  altTd: {
    backgroundColor: '#f3f3f3'
  },
  smallHeader: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.0.3em',
    fontWeight: 700,
    marginBottom: 5
  },
  description: {
    fontSize: 12,
    lineHeight: '16px',
    marginBottom: 15
  },
  cta: {
    fontWeight: 600,
    background: '#edeeed',
    padding: 5,
    borderRadius: 3,
    fontSize: 12
  }
}
