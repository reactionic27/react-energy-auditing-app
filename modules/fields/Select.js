import React, {PropTypes} from 'react'
import {isPlainObject, keys} from 'lodash'

export default class Select extends React.Component {

  static defaultProps = {
    options: [],
    multiple: false,
    style: {},
    required: false
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    options: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    disabled: PropTypes.bool,
    style: PropTypes.object,
    required: PropTypes.bool,
  };

  constructor() {
    super(...arguments)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    e.preventDefault()
    this.props.onChange({
      preventDefault() {},
      currentTarget: {
        value: this.valueCache[e.target.value]
      }
    })
  }

  optionSet = (options, deep = false) => {
    return options.map(opt => {
      if (typeof opt === 'string') {
        opt = [opt, opt]
      } else if (opt.hasOwnProperty('displayValue')) {
        opt = [opt.displayValue, opt.displayValue]
      }
      if (isPlainObject(opt)) {
        if (deep) throw new Error('Cannot nest optiongroups')
        const k = keys(opt)[0]
        const v = opt[k]
        return (
          <optgroup label={k} key={`a:${k}`}>
            {this.optionSet(v, true)}
          </optgroup>
        )
      }
      const [key, val] = opt
      this.valueCache[key] = key
      return (
        <option value={key} key={key}>
          {val}
        </option>
      )
    })
  };

  render() {
    this.valueCache = {}
    const style = this.props.children ? DELETABLE : this.props.style
    const select = (
      <select className="form-control input-group-lg"
              required={this.props.required}
              value={this.props.value}
              onChange={this.onChange}
              onFocus={this.props.onFocus}
              disabled={this.props.disabled}
              style={{height: 46, fontSize: 18, ...style}} multiple={this.props.multiple}>
        {this.optionSet(this.props.options)}
      </select>
    );
    if (this.props.children) {
      return (
        <div>
          {select}
          {this.props.children}
        </div>
      )
    }
    return select
  }
}

const DELETABLE = {
  maxWidth: '76%',
  display: 'inline-block',
  width: 'auto',
  position: 'relative'
}
