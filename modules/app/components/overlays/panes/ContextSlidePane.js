import React from 'react'
import {BaseSlidePane} from 'app/components/overlays'
import Radium from 'radium'
import JobContextPane from 'app/jobform/JobContextPane'
import RecommendationContextPane from 'app/recommendations/RecommendationContextPane'
import {connect} from 'snugg-redux'

@connect((state, {segments: {one, two, three, four}}) => {
  const isJob = (one === 'job') && !three
  const isRec = (one === 'job') && three === 'recommendation'

  return {
    activeSection: state.localState.get('activeSection'),
    isJob,
    isRec,
    recUuid: four
  }
})
@Radium
export default class ContextSlidePane extends React.Component {

  static contextTypes = {
    jobId: React.PropTypes.number
  };

  render() {
    const {
      props: {activeSection, isJob, isRec, recUuid},
      context: {jobId}
    } = this
    return (
      <BaseSlidePane {...this.props} className="pane-metrics" title="Context">
        <div style={styles.container}>
          {isJob ? <JobContextPane activeSection={activeSection} jobId={jobId} /> : null}
          {isRec ? <RecommendationContextPane jobId={jobId} recUuid={recUuid}/> : null}
        </div>
      </BaseSlidePane>

    )
  }
}

const styles = {
  container: {
    padding: '0 20px',
    fontSize: '0.9em'
  }
}
