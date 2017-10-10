import {Map as IMap, Set as ISet} from 'immutable'
import {createSelector} from 'simple-selectors'

// LocalState
// ----------

// Todo: maybe eventually make this dynamic?
export const loggedInUserId = state => state.localState.get('loggedInUserId')

export const loggedInUser = state => state.snugg.getIn(['accounts', loggedInUserId(state)])

export const alerts = createSelector(
  state => state.localState.get('alerts'),
  alerts => alerts.toArray()
)

export const selectedJobIds = state => state.localState.get('selectedJobs') || ISet()

export const selectedJobCount = state => selectedJobIds(state).size

export const selectedJobs = state => {
  const ids = selectedJobIds(state).toArray()
  return ids.map(id => state.snugg.getIn(['jobs', id])).filter(f => f)
}

export const showPane = (paneName: string) => state => paneName === state.localState.get('pane')

export const showBigModal = state => state.localState.get('bigModal')

export const showPopover = (popoverName: string) => state => popoverName === state.localState.get('popover')

export const stageCountsByCompanyId = (companyId: number) => state => {
  return state.localState.getIn(['stageCounts', companyId], IMap())
}
