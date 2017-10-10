import React from 'react'
import {connect} from 'snugg-redux'
import TwoCellRow from 'ui/two-cell-row'
import {Row, Col, Icon} from 'ui'
import {Clearfix} from 'react-bootstrap'
import Radium from 'radium'
import {palette} from 'app/lib/global-styles'
import * as f from 'data/formatters'

@connect((state, {jobId}) => ({
  formatted: f.jobFinancing.formatted,
  recTotalCost: f.recs.recTotalCost(state.fn.recommendationsByJobId(jobId), 'd!0~prefix!$')
}), null, ({formatted, recTotalCost}, dispatchProps, {product}) => ({
  product,
  recTotalCost,
  ...formatted,
}))
@Radium
export default class JobFinancingBody extends React.Component {

  render() {
    const {product, recTotalCost} = this.props
    const uuid = product.uuid
    return (
      <div style={styles.body}>
        <Row>
          <Col sm={5}>
            <div style={styles.column} key="radium-terms">
              <div style={styles.smallHeader}>LOAN TERMS</div>
              <table className="table">
                <tbody>
                  <TwoCellRow label="Min. FICO Score:" value={product.minFicoScore} tdStyle={{borderTop: 'none'}}/>
                  <TwoCellRow label="Min. Cash Down:" value={product.minCashDown} />
                  <TwoCellRow label="Rate:" value={product.rate} />
                  <TwoCellRow label="Term:" value={product.term} />
                  <TwoCellRow label="Closing Costs:" value={product.closingCost} />
                  <TwoCellRow label="Min Loan Amount:" value={product.minPurchase} />
                  <TwoCellRow label="Max Loan Amount:" value={product.maxPurchase} />
                </tbody>
              </table>
            </div>
          </Col>
          <Col sm={2}>
            <div className="directional hidden-xs" style={styles.directional}>
              <Icon type="right" />
            </div>
          </Col>

          {/* CALCULATOR STARTS HERE:*/}

          <Col sm={5}>
            <div style={styles.column} key="radium-calculator">
              <hr style={styles.xsDivider}/>
              <div style={styles.smallHeader}>CALCULATOR</div>
              <div>
                <div>
                  <label className="control-label col-sm-6 col-no-gutter">
                    <h5>Job Cost: <br/>
                      <small>
                        (Min. {product.minPurchase}, Max: {product.maxPurchase})
                      </small>
                    </h5>
                  </label>
                  <Col sm={6} noGutter={['al']}>
                    <p className="pull-right" style={{paddingTop: 12, paddingRight: 12, fontSize: '1.2em'}}>
                      {recTotalCost}
                    </p>
                  </Col>
                  <Clearfix />
                </div>
                <div className="cash-down">
                  <label className="control-label col-sm-6 col-no-gutter">
                    <h5>Cash down and/or Incentives:<br/>
                      <small>
                        (Min. {product.minCashDown})
                      </small>
                    </h5>
                  </label>
                  <Col sm={4} smOffset={2} noGutter={['al']}>
                    <Snugg.Input
                      field="Job Financing: Cash Down"
                      uuid={uuid}
                      prefix="$"
                      bare
                      className="form-control"
                      pattern="[0-9]*" />
                  </Col>
                  <Clearfix />
                </div>
              </div>
              <table className="table">
                <tbody>
                  <TwoCellRow label="Loan Amount" value={product.principal} />
                  <TwoCellRow label="Estmd Monthly Payments" value={product.payments} />
                  <TwoCellRow label="Avg Monthly Energy Savings: " value={product.energySavings} />
                </tbody>
              </table>
              <div className="card-footer">
                <div className="card-footer-content">
                  <strong>
                    <span>Net Monthly {`${product.expenseLabel || ''}: `}</span>
                  </strong>
                </div>
                <div className="pull-right">
                  <strong>
                    {product.expense}
                  </strong>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const styles = {
  smallHeader: {
    fontSize: 14,
    color: palette.BROWN,
    letterSpacing: '0.05em',
    fontWeight: 600,
    marginBottom: 20
  },
  body: {
    padding: '20px 15px',
  },
  column: {
    '@media (min-width: 768px)': {
      maxWidth: 500,
    }
  },
  directional: {
    width: 100,
    height: 60,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 10,
    textAlign: 'center',
  },
  details: {
    padding: 20
  },
  xsDivider: {
    borderTop: '1px dashed #ccc',
    marginTop: 25,
    paddingTop: 20,
    '@media (min-width: 768px)': {
      display: 'none',
    }
  }
}
