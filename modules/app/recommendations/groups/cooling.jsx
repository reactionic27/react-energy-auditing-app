import React from 'react'
import {connectSelector} from 'snugg-redux'
import {Clearfix} from 'react-bootstrap'
import {Row, Col, Icon, AddButton} from 'ui'
import HvacCard from '../../hvacs/HvacCard'
import {allCoolingSystems} from 'data/formatters/hvacFormatters'

@connectSelector({
  collection: (state, {jobId}) => allCoolingSystems(state.fn.hvacsByJobId(jobId))
})
export default class Cooling extends React.Component {

  static contextTypes = {
    jobId: React.PropTypes.number.isRequired
  }

  render() {
    const {
      context: {jobId}
    } = this
    return (
      <div className="cards">
        <Row style={styles.cards}>
          <Col sm={12}>
            {Snugg.mapCollection(this.props.collection, (uuid, index) => (
              <HvacCard
                uuid={uuid}
                jobId={jobId}
                index={index} />
            ))}
          </Col>
        </Row>
        <Clearfix />
        <Row>
          <Col sm={4} md={3} smOffset={3}>
            <AddButton to={`/job/${this.context.jobId}/hvac/create`}>
              <span style={{float: 'left'}}>Add an HVAC system</span>
              <span style={{float: 'right'}}><Icon type="addNew"/></span>
              <Clearfix/>
            </AddButton>
          </Col>
        </Row>
      </div>
    )
  }
}


const styles = {
  cards: {
    marginBottom: 20
  }
}
