import React, {PropTypes} from 'react'
import {connect} from 'snugg-redux'
import { browserHistory } from 'react-router'
import {View, Row, Col, TabHeader, BlankText} from 'ui'
import {Map as IMap} from 'immutable'
import {InlineNotification, RefineInfoBox} from 'app/components/overlays'
import PrimaryButton from 'ui/primary-button'
import {dispatchEagerCreate} from 'data/actions'
import * as f from 'data/formatters'


const headerTitle = {
  recommended: 'Recommendations',
  mentioned: 'Additional Notes',
  declined: 'Declined Items'
};

const headerSubtitle = {
  recommended: 'These are items that will show up with a cost and savings on the report. Change their status to \'Noted\' or \'Declined\' if you don\'t want to recommend them.',
  mentioned: 'These are items that may not need an upgrade, but still deserve attention. These will show up in the additional notes section in the report but without costs, savings and energy values (Now & Goal).',
  declined: 'These are items that will not show up on the report at all.'
};

const addButtonLabel = {
  recommended: 'Add custom recommendation',
  mentioned: 'Add a note',
  declined: 'Add a declined item'
};

@connect(null, {dispatchEagerCreate})
export default class RecommendationListHeader extends React.Component {

  static propTypes = {
    job: PropTypes.instanceOf(IMap).isRequired,
    itemCount: PropTypes.number.isRequired,
    activeTab: PropTypes.oneOf(['recommended', 'mentioned', 'declined']).isRequired
  };

  addRecommendation(e) {
    e.preventDefault();
    e.stopPropagation();
    const {job} = this.props
    const job_id = job.get('id')
    this.props.dispatchEagerCreate(
      'recommendations',
      f.recs.createPayload(job.get('id'), this.props.activeTab),
      {
        info({payload: {uuid}}) {
          browserHistory.push(`/job/${job_id}/recommendation/${uuid}`)
        }
      }
    )
  }

  render() {
    const {itemCount, activeTab, job} = this.props
    const showModelAlert = !job.get('has_calculated') && !job.get('is_template')
    const hasUnmodeledChanges = f.job.hasUnmodeledChanges(job)
    const mayHaveUnmodeledChanges = f.job.mayHaveUnmodeledChanges(job)
    const jobId = job.get('id')
    return (
      <View>
        <Row>
          <Col sm={12}>
            <RefineInfoBox jobId={jobId} isSampleJob={job.get('sample_job')} />
          </Col>
          <Col sm={7}>
            <TabHeader title={headerTitle[activeTab]} description={headerSubtitle[activeTab]} />
          </Col>
          <Col sm={5} md={4} mdOffset={1}>
            <PrimaryButton
              onClick={(e) => this.addRecommendation(e)}
              label={addButtonLabel[activeTab]}
            />
          </Col>
          {(itemCount === 0) &&
            <Col sm={12}>
              <BlankText>
                You have no {headerTitle[activeTab].toLowerCase()} for this job.
              </BlankText>
            </Col>
          }
        </Row>
        <Row style={{background: 'white'}}>
          {(itemCount > 0) &&
            <div>
              <Col sm={12}>
                {showModelAlert && <InlineNotification message="Model this job to see the Savings and SIR below." />}
                {!showModelAlert && hasUnmodeledChanges && !mayHaveUnmodeledChanges ?
                  <InlineNotification
                    theme="error"
                    message={`This job has unmodeled changes and may not be accurate.
                      Please model it for best results.`}/>
                 : null
               }
               {!showModelAlert && mayHaveUnmodeledChanges ?
                 <InlineNotification message={`
                   Be sure to model this job if it has any unmodeled changes.`}/>
                 : null
               }
              </Col>
              <div className="rec-row rec-header hidden-xs">
                <Col sm={3} smOffset={5} mdOffset={4} noGutter={['sm']}>
                  <div className="span-accept span-rec">Status</div>
                </Col>
                <Col sm={4} md={5} noGutter={['smRight']}>
                  <div className="span-cost span-rec">Cost</div>
                  <div className="span-savings span-rec">Savings</div>
                  <div className="span-sir span-rec">SIR</div>
                </Col>
              </div>
            </div>
          }
        </Row>
      </View>
    )
  }
}
