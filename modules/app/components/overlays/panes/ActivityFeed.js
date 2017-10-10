import React from 'react'
import dimensions from 'util/dimensions'
import ActivityDivider from './ActivityDivider'
import ActivityItem from './ActivityItem'
import Radium from 'radium'
import dynamicResize from 'decorators/dynamicResize'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'
import moment from 'moment'
import {findDOMNode} from 'react-dom'
import {is} from 'immutable'
import { dispatchSave, dispatchCreate }  from 'data/actions'
import {InlineNotification} from 'app/components/overlays'
import {BlankText} from 'ui'

function InitialFeedItem() {
  return (
    <InlineNotification>
      <div style={{fontSize: 12}}>
        Anyone with access to this job can read and post to this feed. If you are working in a program, this includes program administrators.
        <br/>Snugg Pro support does not monitor this feed: To contact support, please use our standard support channels.
      </div>
    </InlineNotification>
  )
}

@connect((state, {jobId}) => {
  const activityFeed = f.activityFeed.activityFeedWithProbot(state, {jobId})
  const userId = state.fn.loggedInUser().get('id')
  const activityTracking = state.fn.activityTrackingByJobAndUser(jobId, userId)
  const unreadCount = f.activityFeed.unreadCount(state, {jobId})
  return {activityFeed, activityTracking, userId, unreadCount}
}, {dispatchSave, dispatchCreate})
@Radium
@dynamicResize
export default class ActivityFeed extends React.Component {
  constructor(props) {
    super(props)
    this.setFeedRef = this.setFeedRef.bind(this)
  }
  getfeedStyle() {
    let {windowHeight} = dimensions
    let feedHeight = windowHeight - 109 // 55 for header + 54 for comment for
    return (
      Object.assign({},
        styles.feedContainer,
        {height: feedHeight}
      )
    )
  }
  // shouldComponentUpdate(prevProps) {
  //   return !is(this.props.activityFeed, prevProps.activityFeed) || !is(this.props.fileUploadInProgress, prevProps.fileUploadInProgress)
  // }
  componentDidMount() {
    this.scrollToBottom()
    this.setViewedBy()
  }
  componentDidUpdate(prevProps) {

    if (is(prevProps.activityFeed, this.props.activityFeed) && prevProps.progressInfo.progress && this.props.progressInfo.progress) {
      return
    }
    this.scrollToBottom()
    this.setViewedBy()
  }
  componentWillUnmount() {
    this.setViewedBy()
  }
  scrollToBottom() {
    const feedNode = findDOMNode(this.feedRef)
    feedNode.scrollTop = feedNode.scrollHeight
  }
  setViewedBy() {
    const {userId, jobId, activityTracking, dispatchSave, dispatchCreate, unreadCount} = this.props
    if (!unreadCount) { return }

    const payload = {
      job_id: jobId,
      unread_count: 0,
      account_id: userId,
    }

    if (activityTracking) {
      dispatchSave('activityTracking', payload)
    } else {
      dispatchCreate('activityTracking', payload)
    }
  }
  setFeedRef(ref) {
    this.feedRef = ref
  }
  renderActivityByDay(group, day) {
    return (
      <div>
        <ActivityDivider label={moment(day).format('ddd DD MMM YYYY')} />
        {group.map((item) => {
          return  (
            <ActivityItem
              key={item.get('uuid')}
              item={item} />
          )
        })}
      </div>
    )
  }
  renderActivity(activityFeed) {
    const groupActivityFeed = f.activityFeed.groupActivityFeed(activityFeed)
    const groupsByDay = groupActivityFeed.map((group, day) => [day, group]).toArray()
    return groupsByDay.map(([day, group]) => {
      return <div key={day}>{this.renderActivityByDay(group, day)}</div>
    })
  }
  render() {
    const {progressInfo: {progress}} = this.props
    return (
      <div ref={this.setFeedRef} style={this.getfeedStyle()} id="feed-container">
        <InitialFeedItem />
        {this.renderActivity(this.props.activityFeed)}
        {(progress && progress < 1) ? <div style={{paddingBottom: 20}}><BlankText>File uploading... {Math.round(progress * 100)}%</BlankText></div> : null}
      </div>
    )
  }
}

const styles = {
  feedContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    overflowY: 'auto',
    overflowX: 'scroll',
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #e3e3e3'
  }
}
