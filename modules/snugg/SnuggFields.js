import _ from 'lodash'
import {isFunction} from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'snugg-redux'
import { getFieldInfo, fieldByName } from '../data/definition-helpers'
import pure from 'pure-render-decorator'
import SnuggGenericField from './SnuggGenericField'
import SnuggEditable from './SnuggEditable';
import SnuggInlineEditable from './SnuggInlineEditable'
import stripNullish from 'util/stripNullish'
import {dispatchSave} from '../data/actions/actions'
import * as inputMasks from './inputMasks'
import * as a from 'data/actions'
import {List as IList} from 'immutable'


function makeWrappedFormComponent(WrappedComponent) {

  @connect((state, props) => {
    const {showIf, lookupPath, options, validate} = props
    return {
      options: isFunction(options) ? options(state, props) : options,
      hideField: !showIf(state, props),
      value: stripNullish(state.snugg.getIn(lookupPath)),
      validate: isFunction(validate) ? validate(state, props) : validate
    }
  })
  class JobItem extends React.Component {
    componentDidUpdate() {
      if (this.props.subscribeOnUpdate) {
        this.props.subscribeOnUpdate()
      }
    }
    render() {
      if (this.props.hideField) {
        return null
      }
      return <WrappedComponent {...this.props} />
    }
  }

  @connect((state, {jobId}) => {
    if (!jobId) return {}
    const job = state.fn.jobById(jobId)
    return {hasUnmodeledChanges: job.get('has_unmodeled_changes')}
  })
  class JobItemProxy extends React.Component {

    static propTypes = {
      field: PropTypes.string.isRequired,
      options: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func
      ]),
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      suffix: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      validate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
      ])
    };

    render() {
      const {suffix, label, options, improved, improvedOptions, hasUnmodeledChanges} = this.props

      const {
        lookupPath,
        showIf,
        options: opts,
        definition: fieldDefinition
      } = getFieldInfo(this.props)

      const props = {
        onChange: (value) => {
          const payload = {}
          const {props: {improved, uuid, id, jobId, field, companyId, dispatch}} = this
          const {
            stateKey,
            tableType,
            omDirectSetBase,
            omDirectSetImproved,
            outputColumn,
            nullable
          } = fieldDefinition

          if (nullable && value === '') {
            value = null
          }

          const finalColumn = improved ? `${outputColumn}_improved` : outputColumn

          payload[finalColumn] = value

          if (tableType === 'jobCollection' || tableType === 'jobEntity') {
            payload.job_id = jobId

            const touchedValue = value === null || value === undefined
              ? null
              : true

            if ((!improved && omDirectSetBase) || (improved && omDirectSetImproved)) {
              _.set(payload, `touched_fields.${finalColumn}`, touchedValue)
            }

            if (tableType === 'jobCollection') payload.uuid = uuid

          } else {
            payload.id = id
          }
          dispatch(dispatchSave(stateKey, payload))
          if (field === 'Job Stage id') {
            dispatch(a.updateJobsStages({
              company_id: companyId,
              job_ids: IList([id]),
              stage_id: value,
              onExit: () => {}
            }))
          }

          // Checks to see if there are already changes that affect modeling.
          // If so, don’t update the hasUnmodeledChanges.
          // If this is the first change since modeling, set hasUnmodeledChanges to true
          if (fieldDefinition.affectsModeling && !hasUnmodeledChanges && jobId) {
            dispatch(dispatchSave('jobs', {id: jobId, has_unmodeled_changes: 1}))
          }
        },
        lookupPath,
        showIf,
        label: label || fieldDefinition.label || fieldDefinition.name,
        decimals: fieldDefinition.decimals,
        suffix: suffix || fieldDefinition.suffix,
        options: (improved ? (improvedOptions || options) : options) || opts,
        checkit: fieldDefinition.checkit,
        validate: this.props.validate !== undefined
          ? this.props.validate
          : generateValidateString(fieldDefinition),
        maxLength: fieldDefinition.maxLength
      }

      return <JobItem {..._.omit(this.props, 'hasUnmodeledChanges')} {...props} />
    }

  }

  @pure
  class BaseFieldWrapper extends React.Component {

    static contextTypes = {
      jobId: React.PropTypes.number
    };

    render() {
      const {jobId} = this.context
      return <JobItemProxy {...this.props} jobId={jobId} />
    }
  }

  return BaseFieldWrapper;
}

function generateValidateString(fieldDefinition) {
  const {decimals, min, max, minLength, maxLength} = fieldDefinition
  var str = []
  if (notNullish(decimals)) {
    if (decimals === 0) {
      str.push('integer')
    } else {
      str.push(`decimals:${decimals}`)
    }
  }
  if (notNullish(min)) str.push(`gte:${min}`)
  if (notNullish(max)) str.push(`lte:${max}`)

  if (notNullish(minLength)) str.push(`minLength:${minLength}`)
  if (notNullish(maxLength)) str.push(`maxLength:${maxLength}`)

  return str.join('|')
}

function notNullish(val) {
  return val !== undefined && val !== null
}

const SnuggFormField = makeWrappedFormComponent(SnuggGenericField)
const Editor = makeWrappedFormComponent(SnuggEditable)
const Inline = makeWrappedFormComponent(SnuggInlineEditable)

const Integer = props => (
  <SnuggFormField mask={inputMasks.integerMask}  {...props} __type="integer" inputMode="numeric" noValidate />
)
const PositiveInteger = props => (
  <SnuggFormField mask={inputMasks.positiveIntegerMask}  {...props} __type="integer" pattern="[0-9]*" inputMode="numeric" noValidate />
)

const Text = props => {
  return <SnuggFormField {...props} __type="text" autoCorrect="off" />
}

const Fields = {
  InlineEditable: props => (
    <Inline {...props} />
  ),
  Editable: props => (
    <Editor {...props} __type="contenteditable" />
  ),
  Text,
  Integer,
  PositiveInteger,
  Numeric: props => {
    return (
      <SnuggFormField
        createMask={inputMasks.createNumericMask}
        {...props}  __type="number" inputMode="numeric" noValidate />
    )
  },
  PositiveNumeric: props => {
    return (
      <SnuggFormField
        createMask={inputMasks.createPositiveNumericMask}
        {...props}
        __type="number" inputMode="numeric" noValidate />
    )
  },
  Password: props => (
    <SnuggFormField {...props} __type="password" />
  ),
  Zip: props => (
    <SnuggFormField mask={inputMasks.zipMask} {...props} __type="text" pattern="\d*" autoCorrect="off" noValidate />
  ),
  Email: props => (
    <SnuggFormField mask={inputMasks.emailMask} {...props} __type="email" autoCapitalize="off" autoCorrect="off" noValidate />
  ),
  CreditCard: props => (
    <SnuggFormField {...props} __type="text" pattern="\d*" autoCorrect="off" noValidate />
  ),
  Telephone: props => (
    <SnuggFormField mask={inputMasks.telephoneMask} {...props} __type="tel" noValidate />
  ),
  Radio: props => (
    <SnuggFormField nullable {...props} __type="radio" />
  ),
  Select: props => (
    <SnuggFormField {...props} __type="select" />
  ),
  MultiSelect: props => (
    <SnuggFormField {...props} __type="multi-select" />
  ),
  Textarea: props => (
    <SnuggFormField {...props} __type="textarea" />
  ),
  DateField: props => (
    <SnuggFormField {...props} __type="date" />
  ),
  DateTimeField: props => (
    <SnuggFormField {...props} __type="datetime-local" />
  ),
  Year: props => (
    <PositiveInteger {...props} mask={inputMasks.yearMask} />
  ),
  Percentage: props => (
    <Integer {...props} mask={inputMasks.percentageMask} />
  ),
  Setpoint: props => (
    <Text {...props} mask={inputMasks.setpointMask} />
  )
}

Fields.Input = props => {
  const {field, improved} = props
  if (!field) {
    return <Text {...props} />
  }
  const {type, improvedType} = fieldByName(field)
  const fieldType = improved ? improvedType || type : type
  const Field = Fields[fieldType || 'Text']
  return <Field {...props} />
}

export default Fields
