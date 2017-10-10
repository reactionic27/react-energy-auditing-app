import React from 'react'
import classnames from 'classnames'
import {Col} from 'react-bootstrap'

export default class PricingOverride extends React.Component {

  state = {
    showUtilityPriceInlay: false
  };

  showUtilityPriceInlay = (e) => {
    e.preventDefault()
    this.setState({showUtilityPriceInlay: !this.state.showUtilityPriceInlay})
  }

  render() {
    return (
      <div style={inlayStyles} className={classnames({
        "alert alert-block alert-warning" : this.state.showUtilityPriceInlay
      })}>
        <button className="btn btn-brand-3" onClick={this.showUtilityPriceInlay}>
          <i className="ico-budicon-8" />
          <span style={{display: 'inline-block', marginLeft: '5px'}}>  Manual Utility Pricing</span>
        </button>
        <div className={classnames("inlay", {
          "inlay-open" : this.state.showUtilityPriceInlay
        })}>
          <div style={{padding: "0 10px 10px"}}>
            <h3 style={{marginTop: 0}}>Manual Utility Pricing</h3>
            <p>Snugg Pro pulls in highly localized energy prices based on zip code and other factors.  This section is best left alone unless you are required to override our defaults.</p>
            <p>This section will be filled out automatically after you model for the first time. Only override the prices you need to.</p>
          </div>
          <Col sm={12}>
            <Snugg.Input field="Utility Price: Electricity" label='Electricity Price' />
            <Snugg.Input field="Utility Price: Natural Gas" label='Natural Gas Price' />
            <Snugg.Input field="Utility Price: Fuel Oil" label='Fuel Oil Price' />
            <Snugg.Input field="Utility Price: Propane" label='Propane Price' />
            <Snugg.Input field="Utility Price: Wood" label='Wood Price' />
            <Snugg.Input field="Utility Price: Pellets" label='Pellets Price' />
          </Col>
        </div>
      </div>
    )
  }
}

const inlayStyles = {
  padding: 0,
  marginBottom: 20,
  border: "1px solid transparent"
}
