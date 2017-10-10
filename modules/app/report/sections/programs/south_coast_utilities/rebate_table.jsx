import React from 'react'

class HeatPumpTable extends React.Component {

  render() {
    return (
      <table className="table table-bordered table-condensed">
        <tbody>
          <thead style={{backgroundColor: rowColors.subTableHeader, color: rowColors.subTableHeaderFont}}>
            <tr>
              <th>Tons</th>
              <th>1.5</th>
              <th>2</th>
              <th>2.5</th>
              <th>3</th>
              <th>3.5</th>
              <th>4</th>
              <th>5</th>
            </tr>
          </thead>
          <tr style={{backgroundColor: rowColors.rowOdd}}>
            <th scope="row">15</th>
            <td>$100</td>
            <td>$125</td>
            <td>$150</td>
            <td>$200</td>
            <td>$225</td>
            <td>$250</td>
            <td>$325</td>
          </tr>
          <tr style={{backgroundColor: rowColors.rowEven}}>
            <th scope="row">16</th>
            <td>$125</td>
            <td>$175</td>
            <td>$200</td>
            <td>$250</td>
            <td>$275</td>
            <td>$325</td>
            <td>$400</td>
          </tr>
          <tr style={{backgroundColor: rowColors.rowOdd}}>
            <th scope="row">17</th>
            <td>$175</td>
            <td>$250</td>
            <td>$300</td>
            <td>$350</td>
            <td>$400</td>
            <td>$475</td>
            <td>$575</td>
          </tr>
          <tr style={{backgroundColor: rowColors.rowEven}}>
            <th scope="row">18+</th>
            <td>$200</td>
            <td>$275</td>
            <td>$325</td>
            <td>$400</td>
            <td>$450</td>
            <td>$525</td>
            <td>$650</td>
          </tr>
          <tr style={{backgroundColor: rowColors.rowOdd}}>
            <th scope="row">20 (Ductless)</th>
            <td>$225</td>
            <td>$300</td>
            <td>$375</td>
            <td>$450</td>
            <td>$500</td>
            <td>$575</td>
            <td>$700</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

class CentralAirTable extends React.Component {

  render() {
    return (
      <table className="table table-bordered table-condensed">
        <tbody>
          <thead style={{backgroundColor: rowColors.subTableHeader, color: rowColors.subTableHeaderFont}}>
            <tr>
              <th>Tons</th>
              <th>1.5</th>
              <th>2</th>
              <th>2.5</th>
              <th>3</th>
              <th>3.5</th>
              <th>4</th>
              <th>5</th>
            </tr>
          </thead>
          <tr style={{backgroundColor: rowColors.rowOdd}}>
            <th scope="row">15</th>
            <td>$75</td>
            <td>$100</td>
            <td>$125</td>
            <td>$150</td>
            <td>$175</td>
            <td>$200</td>
            <td>$250</td>
          </tr>
          <tr style={{backgroundColor: rowColors.rowEven}}>
            <th scope="row">16</th>
            <td>$100</td>
            <td>$150</td>
            <td>$175</td>
            <td>$200</td>
            <td>$250</td>
            <td>$300</td>
            <td>$350</td>
          </tr>
          <tr style={{backgroundColor: rowColors.rowOdd}}>
            <th scope="row">17</th>
            <td>$150</td>
            <td>$200</td>
            <td>$250</td>
            <td>$300</td>
            <td>$350</td>
            <td>$400</td>
            <td>$475</td>
          </tr>
          <tr style={{backgroundColor: rowColors.rowEven}}>
            <th scope="row">18+</th>
            <td>$175</td>
            <td>$225</td>
            <td>$300</td>
            <td>$350</td>
            <td>$425</td>
            <td>$475</td>
            <td>$550</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default class RebateTable extends React.Component {

  hasEnergyAssessmentFee() {
    var program = this.props.program
    switch (true) {
      case program === 'entergy': return false
      case program === 'energysmart': return false
      default: return true
    }
  }

  render() {
    return (
      <table className="table table-bordered table-condensed">
        <tbody>
          {this.hasEnergyAssessmentFee() &&
            <tr style={{backgroundColor: rowColors.row1}}>
              <th scope="row">Energy Assessment</th>
              <td>$75</td>
              <td></td>
            </tr>
          }
          <tr style={{backgroundColor: rowColors.row2}}>
            <th scope="row">Air Sealing</th>
            <td>Gas: $.05 cfm reduced<br/>Heat Pump: $.08 cfm reduced<br/>Electric: $0.13 cfm reduced</td>
            <td></td>
          </tr>
          <tr style={{backgroundColor: rowColors.row3}}>
            <th scope="row">Duct Sealing</th>
            <td>Gas: $0.75 cfm reduced<br/>Heat Pump: $1.50 cfm reduced<br/>Electric: $1.50 cfm reduced</td>
            <td></td>
          </tr>
          <tr style={{backgroundColor: rowColors.row4}}>
            <th scope="row">Attic Floor Insulation</th>
            <td>R 0-4:<br/>Gas: $0.12 sq./ft.<br/>Heat Pump: $0.24 sq./ft.<br/>Electric: $0.35 sq./ft.</td>
            <td>R 5-8:<br/>Gas: $0.08 sq./ft.<br/>Heat Pump: $0.12 sq./ft.<br/>Electric: $0.20 sq./ft.<br/></td>
          </tr>
          {this.props.program !== 'energysmart' &&
            <tr style={{backgroundColor: rowColors.row5}}>
              <th scope="row">HVAC Heat Pump Replacement</th>
              <td colSpan="2"><HeatPumpTable /></td>
            </tr>
          }
          <tr style={{backgroundColor: rowColors.row6}}>
            <th scope="row">HVAC Central Air Replacement</th>
            <td colSpan="2"><CentralAirTable /></td>
          </tr>

        </tbody>
      </table>
    )
  }

}

const rowColors = {
  row1: '#BEDAA4',
  row2: '#A0CF8A',
  row3: '#66977A',
  row4: '#8FB594',
  row5: '#D0D3C5',
  row6: '#fff',
  subTableHeader: '#054C56',
  subTableHeaderFont: '#fff',
  rowOdd: '#CDD1D2',
  rowEven: '#E8EAEA'
}

