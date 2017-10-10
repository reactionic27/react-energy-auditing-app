import _ from 'lodash'
import {Icon} from 'ui'
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import {isElement} from 'lodash'
import getLastNode from '../util/getLastNode'
import moment from 'moment'
import Label from 'fields/Label'
import Feedback from 'fields/Feedback'
import RadioGroup from 'fields/RadioGroup';
import Select from 'fields/Select';
import MultiSelect from 'fields/MultiSelect';
import HelpBlock from 'fields/HelpBlock'
import simpleValidator from '../util/simpleValidator'
import firstChild from '../util/firstChild'
import {restrictInputs, areDecimalsAllowed, isIntegerOnly} from '../util/restrictInputs'
import TextArea from './SnuggTextArea'
import {Clearfix} from 'react-bootstrap'
import invariant from 'fbjs/lib/invariant'
import stripNullish from 'util/stripNullish'
import ConfirmationModal from '../app/components/overlays/modals/ConfirmationModal'
import filtered from '../util/filtered'
import MaskedInput from 'react-text-mask'
import {dispatchLocal} from 'data/actions'
import {connect} from 'snugg-redux'
import {segmentsType} from 'data/types'
import {InlineNotification} from 'app/components/overlays'

class NumericInput extends React.Component {
  onChange = (e) => {
    const value = String(e.target.value).replace(/[$%,]/g, '')
    this.props.onChange({currentTarget: {value}})
  }
  render() {
    return <MaskedInput guide={false} {...this.props} type='text' onChange={this.onChange} />
  }
}

function CustomInput(props) {
  if (props.type === 'integer') {
    return <NumericInput {...filtered(props)} value={props.value && Math.round(props.value)}/>
  } else if (props.type === 'number') {
    return <NumericInput {...filtered(props)} mask={props.createMask(props.decimals)} />
  } else if (props.mask) {
    return <MaskedInput guide={false} {...filtered(props)} type='text' />
  } else {
    return <input {...filtered(props)} />
  }
}

const FieldStyle = {

  editable: firstChild,

  bare: firstChild,

  bareWithHelpBlock: props => (
    <div className="input-group-lg bare-with-help-block">
      {props.children}
    </div>
  ),

  default: props => {
    const {bsSize, label, children} = props

    return (
      <div className={`form-group form-group-${bsSize || 'lg'}`}>
        <Label {...filtered(props)} field={props.field}>
          {label}
        </Label>
        <div>
          <div className="input-group-lg">
            {children}
          </div>
        </div>
        <Clearfix />
      </div>
  )},

  bareEditableTitle: props => (
    <div>
      {props.children}
      <Clearfix />
    </div>
  ),

  editableTitle: props => (
    <div className="form-group form-group-lg">
      <span className="editable-prefix">{props.label}</span>
      {props.children}
      <Clearfix />
    </div>
  ),

  deletable: props => (
    <div className="form-group form-group-lg">
      <div className="col-sm-9">
        {props.children}
      </div>
    </div>
  )
}

function inputFieldType(props, type) {
  if (props.prefix || props.suffix) {
    if (props.prefix && props.suffix) {
      return prefixSuffix(props, type)
    } else if (props.prefix) {
      return prefixOnly(props, type)
    } else if (props.suffix) {
      return suffixOnly(props, type)
    }
  }

  const value = stripNullish(props.value)

  if (props.editable) {
    return <CustomInput type={type} className="form-control editable" {...props} value={value} />
  }
  if (props.editableTitle) {
    return <CustomInput type={type} className="form-control editable-title" {...props} value={value}/>
  }
  return <CustomInput type={type} className="form-control input-lg" {...props} value={value} />
}

const FieldTypes = {
  textarea: TextArea,
  text: props => {
    return inputFieldType(props, 'text')
  },
  integer: props => {
    return inputFieldType(props, 'integer')
  },
  number: props => {
    return inputFieldType(props, 'number')
  },
  tel: props => {
    return inputFieldType(props, 'tel')
  },
  email: props => {
    return inputFieldType(props, 'email')
  },
  password: props => {
    return inputFieldType(props, 'password')
  },
  radio: props => (
    <RadioGroup {...props} />
  ),
  contenteditable: props => (
    <input /> // TODO: Editable
  ),
  select: props => (
    <Select {...props} />
  ),
  "multi-select": props => (
    <MultiSelect {...props} />
  ),
  date: props => (
    <input {...filtered(props)} className="form-control" type="date" value={formatDate(props.value)} />
  ),
  "datetime-local": props => (
    <input {...filtered(props)} className="form-control" type="datetime-local" value={formatDateTimeLocal(props.value)} />
  )
}

function formatDate(val) {
  return moment.utc(val).format('YYYY-MM-DD')
}

// TODO: Rewrite so that a bad value doesn't wipe out the rest of the date. A variation of this is here
// https://github.com/SnuggHome/4SnuggPro/commit/b4b9c896c2ce4bf9bde582323c8455597f6bdc75
function formatDateTimeLocal(val) {
  return moment.utc(val).format('YYYY-MM-DDTHH:mm:ss')
}

function fieldErrorSelector(props) {
  if (props.checkit) {
    const [err, val] = props.checkit(props.value)
    if (err) {
      return err.errors[0] + ''
    }
  }
  if (!props.validate) {
    return;
  }
  return simpleValidator(props.label, props.validate, props.value)
}

function getFieldWrapper(props) {

  if (props.wrapper) {
    return props.wrapper
  }
  if (props.editableTitle) {
    return props.bare ? FieldStyle.bareEditableTitle : FieldStyle.editableTitle
  }
  if (props.bare) {
    return FieldStyle.bare
  }
  if (props.bareWithHelpBlock) {
    return FieldStyle.bareWithHelpBlock
  }
  return FieldStyle.default
}

const prefixSuffix = (props, type) => (
  <div className="input-group input-group-lg">
    <span className="input-group-addon" dangerouslySetInnerHTML={{__html: props.prefix}} />
    <CustomInput className="form-control" {...props} type={type} />
    <span className="input-group-addon" dangerouslySetInnerHTML={{__html: props.suffix}} />
  </div>
)

const prefixOnly = (props, type) => (
  <div className="input-group input-group-lg">
    <span className="input-group-addon" dangerouslySetInnerHTML={{__html: props.prefix}} />
    <CustomInput className="form-control" {...props} type={type} />
  </div>
)

const suffixOnly = (props, type) => (
  <div className="input-group input-group-lg">
    <CustomInput className="form-control" {...props} type={type} />
    <span className="input-group-addon" dangerouslySetInnerHTML={{__html: props.suffix}} />
  </div>
)


@connect(null, {dispatchLocal})
export default class SnuggGenericField extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      error: false,
      locked: Boolean(this.props.lockMessage)
    };
    this.onChange = this.onChange.bind(this)
    this.focusField = this.focusField.bind(this)
  }

  static propTypes = {
    __type: PropTypes.oneOf([
      'text', 'integer', 'number', 'tel', 'email', 'password', 'textarea',
      'select', 'multi-select', 'radio', 'date', 'datetime-local',
      'contenteditable'
    ]).isRequired,
    lock: PropTypes.string,
    onChange: PropTypes.func,
    onErrorStateChange: PropTypes.func,
    displayError: PropTypes.bool,
    bare: PropTypes.bool,
    editable: PropTypes.bool,
    editableTitle: PropTypes.bool,
    checkit: PropTypes.func
  };
  static contextTypes = {
    segments: segmentsType
  }

  static defaultProps = {
    displayError: true,
    bare: false,
    editable: false,
    editableTitle: false,
  };

  unlockHandler = (e) => {
    e.preventDefault()
    this.setState({locked: false})
  };

  setFieldError = (fieldValue) => {
    const fieldError = fieldErrorSelector({...this.props, value: fieldValue})
    this.setState({error: fieldError})
    if (this.props.onErrorStateChange) {
      this.props.onErrorStateChange(!Boolean(fieldError))
    }
  };

  componentWillMount() {
    this.setFieldError(this.props.value)
    this.integerOnly = isIntegerOnly(this.props)
    this.decimalsAllowed = areDecimalsAllowed(this.props)
  }

  componentWillUpdate(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setFieldError(nextProps.value)
    }
  }

  onChange(e) {
    const hasOnChange = typeof this.props.onChange === 'function'
    const field = this.props.label || this.props.__type

    invariant(
      hasOnChange,
      'An action / onChange was not specified for field %s',
      field
    )

    e && e.preventDefault && e.preventDefault()
    const newVal = e.currentTarget.value
    const oldVal = this.props.value
    const restricted = restrictInputs(newVal, oldVal, this.integerOnly, this.decimalsAllowed)

    if (newVal === oldVal) {
      return
    }
    this.props.onChange(restricted)
  }

  getTarget(ref) {
    const el = ReactDOM.findDOMNode(ref)
    if (isElement(el)) {
      this.setState({
        target: () => getLastNode(el.firstChild),
        container: this.refs.container
      })
    }
  }
  focusField() {
    const {segments: {one, three}} = this.context
    const isJobPage = (one === 'job') && !three
    const isRecPage = (one === 'job') && three === 'recommendation'
    if (!(isJobPage || isRecPage)) { return }
    const {field, dispatchLocal} = this.props
    dispatchLocal('contextState', {lastFocusedField: field})
  }
  render() {
    const {
      props: {__type, lockMessage, displayError},
      state: {locked, error}
    } = this

    const Wrapper = getFieldWrapper(this.props)
    const Field = FieldTypes[__type];
    const errorMsg = displayError && error
    const filteredProps = _.omit(this.props, 'onChange')


    if (locked) {
      filteredProps.disabled = true
    }
    let FinalComponent = (
      <div>
        <Wrapper {...filteredProps}>
          <Field {...filteredProps} onChange={this.onChange} onFocus={this.focusField} />
          <HelpBlock {...filteredProps} />
        </Wrapper>
        {errorMsg ? <InlineNotification theme='error' message={errorMsg} /> : null }
      </div>
    )

    if (locked) {
      FinalComponent = (
        <FieldLock lockMessage={lockMessage} unlockHandler={this.unlockHandler}>
          {FinalComponent}
        </FieldLock>
      )
    }

    return <Feedback feedback={errorMsg ? 'error' : ''} ref='container'>{FinalComponent}</Feedback>
  }
}

class FieldLock extends Component {

  state = {
    showDeleteModal: false
  };

  render() {
    const {
      props: {lockMessage, children, unlockHandler},
      state: {showDeleteModal}
    } = this
    return (
      <div onClick={e => this.setState({showDeleteModal: true})}>
        {children}
        <div style={styles}>
          <Icon type="edit" />
        </div>
        <ConfirmationModal
          title='Warning:'
          show={showDeleteModal}
          onCancel={e => this.setState({showDeleteModal: false})}
          confirmText="Edit Field Anyway"
          onConfirm={unlockHandler}>
          {lockMessage}
        </ConfirmationModal>
      </div>
    )
  }
}

// TODO: Ben this is super quick and dirty.
// You probably want to flex your muscles on this
const styles = {
  position: 'absolute',
  top: 14,
  zIndex: 50,
  right: 87,
}
