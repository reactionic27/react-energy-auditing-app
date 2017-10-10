import React from 'react'

var KCM2 = React.createClass({

  render() {
    return (
      <div className="report-page-rebates-foe">
        <div className="report-body">
          <div className="report-main">
            <h2>Missouri Gas Energy Rebates</h2>
            <div className="r-row">
              <div className="r-spa6">
                <h3 style={{marginTop: 30}}>Water Heater Rebates</h3>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td style={styles.leftCell}>
                        Gas Tankless
                        <br/>
                        (less than 2 gallons)
                      </td>
                      <td style={baseTdStyle}>0.82 EF or higher</td>
                      <td style={styles.rightCell}>$300</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>
                        Gas Storage
                        <br/>
                        (56 - 100 gallons)
                      </td>
                      <td style={baseTdStyle}>0.77 EF or higher</td>
                      <td style={styles.rightCell}>$350</td>


                    </tr>
                    <tr>
                      <td style={styles.leftCell}>
                        Gas Storage
                        <br/>
                        (20 - 55 gallons)
                      </td>
                      <td style={baseTdStyle}>0.67 EF or higher</td>
                      <td style={styles.rightCell}>$200</td>
                    </tr>
                  </tbody>
                </table>

                <h3 style={styles.heading}>Furnace Rebates</h3>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td style={styles.leftCell}>Gas Furnace</td>
                      <td style={baseTdStyle}>Greater than or equal to 96% AFUE</td>
                      <td style={styles.rightCell}>$300</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>Gas Furnace</td>
                      <td style={baseTdStyle}>92% less than 96% AFUE </td>
                      <td style={styles.rightCell}>$200</td>
                    </tr>
                  </tbody>
                </table>

                <h3 style={styles.heading}>Thermostat Rebates</h3>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td style={styles.leftCell}>Programmable Thermostat 7-Day Programmable</td>
                      <td style={styles.rightCell}>$25 <br/>or 50% of the equipment cost, whichever is lower</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="r-spa6">
                <h3 style={styles.heading}>Boiler Rebates</h3>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td style={styles.leftCell}>Gas Boiler</td>
                      <td style={baseTdStyle}>90% AFUE or greater</td>
                      <td style={styles.rightCell}>$300</td>
                    </tr>
                  </tbody>
                </table>

                <h3 style={styles.heading}>Integrated Systems Rebates</h3>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td style={styles.leftCell}>High efficiency boiler (side-arm tank)</td>
                      <td style={baseTdStyle}>90% AFUE or greater</td>
                      <td style={styles.rightCell}>$450</td>
                    </tr>
                    <tr>
                      <td style={styles.leftCell}>High efficiency tankless water heater</td>
                      <td style={baseTdStyle}>0.82 EF or higher</td>
                      <td style={styles.rightCell}>$450</td>
                    </tr>
                  </tbody>
                </table>

                <h3 style={styles.heading}>For full details, visit <a href="http://bit.ly/mge-rebates" target="_blank">bit.ly/mge-rebates</a></h3>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }

});

const baseTdStyle = {
  padding: "9px 3px",
  lineHeight: '1.3em',
  verticalAlign: 'top',
  borderTop: '1px solid #ddd'

}

const styles = {
  table: {
    marginBottom: 25,
    marginTop: 10,
    fontSize: 12,
    width: '100%'
  },
  heading: {
    marginTop: 40
  },
  leftCell: {
    ...baseTdStyle,
    paddingRight: 15
  },
  rightCell: {
    ...baseTdStyle,
    textAlign: 'right',
  },
}

module.exports = KCM2;
