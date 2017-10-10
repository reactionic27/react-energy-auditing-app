import _ from 'lodash'
import {Map as IMap, fromJS, List as IList} from 'immutable'
import moment from 'moment'
import UUID from 'node-uuid'
import Err from 'es6-error'
import { times } from 'lodash'
import { selectedJobIds } from '../selectors'
import { currentStageName } from '../formatters/stageFormatters'
import { get, post, isOnline, asyncIsOnline, captureError, offlineError } from '../../util/network'
import type {rootStateType, stateKeyType, hesAssessmentTypeTypes,
  hesTransactionTypeTypes} from '../flowtypes/flowtypes'
import modelingGuard from './modelingGuard'
import optimiserFormatter from '../optimiser/optimiserFormatter'
import {BASE_TABLES, JOB_ENTITY_TABLES, JOB_COLLECTION_TABLES} from '../constants/constants'
import {offlineQueue} from './offlineQueue'
import {canAdminCompany} from '../formatters/accountFormatters'
import saveScheduler from './saveScheduler'
import beforeSaveGuards from './beforeSaveGuards'
import {hesScoreHpxml, hpxmlDownloader} from './actionsHpxml'

const OFFLINE_ERRORS = {
  'invitations/create': 'create an invitation',
  'invitations/save': 'modify an invitation',
  'accounts/save': 'update your account info',
  'companies/create': 'create a new company',
  'companies/save': 'update company info',
  'jobs/create': 'create a new job',
  'financingTemplates/create': 'create a financing template',
  'financingTemplates/save': 'update / delete a financing template',
  'update-jobs-stages': 'update the job stages',
  'swap-order': 'reorder items',
}
const DEFAULT_OFFLINE_ERROR = 'Cannot perform this action while offline'

function adminGuard(state, stateKey) {
  return Boolean(state.fn.loggedInUser().get('program_id') && (stateKey !== 'activityFeed') && (stateKey !== 'activityTracking'))
}

function isCollectionAffectsModelling(name) {
  return JOB_COLLECTION_TABLES.includes(name) && (name !== 'recommendationCaptionRows') && (name !== 'jobFinancing')
}

let adminErr
function adminError() {
  return dispatch => {
    if (!adminErr) {
      adminErr = errorAction({
        timeout: 2000,
        title: 'Read-Only Mode',
        message: 'Cannot make edits in program-admin mode, please contact support for more info.',
        onRemove() {
          adminErr = null
        }
      })
      dispatch(adminErr)
    }
  }
}

// For all events handled in the localStateReducer
export function dispatchLocal(key: string, payload: any, meta: ?Object) {
  return {
    type: `local/${key}`,
    payload,
    meta
  }
}

// A normal create cannot be conducted while offline,
// and works by showing a loading spinner globally
// while we're posting the data.
export function dispatchCreate(stateKey: stateKeyType, payload: any, meta: ?Object) {
  return async function(dispatch, getState) {
    const {noSpinner} = meta || {}
    const state = getState()

    if (adminGuard(state, stateKey)) {
      return dispatch(adminError())
    }

    const {action, url} = prepareCreate(state, stateKey, payload, meta)

    if (!isOnline()) {
      offlineError(OFFLINE_ERRORS[action.type] || DEFAULT_OFFLINE_ERROR)
      return
    }

    !noSpinner && dispatch({type: 'spinner/show'})

    try {

      const response = await post(url, action.payload)

      dispatch({...action, payload: response})

      return response

    } finally {

      !noSpinner && dispatch({type: 'spinner/hide'})
    }
  }
}

let _modelingError
const MODELING_MESSAGE = 'Cannot update this field while the job is modeling. Click on Cancel Button (Where Model It normally is) to stop the modeling process and continue editing.'

function modelingError() {
  return function(dispatch) {
    if (!_modelingError) {
      _modelingError = dispatch(errorAction({
        message: MODELING_MESSAGE,
        onRemove() {
          _modelingError = null
        },
        timeout: 5000
      }))
      return
    }
    _modelingError.update({
      message: MODELING_MESSAGE
    })
  }
}

// An eager create works by saving the data locally,
// attempting to post to the server, and then removing
// the local data.
export function dispatchEagerCreate(stateKey: string, payload: Object, meta: ?Object) {
  return async function(dispatch, getState) {

    const state = getState()

    const {action, ident, url} = prepareEagerCreate(state, stateKey, payload, meta)

    if (adminGuard(state, stateKey)) {
      return dispatch(adminError())
    }

    if (modelingGuard(state, action)) {
      dispatch(modelingError())
      return
    }

    // Eagerly update the UI
    dispatch(action)

    // Check whether there is an "info" field on the meta attribute,
    // typically used when the dispatching component wants to know the
    // generated uuid.
    if (_.isFunction(_.get(meta, 'info'))) {
      meta.info(action)
    }

    if (!isOnline()) {
      return offlineQueue(action)
    }
    if (isCollectionAffectsModelling(stateKey)) {
      dispatch(dispatchSave('jobs', {id: payload.job_id, has_unmodeled_changes: 1}))
    }

    return saveScheduler('post', url, action, ident)
  }
}

const resolvedPromise = Promise.resolve()

function beforeSaveGuard(state, action) {
  if (beforeSaveGuards[action.type]) {
    return beforeSaveGuards[action.type](state, action)
  }
}

// Deletes a collection and sets job to 'hasUnmodeledChanges':
export function dispatchCollectionDelete(stateKey: stateKeyType, payload: Object, meta: ?Object) {
  return function(dispatch, getState) {
    if (isCollectionAffectsModelling(stateKey)) {
      dispatch(dispatchSave('jobs', {id: payload.job_id, has_unmodeled_changes: 1}))
    }
    dispatchSave(stateKey, payload, meta)(dispatch, getState)
  }
}

// A normal save can be conducted while offline,
// optimistically updating in the UI but saving locally
// to the store.
export function dispatchSave(stateKey: stateKeyType, payload: Object, meta: ?Object) {
  return function(dispatch, getState) {
    const state = getState()

    if (adminGuard(state, stateKey)) {
      return dispatch(adminError())
    }

    const {action, url, ident, error} = prepareSave(state, stateKey, payload, meta)

    if (modelingGuard(state, action)) {
      dispatch(modelingError())
      return resolvedPromise
    }

    const result = beforeSaveGuard(state, action)

    if (result && (result instanceof Error)) {
      dispatch(errorAction({title: result.title || 'Error', message: result.message}, result))
      return resolvedPromise
    }

    // Eagerly update the UI.
    if (!error) {
      dispatch(action)
    }

    if (!isOnline()) {
      offlineQueue(action)
      return resolvedPromise
    }

    return saveScheduler('put', url, action, ident)
  }
}

function prepareCreate(
  state: rootStateType,
  stateKey: stateKeyType,
  payload: Object,
  meta: ?Object
) {
  let url, pk
  if (_.includes(JOB_COLLECTION_TABLES, stateKey)) {
    pk = payload.uuid
    url = `/api/jobs/${payload.job_id}/${_.snakeCase(stateKey)}`
  }
  else if (_.includes(BASE_TABLES, stateKey)) {
    url = `/api/${_.snakeCase(stateKey)}`
  }
  else {
    throw new Error(`Trying to create unknown table ${stateKey}: Please contact support`)
  }
  return {
    action: {
      type: `${stateKey}/create`,
      payload: withTouched(state, stateKey, payload, pk),
      meta
    },
    ident: `${stateKey}/${pk}`,
    url
  }
}

function prepareSave(
  state: rootStateType,
  stateKey: stateKeyType,
  payload: Object,
  meta: ?Object
) {
  let url, pk, error

  function ensure(key) {
    if (!payload[key]) {
      throw new Error(`Missing required key: ${key} from payload`)
    }
    return payload[key]
  }
  if (stateKey === 'activityTracking') {
    url = '/api/activityTracking'
  } else if (_.includes(BASE_TABLES, stateKey)) {
    url = `/api/${_.snakeCase(stateKey)}/${ensure('id')}`
  } else if (_.includes(JOB_ENTITY_TABLES, stateKey)) {
    pk = ensure('job_id')
    url = `/api/jobs/${pk}/${_.snakeCase(stateKey)}`
  } else if (_.includes(JOB_COLLECTION_TABLES, stateKey)) {
    pk = ensure('uuid')
    url = `/api/jobs/${ensure('job_id')}/${_.snakeCase(stateKey)}/${pk}`
  } else if (stateKey === 'accountsCompanies') {
    url = '/api/accountsCompanies'
  } else {
    error = new Error(`Trying to save unknown table ${stateKey}: Please contact support`)
  }

  return {
    action: {
      type: `${stateKey}/save`,
      payload: withTouched(state, stateKey, payload, pk),
      meta
    },
    ident: `${stateKey}/${pk}`,
    url,
    error
  }
}

// If we've touched a field, we need to send the entire touched_fields hash
// to the server. Eventually this might make sense to replace with a more robust
// server side merge process.
function withTouched(state: rootStateType, stateKey: string, payload: Object, pk: ?number | ?string) {
  if (!pk) {
    return payload
  }
  if (!_.has(payload, 'touched_fields')) {
    return payload
  }
  payload.touched_fields = _.assign({}, (state.snugg.getIn([stateKey, pk, 'touched_fields']) || IMap()).toJS(), payload.touched_fields)
  return payload
}

function prepareEagerCreate(state: rootStateType, stateKey: string, payload: Object, meta: ?Object) {
  if (payload.uuid) {
    throw new Error('The UUID for an eager create must be attached via dispatchEagerCreate')
  }

  const finalPayload = {
    ...payload,
    uuid: UUID.v4(),
    deleted_at: null
  }

  if (stateKey !== 'cazSystem') {
    const rows = stateKey === 'recommendationCaptionRows'
      ? state.fn.captionRowsByRecUuid(payload.recommendation_uuid)
      : state.fn.collectionRowsByName(payload.job_id, stateKey)

    if (!payload.hasOwnProperty('order') && _.get(meta, 'order') !== false) {
      finalPayload.order = rows.reduce((result, row) => {
        return row.get('order') > result ? row.get('order') : result
      }, -1) + 1
    }

    if (_.includes(namedCollections, stateKey)) {
      finalPayload[`${stateKey}_name`] = `${named(stateKey)} ${rows.length + 1}`
    }
  }

  return prepareCreate(state, stateKey, finalPayload, meta)
}

export function updateCompanyImage(company_id: number, image: Object) {
  return function(dispatch, getState) {
    const state = getState()
    const company = state.fn.companyById(company_id)
    const payload = {
      id: company.get('id'),
      company_photo_uuid: image.uuid || null,
      company_photo_name: image.name || null,
      company_photo_url: image.cdnUrl || null,
    }
    if (Object.keys(payload).some(key => payload[key] !== company.get(key))) {
      return dispatch(dispatchSave('companies', payload))
    }
  }
}

export function updateCaptionRowImage(
  side: 'left' | 'right',
  uuid: string,
  image: Object
) {
  return function(dispatch, getState) {
    const state = getState()
    const caption = state.fn.captionRowByUuid(uuid)
    // when removing an image, image.crop is null
    const size = image.crop || {}
    const payload = {
      uuid,
      job_id: caption.get('job_id'),
      [`${side}_photo_uuid`]: image.uuid || null,
      [`${side}_photo_name`]: image.name || null,
      [`${side}_photo_url`]: image.cdnUrl || null,
      [`${side}_photo_height`]: size.height || null,
      [`${side}_photo_width`]: size.width || null
    }
    if (Object.keys(payload).some(key => payload[key] !== caption.get(key))) {
      return dispatch(dispatchSave('recommendationCaptionRows', payload))
    }
  }
}

export function saveCoverPhoto(
  jobId: number,
  image: Object
) {
  return function(dispatch, getState) {
    const state = getState()
    const report = state.fn.reportByJobId(jobId)
    const payload = {
      job_id: jobId,
      cover_photo_uuid: image.uuid || report.get('cover_photo_uuid') || '',
      cover_photo_name: image.name || '',
      cover_photo_url: image.cdnUrl || '',
    }
    if (Object.keys(payload).some(key => payload[key] !== report.get(key))) {
      return dispatch(dispatchSave('reports', payload))
    }
  }
}

export function swapOrder(payload: Object) {
  return async function(dispatch, getState) {
    dispatch({
      type: 'swap-order',
      payload
    })
    try {
      await post(`/api/swap-order`, payload)
    } catch (e) {
      dispatch({
        type: 'swap-order',
        payload: {
          ...payload,
          uuid_a: payload.uuid_b,
          uuid_b: payload.uuid_a,
        }
      })
      throw e
    }
  }
}

export function updatePassword(payload) {
  return async function(dispatch, getState) {
    const accountId = getState().fn.loggedInUser().get('id')
    try {
      dispatch({type: 'spinner/show'})
      await post(`/api/accounts/${accountId}/update-password`, payload)
      dispatch(successAction({
        message: 'Password Updated',
        timeout: 5000
      }))
    } finally {
      dispatch({type: 'spinner/hide'})
    }
  }
}

export function refreshStageCounts(companyId: number) {
  return async function(dispatch) {
    const counts = await get(`/api/companies/${companyId}/stage-counts`)
    dispatch(dispatchLocal('updateStageCounts', {companyId, counts}))
  }
}

export function refreshUnreadActivity() {
  return async function(dispatch) {
    const {activityTracking} = await get(`/api/unread-activity`)
    dispatch(updateSnugg(snugg => snugg.set('activityTracking', fromJS(activityTracking))))
  }
}

export class ErrorAlert extends Err {}

// Dispatches a generic info alert to the store.
export function alertAction(payload: Object, meta: ?Object) {
  return function(dispatch, getState) {
    const uuid = UUID.v4()
    const finalPayload = {
      timeout: 8000,
      showTitle: true,
      showCloseButton: true,
      hideOnNavigate: true,
      title: _.capitalize(payload.theme || 'info'),
      message: '',
      theme: 'info',
      ...payload,
      timestamp: new Date().valueOf(),
      uuid
    }
    const action = {
      type: 'local/addAlert',
      payload: finalPayload,
      meta
    }
    let timeout

    // If there's a timeout property set, add a setTimeout to
    // be able to
    if (_.isNumber(finalPayload.timeout)) {
      timeout = setTimeout(() => {
        dispatch(dispatchLocal('removeAlert', uuid))
      }, finalPayload.timeout)
    }

    dispatch(action)

    // Return an actual "error" from the
    const target = finalPayload.theme === 'error'
      ? new ErrorAlert(finalPayload.message)
      : {}

    target.action = action
    target.update = function update(updatePayload: Object) {
      const nextPayload = {
        ...finalPayload,
        ...updatePayload
      }
      if (_.isNumber(nextPayload.timeout)) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          dispatch(dispatchLocal('removeAlert', uuid))
        }, nextPayload.timeout)
      }
      dispatch(dispatchLocal('updateAlert', nextPayload))
      return this
    }
    target.remove = function remove() {
      dispatch(dispatchLocal('removeAlert', uuid))
      clearTimeout(timeout)
      return this
    }

    return target
  }
}

// Dispatches a "success" alert to the store
export function successAction(payload: Object) {
  return alertAction({...payload, theme: 'success'})
}

// Dispatches an "error" alert to the store
export function errorAction(payload: Object, originalError: ?Error) {
  return alertAction({...payload, theme: 'error', originalError})
}

export function warningAction(payload: Object) {
  return alertAction({...payload, theme: 'warning'})
}

const namedCollections = [
  'caz',
  'freezer',
  'refrigerator'
];

function named(collectionName) {
  if (collectionName === 'caz') {
    return 'Combustion Appliance Zone'
  }
  return _.capitalize(collectionName)
}

// Create a new recommendation caption
export function createRecommendationCaption(job_id: number, payload: Object) {

  function notDeleted(cap) {
    return !(cap.get('deleted_at'))
  }

  function matchesRec(cap) {
    return cap.get('recommendation_id') === payload.recommendation_id
  }

  function maxOrder(max, cap) {
    return Math.max(max, cap.get('order'))
  }
  return (dispatch, getState) => {
    var order = getState().snugg.get('recommendationCaptionRows')
      .filter(notDeleted)
      .filter(matchesRec)
      .reduce(maxOrder, -1)

    return dispatch(
      dispatchEagerCreate('recommendationCaptionRows', {
        ...payload,
        job_id,
        order: order + 1
      })
    )
  }
}

export function updateSnugg(fn: Function) {
  return {
    type: 'update',
    payload: function update(state) {
      return {...state, snugg: fn(state.snugg)}
    }
  }
}

export function incrementUtilDates(job_id: number, type: 'electric' | 'fuel') {
  return (dispatch, getState) => {
    const utils = getState().fn.utilitiesByJobId(job_id)
    const startDateRaw = utils.get(`start_${type}_date_1`)
    const startDate = moment(startDateRaw)

    if (!startDateRaw || !startDate.isValid()) {
      console.log('start date is not valid: ', startDate, type)
      return;
    }
    const payload = {
      job_id
    }
    times(12, (n) => {
      n = n + 1
      const column = `end_${type}_date_${n}`
      const value = moment(startDate)
        .add(n, 'months')
        .subtract(1, 'day')
        .format('YYYY-MM-DD')
      payload[column] = value
    })
    return dispatch(dispatchSave('utilities', payload))
  }
}

export function copyUtilDates(
  job_id: number,
  from: 'electric' | 'fuel',
  to: 'electric' | 'fuel'
) {
  return (dispatch, getState) => {
    const utils = getState().fn.utilitiesByJobId(job_id)

    const startDateRaw = utils.get(`start_${from}_date_1`)
    const startColumn = `start_${to}_date_1`
    const startValue = startDateRaw ? moment(startDateRaw).format('YYYY-MM-DD') : null
    const payload = {}

    payload[startColumn] = startValue

    times(12, (n) => {
      n = n + 1
      const dateRaw = utils.get(`end_${from}_date_${n}`)
      const column = `end_${to}_date_${n}`
      const value = dateRaw ? moment(dateRaw).format('YYYY-MM-DD') : null
      payload[column] = value
    })

    return dispatch(dispatchSave('utilities', {
      job_id,
      ...payload
    }))
  }
}

let processing = false
let hasSetStripeKey = false

type cardType = {
  name: string,
  number: string,
  exp_month: number,
  exp_year: number,
  cvc: string
};

export function updateBilling(company_id: number, card: cardType) {
  return async function(dispatch, getState) {
    if (processing) {
      return
    }
    processing = true
    if (!hasSetStripeKey && typeof Stripe !== 'undefined') {
      Stripe.setPublishableKey(STRIPE_PUBLIC_KEY)
      hasSetStripeKey = true
    }
    try {
      // If the stripe library won't load for some reason
      if (!hasSetStripeKey) {
        const err = new Error('Processor Down')
        err.alert = dispatch(errorAction({
          title: 'Processor Down',
          message: 'Unable to save your credit card information, please contact support'
        }))
        throw err
      }

      dispatch({type: 'spinner/show'})
      const {id: token} = await createCardToken(card)
      const body = {token, company_id, card_name: card.name}
      const response = await post(`/api/companies/${company_id}/update-billing`, body)

      dispatch({type: 'company/update', payload: response})
      dispatch(successAction({title: 'Success!', message: 'Your credit card was successfully updated.'}))
    } finally {
      dispatch({type: 'spinner/hide'})
      processing = false
    }
  }
}

function createCardToken(cardData) {
  return new Promise((resolve, reject) => {
    Stripe.card.createToken(_.pick(cardData, 'name', 'number', 'exp_month', 'exp_year', 'cvc'), (code, responseData) => {
      switch (code) {
        case 200: return resolve(responseData)
        default: reject(new Error(responseData.error.message))
      }
    })
  })
}

export function markAllRead(payload: Object) {
  return async function(dispatch, getState) {
    let {company_id, job_ids} = payload
    job_ids = job_ids || selectedJobIds(getState())
    const count = job_ids.size
    if (count === 0) {
      return
    }
    dispatch({type: 'spinner/show'})

    try {
      await post(`/api/companies/${company_id}/mark-all-read`, {company_id, job_ids})
      dispatch(successAction({
        title: `Success: ${count} ${count > 1 ? 'jobs were' : 'job was'} marked as read`,
        theme: 'success',
        timeout: 3000
      }))
      dispatch({type: 'mark-all-read', payload: {job_ids}})
    } finally {
      dispatch({type: 'local/clearJobSelect'})
    }

    dispatch({type: 'spinner/hide'})
  }
}

export function updateJobsStages(payload: Object) {
  return async function(dispatch, getState) {
    let {stage_id, company_id, job_ids} = payload
    job_ids = job_ids || selectedJobIds(getState())
    const count = job_ids.size
    const stageName = currentStageName(stage_id)
    const movingMessage = `Moving ${count} jobs to the ${stageName} stage...`

    dispatch({type: 'spinner/show'})

    const warning = dispatch(warningAction({title: movingMessage}))
    const body = {job_ids, company_id, stage_id}
    try {
      const response = await post(`/api/companies/${company_id}/update-jobs-stages`, body)
      dispatch(successAction({
        title: `Success: ${count} ${count > 1 ? 'jobs were' : 'job was'} moved to the ${stageName} stage`,
        theme: 'success',
        timeout: 3000
      }))
      dispatch({type: 'update-jobs-stages', payload: response})
    } catch (e) {
      dispatch({
        type: 'update-jobs-stages',
        payload: e,
        error: true,
        meta: {
          body
        }
      })
    } finally {
      dispatch(refreshStageCounts(company_id))
      warning.remove()
      payload.onExit()
      dispatch({type: 'local/clearJobSelect'})
    }
    dispatch({type: 'spinner/hide'})
  }
}

export function maybeAddCreatedJob(action) {
  return function(dispatch, getState) {
    const state = getState()
    if (
      action.payload.account_id === getState().fn.loggedInUser().get('id') ||
      canAdminCompany(state, state.fn.companyById(action.payload.company_id))
    ) {
      dispatch(action)
    }
  }
}

// Optimiser Actions:
// ---------------

const modeling = {
  // [job_id: number]: Promise
};

// Dispatches the optimiser model,
export function dispatchModel(payload: Object) {
  return async function(dispatch, getState) {
    const calculating = isCalculating(payload.job_id, getState())
    if (!isOnline()) {
      const messageType = calculating  ? 'cancel' : 'model'
      offlineError({
        title: 'Modeling Error',
        message: `Cannot ${messageType} the job modeling while the application is offline.`
      })
    }
    if (calculating) {
      return dispatch(dispatchCancel(payload))
    }
    try {
      const {errors} = optimiserFormatter(getState(), {
        jobId: payload.job_id,
        accountId: payload.account_id
      })
      if (errors.length > 0) {
        return {errors}
      }
      dispatch({type: 'om/model', payload: {...payload, is_calculating: true}})
      modeling[payload.job_id] = post('/api/om-model', payload)
      const response = await modeling[payload.job_id]
      if (isCalculating(payload.job_id, getState())) {
        dispatch({type: 'om/model', payload: response})
      }
    } finally {
      delete modeling[payload.job_id]
    }
  }
}

function dispatchCancel({job_id}) {
  return async function(dispatch, getState) {
    // If we're waiting on the response from clicking "modeling",
    if (modeling[job_id]) {
      dispatch({type: 'om/cancel', payload: {job_id, is_calculating: false}})
      try {
        const response = await modeling[job_id]
        await post('/api/om-cancel', response)
      } catch (e) {
        captureError(e)
      } finally {
        dispatch({type: 'om/cancel', payload: {job_id, is_calculating: 0}})
      }
    } else {
      const is_calculating = isCalculating(job_id, getState())
      try {
        await post('/api/om-cancel', {is_calculating, job_id})
      } catch (e) {
        captureError(e)
      } finally {
        dispatch({type: 'om/cancel', payload: {job_id, is_calculating: 0}})
      }
    }
  }
}

function isCalculating(jobId: number, state: rootStateType) {
  return state.snugg.getIn(['jobs', jobId, 'is_calculating'])
}

// HES Scores
export async function calculateHesAction(job_id: number, hesAssessmentType: hesAssessmentTypeTypes, hesTransactionType: hesTransactionTypeTypes, modelAsMentor: boolean): Function {
  return async (dispatch, getState) => {
    const {options} = await dispatch(hesScoreHpxml(job_id, hesAssessmentType, hesTransactionType, modelAsMentor))
    try {
      const response = await post(`/api/job/${job_id}/hes`, options)
      dispatch({type: 'hesScores/update', payload: response})
      return response
    } catch (e) {
      dispatch(errorAction({
        timeout: null,
        title: _.get(e, 'json.message')
      }))
    }
  }
}

export function downloadHpxml(job_id: number): Function {
  return async dispatch => {
    if (!asyncIsOnline()) {
      const message = `You cannot download hpxml while the application is offline.`
      offlineError({
        title: 'Error',
        message
      })
      return
    }
    return dispatch(hpxmlDownloader(job_id))
  }
}

export function syncJobListDropdownSelection() {
  return async (dispatch, getState) => {
    const newLocalState = JSON.stringify(getState().localState.get('jobList').toJS())
    await localStorage.setItem('snugg:local', newLocalState)
  }
}

export function csvCreateAlertAction() {
  return successAction({
    message: "Your CSV is being created. At peak times, this could take several minutes. We'll notify you when it's ready. Meanwhile, you can safely navigate away from this screen.",
    timeout: 5000
  })
}
