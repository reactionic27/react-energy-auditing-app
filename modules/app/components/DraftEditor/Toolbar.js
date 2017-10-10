import React, { Component } from 'react'
import { RichUtils } from 'draft-js'
import Radium from 'radium'
import {palette} from 'app/lib/global-styles'
import Color from 'color'

const CONTROL_TYPES = [
  {label: 'H', style: 'header-four', type: 'block'},
  {label: 'UL', style: 'unordered-list-item', type: 'block'},
  {label: 'OL', style: 'ordered-list-item', type: 'block'},
  {label: 'B', style: 'BOLD', type: 'inline'},
  {label: 'I', style: 'ITALIC', type: 'inline'},
];

@Radium
class ControlButton extends Component {
  toggle = (e) => {
    e.preventDefault();
    this.props.onToggle(this.props.style, this.props.type);
  }
  render() {
    const {label} = this.props
    return (
      <span onMouseDown={this.toggle} style={styles.controlButton}>
        {label}
      </span>
    )
  }
}

@Radium
export default class Toolbar extends Component {
  toggle = (control, type) => {
    const toggleMethod = (type === 'block') ? RichUtils.toggleBlockType : RichUtils.toggleInlineStyle
    const editorState = toggleMethod(
      this.props.editorState,
      control
    )
    this.props.onChange(editorState)
  }
  render() {
    return (
      <div className="RichEditor-controls" style={styles.toolbar}>
        {CONTROL_TYPES.map(control =>
          <ControlButton
            key={control.label}
            label={control.label}
            type={control.type}
            onToggle={this.toggle}
            style={control.style}
          />
        )}
      </div>
    )
  }
}

const styles = {
  toolbar: {
    margin: 5
  },
  controlButton: {
    padding: 10,
    width: 46,
    fontWeight: 600,
    userSelect: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    textAlign: 'center',
    backgroundColor: palette.BROWN,
    color: palette.BEIGE,
    ':hover': {
      backgroundColor: Color(palette.BROWN).lighten(0.55).hexString()
    },
    ':active': {
      backgroundColor: Color(palette.BROWN).darken(1).hexString()
    }
  }
}
