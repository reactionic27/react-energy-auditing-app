const initialState = {
  showKnowledgeBase: true,
  showFieldHelp: true,
  jobs: {},
  csvDownloadUrl: '',
  showOnboardingJobsList: false,
  onboardingJobsListTouched: false,
}

function toggleRecommendationFlags(flags = {}, status) {
  switch (status) {
    case 'recommended': return {...flags, hideRecommended: !flags.hideRecommended}
    case 'mentioned': return {...flags, hideMentioned: !flags.hideMentioned}
    case 'declined': return {...flags, hideDeclined: !flags.hideDeclined}
    default: return flags
  }
}

// Don't use immutable objects in this reducer to make it easy to sync to localstorage
export default function localStorageReducer(state = initialState, action) {
  switch (action.type) {
    case 'toggleOnboardingJobsList': return {...state, showOnboardingJobsList: !state.showOnboardingJobsList}
    case 'setOnboardingJobsListTouched': return {...state, onboardingJobsListTouched: true}
    case 'toggleKnowledgeBaseInlay': return {...state, showKnowledgeBase: !state.showKnowledgeBase}
    case 'toggleFieldHelpInlay': return {...state, showFieldHelp: !state.showFieldHelp}
    case 'toggleRecommendationStatusInlay': {
      const {jobId, status} = action.payload
      let flags = state.jobs[jobId]
      const jobs = {...state.jobs, [jobId]: toggleRecommendationFlags(flags, status)}
      return {...state, jobs}
    }
    case 'setCsvDownloadUrl': return {...state, csvDownloadUrl: action.payload.url}
    default: return state
  }
}
