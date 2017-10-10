import React, {PropTypes} from 'react'
import {connect} from 'snugg-redux'
import {dispatchLocal} from 'data/actions'
import dimensions from 'util/dimensions'
import dynamicResize from 'decorators/dynamicResize'

@connect(null, {dispatchLocal})
@dynamicResize
export default class Label extends React.Component {
  constructor(props) {
    super(props)
    this.focusField = this.focusField.bind(this)
  }
  focusField() {
    const {field, dispatchLocal} = this.props
    let contextState = {lastFocusedField: field}
    if (dimensions.screenSize === 'xs') { contextState.showContextSlidePane = true }
    field && dispatchLocal('contextState', contextState)
  }
  render() {
    return (
      <label
        style={this.props.style}
        onClick={this.focusField} >
          {this.props.children}
      </label>
    );
  }
}

Label.propTypes = {
  focusField: PropTypes.func,
  field: PropTypes.string,
  style: PropTypes.object
}
