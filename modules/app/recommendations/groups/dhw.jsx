import React from 'react'
import {connectSelector} from 'snugg-redux'


// const dhwHeatingCapacityLabel = (
//   <label>
//     Heating Capacity<br />
//     <small style={{fontWeight: 'normal'}}>(optional)</small>
//   </label>
// )
//
// const dhwTankSizeLabel = (
//   <label>
//     Tank Size<br />
//     <small style={{fontWeight: 'normal'}}>(optional)</small>
//   </label>
// )


@connectSelector({
  collection: (state, {jobId}) => state.fn.dhwsByJobId(jobId)
})
export default class Dhw extends React.Component {
  render() {
    return (
      <div style={{marginBottom: 20}}>
        {Snugg.mapCollection(this.props.collection, (uuid, index) => (
          <div className="collection">
            <Snugg.Rec.Title label={`DHW ${index}`} uuid={uuid} collection="dhw" deletable />
            <Snugg.Rec.Row uuid={uuid} field="DHW % Load" label="% of Load" />
            <Snugg.Rec.Row uuid={uuid} field="DHW Fuel2" label="Fuel" />
            <Snugg.Rec.Row uuid={uuid} field="DHW Type2" options={dhwTypeOpts} type="Select" label="Type" />
            <Snugg.Rec.Row uuid={uuid} field="DHW Energy Factor" validate={dhwEFValidate} label="Energy Factor" />
            <Snugg.Rec.Row uuid={uuid} field="DHW Recovery Efficiency" label={dhwRecoveryEfficiencyLabel} size={4} />
            <Snugg.Rec.Row uuid={uuid} field="DHW Tank Size" label={dhwTankSizeLabel} size={4} />
            <Snugg.Rec.Row uuid={uuid} field="DHW Heating Capacity" label={dhwHeatingCapacityLabel} size={4} />
            <Snugg.Rec.Row uuid={uuid} field="DHW Energy Star" type="Radio" label="ENERGY STAR" />
            <Snugg.Rec.Row uuid={uuid} field="DHW Manufacturer" label="Manufacturer" />
            <Snugg.Rec.Row uuid={uuid} field="DHW Model" label="Model #" />
            <Snugg.Rec.Row uuid={uuid} field="DHW Model Year" label="Model Year" />
          </div>
        ))}
        <Snugg.Buttons.CollectionAdd collection="dhw" max={2} label="Add another water heater" />
      </div>
    )
  }
}

var dhwRecoveryEfficiencyLabel = (
  <label>
    Recovery Efficiency<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)
var dhwHeatingCapacityLabel = (
  <label>
    Heating Capacity<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)

var dhwTankSizeLabel = (
  <label>
    Tank Size<br />
    <small style={{fontWeight: 'normal'}}>(optional)</small>
  </label>
)


function dhwEFValidate(state, props) {
  const dhw = state.fn.dhwByUuidJS(props.uuid)
  const dhwType = props.improved
    ? dhw.dhw_type_2_improved
    : dhw.dhw_type_2
  return dhwType === 'Heat Pump' ? 'gte:100|lte:500' : 'gte:1|lte:100'
}

// If DHW Type(2) = Heat Pump, then set DHW Energy Factor
// validations to Min = 100 & Max = 500
function dhwTypeOpts(state, props) {
  const dhw = state.fn.dhwByUuidJS(props.uuid)
  const fuelType = props.improved
    ? dhw.dhw_fuel_2_improved
    : dhw.dhw_fuel_2
  const opts = [
    "",
    "Tank Water Heater",
    "Tankless Water Heater",
  ]
  if (fuelType === 'Electricity') {
    opts.push("Heat Pump")
  }
  return opts
}
