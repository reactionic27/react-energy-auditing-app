import React from 'react'
import {BaseSlidePane} from 'app/components/overlays'
import ActivityForm from './ActivityForm'
import ActivityFeed from './ActivityFeed'

export default class ActivityPane extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progressInfo: {progress: null}
    }
  }
  setProgress = (progressInfo) => {
    this.setState({progressInfo})
  }
  render() {
    const {jobId} = this.props
    return (
      <BaseSlidePane {...this.props} noScroll className="pane-job-activity" title="Activity Feed & Files">
        <ActivityFeed jobId={jobId} progressInfo={this.state.progressInfo} />
        <ActivityForm jobId={jobId} setProgress={this.setProgress} />
      </BaseSlidePane>
    )
  }
}
