import React from 'react'
import {Clearfix} from 'react-bootstrap'
import {Row, Col, Tabs} from 'ui'
import SecondaryHeader from 'ui/secondary-header'
import HeaderMetrics from 'app/components/HeaderFinancingMetrics'
import {pureConnect} from 'snugg-redux'
import * as f from 'data/formatters'

@pureConnect((state, {recs, activeTab}) => {
  const recommended = f.recs.recommendedRecs(recs)
  const mentioned = f.recs.mentionedRecs(recs)
  const declined = f.recs.declinedRecs(recs)
  return {
    activeTab,
    recommendedCount: recommended.length,
    mentionedCount: mentioned.length,
    declinedCount: declined.length
  }
})
export default class RecommendationListTabs extends React.Component {
  static contextTypes = {
    jobId: React.PropTypes.number.isRequired
  };

  render() {
    const {activeTab, recommendedCount, mentionedCount, declinedCount} = this.props
    const {jobId} = this.context
    const active = activeTab === 'recommended' ? '' : activeTab
    return (
      <Row>
        <SecondaryHeader>
          <Col sm={5} smPush={7} noGutter={['smLeft']}>
            <HeaderMetrics jobId={jobId} />
            <Clearfix/>
          </Col>
          <Col sm={7} smPull={5} noGutter={["alRight", "xs"]}>
            <Tabs rootLink={`/job/${jobId}/recommendations`}
              className="nav-tabs-xs-compact" active={active}>
              <Tabs.Link>
                Recommended
                <span className="badge">{recommendedCount}</span>
              </Tabs.Link>
              <Tabs.Link match='mentioned'>
                {'Add\'l Notes'}
                <span className="badge">{mentionedCount}</span>
              </Tabs.Link>
              <Tabs.Link match='declined'>
                Declined
                <span className="badge">{declinedCount}</span>
              </Tabs.Link>
            </Tabs>
            <Clearfix/>
          </Col>
        </SecondaryHeader>
      </Row>
    )
  }
}
