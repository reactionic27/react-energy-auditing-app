import React from 'react'
import Radium from 'radium'
import {Map as IMap} from 'immutable'
import CalculatedWrapper from './RecommendationListCalculatedWrapper'
import dynamicResize from 'decorators/dynamicResize';
import {Clearfix} from 'react-bootstrap'
import {View, Row, Col, Prioritize} from 'ui'
import {browserHistory} from 'react-router'
import * as f from 'data/formatters'

const untitledRec = <span className="rec-untitled">Untitled</span>

@Radium
@dynamicResize
export default class RecommendationListRow extends React.Component {

  static contextTypes = {
    jobId: React.PropTypes.number.isRequired,
  };

  static propTypes = {
    rec: React.PropTypes.instanceOf(IMap).isRequired,
    nextUuid: React.PropTypes.string,
    prevUuid: React.PropTypes.string
  };

  goToRecDetail = () => {
    const {rec} = this.props
    const {jobId} = this.context
    browserHistory.push(`/job/${jobId}/recommendation/${rec.get('uuid')}`)
  }

  // TODO: access full rec collection to pass into Prioritize
  render() {
    const {rec, activeTab, nextUuid, prevUuid} = this.props
    const {jobId} = this.context
    const uuid = rec.get('uuid')
    const recTitle = rec.get('title')

    // Shorten the recommendation title when display space is limited.
    const title = recTitle || untitledRec
    return (
      <View className="rec-row card card-fluid card-rec">
        <Row onClick={this.goToRecDetail}>
          <Col xs={12} sm={5} md={4}>
            <div className="card-rec-header">
              <div onClick={(e) => e.stopPropagation()}>
                <Prioritize table='recommendations' uuid={uuid} nextUuid={nextUuid} prevUuid={prevUuid} />
              </div>
              <div className="span-rec span-rec-name">
                <span style={styles.title}>{title}</span>
                <span className="span-rec-title">{f.recs.category(rec)}</span>
              </div>
            </div>
          </Col>
          <Clearfix visibleXsBlock />
          <CalculatedWrapper uuid={uuid} jobId={jobId} rec={rec} activeTab={activeTab} />
        </Row>
      </View>
    )
  }
}
const styles = {
  title: {
    textOverflow: 'ellipsis',
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    '@media (min-width: 768px)': {
      maxWidth: 220
    },
    '@media (min-width: 979px)': {
      maxWidth: 250
    }
  }
}
