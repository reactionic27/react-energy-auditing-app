import React from 'react'
import ReactDOM from 'react-dom'
import splitNewlines from 'util/splitNewlines'
import Radium from 'radium'
import pure from 'pure-render-decorator'

@pure
@Radium
export default class SnuggInlineEditable extends React.Component {

  state = {
    editing: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing && prevState.editing !== this.state.editing) {
      const node = ReactDOM.findDOMNode(this.refs.editor)
      node.focus()
      const len = node.value.length
      node.setSelectionRange(len, len)
    }
  }

  handleClick = (e) => {
    e.preventDefault()
    this.setState({editing: !this.state.editing})
  };

  handleBlur = (e) => {
    e.preventDefault()
    this.setState({editing: false})
  };

  handleUpdate = (e) => {
    this.props.onChange(e.target.value)
  };

  editingView() {
    const {
      props: {value},
      handleBlur
    } = this
    return (
      <textarea
        ref="editor"
        onChange={this.handleUpdate}
        onBlur={handleBlur}
        style={styles.reportTextarea}
        value={value}
      />
    )
  }

  presentView() {
    const {
      props: {value, placeholder},
      handleClick
    } = this
    const displayValue = (value || '').trim() ? value : placeholder
    return (
      <p onClick={handleClick} style={styles.inlineText}>
        {splitNewlines(displayValue, true)}
      </p>
    )
  }

  render() {
    return this.state.editing ? this.editingView() : this.presentView()
  }

}

const styles = {
  inlineText: {
    cursor: 'pointer',
    minHeight: 100,
    // ':hover': {
    //   backgroundColor: '#FEF3BE'
    // },
  },
  reportTextarea: {
    cursor: 'text',
    width: '100%',
    minHeight: 135,
    paddingTop: 1,
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255, 0.9)'
  }
}
