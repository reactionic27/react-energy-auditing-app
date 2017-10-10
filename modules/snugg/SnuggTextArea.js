import React from 'react'
import filtered from '../util/filtered'

// TODO: Currently autogrowTextAreaHeight does not work
export default class TextArea extends React.Component {

  componentDidMount() {
    this.autogrowTextAreaHeight()
  }

  componentDidUpdate() {
    this.autogrowTextAreaHeight()
  }

  // If it's a textarea, adjust the height of the textarea as you type.
  // If this isn't working check this out:
  // https://github.com/facebook/react-native/commit/481f560f64806ba3324cf722d6bf8c3f36ac74a5
  autogrowTextAreaHeight() {
    if (this.props.editable) {
      const node = this.refs.node
      const styles = window.getComputedStyle(node) || {};
      const padding =
        parseInt(styles.getPropertyValue('padding-top') || 0, 10) +
        parseInt(styles.getPropertyValue('padding-bottom') || 0, 10);

      // Reset height to 'auto' every time otherwise deleting content won't shrink the element
      node.style.height = 'auto'
      node.style.height = (node.scrollHeight - padding) + 20 + 'px'
    }
  }

  render() {
    if (this.props.printing) {
      return <div>{this.props.value}</div>
    }
    if (this.props.editable) {
      return (
        <textarea
          ref="node"
          placeholder="Click to add text"
          className="form-control editable"
          {...filtered(this.props)}  />
      )
    }
    return <textarea className="form-control" {...filtered(this.props)} value={this.props.value || ''} />
  }

}
