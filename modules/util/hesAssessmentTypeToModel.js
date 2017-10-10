import _ from 'lodash'


// Bid Proposed or Bid Accepted maps to an 'alternative' score.
// Make sure we have an 'initial' score before modeling an alternative score
// TODO: write karma tests for this
export function hesAssessmentTypeToModel(scoreType: ?string, hesScores: Object): string {
  switch (scoreType) {
    case 'initial': return 'initial'
    case 'alternative': return checkForInitial(scoreType, hesScores)
    case 'test':  return checkForInitial(scoreType, hesScores)
    case 'final': return 'final'
    case 'qa': return 'qa'
    default: return ''
  }
}

function checkForInitial(scoreType, hesScores): string {
  const hasInitial = !!_.get(hesScores, 'initial')
  return hasInitial ? scoreType : 'initial'
}
