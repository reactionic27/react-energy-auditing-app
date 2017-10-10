import _ from 'lodash'
import React, {PropTypes} from 'react'
import {connect} from 'snugg-redux'
import {HVAC_SECTIONS} from '../../../constants/hvacConstants'
import {UPGRADE_ACTIONS} from '../../../constants/field-definitions/fields-hvac'
import {Clearfix, Row} from 'react-bootstrap'
import {Button} from 'ui'

@connect((state, {jobId, uuid}) => {
  return {
    hvac: state.fn.hvacByUuidJS(uuid)
  }
})
export default class HvacEditSystem extends React.Component {

  static propTypes = {
    uuid: PropTypes.string,
    hvac: PropTypes.object.isRequired,
  };

  renderColumns(fields: Array) {
    return (
      <div>
        {fields.map(field => (
          <Snugg.Rec.Row key={field.field} uuid={this.props.uuid} {...field} />
        ))}
      </div>
    )
  }

  render() {
    const {
      props: {uuid, hvac}
    } = this
    let sections = []
    let sectionFields

    sectionFields = HVAC_SECTIONS[hvac.hvac_system_equipment_type]

    if (sectionFields) {
      if (sectionFields.heating) {
        sections.push(
          <Section title="Heating" key="Heating">
            {this.renderColumns(sectionFields.heating)}
          </Section>
        )
      }
      if (sectionFields.cooling) {
        sections.push(
          <Section title="Cooling" key="Cooling">
            {this.renderColumns(sectionFields.cooling)}
          </Section>
        )
      }
      if (sectionFields.ducts) {
        sections.push(
          <Section title="Ducts" key="Ducts">
            {this.renderColumns(sectionFields.ducts)}
          </Section>
        )
      }
    }
    return (
      <div>
        {/* Don't delete the plain parent div above. It's needed to get react-scroll to work. */}
        <div className="collection animated fadeIn slow" style={styles.container}>
          <span style={{fontSize: 18, fontWeight: 600, paddingTop: 10, paddingLeft: 5}}>Edit System > {hvac.hvac_system_name || 'Unamed System'} </span>
          <Button variant="link" customStyle={{float: 'right', width: 'auto'}} onClick={this.props.clearHvacEdit}>
            Close
          </Button>
          <Clearfix/>
          <Snugg.Input uuid={uuid} size={5} field="System Name" placeholder="Name this system" />
          <Snugg.Input uuid={uuid} size={4} field="System Equipment Type" disabled />
          <Snugg.Select uuid={uuid} size={4} field="Upgrade action" options={_.filter(UPGRADE_ACTIONS)} />
          {sections}
          <Clearfix/>
          <Button variant="link" size="lg" onClick={this.props.clearHvacEdit}>
            Close {hvac.hvac_system_name || 'HVAC system'}
          </Button>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    boxShadow: '1px 1px 40px rgba(0,0,0,0.3)',
    marginLeft: -10,
    marginRight: -10,
    marginTop: -15,
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20
  },
  legend: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 600,
    marginTop: 30
  }
}

function Section({title, children}) {
  return (
    <div>
      <legend style={styles.legend}>{title}</legend>
      {children}
    </div>
  )
}
