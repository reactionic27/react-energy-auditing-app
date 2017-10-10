import React, {PropTypes} from 'react'
import _ from 'lodash'

export default class RadioGroup extends React.Component {

  static defaultProps = {
    options: []
  };

  static propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    btnStyle: PropTypes.object,
    value: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    bsSize: PropTypes.oneOf(['sm', 'md', 'lg'])
  };

  onChange(val, e) {
    e.preventDefault()
    if (val === this.props.value && this.props.nullable !== undefined) {
      if (this.props.nullable === true) {
        val = null
      } else if (this.props.nullable !== false) {
        val = this.props.nullable
      }
    }
    this.props.onChange({
      preventDefault() {},
      currentTarget: {
        value: val
      }
    })
    this.props.onFocus && this.props.onFocus()
  }

  render() {
    let className = "btn-group"
    if (this.props.bsSize) {
      className += ` btn-group-${this.props.bsSize}`
    }
    const radio = (
      <div className={className} style={this.props.style || {}}>
        {this.props.options.filter(f => f !== "").map(item => {
          if (typeof item === 'string') {
            item = [item, item]
          } else if (_.isObject(item) && !_.isArray(item)) {
            item = [item.displayValue, item.displayValue]
          }

          const [key, val] = item
          let className = this.props.value === key ? "btn btn-default active" : "btn btn-default";
          if (item[0] === "") {
            return null
          }
          return (
            <div className={className} disabled={Boolean(this.props.disabled)} style={this.props.btnStyle} key={key} onClick={this.onChange.bind(this, key)}>
              {val}
            </div>
          )
        })}
      </div>
    );
    if (this.props.children) {
      return (
        <div>
          {radio}
          {this.props.children}
        </div>
      )
    }
    return radio
  }
}
