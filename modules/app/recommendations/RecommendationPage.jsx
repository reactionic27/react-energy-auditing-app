import React from 'react'
import {connect} from 'snugg-redux'
import RecommendationBody from 'app/recommendations/RecommendationBody'
import RecommendationSecondaryNav from './RecommendationSecondaryNav'
import RecommendationContextPane from './RecommendationContextPane'
import {Row, Col} from 'react-bootstrap'
import {ContextPane} from 'app/components/overlays'
import {dispatchLocal} from 'data/actions'
import {BackLink} from 'ui';
import {Map as IMap} from 'immutable'

const backButtonLabels = {
  recommended: 'recommended measures',
  mentioned: 'additional notes',
  declined: 'declined measures'
}
const linkMap = {
  recommended: '',
  mentioned: '/mentioned',
  declined: '/declined'
}


function getStatus(recommendation: IMap) {
  switch (recommendation.get('status')) {
    case 3: return 'declined'
    case 2: return 'mentioned'
  }
  return 'recommended'
}

@connect((state, {recUuid}) => ({
  recommendation: state.fn.recByUuid(recUuid)
}), {dispatchLocal})
export default class RecommendationPage extends React.Component {
  componentWillUnmount() {
    this.props.dispatchLocal('contextState', {lastFocusedField: null})
  }
  render() {
    let {jobId, recUuid, recommendation, showSecondaryNav} = this.props;
    const status = getStatus(recommendation)

    return (
      <div className="rec-single job-container" >
        <Row>
          {/*<Col sm={2} id="secondary-nav">
            <RecommendationSecondaryNav showSecondaryNav={showSecondaryNav}/>
          </Col>*/}
          <Col sm={9} id="main-pane">
            <BackLink to={`/job/${jobId}/recommendations${linkMap[status]}`}
            tabIndex="-1"
            backLabel={`All ${backButtonLabels[status]}`}
            customStyle={{marginBottom: 0}}
            />
            <RecommendationBody jobId={jobId} recommendation={recommendation} showFinancing />
          </Col>
          <Col sm={3} id="context-pane">
            <ContextPane>
              <RecommendationContextPane jobId={jobId} recUuid={recUuid} />
            </ContextPane>
          </Col>
        </Row>
      </div>
    );
  }

}
