import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {stateToMarkdown} from 'draft-js-export-markdown'
import {stateFromMarkdown} from 'draft-js-import-markdown'
import {stateFromHTML} from 'draft-js-import-html'
import {Editor, EditorState, RichUtils} from 'draft-js'
import isHTML from 'is-html'
import Toolbar from './Toolbar'
import {Overlay} from 'react-bootstrap'

export default class DraftEditor extends Component {
  constructor(props) {
    super(props)
    let editorState = EditorState.createEmpty()
    const {value} = props
    editorState = EditorState.createWithContent(this.import(value))
    this.state = {
      editorState,
      focused: false
    }
  }

  onChange = (editorState) => {
    this.setState({editorState})
    const value = this.export(editorState)
    if (value !== this.props.value) {
      this.props.onChange(value)
    }
  }

  handleKeyCommand = (command) => {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  import = (value) => {
    value = value || ''
    const draftState = isHTML(value) ? stateFromHTML(value) : stateFromMarkdown(value)
    return draftState
  }

  export = (editorState) => {
    const valueInMarkdown = stateToMarkdown(editorState.getCurrentContent())
    return valueInMarkdown
  }
  renderToolbar = () => {
    const {editorState, focused} = this.state
    return (
      <Overlay
        show={focused}
        container={this}
        placement='top'
        target={() => ReactDOM.findDOMNode(this.refs.editor)}
       >
        <Toolbar editorState={editorState} onChange={this.onChange} />
      </Overlay>
    )
  }

  render() {
    const {editorState} = this.state
    const {placeholder} = this.props
    return (
      <div>
        {this.renderToolbar()}
        <Editor
          ref="editor"
          placeholder={placeholder || "Insert text here..."}
          editorState={editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          onFocus={() => this.setState({focused: true})}
          onBlur={() => this.setState({focused: false})} />
      </div>
    )
  }
}
