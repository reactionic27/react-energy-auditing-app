import React, {PropTypes} from 'react'
import {Col, Row, Icon, Button} from 'ui'
import * as f from 'data/formatters'
import Radium from 'radium'
import {palette} from 'app/lib/global-styles'
import Color from 'color'
import JobFinancingHeader from './JobFinancingHeader'
import JobFinancingBody from './JobFinancingBody'
import {connectSelector} from 'snugg-redux'

@connectSelector({
  formattedProduct: f.jobFinancing.formatted
})
@Radium
export default class JobFinancingCard extends React.Component {

  static propTypes = {
    product: PropTypes.object,
    isSample: PropTypes.bool,
    selectedCount: PropTypes.number.isRequired
  };

  static contextTypes = {
    jobId: React.PropTypes.number
  };

  state = {
    detailsExpanded: false,
  };

  toggleExpandDetails = (e) => {
    e.preventDefault()
    this.setState({detailsExpanded: !this.state.detailsExpanded})
  };

  sampleClickHanlder = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('clicked sample product')
  }

  render() {
    const {product, formattedProduct, isSample, selectedCount} = this.props
    const {jobId} = this.context
    const {detailsExpanded} = this.state
    return (
      <div className='card card-fluid card-readonly' style={styles.financingTemplate} onClick={isSample && this.sampleClickHanlder}>
        <div style={isSample ? styles.sample : {display: 'none'}}>
          <div style={styles.sampleWatermark}>EXAMPLE</div>
        </div>
        <JobFinancingHeader
          selectedCount={selectedCount}
          product={product}
          jobId={jobId}
          isSample={isSample}/>
        <div style={styles.body}>
          <JobFinancingBody product={formattedProduct} uuid={product.get('uuid')} jobId={jobId} />
          <Row>
            <Col sm={12}>
              <Button variant="light" isFlat customStyle={{display: 'inline-block', width: 'auto', marginBottom: 10}} onClick={this.toggleExpandDetails}>
                <Icon type={detailsExpanded ? 'down' : 'right'} />
                Details
              </Button>
              <div className={`${detailsExpanded ? 'inlay-open' : 'inlay-closed'} inlay financing-product-details`}>
                <Row>
                  <Col sm={4}>
                    <strong>Eligibility Requirements:</strong> {formattedProduct.eligibility}
                  </Col>
                  <Col sm={4}>
                    <strong>Description:</strong> {formattedProduct.description}
                  </Col>
                  <Col sm={4}>
                    <strong>Contact info:</strong> {formattedProduct.contact_info}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
};

const styles = {
  financingTemplate: {
    marginBottom: 40,
    borderRadius: '6px 6px 0 0',
    border: `1px solid ${Color(palette.BEIGE).darken(0.05).rgbString()}`,
    position: 'relative'
  },
  sample: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.4)',
    zIndex: 3,
    display:'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  sampleWatermark: {
    textAlign: 'center',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 0,
    fontSize: 136,
    color: 'rgba(0,0,0,0.4)',
    userSelect: 'none',
    transform: 'rotate(90deg)',
    '@media (min-width: 768px)':{
      transform: 'rotate(-15deg)',
    }
  },
  body: {
    padding: '20px 15px',
  },
  details: {
    padding: 20
  }
}
