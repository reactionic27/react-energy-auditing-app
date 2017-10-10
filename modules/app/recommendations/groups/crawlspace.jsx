import React from 'react'

// TODO: see master. Right now showing this screen shows the redbox errors.
// not selector: Selector creators expect all input-selectors to be functions, instead received the following types: [undefined]
// TODO: Shouldn't sublabels just be defined in the fields table? This should probably happen on the generic field


export default class Crawlspace extends React.Component {

  render() {
    return (
      <div>
        <Snugg.Rec.Row field="Crawlspace Type" />
        <Snugg.Rec.Row field="Crawl Wall Insulation" label="Wall Insulation" />
        <Snugg.Rec.Row field="Crawl Wall Insulation Type" label={crawlspaceWallInsulationTypeLabel} />
        <Snugg.Rec.Row field="Crawl Cavity Insulation" label={FloorCavityInsulationLabel} size={4} />
        <Snugg.Rec.Row field="Crawl Cavity Insulation Type" label={crawlspaceCavityInsulationTypeLabel}/>
        <Snugg.Input field="Modeled Crawl Wall Area" />
        <Snugg.Input field="Modeled Crawl Floor Area" label={ModeledCrawlFloorAreaLabel} size={4} />
        <Snugg.Input field="Crawlspace Rim Joist Length" />
        <Snugg.Rec.Row type="Select" field="Crawlspace Rim Joist Treatment" />
        <Snugg.Rec.Row field="Crawlspace Rim Joist Insulation" />
        <Snugg.Rec.Row field="Crawlspace Rim Joist Insulation Type" label={crawlspaceRimInsulationTypeLabel} />
      </div>
    )
  }
}

var ModeledCrawlFloorAreaLabel = (
  <label>
    Modeled Crawl Floor Area<br />
    <small style={{fontWeight: 'normal'}}>(Crawl Space Ceiling)</small>
  </label>
)

var FloorCavityInsulationLabel = (
  <label>
    Floor Cavity Insulation<br />
    <small style={{fontWeight: 'normal'}}>(Crawl Space Ceiling)</small>
  </label>
)
var crawlspaceCavityInsulationTypeLabel = (
  <label>
    Floor Cavity Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
var crawlspaceWallInsulationTypeLabel = (
  <label>
    Wall Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
var crawlspaceRimInsulationTypeLabel = (
  <label>
    Rim Joist Insulation Type<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
