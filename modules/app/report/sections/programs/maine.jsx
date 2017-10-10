import React from 'react'

class Maine extends React.Component {

  render() {
    return (
      <div className="report-body">
        <div className="report-main">
          <div className="r-row">
            <div className="r-spa12">
              <h2 style={{marginTop: 40}}>Efficiency Maine Financing Options</h2>
              <p>
                Efficiency Maine offers a variety of energy loans to help you
                pay for energy upgrades. All of our loans are low-interest,
                long-term loans with no fees.
              </p>
              <p>
                Read more and apply for financing here&nbsp;
                <a href="http://bit.ly/maine-energy-loans"
                  title="Details about Efficiency Maine financing options"
                  target="_blank">
                  http://bit.ly/maine-energy-loans
                </a>
              </p>
            </div>
          </div>
          <div className="r-row">
            <div className="r-spa12">
              <h2 style={{marginTop: 40}}>Efficiency Maine Rebates</h2>
              <p>
                Upgrade your heating system, weatherize your home, or make other
                improvements to lower your energy bills with incentives and financing.
              </p>
              <p>
                Learn more at &nbsp;
                <a href="http://bit.ly/maine-rebates"
                  title="Details about Efficiency Maine rebates"
                  target="_blank">
                  http://bit.ly/maine-rebates
                </a>
              </p>
            </div>
          </div>
          <div className="r-row">
            <div className="r-spa5">
              <div className="clearfix" style={styles.container}>
                <img src="/img/programs/efficiency_maine/air-sealing-100x100.png" alt="" style={styles.img} />
                <div>
                  <strong>AIR SEALING & ASSESSMENT</strong>
                  <p>
                    <strong>$400 Rebate</strong><br/>
                    Seal out the drafts and find out how well your home performs
                  </p>
                </div>
              </div>

              <div className="clearfix" style={styles.container}>
                <img src="/img/programs/efficiency_maine/insulation-100x100.png" alt="" style={styles.img} />
                <div>
                  <strong>ENERGY EFFICIENT INSULATION</strong>
                  <p>
                    <strong>Up to $2,100 Rebate</strong><br/>
                    Rebates for $700 per zone, up to $2,100 total
                  </p>
                </div>
              </div>

              <div className="clearfix" style={styles.container}>
                <img src="/img/programs/efficiency_maine/ductless-heat-pump-100x100.png" alt="" style={styles.img} />
                <div>
                  <strong>DUCTLESS HEAT PUMPS</strong>
                  <p>
                    <strong>$250 - $750 Rebate</strong><br/>
                    Ductless heat pumps improve your home’s comfort year round
                  </p>
                </div>
              </div>
            </div>

            <div className="r-spa2"/>


            <div className="r-spa5">
              <div className="clearfix" style={styles.container}>
                <img src="/img/programs/efficiency_maine/heating-systems-100x100.png" alt="" style={styles.img} />
                <div>
                  <strong>HEATING SYSTEMS</strong>
                  <p>
                    <strong>$500 Rebate</strong><br/>
                    High-efficiency central heating systems save fuel, increase comfort and reduce emissions
                  </p>
                </div>
              </div>

              <div className="clearfix" style={styles.container}>
                <img src="/img/programs/efficiency_maine/wood-and-pellet-stoves-100x100.png" alt="" style={styles.img} />
                <div>
                  <strong>PELLET & WOOD STOVES</strong>
                  <p>
                    <strong>$500 Rebate</strong><br/>
                    EPA-rated pellet and wood stoves burn cleaner and more efficiently
                  </p>
                </div>
              </div>
              <div className="clearfix" style={styles.container}>
                <img src="/img/programs/efficiency_maine/wood-pellet-biomass-100x100.png" alt="" style={styles.img} />
                <div>
                  <strong>WOOD, PELLET & GEOTHERMAL</strong>
                  <p>
                    <strong>$5,000 Rebate</strong><br/>
                    Heat your entire home with a renewable fuel source
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const styles = {
  container: {
    marginTop: 20
  },
  img: {
    float: 'left',
    paddingRight: 10,
    width: 80
  },
}

export default  Maine;
