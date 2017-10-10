import {take, takeRight, find, nth} from 'lodash'
import {STAGES} from 'data/constants'


export const stageOptionGroups = (): Array => {
  return [
    {'All active stages': take(STAGES, 8)},
    {'Archives': takeRight(STAGES, 2)}
  ]
}

export const addAllActiveStages = (): Array => {
  return [[0, 'All active stages'], ...STAGES]
}

export const currentStageName = (currentStageId: ?number): string => {
  if (currentStageId === 0) {
    return 'All active stages'
  }
  const currentStageName = nth(find(STAGES, stage => stage[0] === currentStageId), 1)
  return currentStageName || ''
}
