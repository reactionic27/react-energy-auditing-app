import React, {PropTypes} from 'react'

class TwoCellRow extends React.Component {

  static propTypes = {
    tdStyle: PropTypes.object,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ])
  }

  getRightTdStyle(props) {
    return {
      textAlign: 'right',
      whiteSpace: 'nowrap',
      ...this.props.tdStyle
    }
  }

  render() {
    const {tdStyle, label, value} = this.props
    return (
      <tr>
        <td style={tdStyle && tdStyle}>{label}</td>
        <td style={this.getRightTdStyle(this.props)}>{value}</td>
      </tr>
    )
  }
}

export default  TwoCellRow;
