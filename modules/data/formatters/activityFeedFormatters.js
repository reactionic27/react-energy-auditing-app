import moment from 'moment'
import {List as IList, Map as IMap} from 'immutable'
import uuid from 'node-uuid'

export function activityType(activity) {
  switch (true) {
    case !activity.get('account_id'): return 'probot'
    case !!activity.get('file_uuid'): return 'file'
    default: return 'chat'
  }
}

export function sortActivityFeed(feed) {
  return IList(feed)
          .sortBy((item) => {
            return moment.utc(item.get('created_at')).format()
          })
}

export function groupActivityFeed(feed) {
  return feed
          .groupBy((item) => {
            return moment.utc(item.get('created_at')).format('YYYY-MM-DD')
          })
          .sortBy((group, key) => {
            return key
          })
}

export function unreadCount(state, {jobId}) {
  const userId = state.fn.loggedInUser().get('id')
  const activityTracking = state.fn.activityTrackingByJobAndUser(jobId, userId) || IMap({})
  return activityTracking.get('unread_count')

}



export function activityFeedWithProbot(state, {jobId}) {
  let feed = state.fn.activityFeedByJobId(jobId) || IList([])
  // feed = feed.concat(jobCreatedActivity(state, {jobId}))
  return sortActivityFeed(feed)
}


// Adding probot activity items
function jobCreatedActivity(state, {jobId}) {
  const job = state.fn.jobById(jobId)
  const userName = state.fn.accountByJobId(jobId).get('first_name')
  return IMap({
    uuid: uuid.v4(),
    job_id: jobId,
    message: `${userName} created job`,
    created_at: job.get('created_at')
  })
}
