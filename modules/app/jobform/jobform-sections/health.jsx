import React from 'react'

class Health extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Radio field='Ambient Carbon Monoxide' size={12} />
        <Snugg.Radio field='Natural Condition Spillage' size={12} />
        <Snugg.Radio field='Worst Case Depressurization' size={12} />
        <Snugg.Radio field='Worst Case Spillage' size={12} />
        <Snugg.Radio field='Undiluted Flue CO' size={12} />
        <Snugg.Radio field='Draft Pressure' size={12} />
        <Snugg.Radio field='Gas Leak' size={12} />
        <Snugg.Radio field='Venting' size={12} />
        <Snugg.Radio field='Mold & Moisture' size={12} />
        <Snugg.Radio field='Radon' size={12} />
        <Snugg.Radio field='Asbestos' size={12} />
        <Snugg.Radio field='Lead' size={12} />
        <Snugg.Radio field='Electrical' size={12} />
      </div>
    )
  }

}

export default  Health;
