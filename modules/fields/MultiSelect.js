import React, { Component } from 'react';
import Select from 'react-select';

export default class MultiSelect extends Component {
  constructor() {
    super(...arguments)
    this.onChange = this.onChange.bind(this)
  }

  onChange(value) {
    this.props.onChange({
      currentTarget: {
        value: value
      }
    })
  }

  render() {
    return (
      <Select {...this.props} onChange={this.onChange} placeholder="Type or select..."/>
    );
  }
}
