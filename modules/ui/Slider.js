import React from 'react'
// import {Button, Row, Col} from 'ui'
import ReactSlider from 'react-slider'

export default class Slider extends React.Component {

  state = {
    value: [5, 20, 50],
  };

  handleChange = (val) => {
    console.log(val)
    this.setState({value: val})
  };

  render() {
    const {value} = this.state
    return (
      <ReactSlider withBars pearling value={value} onChange={this.handleChange} className='horizontal-slider'>
        <div className="bar bar-0"><small>{value[0]}%</small></div>
        <div className="bar bar-1"><small>{value[1]}%</small></div>
        <div className="bar bar-2"><small>{value[2]}%</small></div>
      </ReactSlider>
    )
  }
}
