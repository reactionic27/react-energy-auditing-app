import React, {PropTypes} from 'react'
import {connect} from 'snugg-redux'
import {HVAC_SECTIONS} from '../../../constants/hvacConstants'
import {BaseImprovedLabel, Row, Col} from 'ui'
import {InlineNotification} from '../components/overlays/alerts/AlertTypes'

@connect((state, {jobId, uuid}) => {
  return {
    hvac: state.fn.hvacByUuidJS(uuid)
  }
})
export default class HvacEditSystem extends React.Component {

  static propTypes = {
    uuid: PropTypes.string,
    hvac: PropTypes.object.isRequired,
    inlineNotification: PropTypes.string.isRequired
  };

  renderColumns(fields: Array) {
    return (
      <Row>
        <Col sm={12}>
          <Row>
            <Col sm={3} smOffset={3} xsHidden>
              <BaseImprovedLabel label="Existing" />
            </Col>
            <Col sm={5} smOffset={1} xsHidden>
              <BaseImprovedLabel label="Improved" />
            </Col>
          </Row>
          {fields.map(field => (
            <Snugg.Rec.Row key={field.field} uuid={this.props.uuid} {...field} />
          ))}
        </Col>
      </Row>
    )
  }

  render() {
    const {
      props: {hvac: {hvac_system_name, hvac_system_equipment_type}, inlineNotification}
    } = this
    const fields = HVAC_SECTIONS[hvac_system_equipment_type].ducts
    return (
      <Section title={`${hvac_system_name} Ducts:`} key="Ducts">
        <InlineNotification
          message={inlineNotification}
        />
        {this.renderColumns(fields)}
      </Section>
    )
  }
}

const styles = {
  legend: {
    marginBottom: 15,
    fontSize: 22,
    fontWeight: 600,
    marginTop: 30
  }
}

function Section({title, children}) {
  return (
    <div className="form-horizontal">
      <legend style={styles.legend}>
        {title}
      </legend>
      {children}
    </div>
  )
}
