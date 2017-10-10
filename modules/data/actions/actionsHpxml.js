import hpxmlInsertions from '../hpxml/hpxmlInsertions'
import moment from 'moment'
import {get} from '../../util/network'
import {HPXML_EVENT_OPTIONS} from 'data/constants'
import type {hesAssessmentTypeTypes, hesTransactionTypeTypes} from '../flowtypes/flowtypes'


export function hpxmlDownloader(job_id: number) {
  return async function(dispatch, getState) {
    const state = getState()
    const job = state.fn.jobById(job_id)
    const stage_id = job.get('stage_id')
    const first_name = job.get('first_name')
    const last_name = job.get('last_name')

    const type = stage_id < 6 || stage_id === 8 ? 'audit' : 'retrofit'
    const stage2 = type === 'audit'
      ? 'proposed workscope'
      : 'job completion testing/final inspection'
    const {hpxml} = await get(`/api/jobs/${job_id}/hpxml`)
    const {hpxml: finalHPXML} = await hpxmlInsertions({
      hpxml,
      source: 'download',
      stage1: 'audit',
      transaction_type: 'create',
      stage2,
      job_id,
      state
    })
    return {
      fileName: `snugg${job_id}_${type}_${first_name}_${last_name}_${moment().format('YYYY-MM-DD-HH-mm')}.xml`,
      original: hpxml,
      hpxml: finalHPXML,
    }
  }
}


// Grab the regular download HPXML file, then add additional insertions for HES
// Use the HES assessment type (initial, alternative, etc) instead of job stage
// to determine the HPXML insertions and HPXML building node
export function hesScoreHpxml(
  job_id: number,
  hesAssessmentType: hesAssessmentTypeTypes,
  hesTransactionType: hesTransactionTypeTypes,
  modelAsMentor: boolean): Function
{
  return async function(dispatch, getState) {
    const state = getState()
    const user = state.fn.loggedInUser()
    const doe_assessor_id = user.get('doe_assessor_id')

    // First, to model the HES score, we treat it as if it's a download:
    const {hpxml} = await dispatch(hpxmlDownloader(job_id))

    // Generate hpxml options based on asessment type
    const hpxmlOptions = HPXML_EVENT_OPTIONS[hesAssessmentType]
    const stage_id = state.fn.jobById(job_id).get('stage_id')
    const stage1 = hpxmlOptions.hes_hpxml_event_type_1
    const stage2 = hpxmlOptions.hes_hpxml_event_type_2
    const hpxml_building_node = hpxmlOptions.hpxml_building_node
    const transaction_type = hesTransactionType

    // Now we re-build, providing the downloaded hpxml to the insertionBuilder
    const {hpxml: finalHPXML} = await hpxmlInsertions({
      hpxml,
      source: 'hes',
      transaction_type,
      stage1,
      stage2,
      stage_id,
      job_id,
      state,
      modelAsMentor
    })

    return {
      hpxml: finalHPXML,

      // Options used in the post to the /api/job/:id/hes endpoint
      options: {
        stage1,
        stage2,
        job_id,
        transaction_type,
        doe_assessor_id,
        hpxml: finalHPXML,
        hpxml_building_node
      }
    }
  }
}
