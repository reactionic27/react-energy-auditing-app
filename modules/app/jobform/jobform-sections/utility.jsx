import React, {PropTypes} from 'react'
import pure from 'pure-render-decorator'
import StartDateRow from './utility/start-date-row'
import PricingOverride from './utility/pricing-override'
import UtilityRow from './utility/utility-row'
import {Row, Col, Clearfix} from 'react-bootstrap'
import {SectionH2} from 'ui'
import {connect} from 'snugg-redux'
import {InlineNotification} from '../../components/overlays/alerts/AlertTypes'
import {copyUtilDates} from 'data/actions'
function totalUsedLabel(type) {
  if (type === 'Fuel Oil') return 'Total oil used in last 12 months'
  if (type === 'Propane') return 'Total propane used in last 12 months'
  if (type === 'Pellets') return 'Total pellet cost in last 12 months'
  if (type === 'Wood') return 'Total wood cost in last 12 months'
}
function totalUsedSuffix(type, units) {
  return type === 'Wood' ? 'Dollars' : units
}
const ElectricUtilityRow = (props) => (
  <UtilityRow type='electric' {...props} />
)
const FuelUtilityRow = (props) => (
  <UtilityRow type='fuel' {...props} />
)

@pure
export default class UtilityContainer extends React.Component {

  static propTypes = {
    jobId: PropTypes.number.isRequired
  };

  render() {
    return (
      <div>
        <Snugg.Radio field="Bill Entry Type" />
        <UtilityFields {...this.props} />
      </div>
    )
  }
}

@connect((state, {jobId}) => {
  const utils = state.fn.utilitiesByJobIdJS(jobId)
  const program = state.fn.programByJobId(jobId)
  return {
    isSimpleBills: utils.bill_entry_type === 'Simple',
    isDetailedBills: utils.bill_entry_type === 'Detailed',
    hasBills: utils.bill_entry_type && utils.bill_entry_type !== 'No Bills',
    exposeAccountNumber: program && program.get('exposeAccountNumber')
  }
})
class UtilityFields extends React.Component {

  render() {
    const {
      props: {isSimpleBills, hasBills, exposeAccountNumber}
    } = this
    return (
      <div>
        <SectionH2>Electricity</SectionH2>
        <Snugg.Input field='Electric Utility Provider Name' />
        {exposeAccountNumber ? <Snugg.Input field='Electric Account Number' /> : null}
        {isSimpleBills ? <Snugg.Input field='Highest monthly summer electric bill' /> : null}
        {isSimpleBills ? <Snugg.Input field='Lowest monthly electric bill' /> : null}
        <ElectricDetailedBills {...this.props} />
        <Clearfix/>
        <SectionH2>Primary Heating Fuel</SectionH2>
        <Snugg.Select field="Primary Heating Fuel Type" />
        <FuelFields {...this.props} />
        <Clearfix/>
        <PricingOverride />
      </div>
    )
  }
}

@connect(null, {copyUtilDates})
class ElectricDetailedBills extends React.Component {

  electricToFuel = (e) => {
    this.props.copyUtilDates(this.props.jobId, 'electric', 'fuel')
  };

  fuelToElectric = (e) => {
    this.props.copyUtilDates(this.props.jobId, 'fuel', 'electric')
  };

  render() {
    const {
      props: {isDetailedBills, jobId}
    } = this
    if (!isDetailedBills) return null
    return (
      <div>
        <Snugg.Select
          inputSm={8}
          inputMd={5}
          field='Electric Bill Units'
          />
        <StartDateRow type="electric" />
        <ElectricUtilityRow num={1} jobId={jobId} />
        <ElectricUtilityRow num={2} jobId={jobId} />
        <ElectricUtilityRow num={3} jobId={jobId} />
        <ElectricUtilityRow num={4} jobId={jobId} />
        <ElectricUtilityRow num={5} jobId={jobId} />
        <ElectricUtilityRow num={6} jobId={jobId} />
        <ElectricUtilityRow num={7} jobId={jobId} />
        <ElectricUtilityRow num={8} jobId={jobId} />
        <ElectricUtilityRow num={9} jobId={jobId} />
        <ElectricUtilityRow num={10} jobId={jobId} />
        <ElectricUtilityRow num={11} jobId={jobId} />
        <ElectricUtilityRow num={12} jobId={jobId} />
        <Clearfix/>
        <div style={{marginTop: 20, marginBottom: 20}}>
          <Row>
            <Col sm={6}>
              <button type="button"
                onClick={this.electricToFuel}
                className="btn btn-block btn-brand-2 btn-md xs-ma-bo-20">
                <i className="ico-budicon-21" /> Copy elec. dates to fuel
              </button>{' '}
            </Col>
            <Col sm={6}>
              <button type="button"
                onClick={this.fuelToElectric}
                className="btn btn-block btn-brand-2 btn-md">
                <i className="ico-budicon-23" /> Copy fuel dates to elec.
              </button>
            </Col>
          </Row>
          <Clearfix/>
        </div>
      </div>

    )
  }

}

@connect((state, {jobId}) => {
  const utils = state.fn.utilitiesByJobIdJS(jobId)
  const program = state.fn.programByJobId(jobId)
  return {
    fuelType: utils.primary_heating_fuel_type,
    fuelUnits: utils.simple_fuel_units,
    exposeAccountNumber: program && program.get('exposeAccountNumber')
  }
})
class FuelFields extends React.Component {

  render() {
    const {
      props: {isSimpleBills, isDetailedBills, fuelType, fuelUnits, jobId, exposeAccountNumber}
    } = this
    let fuelFields = []

    const name = <Snugg.Input key="name" field='Fuel Utility Provider Name' suffix='abc' />
    const number = <Snugg.Input key="number" field='Fuel Account Number' suffix='#' />
    const highElecBill = <Snugg.Input key="highElecBill" field='Highest monthly winter electric bill' />
    const highGasBill = <Snugg.Input key="highGasBill" field='Highest monthly winter natural gas bill' />
    const lowGasBill = <Snugg.Input key="lowGasBill" field='Lowest monthly natural gas bill' />
    const pelletPrice = <Snugg.Input key="pelletPrice" field="Utility Price: Pellets" label='Pellets Price' containerClass="col-sm-3" />
    const woodPrice = <Snugg.Input key="woodPrice" field="Utility Price: Wood" label='Wood Price' containerClass="col-sm-3" />
    const simpleUnits = <Snugg.Select key="simpleUnits" field='Simple Fuel Units' size={2} />
    const totalUsed = <Snugg.Input key="totalUsed" field='Total %{type} Used in last 12 Months' label={totalUsedLabel(fuelType)} suffix={totalUsedSuffix(fuelType, fuelUnits)} />

    if (fuelType === 'Electricity') {
      if (isSimpleBills) {
        fuelFields.push(highElecBill)
      }
    } else {
      fuelFields.push(name)
      if (exposeAccountNumber) {
        fuelFields.push(number)
      }
      if (isDetailedBills) {
        fuelFields.push(<DetailedFuelFields key="detailed" jobId={jobId} />)
      }
      if (isSimpleBills) {
        if (fuelType === 'Natural Gas') {
          fuelFields.push(highGasBill, lowGasBill)
        } else if (fuelType === 'Fuel Oil' || fuelType === 'Propane') {
          fuelFields.push(simpleUnits, totalUsed)
        } else if (fuelType === 'Wood') {
          fuelFields.push(woodPrice, totalUsed)
        } else if (fuelType === 'Pellets') {
          fuelFields.push(pelletPrice, totalUsed)
        } else if (!fuelType) {
          fuelFields = (
            <InlineNotification message="Choose a primary heating fuel type" />
          )
        }
      }
    }

    return (
      <div>
        {fuelFields}
      </div>
    )
  }
}

function DetailedFuelFields({jobId}) {
  return (
    <div>
      <Snugg.Select field='Fuel Bill Units' />
      <StartDateRow type='fuel' />
      <FuelUtilityRow num={1} jobId={jobId} />
      <FuelUtilityRow num={2} jobId={jobId} />
      <FuelUtilityRow num={3} jobId={jobId} />
      <FuelUtilityRow num={4} jobId={jobId} />
      <FuelUtilityRow num={5} jobId={jobId} />
      <FuelUtilityRow num={6} jobId={jobId} />
      <FuelUtilityRow num={7} jobId={jobId} />
      <FuelUtilityRow num={8} jobId={jobId} />
      <FuelUtilityRow num={9} jobId={jobId} />
      <FuelUtilityRow num={10} jobId={jobId} />
      <FuelUtilityRow num={11} jobId={jobId} />
      <FuelUtilityRow num={12} jobId={jobId} />
    </div>
  )
}
