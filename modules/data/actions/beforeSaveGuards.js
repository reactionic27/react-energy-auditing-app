import {canAddHvac} from '../formatters/hvacFormatters'

export default {

  'hvac/save': (state, {payload}) => {
    if (payload.hvac_upgrade_action) {
      const hvac = state.fn.hvacByUuid(payload.uuid)
      const jobHvacs = state.fn.hvacsByJobId(payload.job_id)
      const tempHvacs = jobHvacs.filter(val => val !== hvac)
      const canAdd = canAddHvac(
        tempHvacs,
        hvac.get('hvac_system_equipment_type'),
        payload.hvac_upgrade_action
      )
      if (canAdd instanceof Error) {
        canAdd.displayMessage = true
        return canAdd
      }
    }
  }

}
