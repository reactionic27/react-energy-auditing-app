import React from 'react'
import dimensions from 'util/dimensions'
import {Map as IMap} from 'immutable'
import RecommendationListTabs from 'app/recommendations/RecommendationListTabs'
import RecommendationListHeader from 'app/recommendations/RecommendationListHeader'
import RecommendationListRow from './RecommendationListRow'
import * as f from 'data/formatters'
import DocumentTitle from 'react-document-title'
import {connect} from 'snugg-redux'
import dynamicResize from 'decorators/dynamicResize'
import {UISIZE} from 'app/lib/global-styles'
import {Row, Col} from 'react-bootstrap'

@connect((state, props) => {
  const {segments: {four}, jobId} = props
  const activeTab = !four ? 'recommended' : four
  const job = state.fn.jobById(jobId)
  return {
    job,
    activeTab,
    recs: state.fn.recommendationsByJobId(jobId)
  }
})
@dynamicResize
export default class RecommendationList extends React.Component {

  render() {
    const {activeTab, recs, job} = this.props
    const getTopPadding = dimensions.screenSize === 'xs' ? (UISIZE.xsJobHeader) : (UISIZE.header)
    const filteredRecs = getFilteredRecs(activeTab, recs)
    const title = f.job.pageTitle(job, '> Refine | Snugg Pro')
    return (
      <DocumentTitle title={title}>
        <div className="rec-content animated fadeIn" style={{paddingTop: getTopPadding}}>
          <RecommendationListTabs recs={recs} activeTab={activeTab} />
          <RecommendationListHeader itemCount={filteredRecs.length} job={job} activeTab={activeTab} />
          <Row>
            <Col sm={12}>
              <div className="cards">
                {filteredRecs.map((rec, i) => (
                  <RecommendationListRow
                    key={rec.get('uuid')}
                    rec={rec}
                    prevUuid={getPrevUuid(filteredRecs, i)}
                    nextUuid={getNextUuid(filteredRecs, i)}
                  />
                ))}
              </div>
            </Col>
          </Row>

        </div>
      </DocumentTitle>
    )
  }
}

const EMPTY_MAP = IMap()

function getPrevUuid(recs, i) {
  return (recs[i - 1] || EMPTY_MAP).get('uuid')
}

function getNextUuid(recs, i) {
  return (recs[i + 1] || EMPTY_MAP).get('uuid')
}

function getFilteredRecs(recType: string, recs: Array<IMap>): Array<IMap> {
  switch (recType) {
    case 'mentioned': return f.recs.mentionedRecs(recs)
    case 'declined': return f.recs.declinedRecs(recs)
  }
  return f.recs.recommendedRecs(recs)
}
