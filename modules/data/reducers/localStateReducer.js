import {OrderedMap, Map as IMap, Set as ISet, fromJS} from 'immutable'
import {LOCATION_CHANGE} from 'react-router-redux'

let localJobList = {
  stageId: 0,
  sortBy: 'id',
  sortReverse: true,
  filterString: ''
}

const localJobListString = localStorage.getItem('snugg:local')
if (localJobListString) {
  localJobList = Object.assign({}, localJobList, JSON.parse(localJobListString), {filterString: ''})
}

const defaultState = IMap({
  jobList: IMap(localJobList),
  loggedInUserId: null,
  alerts: OrderedMap(),
  pane: '',
  confirmationModal: '',
  selectedJobs: ISet(),
  stageCounts: IMap(),
  allJobsSelected: false,
  loaderCount: 0,
  visitedUrls: ISet(),
  reportPrintStatus: IMap(),
  showActivityPane: false,
  contextState: IMap({
    lastFocusedField: null,
    showContextSlidePane: false
  }),
  activeSection: '',
  newHvacUuid: ''
})

export default function localStateReducer(state = defaultState, action) {
  let {type, payload} = action;
  switch (type) {
    case 'spinner/show': return state.update('loaderCount', (val = 0) => val + 1)
    case 'spinner/hide': return state.update('loaderCount', (val = 0) => val - 1)
    case 'spinner/forceHide': return state.set('loaderCount', 0)

    case 'local/clearVisited': return state.set('visitedUrls', ISet())
    case 'local/markVisited': return state.update('visitedUrls', (vals = ISet()) => vals.add(payload))

    case 'local/setCurrentAccountId': {
      return state.set('loggedInUserId', payload)
    }
    case 'local/updateStageCounts': {
      return payload.counts.reduce((acc, count) => {
        return acc.setIn(['stageCounts', payload.companyId, count.stage_id], count.count)
      }, state)
    }
    case 'local/setShowActivityPane': {
      return state.set('showActivityPane', payload.showActivityPane)
    }
    case 'local/setActiveSection': {
      return state.set('activeSection', payload.activeSection)
    }

    // Multiple alerts can be active. A UUID is created and stored for each one.
    // Remove an alert by looking up it's UUID.
    case 'local/addAlert': {
      return state.setIn(['alerts', payload.uuid], payload)
    }
    case 'local/updateAlert': return state.setIn(['alerts', payload.uuid], payload)
    case 'local/removeAlert': {
      const alert = state.getIn(['alerts', payload])
      if (!alert) {
        return state
      }
      if (typeof alert.onRemove === 'function') {
        alert.onRemove()
      }
      return state.deleteIn(['alerts', payload])
    }
    case 'local/filterAlerts': {
      return filterAlerts(state, payload)
    }

    case 'local/removeAllAlerts': {
      const alerts = state.get('alerts')
      alerts.forEach(a => {
        if (typeof a.onRemove === 'function') {
          a.onRemove()
        }
      })
      return state.set('alerts', defaultState.get('alerts'))
    }

    // Filter out any alerts which don't have hideOnNavigate set to false
    // and have been around for more than 2 seconds (arbitrary amount
    // of time to make sure they don't get lost on an immediate navigate)
    case LOCATION_CHANGE: {
      return filterAlerts(state, a => {
        return a.hideOnNavigate === false || new Date().valueOf() - a.timestamp < 2000
      })
    }

    case 'local/contextState':  {
      return state.mergeDeep(fromJS({
        contextState: payload
      }))
    }
    case 'local/setNewHvacUuid': {
      return state.set('newHvacUuid', payload.uuid)
    }
    case 'local/updateJobListStageId': {
      return state.setIn(['jobList', 'stageId'], payload.stageId)
    }

    case 'local/updateJobListSortBy': {
      const sortBy = state.getIn(['jobList', 'sortBy'])
      const sortReverse = (sortBy === payload.sortBy) ? !state.getIn(['jobList', 'sortReverse']) : false
      return state.setIn(['jobList', 'sortBy'], payload.sortBy).setIn(['jobList', 'sortReverse'], sortReverse)
    }
    case 'local/updateJobListFilterString': {
      return state.setIn(['jobList', 'filterString'], payload.filterString)
    }
    case 'local/updateJobsStage': {
      return payload.ids.reduce((acc, id: number) => {
        return acc.update('selectedJobs', (vals = ISet()) => vals.delete(id))
      }, state)
    }
    case 'local/toggleJobSelect': {
      if (state.get('selectedJobs').includes(payload.jobId)) {
        return state.update('selectedJobs', (vals = ISet()) => vals.delete(payload.jobId))
      } else {
        return state.update('selectedJobs', (vals = ISet()) => vals.add(payload.jobId))
      }
    }
    case 'local/clearJobSelect': {
      return state.set('selectedJobs', ISet())
    }
    case 'local/toggleAllJobsSelect': {
      const areAllJobsSelected = state.get('allJobsSelected')
      state = state.set('allJobsSelected', !areAllJobsSelected)
      if (areAllJobsSelected) {
        return state.set('selectedJobs', ISet())
      }
      return state.update('selectedJobs', (vals = ISet()) => {
        return payload.map(m => m.get('id')).reduce((acc: ISet, id: number) => acc.add(id), vals)
      })
    }
  }
  return state;
}

function filterAlerts(state, predicate) {
  return state.update('alerts', (alerts) => {
    return alerts.filter(a => {
      const passed = Boolean(predicate(a))
      if (!passed && typeof alert.onRemove === 'function') {
        alert.onRemove()
      }
      return passed
    })
  })
}
