import type { rootStateType } from '../flowtypes/flowtypes'
const CANNOT_UPDATE_WHILE_MODELING = [
  'basedata', 'utilities', 'recommendations',
  'attic', 'dhw', 'door', 'freezer', 'range', 'oven',
  'clothesDryer', 'hvac', 'refrigerator', 'vault',
  'window',
]

const CANNOT_MODIFY_REGEX = new RegExp(
  `^(?:${CANNOT_UPDATE_WHILE_MODELING.join('|')})/(?:create|save)$`
)

const MODELING_REC_COLUMNS = ['status', 'cost', 'savings', 'sir']

function checkInvalid({payload}) {
  if (payload.type === 'recommendations/save') {
    return MODELING_REC_COLUMNS.some(k => payload.hasOwnProperty(k))
  }
  return true
}

export default function modelingGuard(state: rootStateType, action: Object) {
  if (CANNOT_MODIFY_REGEX.test(action.type)) {
    const {job_id} = action.payload
    const modelingId = state.snugg.getIn(['jobs', job_id, 'is_calculating'])
    if (!modelingId) {
      return
    }
    return checkInvalid(action)
  }
}

