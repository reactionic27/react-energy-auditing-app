import React, {PropTypes} from 'react'
import {RRow, RCol} from 'ui'
import pure from 'pure-render-decorator'
import {ReportSection, ReportHeader, ReportBody, ReportFooter} from 'app/report/components'
import {REPORT_PALETTE} from 'app/lib/report-styles'
@pure
class GlossaryReportContent extends React.Component {
  render() {
    return (
      <RRow>
        <RCol span={4}>
          <dl style={styles.glossary}>
            <dt style={styles.term}>Annual Fuel Utilization Efficiency (AFUE)</dt>
            <dd style={styles.definition}>The measure of seasonal or annual efficiency of a residential heating furnace or boiler. It takes into account the cyclic on/off operation and associated energy losses of the heating unit as it responds to changes in the load, which in turn is affected by changes in weather and occupant controls.</dd>
            <dt style={styles.term}>Annualized Return</dt>
            <dd style={styles.definition}>The return an investment provides over a period of time, expressed as a time-weighted annual percentage. This is the equivalent annual interest rate you would get if you put the same amount of money spent on the energy upgrade into a savings account.</dd>
            <dt style={styles.term}>Asbestos</dt>
            <dd style={styles.definition}>Asbestos is a mineral fiber that has been used commonly in a variety of building construction materials for insulation and as a fire-retardant, but is no longer used in homes. When asbestos-containing materials are damaged or disturbed by repair, remodeling or demolition activities, microscopic fibers become airborne and can be inhaled into the lungs, where they can cause significant health problems.</dd>
            <dt style={styles.term}>British Thermal Unit (Btu)</dt>
            <dd style={styles.definition}>The amount of heat required to raise the temperature of one pound of water one degree Fahrenheit; equal to 252 calories.</dd>
            <dt style={styles.term}>Carbon Monoxide (CO)</dt>
            <dd style={styles.definition}>A colorless, odorless but poisonous combustible gas with the formula CO. Carbon monoxide is produced in the incomplete combustion of carbon and carbon compounds such as fossil fuels (i.e. coal, petroleum) and their products (e.g. liquefied petroleum gas, gasoline), and biomass.</dd>
            <dt style={styles.term}>Cashflow</dt>
            <dd style={styles.definition}>When financing energy efficiency improvements, cashflow is the difference between the average monthly energy savings and the monthly loan payment.</dd>
            <dt style={styles.term}>Combustion Appliance Zone (CAZ)</dt>
            <dd style={styles.definition}>A contiguous air volume within a building that contains a combustion appliance such as furnaces, boilers, and water heaters; the zone may include, but is not limited to, a mechanical closet, mechanical room, or the main body of a house, as applicable.</dd>
            <dt style={styles.term}>Compact Fluorescent Light bulb (CFL) </dt>
            <dd style={styles.definition}>A smaller version of standard fluorescent lamps which can directly replace standard incandescent lights. These highly efficient lights consist of a gas filled tube, and a magnetic or electronic ballast.</dd>
          </dl>
        </RCol>
        <RCol span={4}>
          <dl style={styles.glossary}>
            <dt style={styles.term}>Cubic Feet per Minute (CFM) </dt>
            <dd style={styles.definition}>A measurement of airflow that indicates how many cubic feet of air pass by a stationary point in one minute.</dd>
            <dt style={styles.term}>Carbon Dioxide (CO2) </dt>
            <dd style={styles.definition}>A colorless, odorless noncombustible gas that is present in the atmosphere. It is formed by the combustion of carbon and carbon compounds (such as fossil fuels and biomass). It acts as a greenhouse gas which plays a major role in global warming and climate change.</dd>
            <dt style={styles.term}>Energy Efficiency Ratio (EER) </dt>
            <dd style={styles.definition}>The measure of the energy efficiency of room air conditioners: cooling capacity in Btu/hr divided by the watts consumed at a specific outdoor temperature.</dd>
            <dt style={styles.term}>Energy Factor (EF) </dt>
            <dd style={styles.definition}>The measure of efficiency for a variety of appliances. For water heaters, the energy factor is based on three factors: 1) the recovery efficiency, or how efficiently the heat from the energy source is transferred to the water; 2) stand-by losses, or the percentage of heat lost per hour from the stored water compared to the content of the water: and 3) cycling losses. For dishwashers, the energy factor is the number of cycles per kWh of input power. For clothes washers, the energy factor is the cubic foot capacity per kWh of input power per cycle. For clothes dryers, the energy factor is the number of pounds of clothes dried per kWh of power consumed.</dd>
            <dt style={styles.term}>Heating Seasonal Performance Factor (HSPF) </dt>
            <dd style={styles.definition}>The measure of seasonal efficiency of a heat pump operating in the heating mode. It takes into account the variations in temperature that can occur within a season and is the average number of Btu of heat delivered for every watt-hour of electricity used.</dd>
            <dt style={styles.term}>Heat Recovery Ventilator (HRV) / Energy Recovery Ventilator (ERV) </dt>
            <dd style={styles.definition}>A device that captures the heat or energy from the exhaust air from a building and transfers it to the supply/fresh air entering the building to preheat the air and increase overall heating efficiency while providing consistent fresh air.</dd>
            <dt style={styles.term}>Light Emitting Diode (LED) Lighting </dt>
            <dd style={styles.definition}>An extremely efficient semiconductor light source. LEDs present many ad- vantages over incandescent light sources including lower energy consumption, longer lifetime, improved physical robustness, and smaller size.</dd>
          </dl>
        </RCol>
        <RCol span={4}>
          <dl style={styles.glossary}>
            <dt style={styles.term}>Modified Internal Rate of Return (MIRR) </dt>
            <dd style={styles.definition}>This is your return on investment. Roughly speaking, if you invested the same amount of money for this project (listed on this report as the total cost) into a bank account, your equivalent interest rate from all of the energy savings would be the MIRR.</dd>
            <dt style={styles.term}>N-Factor </dt>
            <dd style={styles.definition}>A factor of how susceptible your house is to wind, influenced by weather patterns, location, and the number of floors in the home. Used in the calculation of NACH.</dd>
            <dt style={styles.term}>Natural Air Changes per Hour (NACH) </dt>
            <dd style={styles.definition}>The number of times in one hour the entire volume of air inside the building leaks to the outside naturally.</dd>
            <dt style={styles.term}>Payback Period </dt>
            <dd style={styles.definition}>The amount of time required before the savings resulting from your system equal the system cost.</dd>
            <dt style={styles.term}>R-Value </dt>
            <dd style={styles.definition}>A measure of the capacity of a material to resist heat transfer. The R-Value is the reciprocal of the conductivity of a material (U-Value). The larger the R-Value of a material, the greater its insulating properties.</dd>
            <dt style={styles.term}>Radon </dt>
            <dd style={styles.definition}>A naturally occurring radioactive gas found in the U.S. in nearly all types of soil, rock, and water. It can migrate into most buildings. Studies have linked high concentrations of radon to lung cancer.</dd>
            <dt style={styles.term}>Rim Joist </dt>
            <dd style={styles.definition}>In the framing of a deck or building, a rim joist is the final joist that caps the end of the row of joists that support a floor or ceiling. A rim joist makes up the end of the box that comprises the floor system.</dd>
            <dt style={styles.term}>Seasonal Energy Efficiency Ratio (SEER) </dt>
            <dd style={styles.definition}>A measure of seasonal or annual efficiency of a central air conditioner or air conditioning heat pump. It takes into account the variations in temperature that can occur within a season and is the average number of Btu of cooling delivered for every watt-hour of electricity used by the heat pump over a cooling season.</dd>
            <dt style={styles.term}>Savings to Investment Ratio (SIR) </dt>
            <dd style={styles.definition}>A ratio used to determine whether a project that aims to save money in the future is worth doing. The ratio compares the investment that is put in now with the amount of savings from the project.</dd>
          </dl>
        </RCol>
      </RRow>
    )
  }
}

@pure
export default class GlossaryReportSection extends React.Component {

  static reportHeaderTitle = "reports:title_glossary";
  static contextTypes = {
    jobId: PropTypes.number,
  }
  render() {
    const {jobId} = this.context
    return (
      <ReportSection name="glossary">
        <ReportHeader field='Report: Glossary Title' jobId={jobId} />
        <ReportBody>
          <GlossaryReportContent />
        </ReportBody>
        <ReportFooter jobId={jobId} />
      </ReportSection>
    )
  }
}

const styles = {
  glossary: {
    fontSize: '0.8em',
    lineHeight: '1.1em'
  },
  term: {
    float: 'left',
    marginRight: 10,
    lineHeight: 'inherit',
    color: REPORT_PALETTE.color2
  },
  definition: {
    margin: 'auto auto 5px 10px',
    lineHeight: '1.2em'
  }
}
