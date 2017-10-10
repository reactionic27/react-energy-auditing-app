import React from 'react'
import Radium from 'radium'
import {Clearfix} from 'react-bootstrap'
import {Row, Col, AddButton} from 'ui'
import HvacCard from '../../hvacs/HvacCard'
import {connect} from 'snugg-redux'
import {InlineNotification} from '../../components/overlays/alerts/AlertTypes'

@Radium
@connect((state, {jobId}) => ({
  collection: state.fn.hvacsByJobId(jobId)
}))
export default class Hvacs extends React.Component {

  static propTypes = {
    jobId: React.PropTypes.number.isRequired,
    inlineNotification: React.PropTypes.string
  };

  render() {
    const {
      props: {jobId, inlineNotification},
    } = this
    return (
      <div className="cards">
        <Row style={styles.cards}>
          <Col sm={12}>
            {inlineNotification &&
              <InlineNotification
                theme="error"
                message={inlineNotification}
              />
            }
            {Snugg.mapCollection(this.props.collection, (uuid, index) => (
              <HvacCard uuid={uuid} jobId={jobId} index={index} />
            ))}
          </Col>
        </Row>
        <Clearfix />
        <Row>
          <Col sm={12} md={6} lg={4} mdOffset={3} lgOffset={4}>
            <AddButton to={`/job/${jobId}/hvac/create`}>
              Add an HVAC system
            </AddButton>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  cards: {
    marginBottom: 20
  }
}
