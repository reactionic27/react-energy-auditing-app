import React from 'react'

var KCM1 = React.createClass({

  render() {
    return (
      <div className="report-page-rebates-foe">
        <div className="report-body">
          <div className="report-main">
            <h2> KCP&L Rebate Incentive Chart</h2>
            <div className="r-row">
              <div className="r-spa6">
                <h3 style={{marginBottom: 10}}>Heating & Cooling Rebates </h3>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <th colSpan={2} style={styles.tableHeader}>Central Air Conditioner*</th>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>SEER 15** – Replacing Failed Equipment:</td>
                      <td style={styles.rightCell}>$125</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>SEER 15** – Replacing Operating Equipment:</td>
                      <td style={styles.rightCell}>$250</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>SEER 16** – Replacing Failed Equipment:</td>
                      <td style={styles.rightCell}>$200</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>SEER 16** – Replacing Operating Equipment:</td>
                      <td style={styles.rightCell}>$400</td>
                    </tr>
                  </tbody>
                </table>


                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <th colSpan={2} style={styles.tableHeader}>Heat Pump*</th>
                    </tr>

                    <tr>
                      <td style={styles.leftCell}>SEER 15, 8.5 HSPF** – Replacing Failed Equipment:  </td>
                      <td style={styles.rightCell}>$150</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>SEER 15, 8.5 HSPF** – Replacing Operating Equipment</td>
                      <td style={styles.rightCell}>$300</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>SEER 15, 8.5 HSPF** – Replacing Primary Electric Resistance Heat (Failed or Operating):</td>
                      <td style={styles.rightCell}>$800</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>SEER 16, 8.5 HSPF** – Replacing Failed Equipment:</td>
                      <td style={styles.rightCell}>$300</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>SEER 16, 8.5 HSPF** – Replacing Operating Equipment</td>
                      <td style={styles.rightCell}>$600</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>SEER 16, 8.5 HSPF** – Replacing Primary Electric Resistance Heat (Failed or Operating):</td>
                      <td style={styles.rightCell}>$1,000</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>SEER 17, 8.6 HSPF** – Replacing Failed Equipment:</td>
                      <td style={styles.rightCell}>$500</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>SEER 17, 8.6 HSPF** – Replacing Operating Equipment</td>
                      <td style={styles.rightCell}>$900</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>SEER 17, 8.6 HSPF** – Replacing Primary Electric Resistance Heat (Failed or Operating):</td>
                      <td style={styles.rightCell}>$1,200</td>
                    </tr>
                  </tbody>
                </table>

                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <th style={styles.tableHeader}>Other*</th>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>Heat Pump Ductless Mini-Split</td>
                      <td style={styles.rightCell}>$300</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>Electronically Commutated Motor (ECM – Blower Fan Motor)</td>
                      <td style={styles.rightCell}> $150 <br/> per ECM
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>Heat Pump Water Heater</td>
                      <td style={styles.rightCell}>$500 <br/>per heat pump water heater</td>
                    </tr>
                    <tr>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="r-spa6">
                <h3>Insulation & Window Rebates</h3>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td style={styles.leftCell}>Air Sealing***</td>
                      <td style={baseTdStyle}>$0.08 per sq. ft.  </td>
                      <td style={styles.rightCell}>$300</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>Ceiling Insulation, R-38***</td>
                      <td style={baseTdStyle}>$0.30 per sq. ft.  </td>
                      <td style={styles.rightCell}>$500</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>Wall Insulation*** </td>
                      <td style={baseTdStyle}>$0.65 per sq. ft.</td>
                      <td style={styles.rightCell}>$150</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>ENERGY STAR® Window*** </td>
                      <td style={baseTdStyle}>$75 per window    </td>
                      <td style={styles.rightCell}>$750</td>
                    </tr>
                  </tbody>
                </table>

                <h3>Bonus Incentives</h3>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td style={styles.leftCell}>Air Sealing and ENERGY STAR Windows****</td>
                      <td style={styles.rightCell}>$300</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>Insulation and Window Rebate Plus Replacing Failed Central AC/Heat Pump</td>
                      <td style={styles.rightCell}>$100</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>Insulation and Window Rebate Plus Replacing Operating Central AC/Heat Pump</td>
                      <td style={styles.rightCell}>$150</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>Insulation and Window Rebate Plus Replacing Failed or Operating Electric Resistance Heat</td>
                      <td style={styles.rightCell}>$200</td>
                    </tr>
                  </tbody>
                </table>
                <p style={{marginTop: 30, marginBottom: 20}}>
                  <small>
                    *All heating and cooling equipment is required to be Air-Conditioning, Heating and Refrigeration Institute (AHRI) Rated. **Maximum nominal SEER for operational equipment rebate is 10 and the system must be at least 5 years old.
                    ***PLEASE NOTE: Customers must have participated in the Energy Savings Kit and have received a Comprehensive Home Audit (including a pre- and post-test blower door test) to qualify for this rebate.
                    ****20% improvement on air sealing must be made to qualify for this rebate.
                    Some restrictions may apply. Visit KCPL.com/EnergyOffers for full details. Rebates effective for qualifying installations on or after April 1, 2016.
                  </small>
                </p>
                <h3>For full details, visit <a href="http://KCPL.com/EnergyOffers" target="_blank">KCPL.com/EnergyOffers</a></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

const baseTdStyle = {
  padding: "3px 3px",
  lineHeight: '1.3em',
  verticalAlign: 'top',
  borderTop: '1px solid #ddd'

}

const styles = {
  table: {
    marginBottom: 15,
    fontSize: 12,
    width: '100%'
  },
  leftCell: {
    ...baseTdStyle,
    paddingRight: 15
  },
  rightCell: {
    ...baseTdStyle,
    textAlign: 'right',
  },
  tableHeader: {
    paddingLeft: 0,
    fontSize: 13,
    textTransform: 'uppercase'
  }
}

module.exports = KCM1;
